<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LotteryController extends Controller
{
    /**
     * Lấy kết quả xổ số mới nhất từ Cache.
     */
    public function latest()
    {
        // Hệ thống Cache-First: Ưu tiên trả từ Redis
        $results = Cache::remember('lottery:latest', 60, function () {
            // Dummy data giả lập từ CSDL backup xổ số Miền Bắc
            return [
                'date' => date('d/m/Y'),
                'special' => '88888',
                'first' => '77777',
                'second' => ['11111', '22222'],
                'third' => ['33333', '44444', '55555', '66666', '77777', '88888'],
                'fourth' => ['0123', '1234', '2345', '3456'],
                'fifth' => ['5678', '6789', '7890', '8901', '9012', '0123'],
                'sixth' => ['123', '456', '789'],
                'seventh' => ['10', '20', '30', '40']
            ];
        });

        return response()->json([
            'success' => true,
            'source' => 'cache',
            'data' => $results,
        ]);
    }
}
