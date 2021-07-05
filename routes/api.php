<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', ['as' => 'Login', 'uses' => 'App\Http\Controllers\PageController@login']);
Route::post('/forgot', ['as' => 'Login', 'uses' => 'App\Http\Controllers\PageController@forgot']);
Route::post('/register', ['as' => 'Login', 'uses' => 'App\Http\Controllers\PageController@register']);