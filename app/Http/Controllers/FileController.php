<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use App\Models\FileModel;
use App\Models\User;
use App\Services\ChaCha20Poly1305Service;

class FileController extends Controller
{
    private $basePath = 'encrypted';
    private $tempPath = 'temp/chunks';
    private $encryptionService;

    public function __construct(ChaCha20Poly1305Service $encryptionService)
    {
        $this->encryptionService = $encryptionService;
    }

    private function hashKey($key)
    {
        return hash('sha256', $key);
    }

    public function index(Request $request)
    {
        $relativePath = ''; // $request->query('path', '');

        if (!$this->validatePath($relativePath)) {
            return response()->json(['error' => 'Invalid path'], 403);
        }

        $fullPath = $this->getFullPath($relativePath);
        $files = [];
        $directories = [];

        // Ensure the encrypted directory exists
        if (!Storage::exists($this->basePath)) {
            Storage::makeDirectory($this->basePath);
        }

        $userId = auth()->id(); // Assuming you use Laravel's built-in auth system

        foreach (Storage::files($fullPath) as $file) {
            // Fetch file metadata while filtering by user_id
            $is_encrypt = FileModel::where('name', basename($file))
                ->where('user_id', $userId) // Filter by user_id
                ->first();

            // Only add files that belong to the user
            if ($is_encrypt) {
                $files[] = [
                    'name' => basename($file),
                    'path' => $this->getRelativePath($file),
                    'size' => Storage::size($file),
                    'last_modified' => Storage::lastModified($file),
                    'type' => File::extension($file),
                    'is_encrypted' => $is_encrypt->is_encrypted, // Assuming this is not null for valid entries
                    'is_locked' => $is_encrypt->is_locked,
                ];
            }
        }

        // For directory (if needed in the future
        // foreach (Storage::directories($fullPath) as $directory) {
        //     $directories[] = [
        //         'name' => basename($directory),
        //         'path' => $this->getRelativePath($directory),
        //         'is_file' => false
        //     ];
        // }


        return response()->json([
            'current_path' => $relativePath,
            'items' => array_merge($directories, $files),
        ]);
    }

    public function uploadChunk(Request $request)
    {
        ini_set('memory_limit', '512M');

        $request->validate([
            'chunk' => 'required|file',
            'fileName' => 'required|string',
            'fileId' => 'required|string',
            'chunkIndex' => 'required|integer',
            'totalChunks' => 'required|integer',
            'is_encrypted' => 'required|boolean',
            'is_same_as_password' => 'required|boolean',
            'passphrase' => 'nullable|string',
            'nonce' => 'nullable|string',
        ]);

        $chunk = $request->file('chunk');
        $fileId = $request->fileId;
        $chunkIndex = $request->chunkIndex;

        // Create temp directory for chunks if it doesn't exist
        $chunkPath = "{$this->tempPath}/{$fileId}";
        Storage::makeDirectory($chunkPath);

        // Store the chunk
        try {
            Storage::putFileAs($chunkPath, $chunk, "chunk_{$chunkIndex}");
            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to store chunk: ' . $e->getMessage()], 500);
        }
    }

    public function finalizeUpload(Request $request)
    {
        $request->validate([
            'fileName' => 'required|string',
            'fileId' => 'required|string',
            'is_encrypted' => 'required|boolean',
            'is_same_as_password' => 'required|boolean',
        ]);

        $fileId = $request->fileId;
        $fileName = $request->fileName;
        $chunkPath = "{$this->tempPath}/{$fileId}";

        // Get all chunks and sort them
        // $chunks = collect(Storage::files($chunkPath))
        //     ->sort(function ($a, $b) {
        //         $aIndex = (int) str_replace('chunk_', '', basename($a));
        //         $bIndex = (int) str_replace('chunk_', '', basename($b));
        //         return $aIndex - $bIndex;
        //     });
        $chunks = collect(Storage::files($chunkPath))
            ->sort(function ($a, $b) {
                preg_match('/chunk_(\d+)$/', basename($a), $aMatch);
                preg_match('/chunk_(\d+)$/', basename($b), $bMatch);
                return ((int) $aMatch[1]) - ((int) $bMatch[1]);
            });

        // Create final file content
        $finalContent = '';
        foreach ($chunks as $chunk) {
            $finalContent .= Storage::get($chunk);
        }

        // Handle encryption if needed
        if ($request->boolean('is_encrypted')) {
            if ($request->boolean('is_same_as_password')) {
                $encrypted = $this->encryptionService->encrypt(
                    $finalContent,
                    User::find($request->user_id)->password
                );
            } else {
                $encrypted = $this->encryptionService->encrypt(
                    $finalContent,
                    $request->passphrase,
                    $request->nonce
                );
            }
            // $finalContent = base64_decode($encrypted['encrypted']);
            if (isset($encrypted['encrypted'])) {
                \Log::info("Encrypted content size: " . strlen($encrypted['encrypted']));
                $finalContent = base64_decode($encrypted['encrypted']);
            } else {
                \Log::error("Encryption failed, no encrypted content.");
                return response()->json(['error' => 'Encryption failed'], 500);
            }
        }

        // Store the final file
        try {
            Storage::put("{$this->basePath}/{$fileName}", $finalContent);

            // Create file record with proper boolean values
            FileModel::create([
                'name' => $fileName,
                'is_same_as_password' => $request->boolean('is_same_as_password'),
                'is_encrypted' => $request->boolean('is_encrypted'),
                'is_locked' => $request->boolean('is_encrypted'),
                'user_id' => auth()->id(),
                'type' => $request->type,
            ]);

            // Clean up chunks
            Storage::deleteDirectory($chunkPath);

            return response()->json([
                'success' => true,
                'message' => 'File upload completed successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to finalize file: ' . $e->getMessage()], 500);
        }
    }

