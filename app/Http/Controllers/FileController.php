<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Redirect;
use App\Models\FileModel;

class FileController extends Controller
{
    private $basePath = 'encrypted';

    public function index(Request $request)
    {
        $relativePath = '';// $request->query('path', '');

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

        foreach (Storage::files($fullPath) as $file) {
            $is_encrypt = FileModel::where("name", basename($file))->first();
            $files[] = [
                'name' => basename($file),
                'path' => $this->getRelativePath($file),
                'size' => Storage::size($file),
                'last_modified' => Storage::lastModified($file),
                'type' => File::extension($file),
                'is_encrypted' => $is_encrypt ? $is_encrypt->is_encrypted : 'false', // Default to false if null
            ];
        }

        // foreach (Storage::directories($fullPath) as $directory) {
        //     $directories[] = [
        //         'name' => basename($directory),
        //         'path' => $this->getRelativePath($directory),
        //         'is_file' => false
        //     ];
        // }

        return response()->json([
            'current_path' => $relativePath,
            'items' => array_merge($directories, $files)
        ]);
    }

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

    public function upload(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file|max:100000', // Max size 10MB
            'passphrase' => 'nullable|string',
            'nonce' => 'nullable|string',
        ]);

        if (!$this->validatePath($request->path)) {
            return response()->json(['error' => 'Invalid path'], 403);
        }
        // $fullPath = $this->getFullPath($request->path);
        // $file = $request->file('file');
        // $filename = $file->getClientOriginalName();
        $uploadedPaths = [];
        foreach ($request->file('files') as $file) {
            $fileName = $file->getClientOriginalName();
            FileModel::create([
                'name' => $fileName,
                'is_encrypted' => $request->is_encrypted
            ]);
            Storage::putFileAs('encrypted', $file, $fileName);
        }
        return Redirect::back()
            ->with('refresh', true)
            ->with('message', 'Item berhasil ditambah');
    }

    public function createDirectory(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
            'name' => 'required|string|regex:/^[a-zA-Z0-9-_\s]+$/'
        ]);

        $newPath = trim($request->path . '/' . $request->name, '/');

        if (!$this->validatePath($newPath)) {
            return response()->json(['error' => 'Invalid path'], 403);
        }

        $fullPath = $this->getFullPath($newPath);
        Storage::makeDirectory($fullPath);

        return response()->json([
            'message' => 'Directory created successfully',
            'path' => $this->getRelativePath($fullPath)
        ]);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.path' => 'required|string',
            'items.*.is_file' => 'required|boolean',
        ]);

        foreach ($request->items as $item) {
            if (!$this->validatePath($item['path'])) {
                return response()->json(['error' => 'Invalid path: ' . $item['path']], 403);
            }

            // Prepend the 'encrypted' directory
            $fullPath = 'encrypted/' . ltrim($item['path'], '/');

            if ($item['is_file']) {
                Storage::delete($fullPath);
            } else {
                Storage::deleteDirectory($fullPath);
            }
        }

        return response()->json([
            'message' => 'Items deleted successfully'
        ]);
    }

    public function download($path)
    {
        if (!$this->validatePath($path)) {
            abort(403);
        }

        $fullPath = $this->getFullPath($path);

        if (!Storage::exists($fullPath)) {
            abort(404);
        }

        return Storage::download($fullPath);
    }

    public function getHexTable(Request $request)
    {
        $file = $request->file('file');

        if (!$file) {
            return response()->json(['error' => 'No file provided'], 400);
        }

        $contents = file_get_contents($file->path());
        $hexData = [];
        $textData = [];

        // Process file contents in chunks of 16 bytes
        for ($i = 0; $i < strlen($contents); $i += 16) {
            $chunk = substr($contents, $i, 16);

            // Convert to hex
            $hex = [];
            for ($j = 0; $j < strlen($chunk); $j++) {
                $hex[] = sprintf('%02X', ord($chunk[$j]));
            }

            // Convert to printable text
            $text = '';
            for ($j = 0; $j < strlen($chunk); $j++) {
                $char = ord($chunk[$j]);
                $text .= ($char >= 32 && $char <= 126) ? $chunk[$j] : '.';
            }

            $hexData[] = [
                'offset' => sprintf('%08X', $i),
                'hex' => $hex,
                'text' => $text
            ];
        }

        return response()->json($hexData);
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

    public function getStorageSizes()
    {
        $usedStorage = [
            'images' => $this->getFolderSize('public/images'),
            'videos' => $this->getFolderSize('public/videos'),
            'documents' => $this->getFolderSize('public/documents'),
        ];

        $totalStorage = disk_total_space(base_path()); // Total disk space in bytes
        $availableStorage = disk_free_space(base_path()); // Free disk space in bytes
        $usedTotal = $totalStorage - $availableStorage; // Used storage

        return response()->json([
            'usedStorage' => $usedStorage,
            'usedTotal' => $usedTotal,
            'availableStorage' => $availableStorage,
            'totalStorage' => $totalStorage,
        ]);
    }

    private function getFolderSize($path)
    {
        $files = Storage::allFiles($path);
        $size = 0;

        foreach ($files as $file) {
            $size += Storage::size($file);
        }

        return $size; // in bytes
    }
}