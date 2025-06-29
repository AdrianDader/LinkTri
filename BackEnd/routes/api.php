<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\RepositoryController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EnlaceController;
use Illuminate\Http\Request;

// rutas públicas
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// rutas privadas
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('repository', RepositoryController::class);
    // Endpoint para obtener el usuario autenticado
    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => $request->user(),
        ]);
    });
});




Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('repository/{repository}/enlaces', EnlaceController::class);
});
