<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent_id',
        'order'
    ];

    /**
     * A recursive relationship for parent-child hierarchy
     *
     * @return void
     * @author Nderi Kamau <nderikamau1212@gmail.com>
     */
    public function children()
    {
        return $this->hasMany(MenuItem::class, 'parent_id', 'id')->with('children');
    }

    public function parent()
    {
        return $this->belongsTo(MenuItem::class, 'parent_id');
    }
}
