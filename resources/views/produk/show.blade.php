@extends('layouts.dashboard')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col col-lg-8 col-md-8">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Detail Produk</h3>
                    <div class="card-tools">
                        <a href="{{ route('produk.index') }}"  class="btn btn-sm btn-danger">
                            Tutup
                        </a>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table">
                        <tr>
                                <td>Foto</td>
                                <td>
                                 <img src="/image/{{ $itemproduk->foto }}" style="width: 300px;" alt="{{ $itemproduk->nama_itemproduk }}" class="card-img-top">
                                </td>
                            </tr>
                            <tr>
                                <td>Kode Produk</td>
                                <td>
                                    {{ $itemproduk->kode_produk }}
                                </td>
                            </tr>
                            <tr>
                                <td>Nama Produk</td>
                                <td>
                                    {{ $itemproduk->nama_produk }}
                                </td>
                            </tr>
                            <tr>
                                <td>Qty</td>
                                <td>
                                    {{ $itemproduk->qty }} {{ $itemproduk->satuan }}
                                </td>
                            </tr>
                            <tr>
                                <td>Harga</td>
                                <td>
                                    Rp. {{ number_format($itemproduk->harga, 2) }}
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
</div>
</div>
@endsection