    public function download(Request $request)
    {
        $fullPath = $this->getFullPath($request->path);
        $file = FileModel::where('name', basename($request->path))->first();
        $content = Storage::get($fullPath);
        $fileSize = Storage::size($fullPath);

        \Log::info("Downloading file: {$fullPath}, Size: {$fileSize}");

        if ($file && $file->is_locked) {
            // Decrypt the file content
            try {
                // Ensure the correct key is derived
                // $decryptionKey = $this->hashKey($request->passphrase);

                // Fix: Do not base64 encode $content again
                $decryptedContent = $this->encryptionService->decrypt(
                    $content, // No base64 encoding needed
                    $request->passphrase,
                    $request->nonce 
                );

                return response($decryptedContent)
                    ->header('Content-Type', 'application/octet-stream')
                    ->header('Content-Disposition', 'attachment; filename="' . $file->name . '"');
            } catch (\Exception $e) {
                return response()->json(['error' => 'Decryption failed: ' . $e->getMessage()], 500);
            }
        }

        // For unlocked files, download directly
        return Storage::download($fullPath);
    }


    public function decrypt(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'passphrase' => 'required|string',
            'fileName' => 'required|string',
            'is_same_as_password' => 'required|boolean',
            // 'nonce' => 'required|string'
        ]);

        try {
            $decryptionKey = $request->is_same_as_password
                ? $request->user()->password
                : $this->hashKey($request->passphrase);

            $chacha = new ChaCha20Poly1305Service();
            $decryptedContent = $chacha->decrypt(
                $request->content,
                $request->passphrase,
                $request->nonce
            );

            return response($decryptedContent)
                ->header('Content-Type', 'application/octet-stream')
                ->header('Content-Disposition', 'attachment; filename="' . $request->fileName . '"');
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function delete(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.path' => 'required|string',
            // 'items.*.is_encrypted' => 'required|string',
        ]);

        foreach ($request->items as $item) {
            if (!$this->validatePath($item['path'])) {
                return response()->json(['error' => 'Invalid path: ' . $item['path']], 403);
            }

            // Prepend the 'encrypted' directory
            $fullPath = 'encrypted/' . ltrim($item['path'], '/');

            FileModel::where('name', basename($item['path']))->delete();
            Storage::delete($fullPath);

            // if ($item['is_file']) {
            //     Storage::delete($fullPath);
            // } else {
            //     Storage::deleteDirectory($fullPath);
            // }
        }

        return response()->json([
            'message' => 'Items deleted successfully'
        ]);
    }

    public function getContent($path)
    {
        // $path = $request->path;
        // $path = $request->query('path');
        // Ensure we're only accessing files within the encrypted directory
        $fullPath = storage_path('app/encrypted/' . $path);

        // Prevent directory traversal
        $realPath = realpath($fullPath);
        $encryptedDir = realpath(storage_path('app/encrypted'));

        if (!$realPath || !str_starts_with($realPath, $encryptedDir)) {
            return response()->json(['error' => 'Invalid file path'], 403);
        }

        if (!file_exists($realPath)) {
            return response()->json(['error' => 'File not found'], 404);
        }

        return response()->file($realPath);
    }

    public function getFileRatio()
    {
        // Retrieve the count of files grouped by their type
        $filetype = FileModel::select('type')
            ->selectRaw('COUNT(*) as total_files') // Get the count of files for each type
            ->groupBy('type')
            ->get()
            ->pluck('total_files', 'type')
            ->toArray();

        // Ensure all file types are included with a default count of 0
        $fileTypes = ['image', 'video', 'document'];
        $filetype = array_merge(array_fill_keys($fileTypes, 0), $filetype);

        return response()->json([
            'filetype' => $filetype, // File type count for the pie chart
        ]);
    }

    // Validations 
    private function getFullPath($path = '')
    {
        $fullPath = trim($this->basePath . '/' . $path, '/');
        return $fullPath;
    }

    private function validatePath($path)
    {
        $normalizedPath = $this->getFullPath($path);
        return str_starts_with($normalizedPath, $this->basePath);
    }

    private function getRelativePath($path)
    {
        return substr($path, strlen($this->basePath) + 1);
    }
}
