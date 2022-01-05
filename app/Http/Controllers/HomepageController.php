<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produk;
use App\Models\Kategori;
use App\Models\Cart;

use Illuminate\Support\Facades\Auth;

class HomepageController extends Controller
{
  
    
    public function index(Request $request) {
        
        $itemproduk = Produk::orderBy('created_at', 'desc')->limit(6)->get();
        $itemkategori = Kategori::orderBy('nama_kategori', 'asc')->limit(6)->get();

        if(!empty($request->user())){

            $itemuser = $request->user();//ambil data user
            // dd($itemuser);
            $data = array('title' => 'Homepage',
            'itemproduk' => $itemproduk,
            'itemkategori' => $itemkategori,
        );
        return view('homepage.index', $data);
        }

        $data = array('title' => 'Homepage',
            'itemproduk' => $itemproduk,
            'itemkategori' => $itemkategori,
        );
        return view('homepage.index', $data);
    }
    public function makanan(Request $request) {
        
        $itemproduk = Produk::where('kategori_id', '=', 2)->orderBy('created_at', 'desc')->get();
        // dd($itemproduk);
        if(!empty($request->user())){

            $itemuser = $request->user();//ambil data user
            // dd($itemuser);
            $data = array('title' => 'Homepage',
            'itemproduk' => $itemproduk,
         );
        return view('homepage.makanan', $data);
        }

        $data = array('title' => 'Homepage',
            'itemproduk' => $itemproduk,
        );
        return view('homepage.makanan', $data);
    }

    public function minuman(Request $request) {
        
        $itemproduk = Produk::where('kategori_id', '=', 1)->orderBy('created_at', 'desc')->get();
        // dd($itemproduk);
        if(!empty($request->user())){

            $itemuser = $request->user();//ambil data user
            // dd($itemuser);
            $data = array('title' => 'Homepage',
            'itemproduk' => $itemproduk,
         );
        return view('homepage.minuman', $data);
        }

        $data = array('title' => 'Homepage',
            'itemproduk' => $itemproduk,
        );
        return view('homepage.minuman', $data);
    }

    public function about() {
        $data = array('title' => 'Tentang Kami');
        return view('homepage.about', $data);
    }

    public function kontak() {
        $data = array('title' => 'Kontak Kami');
        return view('homepage.kontak', $data);
    }
    public function kategori() {
        $data = array('title' => 'Kategori Produk');
        return view('homepage.kategori', $data);
    }
    public function produk() {
        $data = array('title' => 'Produk');
        return view('homepage.produk', $data);
    }
    public function produkdetail($id) {
        // dd($request);
        $itemproduk = Produk::where('id', $id)
                            ->where('status', 'publish')
                            ->first();
                            // dd($itemproduk);
        if ($itemproduk) {
            $data = array('title' => $itemproduk->nama_produk,
                        'itemproduk' => $itemproduk,
                        'foto' => $itemproduk->foto);
            return view('homepage.produkdetail', $data);   
            dd($data);         
        } else {
            // kalo produk ga ada, jadinya tampil halaman tidak ditemukan (error 404)
            return abort('404');
        }
    }
}