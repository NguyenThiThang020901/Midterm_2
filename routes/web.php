<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('trangchu');
});
Route::get('/forgot', function () {
    return view('trangchu');
});
Route::get('/ff', ['as' => 'Login', 'uses' => 'App\Http\Controllers\PageController@register']);