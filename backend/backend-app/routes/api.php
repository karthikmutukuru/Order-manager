<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OrderController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;


Route::middleware('api')->group(function () {
    // Health check
    Route::get('/', function () {
        return response()->json([
            'status' => 'healthy',
            'version' => '1.0',
            'timestamp' => now()
        ]);
    });

    // Test CORS
    Route::get('/test-cors', function () { /* ... */ });

    Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);


    // Orders API
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/{id}', [OrderController::class, 'show']);
        Route::post('/', [OrderController::class, 'store']);
        Route::put('/{id}', [OrderController::class, 'update']);
        Route::delete('/{id}', [OrderController::class, 'destroy']);
        Route::get('/{id}/summary', [OrderController::class, 'summary']);
    });

    // Protected routes (Sanctum)
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', function (Request $request) {
            return response()->json([
                'user' => $request->user(),
                'abilities' => $request->user()->tokens->first()->abilities ?? []
            ]);
        });
    });
});