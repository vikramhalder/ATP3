<?php
/**
 * Created by IntelliJ IDEA.
 * User: vikram
 * Date: 22-Mar-18
 * Time: 9:54 PM
 */

namespace App\Http\Controllers\Api;
use Illuminate\Support\Facades\DB;

class ProductController
{
    function All(){
        $all = DB::table('product')->get();
        return response($all, 200)->header('Access-Control-Allow-Origin', '*')->header('Content-Type', 'application/json');
    }
    function Catagory(){
        $catagory = DB::table('product_catagory')->get();
        return response($catagory, 200)->header('Access-Control-Allow-Origin', '*')->header('Content-Type', 'application/json');
    }
    function byCatagory($id){
        $catagory = DB::table('product')->where('product_catagory',$id)->get();
        return response($catagory, 200)->header('Access-Control-Allow-Origin', '*')->header('Content-Type', 'application/json');
    }

    function getComment($id){
        $shares = DB::table('product_comment')
            ->select('product_comment.*', 'people.fname','people.lname')
            ->join('people', 'product_comment.people_id', '=', 'people.id')
            ->where('product_comment.product_id',$id)
            ->get();
        return response($shares, 200)->header('Access-Control-Allow-Origin', '*')->header('Content-Type', 'application/json');
    }
}