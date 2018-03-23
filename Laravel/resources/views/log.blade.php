@include('headerUnaut')
    <div class="container fromBox">
        <br />
        <div class="card card-container" style="padding:10px">
            <center>
                <img id="profile-img" style="border-radius:50%;width:150px" src="img/profile.png" />
            </center>
            <br />
            <span id="reauth-email" class="reauth-email"></span>
            <input type="email" id="email" class="form-control" style="height:45px" value="vikramhalder103@gmail.com" placeholder="Email address" required autofocus>
            <br />
            <input type="password" id="password" class="form-control" style="height:45px" value="as" placeholder="Password" required>
            <div id="remember" class="checkbox">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block btn-signin" id="signin" type="submit" >Sign in</button>
            <br />
            <a href="/forgotpassword" class="forgot-password" style="color:rgb(104, 145, 162)">Forgot the password?</a>
            <br />
            <br />
            <center>
                <p id="errorShow" class="profile-name-card"></p> 
                
            </center>
            
        </div> 
    </div>
</body>
</html>   
<script>
    document.title = "Sign In";
    $("#signin").click(function () {
        $.post("/people/log",
        {
            email: $("#email").val(),
            password: $("#password").val()
        },
        function (data, status) {
            if (status == "success") { 
                if (data == "valid") {
                    if ("123".length<=5) {
                        redirect("/");
                    } else {
                        redirect("<%= url %>");
                    }  
                } else {  
                    $("#errorShow").html('<div class="alert alert-danger">'+ data+'</div>');
                }
            }
        });
    }); 
</script>
 