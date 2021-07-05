<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Mail\SendMail;
use Mail;
class PageController extends Controller
{

    


    function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag(),"success"=>0]);      
        }
        
        $user = User::where("email",$request->email)->get();
        if($user->count()>0){
            if($user[0]->password==$request->password){
                return Response()->json(["success"=>1, 'user'=>$user[0]]);
            }
        }
        return response()->json(['errors'=>['login'=>"Login profile does not exist!!"]]); 
    }
    function register(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'phone' => 'required|numeric',
            'fullname' => 'required|string',
            'address' => 'required|string',
            'password' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag(),"success"=>0]);      
        }
        $find=User::where('email', $request->email)->get();
        if($find->count()>0){
            return response()->json(["errors" => ['register'=>'Account already exists!']]);
        }
        $new=new User;
        $new->email=$request->email;
        $new->password=$request->password;
        $new->phone=$request->phone;
        $new->fullname=$request->fullname;
        $new->address=$request->address;
        $new->save();
        return response()->json(["success"=>1]);
    }
    // function forgot(Request $request){
    //     $validator = Validator::make($request->all(), [
    //         'email' => 'required|string|email'
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json(["errors" => $validator->getMessageBag(),"success"=>0]);      
    //     }
    //     $find=User::where('email', 'thang.nguyen22@student.passerellesnumeriques.org')->get();
    //     if($find->count()==0){
    //         return response()->json(["errors" => ['message'=>'Account does not exists!']]);
    //     }
        
    // $details = [
    //     'subject'=>'Password forgot',
    //     'password'=>$find[0]->password
    // ];
    // Mail::to('thang.nguyen22@student.passerellesnumeriques.org')->send(new SendMail($details));
    // return response()->json(["success"=>1]);
    // $hashed_random_password = Str::random(12);
    //     $details = [
    //         'subject'=>'Password forgot',
    //         'password'=>$hashed_random_password
    //     ];
    //     $update=User::where('email', $request->email)->first();
    //     $update->password=$hashed_random_password;
    //     $update->save();
    //     Mail::to($request->email)->send(new SendMail($details));
    //     return response()->json(["success"=>1]);

    // }
    function forgot(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email'
        ]);
        if ($validator->fails()) {
            return response()->json(["errors" => $validator->getMessageBag(),"success"=>0]);      
        }
        $find=User::where('email', $request->email)->get();
        if($find->count()==0){
            return response()->json(["errors" => ['message'=>'Account does not exists!']]);
        }
        $hashed_random_password = Str::random(12);
        $details = [
            'subject'=>'Password forgot',
            'password'=>$hashed_random_password
        ];
        $update=User::where('email', $request->email)->first();
        $update->password=$hashed_random_password;
        $update->save();
        Mail::to($request->email)->send(new SendMail($details));
        return response()->json(["success"=>1]);
    }
}