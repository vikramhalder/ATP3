<?php
Route::get('/', function () {return view('home');});
Route::get('/401', function () {return view('error.401');});
Route::get('/404', function () {return view('error.404');});
Route::get('/405', function () {return view('error.405');});
Route::get('/log', function () {return view('log');});
Route::get('/logout', 'PeopleController@Logout');
Route::get('/registration', function () {return view('registration');});

if(Request::is('product/*')){require __DIR__.'/product.php';}
if(Request::is('people/*')){require __DIR__ . '/people.php';}
if(Request::is('api/*')){require __DIR__.'/api.php';}
