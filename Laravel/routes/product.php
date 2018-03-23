<?php
Route::get('product/details/{id}', "ProductController@productDetails");
Route::get('product/buynow/{id}', "ProductController@productBuynow");
Route::get('product/{id}/{a?}/{b?}/{c?}/{d?}/{e?}/{f?}', function ($id) {
    return view('product.ByCatagory')->with('id',$id);
});