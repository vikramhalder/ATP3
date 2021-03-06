﻿@include('../header')
<div class="container-fluid">
    <div class="row content">
        <div class="col-sm-2 sidenav">
            <h4>ALL CATEGORIES</h4>
            <ul class="nav nav-pills nav-stacked" id="allcatagory">
                <li><a href="/">All</a></li>
                <script>  
                    $.ajax({
                        type: "Get",
                        url: "/api/product/catagory",
                        dataType: 'json',
                        async: true,
                        success: function (result) {
                            var data = JSON.parse(JSON.stringify(result));
                            data.forEach(function (value) {
                                if (value.active == "1") {
                                    var name = value.product_catagory.split(" ").join("/");
                                    $('#allcatagory').append('<li><a href="/product/' + value.id + '/' + name + '">' + value.product_catagory + '</a></li>');
                                }
                            });
                        }
                    });
                </script>
            </ul>
        </div>

        <div class="col-sm-10 allitem"> 
            <div class="row" style="padding:5px 20px;"> 
                <div class="col-sm-6">
                    <div class="col-sm-9 tile" data-scale="1.5" data-image="/img/product/{{$product[0]->product_image}}" style="cursor:all-scroll"></div>
                </div> 
                <div class="col-sm-6" style="background:white"> 
                    <div class='productImg' style='float: left;width: 470px;height: 500px'>  
                        <h3>{{$product[0]->product_title}}</h3>
                        <h3 style='color:#00a1b1'>Product Code: {{$product[0]->product_code}}</h3>
                        <h4>Price : {{$product[0]->product_price}} TK <font style="text-decoration:line-through">{{$product[0]->product_price}}</font></h4>
                        <h4>Limit : {{$product[0]->product_limit_min}}/{{$product[0]->product_limit}}</h4>
                        <h4>Size : {{$product[0]->product_size}} </h4>
                        <input type='submit' value='BUY NOW' onclick='redirect("/product/buynow/{{$product[0]->product_id}}")' style='background:#F46475;font-size: 22px;color: white; padding: 5px 30px; border: none;cursor: pointer;'>
                        <p style='text-align: justify;'>{{$product[0]->product_discription}}</p>
                    </div>  
                </div>
            </div>
            <div class="row" style="padding:5px 20px">  
                <ul class="nav nav-tabs">
                    <li class="active"><a data-toggle="tab" href="#home">Feedback</a></li>
                    <li><a data-toggle="tab" href="#menu1">Purchase Step</a></li>
                    <li><a data-toggle="tab" href="#menu2">Condition</a></li>
                    <li><a data-toggle="tab" href="#menu3">Replace Policy</a></li>
                </ul>

                <div class="tab-content">
                    <div id="home" class="tab-pane fade in active"> 
                        <div class="row">
                            <div class="col-sm-12">
                                <h3>User Comment</h3>
                            </div> 
                        </div>
                        <div id="commentview">
                             
                        </div>
                        <script> 
                            $.ajax({
                                type: "Get",
                                url: "/api/product/comment/{{$product[0]->product_id}}",
                                dataType: 'json',
                                async: true,
                                success: function (result) {
                                    var data = JSON.parse(JSON.stringify(result));
                                    data.forEach(function (value) {  
                                        var write="";
                                        write +='<div class="col-sm-12">';
                                        write +='<div class="col-sm-1">';
                                        write +='<div class="thumbnail">';
                                        write +='<img class="img-responsive user-photo" src="'+ImageExist("user","user"+value.people_id+".png")+'">';
                                        write +='</div> ';
                                        write +='</div> ';
                                        write +='<div class="col-sm-5">';
                                        write +='<div class="panel panel-default">';
                                        write +='<div class="panel-heading">';
                                        write +='<strong>'+value.fname+' '+value.lname+'</strong> <span class="text-muted">commented '+value.datetime+'</span>';
                                        write +='</div>';
                                        write +='<div class="panel-body">';
                                        write +=value.text;
                                        write +='</div>';
                                        write +='</div>';
                                        write +='</div>';
                                        write +='</div>';
                                            
                                        $('#commentview').append(write); 
                                   });
                                }
                            });
                        </script>    
                        <textarea maxlength="200" id="commentwrite" minlength="5" class="form-control" rows="5" cplaceholder="Write Your Comment" style="width: 100%"></textarea><br>
                        <input type="submit" onclick="commentPost()" class="btn btn-success pull-right" style="height:45px" value="Post Comment"> <br /><br /><br />
                        <div class="col-sm-3 pull-right postMessage">
                            <!--Success/Alert-->>
                        </div>
                    </div>
                    <div id="menu1" class="tab-pane fade">
                        <ul>
                            <br />
                            <li>Select number of product you want to buy.</li>
                            <li>Click on Buy Now button.</li>
                            <li>If you are a new user, please click on Sign Up. Then sign up by providing required information.</li>
                            <li>Use your user name & password if you are a registered customer.
                            <li>Choose your payment (Check out) method.</li>
                            <li>Follow required instruction based on payment method.</li>
                        </ul>
                    </div>
                    <div id="menu2" class="tab-pane fade">
                        <ul>
                            <br />
                            <li>This offer is valid only for ShopZoon.com customers</li>
                            <li>Order confirmation and delivery completion are subject to product availability.</li>
                            <li>Please check your product at the time of delivery.</li>
                            <li>If delivery location is outside Dhaka city, advance payment is required.</li>
                            <li>Disclaimer: Product color may slightly vary due to photography, lighting sources or your monitor settings.</li> 
                        </ul>
                    </div>
                    <div id="menu3" class="tab-pane fade">
                        <ul>
                            <br />
                            <li>Product will be replaced if the it has any defect by its manufacturer.</li>
                            <li>Custome needs to inform us within 03 days from the date of delivery.</li>
                            <li>Products must be with the tags intact and in their original packaging, in an unwashed and undamaged condition.</li>
                            <li>Replacement for products is subject to inspection and checking by PriyoShop team.</li>
                            <li>Replacement cannot be possible if the product is burnt, damaged by short circuit, damaged due to neglect, improper usage, or broken by customer.</li> 
                        </ul>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html> 
<script>
    document.title="{{$product[0]->product_title}}";
    $('.tile') 
      .on('mouseover', function(){
          $(this).children('.photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
      })
      .on('mouseout', function(){
          $(this).children('.photo').css({'transform': 'scale(1)'});
      })
      .on('mousemove', function(e){
          $(this).children('.photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
      }) 
      .each(function(){
          $(this) 
            .append('<div class="photo"></div>') 
            .append('<div class="txt"><div class="x">'+ $(this).attr('data-scale') +'x</div>ZOOM ON<br>HOVER</div>')
            .children('.photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
      })

    function commentPost(){
        $.post( "/api/product/postcomment/{{$product[0]->product_id}}", { text: $("#commentwrite").val()}).done(function( data ) {
            $(".postMessage").html("");
            if(data=="true"){
                $("#commentwrite").val("");
                var x="";
                x +='<div class="alert alert-success alert-dismissible">';
                x +='    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
                x +='    <strong>Success!</strong> Comment post successful';
                x +='</div>';
                $(".postMessage").append(x);
            }else if(data=="auth false"){
                redirect("/log");
            }else{
                x +='<div class="alert alert-danger alert-dismissible">';
                x +='    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
                x +='    <strong>Failed!</strong> '+data;
                x +='</div>';
                $(".postMessage").append(x);
            }
        });
    }

</script>