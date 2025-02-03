<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('ChartInfo');
    })->name('dashboard');

    Route::get('/uploadfile', function () {
        return Inertia::render('FileUpload');
    })->name('uploadfile');

    Route::get('/myfiles', function () {
        return Inertia::render('MyFiles');
    })->name('myfiles');

    Route::get('/hextable/{path}', function ($path) {
        return Inertia::render('HexTable', [
            'filePath' => $path
        ]);
    })->where('path', '.*')->name('hextable');

    Route::get('/username', [ProfileController::class, 'get']);
    Route::get('/files', [FileController::class, 'index']);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
