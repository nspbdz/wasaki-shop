
@extends('layouts.dashboard')
@section('content')
<div class="container-fluid">
  <!-- table kategori -->
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Kategori Produk</h4>
          <div class="card-tools">
            <a href="{{ route('kategori.create') }}" class="btn btn-sm btn-primary">
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
                  <th>Kode</th>
                  <th>Nama</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
               <?php 
                $i=1;
                ?>
              @foreach($itemkategori as $key =>$kategori)
                <tr>
                  <td>
                  {{$i++}}
                  </td>
                  <td>
                  {{ $kategori->kode_kategori }}
                  </td>
                  <td>
                  {{ $kategori->nama_kategori }}
                  </td>
                  
                  <td>
                  {{ $kategori->status }}
                  </td>
                  <td>
                    <a href="{{ route('kategori.edit', $kategori->id) }}" class="btn btn-sm btn-primary mr-2 mb-2">
                      Edit
                    </a>
                    <form action="{{ route('kategori.destroy', $kategori->id) }}" method="post" style="display:inline;">
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
            <!-- untuk menampilkan link page, tambahkan skrip di bawah ini -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection