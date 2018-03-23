<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PeopleController extends Controller
{
    function Log(Request $request){
        echo $request->get('message');
    }

    function Reg(Request $request){
        return view('registration')->with("message",$request->get('message'));
    }

    function itemHas(Request $request){
        $itemHas = DB::table('people')->where($request->input('coloumName'),'=', $request->input('coloumValue'))->get();
        if(sizeof($itemHas)>0){
            echo "false";
        }else{
            echo "true";
        }
    }
    function Logout(){
        \Auth::logout();
        session_unset();
        return redirect(property_exists($this, 'redirectAfterLogout') ? $this->redirectAfterLogout : '/');
    }
}
