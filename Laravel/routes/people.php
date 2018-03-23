<?php
Route::post('people/log', [
    'as' => 'pages',
    'middleware' => 'people/log',
    'uses' => 'PeopleController@Log'
]);
Route::get('people/registration',function(){
    return view('registration');
});
Route::post('people/registration', [
    'as' => 'pages',
    'middleware' => 'people/reg',
    'uses' => 'PeopleController@Reg'
]);

Route::post('people/itemhas', 'PeopleController@itemHas');
