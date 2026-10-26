<?php

use App\Http\Controllers\SubscriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SubscriptionController::class, 'create'])->name('home');
Route::post('/subscribe', [SubscriptionController::class, 'store'])->name('subscribe');
