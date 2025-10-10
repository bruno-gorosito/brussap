<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $primaryKey = 'id';
    protected $tableName = 'teams';

    protected $fillable = [
        'name',
        'email'
    ];

    // public static function boot()
    // {
    //     parent::boot();

    //     self::created(function ($model) {
    //        $session_team_id = getPermissionsTeamId();
    //        setPermissionsTeamId($model);
    //        $superAdmin = User::where('email', 'superadmin@bruno.com')->first();
    //        $superAdmin->assignRole('Super Admin');
    //        setPermissionsTeamId($session_team_id);
    //     });
    // }

}
