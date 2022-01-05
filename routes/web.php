<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Yajra\Datatables\Datatables;
use App\Models\User;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartDetailController;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LaporanController;





// Auth::routes();
Route::get('/', [HomepageController::class, 'index'])->name('homepage.index');

Route::get('/about', [HomepageController::class, 'about'])->name('homepage.about');
Route::get('/kontak', [HomepageController::class, 'kontak'])->name('homepage.kontak');
Route::get('/makanan', [HomepageController::class, 'makanan'])->name('homepage.makanan');
Route::get('/minuman', [HomepageController::class, 'minuman'])->name('homepage.minuman');
Route::get('/kategori/{slug}', [HomepageController::class, 'produkperkategori'])->name('homepage.produkperkategori');
Route::get('/produk', [HomepageController::class, 'produk'])->name('homepage.produk');
Route::get('/produk/{id}', [HomepageController::class, 'produkdetail'])->name('homepage.produkdetail');
// shopping cart
Auth::routes();

Route::group(['middleware' => 'auth'], function() {
  Route::resource('cart', CartController::class);
  Route::resource('cartdetail', CartDetailController::class);
  Route::patch('kosongkan/{id}', [CartController::class, 'kosongkan'])->name('cart.kosongkan');
  Route::get('checkout', [CartController::class, 'checkout'])->name('cart.checkout');
  // Route::resource('/transaksi', TransaksiController::class);

  Route::get('transaksi', [TransaksiController::class, 'index'])->name('transaksi.index');
  Route::get('transaksi/{id}', [TransaksiController::class, 'show'])->name('transaksi.show');
  Route::patch('transaksi', [TransaksiController::class, 'update'])->name('transaksi.update');
 
  
  // Route::middleware(['auth', 'isAdmin'])->group(function () {
  // Route::middleware(['auth', 'isAdmin'])->group(['prefix' => 'admin'], function() {

          Route::resource('/admin/kategori', KategoriController::class);
          Route::resource('/admin/produk', produkController::class);
          Route::resource('/admin/transaksi', TransaksiController::class);

          // form laporan
          Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
          Route::get('/proseslaporan', [LaporanController::class, 'proses'])->name('laporan.proses');


});





// Route::middleware(['auth', 'isAdmin'])->group(function () {
//   Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');
//       Route::resource('kategori', KategoriController::class);
//       Route::resource('produk', produkController::class);
//       Route::resource('transaksi', TransaksiController::class);

// });
