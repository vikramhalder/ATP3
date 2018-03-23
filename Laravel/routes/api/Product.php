<?php

Route::get('api/product/all','Api\ProductController@All');
Route::get('api/product/catagory','Api\ProductController@Catagory');
Route::get('api/product/catagory/{id}','Api\ProductController@byCatagory');
Route::get('api/product/comment/{id}','Api\ProductController@getComment');
