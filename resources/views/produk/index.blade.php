@extends('layouts.dashboard')
@section('content')
<div class="container-fluid">
  <!-- table produk -->
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Produk</h4>
          <div class="card-tools">
            <a href="{{ route('produk.create') }}" class="btn btn-sm btn-primary">
              Baru
            </a>
          </div>
        </div>
        <div class="card-body">
         
        </div>
        <div class="card-body">
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
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th width="50px">No</th>
                  <th>Gambar</th>
                  <th>Kode</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                @foreach($itemproduk as $produk)
                <tr>
                  <td>
                  {{ ++$no }}
                 
                  <td>
                      <img src="/image/{{ $produk->foto }}" width="100px">
                    </td>
                      <!-- <img src={{ $produk->foto }} alt=""> -->
                  
                  </td>
                  <td>
                  {{ $produk->kode_produk }}
                  </td>
                  <td>
                  {{ $produk->nama_produk }}
                  </td>
               
                  <td>
                  {{ number_format($produk->harga, 2) }}
                  </td>
                  <td>
                  {{ $produk->status }}
                  </td>
                  <td>
                    <a href="{{ route('produk.show', $produk->id) }}" class="btn btn-sm btn-primary mr-2 mb-2">
                      Detail
                    </a>
                    <a href="{{ route('produk.edit', $produk->id) }}" class="btn btn-sm btn-primary mr-2 mb-2">
                      Edit
                    </a>
                    <form action="{{ route('produk.destroy', $produk->id) }}" method="post" style="display:inline;">
                      @csrf
                      {{ method_field('delete') }}
                      <button type="submit" class="btn btn-sm btn-danger mb-2">
                        Hapus
                      </button>                    
                    </form>
                  </td>
                </tr>
                @endforeach
              </tbody>
            </table>
            {{ $itemproduk->links() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection