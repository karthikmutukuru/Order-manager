<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Order::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'product' => 'required|string|max:255',
        ]);

        $order = Order::create($validated);
        return response()->json($order, 201);
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);
        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'product' => 'required|string|max:255',
        ]);

        $order = Order::findOrFail($id);
        $order->update($validated);
        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204);
    }

    //summary method
    public function summary()
    {
        $totalOrders = Order::count();
        $products = Order::select('product')
            ->groupBy('product')
            ->selectRaw('count(*) as count, product')
            ->get();

        return response()->json([
            'total_orders' => $totalOrders,
            'product_summary' => $products
        ]);
    }
}
