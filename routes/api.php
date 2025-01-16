<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Change auth:sanctum to auth:web for session authentication
Route::middleware(['auth'])->prefix('file-manager')->group(function () {
    Route::get('/', [FileController::class, 'index']);
    Route::get('/content/{path}', [FileController::class, 'getContent']);
    Route::post('/upload', [FileController::class, 'upload']);
    Route::post('/create-directory', [FileController::class, 'createDirectory']);
    Route::delete('/delete', [FileController::class, 'delete']);
    Route::get('/download/{path}', [FileController::class, 'download']);
    Route::get('/storage-sizes', [FileController::class, 'getStorageSizes']);
});
