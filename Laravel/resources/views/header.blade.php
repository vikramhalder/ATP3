@if(session()->has('id'))
    @include('headerAuth')
@else
    @include('headerUnaut')
@endif