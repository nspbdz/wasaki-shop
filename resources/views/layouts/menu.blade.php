
 <style>
   #logo{
  border-radius: 50%;
   }
   a {
    text-decoration: none;
    color: black;
    font-size:25px;
}
  .navbar-expand-lg {
    background-color: #68f3f8;
}
 </style>

 <!-- <nav class="navbar navbar-default" role="navigation"></nav> -->
 <nav class="navbar navbar-expand-lg" >
       <a href="/">
         <img src="{{ asset('/image/logo.png') }}" id="logo" width="100px">
        </a>
        <a  href="/">Warung Sasak Dayi</a>
         <button style="color:black;" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
             aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
         </button>

         <div class="collapse navbar-collapse" id="navbarNav">
             <ul class="mr-auto navbar-nav"></ul>

             <ul class="navbar-nav d-flex flex-row-reverse bd-highlight">
                 @if(!Auth::check())
                 <li class="nav-item active">
                     <a class="nav-link" href="/">Home</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link" href="{{ URL::to('kontak') }}">Kontak</a>
                 </li>
                 <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Menu
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/makanan">Makanan</a>
                    <a class="dropdown-item" href="/minuman">Minuman</a>
                </li>
              
                 <li class="nav-item">
                            <a class="nav-link" href="{{ URL::to('login') }}">Login</a>
                </li>
                 @else
                 <a href="#" class="nav-link" onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();">
                      <i class="nav-icon fas fa-sign-out-alt"></i>
                      <p>
                          Sign Out
                      </p>
                  </a>
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
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Menu
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="/makanan">Makanan</a>
                        <a class="dropdown-item" href="/minuman">Minuman</a>
                    </li>
                    <li class="nav-item">
                         <a class="nav-link" href="{{ URL::to('transaksi') }}">Transaksi</a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link" href="{{ URL::to('cart') }}">Cart</a>
                     </li>

                     
                    @endif
                
               

                        
                @endif

               
             </ul>
         </div>
 </nav>
 <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
     @csrf
 </form>
