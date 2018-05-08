<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'name',
        'description',
        'status'
    ];

    public function comments() {
        return $this->hasMany('App\Comment', 'task_id')->orderBy('created_at', 'desc');
    }
}
