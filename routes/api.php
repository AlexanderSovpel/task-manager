<?php

use Illuminate\Http\Request;

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

Route::get('tasks', 'TasksController@index');
Route::get('tasks/{task}', 'TasksController@get');
Route::get('tasks/{task}/comments', 'TasksController@comments');
Route::post('tasks', 'TasksController@create');
Route::patch('tasks/{task}', 'TasksController@update');
Route::delete('tasks/{task}', 'TasksController@delete');

Route::get('comments', 'CommentsController@index');
Route::get('comments/{comment}', 'CommentsController@get');
Route::post('comments', 'CommentsController@create');
Route::patch('comments/{comment}', 'CommentsController@update');
Route::delete('comments/{comment}', 'CommentsController@delete');