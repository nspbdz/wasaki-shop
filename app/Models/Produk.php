<?php

// namespace App;
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    protected $table = 'produk';
    protected $fillable = [
        'kategori_id',
        'user_id',
        'kode_produk',
        'nama_produk',
        'deskripsi_produk',
        'foto',
        'harga',
        'status',
    ]; 

    public function kategori() {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}