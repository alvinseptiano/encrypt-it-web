<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileModel extends Model
{
    protected $table = 'uploaded_file';

    protected $casts = [
        'name' => 'string',
        'is_encrpyted' => 'boolean',
        'is_same_as_password' => 'boolean',

    ];
    protected $fillable = [
        'name',
        'is_encrpyted',
        'is_locked',
        'is_same_as_password',
        'user_id',
        'type',
    ];
}
