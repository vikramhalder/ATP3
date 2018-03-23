<?php

namespace App\Http\Middleware\People;

use Closure;
use Illuminate\Support\Facades\DB;
class Reg
{
    public function handle($request, Closure $next)
    {
        $message=array();
        $check=true;

        $fname=$request->input('fname');
        $lname=$request->input('lname');
        $username=$request->input('username');
        $email=$request->input('email');
        $type=$request->input('type');
        $address=$request->input('location');
        $password=$request->input('password');
        $passwordAgain=$request->input('confirmpassword');
        $active=($type=='Customar')?"1":"0";

        $emailCheck = DB::table('people')->where('email','=', $email)->get();
        $usernameCheck = DB::table('people')->where('username','=', $username)->get();
        if(sizeof($emailCheck)>0) {
            array_push($message, "Email Already Use");
            $check=false;
        }
        if(sizeof($usernameCheck)>0) {
            array_push($message, "Username Already Use");
            $check=false;
        }
        if($password!=$passwordAgain){
            array_push($message, "Password Not Match");
            $check=false;
        }
        if(strlen($password)<6){
            array_push($message, "Password At Least 6 Char");
            $check=false;
        }

        if($check){
            DB::insert('insert into people (fname,lname,username,email,location,type,active,password) values (?,?,?,?,?,?,?,?)', array($fname,$lname,$username,$email,$address,$type,$active,$password));
            array_push($message, "success");
            $request->attributes->add(['message' => $message]);
        }else {
            $request->attributes->add(['message' => $message]);
        }
        return $next($request);
    }
}
