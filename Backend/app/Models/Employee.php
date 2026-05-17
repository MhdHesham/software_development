<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    // الحقول القابلة للتعبئة
    protected $fillable = [
        'name',
        'email',
        'phone',
        'position',
        'salary',
        'hire_date',
        'image',
    ];
}
