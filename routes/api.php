<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;

Route::middleware(['auth'])->prefix('file-manager')->group(function () {
    Route::get('/', [FileController::class, 'index']);
    Route::post('/download', [FileController::class, 'download']);
    Route::post('/decrypt', [FileController::class, 'decrypt']);
    Route::delete('/delete', [FileController::class, 'delete']);
    Route::get('/fileratio', [FileController::class, 'getFileRatio']);
    Route::get('/content/{path}', [FileController::class, 'getContent']); // for Hex Viewer

    // Chunk upload
    Route::post('upload-chunk', [FileController::class, 'uploadChunk']);
    Route::post('finalize-upload', [FileController::class, 'finalizeUpload']);
});
