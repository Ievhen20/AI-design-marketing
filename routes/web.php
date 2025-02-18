<?php

use App\Http\Controllers\Admin\CompanyController;

use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\Admin\CarsController;
use App\Http\Controllers\Admin\CountryController;
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
	return Inertia::render('Landing');
})->middleware(['auth', 'verified'])->name('landing');

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
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/', [HomeController::class, 'index']);

    Route::get('/countries', [CountryController::class, 'index'])->name('admin.country.index');
	Route::post('/countries/store', [CountryController::class, 'store'])->name('admin.country.store');
	Route::post('/countries/update/{id}', [CountryController::class, 'update'])->name('admin.country.update');
    Route::post('/countries/delete-country/{id}', [CountryController::class, 'delete'])->name('admin.country.delete');

    Route::get('/companies', [CompanyController::class, 'index'])->name('admin.company.index');
    Route::post('/fetch-companies', [CompanyController::class, 'fetch_companies'])->name('admin.company.fetch');
    Route::get('/new-company', [CompanyController::class, 'create'])->name('admin.company.create');
    Route::post('/create-company', [CompanyController::class, 'store'])->name('admin.company.store');
    Route::get('/edit-company/{id}', [CompanyController::class, 'edit'])->name('admin.company.edit');
    Route::post('/update-company/{id}', [CompanyController::class, 'update'])->name('admin.company.update');
    Route::delete('/delete-company/{id}', [CompanyController::class, 'destroy'])->name('admin.company.destroy');

    Route::get('/cars/', [CarsController::class, 'index'])->name('admin.car.index');
    Route::post('/cars/store', [CarsController::class, 'store'])->name('admin.car.store');
    Route::get('/cars/edit/{id}', [CarsController::class, 'edit'])->name('admin.car.edit');
    Route::post('/cars/update/{id}', [CarsController::class, 'update'])->name('admin.car.update');
    Route::post('/cars/delete/{id}', [CarsController::class, 'delete'])->name('admin.car.delete');
});


require __DIR__ . '/auth.php';
