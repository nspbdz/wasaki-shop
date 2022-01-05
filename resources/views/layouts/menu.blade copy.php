 <style>
   #logo{
  border-radius: 50%;
  
 
  /* 68f3f8 */
   }
   a {
    text-decoration: none;
    color: black;
    font-size:25px;
  /* background-color: black; */
  /* text-decoration: none; */
}
  .navbar-expand-lg {
    background-color: #68f3f8;
    /* border-color: #E7E7E7; */
}
 </style>
 <!-- <nav class="navbar navbar-default" role="navigation"></nav> -->
 <nav class="navbar navbar-expand-lg t mb-4" >
     <div class="container">
       <a href="/">
         <img src="{{ asset('/image/logo.png') }}" id="logo" width="100px">
        </a>
        <a  href="/">Warung Sasak Dayi</a>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
             aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarNav">
             <ul class="mr-auto navbar-nav"></ul>
             <ul class="navbar-nav">
                 <li class="nav-item active">
                     <a class="nav-link" href="/">Home</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link" href="{{ URL::to('kontak') }}">Kontak</a>
                 </li>

                 @if(Auth::check())
                    
                        
                     @if (Auth::user()->isAdmin() )
                     <li class="nav-item">
                         <a class="nav-link" href="{{ URL::to('/admin/transaksi') }}">Transaksi</a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link" href="{{ URL::to('/admin/produk') }}">Produk</a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link" href="{{ URL::to('/admin/kategori') }}">Kategori</a>
                     </li>
                    @else
                        <li class="nav-item">
                         <a class="nav-link" href="{{ URL::to('transaksi') }}">Transaksi</a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link" href="{{ URL::to('cart') }}">Cart</a>
                     </li>

                     
                    @endif
                    <a href="#" class="nav-link" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                         <i class="nav-icon fas fa-sign-out-alt"></i>
                         <p>
                             Sign Out
                         </p>
                     </a>
                     @else
                        <li class="nav-item">
                            <a class="nav-link" href="{{ URL::to('login') }}">Login</a>
                        </li>
                @endif
                 

             </ul>
         </div>
     </div>
 </nav>
 <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
     @csrf
 </form>
