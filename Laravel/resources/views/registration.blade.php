@include('headerUnaut')
    <div class="container fromBox">
        <div class="card card-container" style="padding:10px">  
            <center><h3>Creat New Account</h3></center>
            <form action="/people/registration" method="post" name='registration'>
                <!--First Name-->
                <div class="form-group"> 
                    <div class="col-md-12 inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input name="fname" placeholder="First Name" class="form-control" type="text" value="">
                        </div>
                    </div>
                </div> 
                <!--Last Name-->
                <div class="form-group"> 
                    <div class="col-md-12 inputGroupContainer" style="margin:10px 0px">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input name="lname" placeholder="Last Name" class="form-control" type="text" value="">
                        </div>
                    </div>
                </div>
                <!--Username-->
                <div class="form-group"> 
                    <div class="col-md-12 inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input name="username" id="username" placeholder="Username" class="form-control" type="text" value="">
                        </div>
                    </div>
                </div>
                <!--Email-->
                <div class="form-group"> 
                    <div class="col-md-12 inputGroupContainer" style="margin:10px 0px">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                            <input name="email" id="email" placeholder="E-Mail Address" class="form-control" type="text" required value="">
                        </div>
                    </div>
                </div>
                <div class="form-group"> 
                    <div class="col-md-12 selectContainer">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-list"></i></span>
                            <select name="type" class="form-control selectpicker required">
                                <option value="">Select your Role</option>
                                <option value="Customar">Customar</option>
                                <option value="Staff">Staff</option>
                                <option value="Deliver">Deliver</option> 
                            </select>
                        </div>
                    </div>
                </div>
                <!--Address-->
                <div class="form-group">
                    <div class="col-md-12 inputGroupContainer" style="margin:10px 0px">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                            <input name="location"  placeholder="Address" class="form-control" type="text" value=""/>
                        </div>
                    </div>
                </div>
                <!--Password-->
                <div class="form-group"> 
                    <div class="col-md-12 inputGroupContainer" style="margin:10px 0px">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input name="password" id="password" placeholder="Password" class="form-control" type="password" value=""/>
                        </div>
                    </div>
                </div>
                <!--Password Conform-->
                <div class="form-group"> 
                    <div class="col-md-12 inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input name="confirmpassword" placeholder="Confirm Password" class="form-control" type="password" value=""/>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12 inputGroupContainer" style="margin:10px 0px"> 
                        <button type="submit" class="btn btn-primary col-md-12"> Sign Up <span class="glyphicon glyphicon-send"></span></button>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-12 inputGroupContainer"  style="margin:10px 0px">
                        @if(isset($message))
                            @if($message[0]=='success')
                                <div class="alert alert-success">
                                    <script>alert("Your Account Create Successfully"); redirect('/log')</script>
                                </div>
                            @endif
                            @if($message[0]!='success')
                            <div class="alert alert-danger">
                                @foreach($message as $value)
                                    <p>{{$value}}</p>
                                @endforeach
                            </div>
                            @endif
                        @endif
                    </div>
                </div> 
            </form> 
        </div> 
    </div>
</body>
</html>   
<script>
    document.title = "Sign UP";
    jQuery.extend(jQuery.validator.messages, {
        required: "Please Enter Value",
        remote: "Already Use",
        email: "Please Enter Valid Email Address.",
        equalTo: "Password Not Match",
        regex:"Please Enter Valid Value",
        maxlength: jQuery.validator.format("Please enter No More Than {0} characters."),
        minlength: jQuery.validator.format("Please enter At Least {0} characters."),
        range: jQuery.validator.format("Please enter a value between {0} and {1}."),
        max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
        min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
    });
    $(function () {
        $.validator.addMethod("regex", function(value, element, regexpr) {          
            return regexpr.test(value);
        }), 
        $("form[name='registration']").validate({
            rules: {
                fname: { required: true, regex: /^[a-zA-Z0-9.,]+$/ },
                lname: { required: true, regex: /^[a-zA-Z0-9]+$/ },
                username: {
                    required: true,
                    regex: /^[a-zA-Z0-9]+$/,
                    remote: {
                        url: "/people/itemhas",
                        type: "post",
                        data: {
                            coloumName: "username", coloumValue: function () { return $("#username").val(); }
                        }
                    }
                },
                location: { required: true },
                type:{required:true},
                password: { required: true, minlength: 6, maxlength: 30 },
                confirmpassword: { required: true, equalTo: "#password" },
                email: { 
                    email: true,
                    regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 
                    required: true,
                    remote: {
                        url: "/people/itemhas",
                        type: "post",
                        data: {
                            coloumName:"email", coloumValue: function () { return $("#email").val(); }
                        }
                    } 
                },
                submitHandler: function (form) {
                    form.submit();
                }
            }
        });
    });
     
</script>
 