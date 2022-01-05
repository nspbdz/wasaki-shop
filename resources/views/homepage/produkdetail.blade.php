@extends('layouts.template')
@section('content')
<div class="container">
  <div class="row mt-4">
    <div class="col col-lg-8 col-md-8">
      <div id="carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
        <img src="/image/{{ $itemproduk->foto }}" class="d-block w-100">
       
        </div>
        
       
      </div>
    </div>
    <!-- deskripsi produk -->
    <div class="col col-lg-4 col-md-4">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body">
              @if(count($errors) > 0)
              @foreach($errors->all() as $error)
                  <div class="alert alert-warning">{{ $error }}</div>
              @endforeach
              @endif
              @if ($message = Session::get('error'))
                  <div class="alert alert-warning">
                      <p>{{ $message }}</p>
                  </div>
              @endif
              @if ($message = Session::get('success'))
                  <div class="alert alert-success">
                      <p>{{ $message }}</p>
                  </div>
              @endif
              <!-- <span class="small">{{ $itemproduk->kategori->nama_kategori }}</span> -->
             <p>Kategori: </p>
              <h5>{{ $itemproduk->nama_produk }}</h5>
             <p>Harga: </p>
              <h5>{{ $itemproduk->harga }}</h5>
              
          
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <div class="card">
            <div class="card-body">

            <form action="{{ route('cartdetail.store') }}" method="POST" enctype="multipart/form-data">
              
              @csrf
            
              <input type="hidden"  name="produk_id" value={{$itemproduk->id}}>
              <button class="btn btn-block btn-primary" type="submit">
              <i class="fa fa-shopping-cart"></i> Tambahkan Ke Keranjang
              </button>
            </form>

            </div>
            <div class="card-footer">
              <div class="row mt-4">
              
              
              
              </div>            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col">
      <div class="card">
        <div class="card-header">
          Deskripsi
        </div>
        <div class="card-body">
          {{ $itemproduk->deskripsi_produk }}
        </div>
      </div>
    </div>
  </div>
</div>
@endsection