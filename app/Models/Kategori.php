<?php

// namespace App;
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    protected $table = 'kategoris';
    protected $fillable = [
        'kode_kategori',
        'nama_kategori',
        'deskripsi_kategori',
        'status',
        'foto',
        'user_id',
    ];

    public function user() {//user yang menginput data kategori
        return $this->belongsTo(Post::class, 'user_id') ;

        // public function kotakab() {
        //     return $this->belongsTo(KotaKab::class, 'id');
        // }
        // return $this->belongsTo('App\User', 'user_id');
    }
}