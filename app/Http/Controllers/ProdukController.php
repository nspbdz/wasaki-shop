<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Produk;
// use App\Kategori;
use App\Models\Produk;
use App\Models\Kategori;
use Illuminate\Support\Str;



class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $itemproduk = Produk::orderBy('created_at', 'desc')->paginate(20);
        $data = array('title' => 'Produk',
                    'itemproduk' => $itemproduk);
        return view('produk.index', $data)->with('no', ($request->input('page', 1) - 1) * 20);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response    
     */
    public function create()
    {
        $itemkategori = Kategori::orderBy('nama_kategori', 'asc')->get();
        $data = array('title' => 'Form Produk Baru',
                    'itemkategori' => $itemkategori);
        return view('produk.create', $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     // 'name' => 'required',
        //     // 'detail' => 'required',
        //     'image' => 'required',
        // ]);

        $itemuser = $request->user();//ambil data user yang login
        $inputan = $request->all();
        $inputan['user_id'] = $itemuser->id;
        $inputan['status'] = 'publish';
        if ($image = $request->file('foto')) {
            $destinationPath = 'image/';
            $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
            $image->move($destinationPath, $profileImage);
            $inputan['foto'] = "$profileImage";
        }
    
        Produk::create($inputan);
        // $itemproduk = Produk::create($inputan);

     
        return redirect()->route('produk.index')
                        ->with('success','Product created successfully.');
    }

   
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $itemproduk = Produk::findOrFail($id);
        $data = array('title' => 'Foto Produk',
                'itemproduk' => $itemproduk);
        return view('produk.show', $data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $itemproduk = Produk::findOrFail($id);
        $itemkategori = Kategori::orderBy('nama_kategori', 'asc')->get();
        $data = array('title' => 'Form Edit Produk',
                'itemproduk' => $itemproduk,
                'itemkategori' => $itemkategori);
        return view('produk.edit', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'kode_produk' => 'required|unique:produk,id,'.$id,
            'nama_produk' => 'required',
            'deskripsi_produk' => 'required',
            'kategori_id' => 'required',
            'harga' => 'required|numeric'
        ]);
        
        $itemproduk = Produk::findOrFail($id);
        // kalo ga ada error page not found 404
       
            $inputan = $request->all();
            if ($image = $request->file('foto')) {
                // dd($image);
                $destinationPath = 'image/';
                $profileImage = date('YmdHis') . "." . $image->getClientOriginalExtension();
                $image->move($destinationPath, $profileImage);
                $inputan['foto'] = "$profileImage";
            }
            $itemproduk->update($inputan);
            return redirect()->route('produk.index')->with('success', 'Data berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $itemproduk = Produk::findOrFail($id);//cari berdasarkan id = $id, 
        // kalo ga ada error page not found 404
        if ($itemproduk->delete()) {
            return back()->with('success', 'Data berhasil dihapus');
        } else {
            return back()->with('error', 'Data gagal dihapus');
        }
    }
}