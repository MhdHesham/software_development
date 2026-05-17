<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;



Route::get('/employees', [EmployeeController::class, 'index']);

Route::get('/employees/{id}', [EmployeeController::class, 'show']);

Route::post('/employees', [EmployeeController::class, 'store']);

Route::put('/employees/{id}', [EmployeeController::class, 'update']);

Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
