
@extends('layouts.template')
@section('content')
<style>
  #imm {
    height: 350px;
    object-fit: cover;
}
#container {
  /* height: 100vh; */
}
</style>
 
<div class="container-fluid" id="container">

  <div  class="row mt-4">
    <div class="col col-md-12 col-sm-12 mb-4">
      <!-- <h2 class="text-center">Terbaru</h2> -->
    </div>
    @foreach($itemproduk as $produk)
    <!-- produk pertama -->
    <div class="col-md-4">
      <div class="card mb-4 shadow-sm">
        <a href="{{ URL::to('produk/'.$produk->id) }}">
          @if($produk->foto != null)
          <!-- <img src="/image/{{ $produk->foto }}" width="100px"> -->

          <img src="/image/{{ $produk->foto }}" alt="{{ $produk->nama_produk }}" class="d-block w-100"  id="imm" >
          @else
          <div>
            Produk Tidak ada 
          </div>
          <!-- <img src="/image/{{ $produk->foto }}" alt="{{ $produk->nama_produk }}" class="card-img-top"> -->
          @endif
        </a>
        <div class="card-body">
          <a href="{{ URL::to('produk/'.$produk->slug_produk ) }}" class="text-decoration-none">
            <p class="card-text">
              {{ $produk->nama_produk }}
            </p>
          </a>
          <br>
          <p>
                Rp. {{ number_format($produk->harga, 2) }}
              </p>
          <div class="row mt-4">
            <div class="col">
              <button class="btn btn-light">
                <i class="far fa-heart"></i>
              </button>
            </div>
          
          </div>
        </div>
      </div>
    </div>
    @endforeach
  <!-- end produk terbaru -->

 
</div>

</div>

<!-- tentang toko -->
  <div class="row mt-4">
    <div class="col">
      <h5 class="text-center">Warung Sasak Dayi </h5>
      <p style="text-align:center">
      Masih bingung buat cari cemilan yang ENAK dan SIMPLE tapi disukai banyak orang????!!! 
      Kenalin nih cemilan dari Warung Sasak Dayi yang menyajikan berbagai macam makanan dan minuman yang harganya aman di kantong!!!   
    </p>
      <p style="text-align:center">
      Ada beberapa varian terfavorite untuk teman-teman cobain nihh....   
    </p>
    <div style="text-align:center">

      <p>
        *Ada pisang krispy rasa coklat yang coklatnya lumerrrr dimulut
      </p>
      
      <p>
        *Ada pisang gupak yang susunya melimpahh
      </p>
      <p>
        *Ada Es Alpukat Kocok
      </p>
    </div>
      <p class="text-center">
        <!-- <a href="" class="btn btn-outline-secondary">
          Baca Selengkapnya
        </a>       -->
      </p>
    </div>
  </div>
  <!-- end tentang toko -->
@endsection