<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::transaction(function(){
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@demo.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password')
            ]);
        });
    }
}
