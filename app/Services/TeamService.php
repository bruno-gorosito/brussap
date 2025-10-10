<?php
namespace App\Services;

use App\Models\Team;
use Illuminate\Support\Facades\Log;

class TeamService {
    public function update ($id, $data) {
        try {
            $team = Team::find($id);
            $team->name = $data['name'];
            $team->email = $data['email'];
            $team->save();
        } catch (\Exception $e) {
            Log::info('<<< ERROR TeamService@update >>>');
            Log::info($e->getMessage());
            Log::info($e->getTraceAsString());
            Log::info('<<< END ERROR TeamService@update >>>');
        }
    }
}