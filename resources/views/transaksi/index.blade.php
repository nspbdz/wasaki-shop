@extends('layouts.dashboard')
@section('content')
<div class="container-fluid">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">
            Data Transaksi
          </h3>
        </div>
        @if (isset($itemorder))

        
        <div class="card-body">
          <!-- digunakan untuk menampilkan pesan error atau sukses -->
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
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Invoice</th>
                  <!-- <th>Sub Total</th> -->
                  <!-- <th>Diskon</th> -->
                  <!-- <th>Ongkir</th> -->
                  <th>Total</th>
                  <th>Status Pembayaran</th>
                  <th>Pembayaran</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                   <?php 
                   ?>
              @foreach($itemorder as $order)
                <tr>
                  <td>
                    {{ ++$no }}
                  </td>
                  <td>
                    {{ $order->cart->no_invoice }}
                  </td>
              
                  <td>
                    {{ number_format($order->cart->total, 2) }}
                  </td>                  
                  <td>
                    {{ $order->cart->status_pembayaran }}
                  </td>

                  <td>
                 @if (isset($order->attachment))

                      <img src="/image/{{ $order->attachment }}" width="100px">
                  <form action="{{ route('transaksi.update', $order->id) }}"
                    method='post' enctype="multipart/form-data">
                    @csrf
                    {{ method_field('patch') }}
                         <div class="form-group">
                            <label for="attachment">Attachment</label> <br>
                            <input type="file" name="attachment" id="attachment"> <br>  <br>
                           <button type="submit" class="btn btn-primary">Save changes</button>
                         </div>
                    </form>
                    @else
                    <form action="{{ route('transaksi.update', $order->id) }}"
                    method='post' enctype="multipart/form-data">
                    @csrf
                    {{ method_field('patch') }}
                         <div class="form-group">
                            <label for="attachment">Attachment</label> <br>
                            <input type="file" name="attachment" id="attachment"> <br>  <br>
                           <button type="submit" class="btn btn-primary">Save changes</button>
                         </div>
                    </form>
                    @endif
                  </td>

                  <!-- <td>
                    <a href="{{ route('transaksi.show', $order->id) }}" class="btn btn-sm btn-info mb-2">
                      Detail
                    </a>
                  </td> -->
                    @if($itemuser->role == 'admin')
                    <td>
                    <a href="{{ route('transaksi.show', $order->id) }}" class="btn btn-sm btn-info mb-2">
                      Detail
                    </a>
                    <a href="{{ route('transaksi.edit', $order->id) }}" class="btn btn-sm btn-primary mb-2">
                      Edit
                    </a>
                  </td>
                    @endif
                  </td>
                </tr>
              @endforeach
              </tbody>
            </table>
            @else
            <div>
                Cart Kosong 
            </div>
        @endif
        <!-- Modal -->



               
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection