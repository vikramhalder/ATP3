<?php

namespace App\Http\Middleware\People;

use Closure;
use Illuminate\Support\Facades\DB;
class Log
{
    public function handle($request, Closure $next)
    {
        $email=$request->input('email');
        $password=$request->input('password');
        $log = DB::table('people')->where('email','=', $email)->where('password','=', $password)->get();
        if(sizeof($log)>0){
            if($log[0]->active==1) {
                $request->session()->put('user', $log[0]);
                $request->session()->put('id', $log[0]->id);
                $request->session()->put('fname', $log[0]->fname);
                $request->session()->put('lname', $log[0]->lname);
                $request->session()->put('email', $log[0]->email);
                $request->session()->put('username', $log[0]->username);
                $request->session()->put('role', $log[0]->type);
                $request->session()->put('active', $log[0]->active);
                $request->session()->put('type', $log[0]->type);

                $request->attributes->add(['message' => "valid"]);
            }else if($log[0]->active==10) {
                $request->attributes->add(['message' => "Your Account is Suspend"]);
            }else {
                $request->attributes->add(['message' => "Your Account Is Waiting For Active"]);
            }
        }else{
            $request->attributes->add(['message' =>"Email Or Password Not Match"]);
        }
        return $next($request);
    }
}
