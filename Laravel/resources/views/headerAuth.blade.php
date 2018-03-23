<html>
<head>
    <title></title>
    <link rel="shortcut icon" href="/img/logo.png" type="image/png">
    <link rel='stylesheet' type='text/css' href='/CSS/header.css'>
    <link rel='stylesheet' type='text/css' href='/CSS/allCatagoty.css'> 
    <link rel="stylesheet" href="/bootstrap/bootstrap.min.css">
    <script src="/bootstrap/jquery.min.js"></script>
    <script src="/bootstrap/jquery.cookie.js"></script>
    <script src="/bootstrap/jquery.validate.min.js"></script> 
    <script src="/bootstrap/bootstrap.min.js"></script>
    <script src="http://localhost/jquery-1.11.1.js"></script>
    <script src="http://localhost/socket.io-1.2.0.js"></script>
    <script src="http://localhost/canvasjs.min.js"></script>
    <script src="/JS/myjs.js"></script>
    <script src="/JS/valid.js"></script>
    <script src="/JS/header.js"></script> 
    <link rel='stylesheet' type='text/css' href='/CSS/style.css'>
</head>
<body id="bodyid">
    <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <img src="/img/logo.png" class="navbar-brand" height="auto">
            <a class="navbar-brand" href="/">ShopZone</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <div class="col-sm-12 col-md-6">
                <form class="navbar-form" role="search" action="/search">
                    <div class="input-group">
                        <input type="text" class="form-control search" id="searchBar" placeholder="Search" name="q">
                        <div class="input-group-btn">
                            <button class="btn btn-default form-control" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                        </div>
                    </div>
                </form>
            </div>
            <nav class="mobileNav">
                <ul>
                    <li class="disable a"><a href="#">My Card</a></li>
                        <ul>
                            <li><a href="/product/pandding">Pandding</a></li>
                            <li><a href="/product/complete">Complete</a></li>
                            <li><a href="/product/whitelist">Whitelist</a></li> 
                        </ul> 
                    <li class="disable a"><a href="#">My Panel</a></li> 
                        @if(Session::get('type')=="Admin")
                            <ul>  
                                <li><a href="#">Catagory</a></li>
                                <li><a href="#">View Report</a></li>
                                <li><a href="#">Employee</a></li>
                                <li><a href="#">Employee Activetion</a></li> 
                            </ul>
                        @endif
                        @if(Session::get('type')=="Deliver")
                            <ul>
                                <li><a href="/deliver/neworder">New Order</a></li>
                                <li><a href="/deliver/allorder">All Order</a></li>
                            </ul>
                        @endif
                        @if(Session::get('type')=="Staff")
                            <ul>
                                <li><a href="/staff/area">Area</a></li>
                                <li><a href="/staff/neworder">New Order</a></li>
                                <li><a href="/staff/allorder">All Order</a></li>
                                <li><a href="/staff/upload">Product Upload</a></li>
                            </ul>
                        @endif
                    <li class="a"><a href='/{{'@'.Session::get("username")}}'>Profile</a></li>
                    <li class="a"><a href="/logout">Logout</a></li>
                </ul>
            </nav>
            <nav class="webNav">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="dropdown-toggle" href="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="glyphicon glyphicon-bell"></span> 
                            <kbd id="notiCount" style="background:#d95454;">0</kbd>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <ul class="nav nav-pills nav-stacked" id="notification" style="width:250px;"> 
                            </ul>
                        </div>
                        <script>
                            function notiCountView() {
                                if ($("#notiCount").html() == "0" || $("#notiCount").html() == "") {
                                    document.getElementById('notiCount').style.display = "none";
                                } else {
                                    document.getElementById('notiCount').style.display = "initial";
                                }
                            }
                            notiCountView();
                            /*$.get("/people/notificationView", function (data) {
                                data = JSON.parse(JSON.stringify(data));
                                var count = 0;
                                data.forEach(function (val) { 
                                    if ( val.noti_seen == "none" & count <= 10) {
                                        $("#notification").append('<li><a href="/people/notiReduce/' + val.noti_id+ '"><b>' + val.noti_type + '<b></a></li>');
                                    }
                                    if (val.noti_seen == "none"){
                                        count++;
                                    }
                                    
                                });
                                $("#notiCount").html(count);
                                if (count > 10) {
                                    $("#notification").append('<li><a href="/notification">See More ' + (count - 10) + '</a></li>');
                                }
                                notiCountView();
                            });  */
                        </script>
                    </li>
                    <li>
                        <a class="dropdown-toggle" href="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-shopping-cart"></span></a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <ul class="nav nav-pills nav-stacked">
                                <li><a href="/product/pandding">Pandding</a></li>
                                <li><a href="/product/complete">Complete</a></li>
                                <li><a href="/product/whitelist">Whitelist</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a class="dropdown-toggle" href="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-th"></span></a>
                        @if(Session::get('type')=="Admin")
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <ul class="nav nav-pills nav-stacked">
                                    <li><a href="/admin/catagory">Catagory</a></li>
                                    <li><a href="/admin/viewreport">View Report</a></li>
                                    <li><a href="/admin/employee">Employee</a></li>
                                    <li><a href="/admin/employeeactive">Employee Activetion</a></li>
                                </ul>
                            </div>
                        @endif
                        @if(Session::get('type')=="Deliver")
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <ul class="nav nav-pills nav-stacked">
                                    <li><a href="/deliver/neworder">New Order</a></li>
                                    <li><a href="/deliver/allorder">All Order</a></li>
                                </ul>
                            </div>
                        @endif
                        @if(Session::get('type')=="Staff")
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <ul class="nav nav-pills nav-stacked">
                                    <li><a href="/staff/area">Area</a></li>
                                    <li><a href="/staff/neworder">New Order</a></li>
                                    <li><a href="/staff/allorder">All Order</a></li>
                                    <li><a href="/staff/upload">Product Upload</a></li>
                                </ul>
                            </div>
                        @endif
                    </li>
                    <li>
                        <a class="dropdown-toggle" href="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img src="" id="pImg" height="25" style="border-radius:50px" />
                            <script>$("#pImg").attr("src", ImageExist("user", "user{{ Session::get('id')}}.png"));</script>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <ul class="nav nav-pills nav-stacked">
                                <li><a href='/{{'@'.Session::get("username")}}'>Profile</a></li>
                                <li><a href="/logout">Logout</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>.</li>
                    <li>.</li>
                </ul>
            </nav> 
        </div> 
    </nav>     
    <br /><br /><br />
