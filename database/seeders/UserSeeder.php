<?php

use Illuminate\Database\Seeder;
use App\User;//model table users

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $inputan['name'] = 'Admin';
        $inputan['email'] = 'admin@gmail.com';//ganti pake emailmu
        $inputan['password'] = Hash::make('123258');//passwordnya 123258
        $inputan['phone'] = '085852527575';
        $inputan['alamat'] = 'indramayu Rt 03 Rw 05';
        $inputan['role'] = 'admin';//kita akan membuat akun atau users in dengan role admin
        User::create($inputan);

    }
    
}