<?php

use App\Http\Controllers\Admin\CompanyController;

use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\VanController;
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

Route::middleware('auth')->group(function () {
	Route::get('/hired-van', [VanController::class, 'index']);
});

// Admin middleware route
Route::middleware(['auth', 'admin'])->group(function () {
	Route::get('/admin', [HomeController::class, 'index']);
	
	// CRUD Routes for Companies
	Route::get('/admin/companies', [CompanyController::class, 'index'])->name('admin.company.index');
	Route::get('/admin/new-company', [CompanyController::class, 'create'])->name('admin.company.create');
	Route::post('/admin/create-company', [CompanyController::class, 'store'])->name('admin.company.store');
	Route::get('/admin/edit-company/{id}', [CompanyController::class, 'edit'])->name('admin.company.edit');
	Route::post('/admin/update-company/{id}', [CompanyController::class, 'update'])->name('admin.company.update');
	Route::delete('/admin/delete-company/{id}', [CompanyController::class, 'destroy'])->name('admin.company.destroy');
});


require __DIR__ . '/auth.php';
