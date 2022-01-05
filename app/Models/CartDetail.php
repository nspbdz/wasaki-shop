<?php

// namespace App;
namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class CartDetail extends Model
{
    protected $table = 'cart_detail';
    protected $fillable = [
        'produk_id',
        'cart_id',
        'qty',
        'harga',
        'diskon',
        'subtotal',
    ];

    public function cart() {
        return $this->belongsTo(Cart::class, 'cart_id') ;

        // return $this->belongsTo('App\Cart', 'cart_id');
    }

    public function produk() {
        return $this->belongsTo(Produk::class, 'produk_id') ;

        // return $this->belongsTo('App\Produk', 'produk_id');
    }

    // function untuk update qty, sama subtotal
    public function updatedetail($itemdetail, $qty, $harga) {
        $this->attributes['qty'] = $itemdetail->qty + $qty;
        $this->attributes['subtotal'] = $itemdetail->subtotal + ($qty * ($harga));
        self::save();
    }
}