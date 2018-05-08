<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'task_id',
        'text'
    ];

    public function task() {
        return $this->belongsTo('App\Task', 'task_id');
    }
}
