<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CarController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
	return Inertia::render('Landing', [
		'canLogin' => Route::has('login'),
		'canRegister' => Route::has('register'),
		'laravelVersion' => Application::VERSION,
		'phpVersion' => PHP_VERSION,
	]);
});

Route::get('/hire-car', function () {
	return Inertia::render('HireCar', [
		'canLogin' => Route::has('login'),
		'canRegister' => Route::has('register'),
	]);
});

Route::get('/hire-van', function () {
	return Inertia::render('HireVan', [
		'canLogin' => Route::has('login'),
		'canRegister' => Route::has('register'),
	]);
});

Route::get('/about', function () {
	return Inertia::render('About', [
		'canLogin' => Route::has('login'),
		'canRegister' => Route::has('register'),
	]);
});

Route::get('/blog', function () {
	return Inertia::render('Blog', [
		'canLogin' => Route::has('login'),
		'canRegister' => Route::has('register'),
	]);
});

Route::get('/contact', function () {
	return Inertia::render('Contact', [
		'canLogin' => Route::has('login'),
		'canRegister' => Route::has('register'),
	]);
});

Route::get('/dashboard', function () {
	return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
	Route::get('/hired-car', [CarController::class, 'index']);
});

require __DIR__ . '/auth.php';
