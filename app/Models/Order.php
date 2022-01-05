<?php

// namespace App;
namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'order';
    protected $fillable = [
        'cart_id',
        'nama_penerima',
        'no_tlp',
        'attachment',
       
    ];

    public function cart() {
        return $this->belongsTo(Cart::class, 'cart_id');

        // return $this->belongsTo('App\Cart', 'cart_id');
    }
}