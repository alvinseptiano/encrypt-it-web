<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileModel extends Model
{
    protected $table = 'uploaded_file';

    protected $fillable = [
        'name',
        'is_encrpyted',
    ];
}
