<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Kategori;
use App\Models\Kategori;
use Illuminate\Support\Str;

class KategoriController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // kita ambil data kategori per halaman 20 data dan (paginate(20))
        // kita urutkan yang terakhir diiput yang paling atas (orderBy)
       
        $itemkategori = Kategori::orderBy('created_at', 'desc')->get();
        // dd($itemkategori);
        // $data = array('title' => 'Kategori Produk',
        //             'itemkategori' => $itemkategori);
        // dd($data);
        
        // return view('kategori.index', $data)->with('no', ($request->input('page', 1) - 1) * 20);
        return view('kategori.index', ['itemkategori' => $itemkategori]);
    //   return view('transaksi.pengeluaran-bl.index',['title' => $title]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = array('title' => 'Form Kategori');
        return view('kategori.create', $data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        // $request->validate(
        //     // validasi create
        //   [
        //     'kode_kategori' => 'required|unique:kategori',
        //     'nama_kategori'=>'required',
        //     'deskripsi_kategori' => 'required',
        //   ]);
        // dd($request->user());
        $itemuser = $request->user();//kita panggil data user yang sedang login

        $inputan = $request->all();//kita masukkan semua variabel data yang diinput ke variabel $inputan
        $inputan['user_id'] = $itemuser->id;
        // dd($inputan);

        $inputan['status'] = 'publish';//status kita set langsung publish saja
        $itemkategori = Kategori::create($inputan);
        return redirect()->route('kategori.index')->with('success', 'Data kategori berhasil disimpan');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
        $itemkategori = Kategori::findOrFail($id);//cari berdasarkan id = $id, 
        // kalo ga ada error page not found 404
        $data = array('title' => 'Form Edit Kategori',
                    'itemkategori' => $itemkategori);
        return view('kategori.edit', $data);
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
            'nama_kategori'=>'required',
            'deskripsi_kategori' => 'required',
        ]);
        $itemkategori = Kategori::findOrFail($id);//cari berdasarkan id = $id, 
        // kalo ga ada error page not found 404

            $inputan = $request->all();
            $itemkategori->update($inputan);
            return redirect()->route('kategori.index')->with('success', 'Data berhasil diupdate');
        
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $itemkategori = Kategori::findOrFail($id);//cari berdasarkan id = $id, 
        // dd($itemkategori)
        // kalo ga ada error page not found 404
        // dd(count($itemkate   gori->produk) > 0);
        if (count($itemkategori->produk) > 0) {
            // dicek dulu, kalo ada produk di dalam kategori maka proses hapus dihentikan

            return back()->with('error', 'Hapus dulu produk di dalam kategori ini, proses dihentikan');
        } else {
            if ($itemkategori->delete()) {
                return back()->with('success', 'Data berhasil dihapus');
            } else {
                return back()->with('error', 'Data gagal dihapus');
            }
        }
    }
}
