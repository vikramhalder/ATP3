<?php
/**
 * Created by IntelliJ IDEA.
 * User: vikram
 * Date: 22-Mar-18
 * Time: 9:54 PM
 */

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;

class ProductController
{
    function productDetails($id){
        $product = DB::table('product')->where('product_id',$id)->get();
        return view('product.details')->with('product',$product);
    }
    function productBuynow($id){
        $product = DB::table('product')->where('product_id',$id)->get();
        return view('product.buynow')->with('product',$product);
    }
}