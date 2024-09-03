<?php

namespace App\Http\Controllers;

use App\Http\Requests\MenuItemRequest;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Get all menu items
     *
     * @return void
     * @author Nderi Kamau <nderikamau1212@gmail.com>
     */
    public function index()
    {
        $menuItems = MenuItem::with('children')->whereNull('parent_id')->get();

        return response()->json($menuItems);
    }

    /**
     * Show the a specific menu item
     *
     * @param [type] $id
     * @return void
     * @author Nderi Kamau <nderikamau1212@gmail.com>
     */
    public function show($id)
    {
        $menuItem = MenuItem::where('id', $id)->first();

        return response()->json($menuItem);
    }

    /**
     * Store a new menu item
     *
     * @param \Illuminate\Http\Request $request
     * @return void
     * @author Nderi Kamau <nderikamau1212@gmail.com>
     */
    public function store(MenuItemRequest $request)
    {
        $request->validated();

        $menuItem = MenuItem::create($request->all());

        return response()->json($menuItem, 201);
    }

    /**
     * Update an existing menu item
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\MenuItem $menuItem
     * @return void
     * @author Nderi Kamau <nderikamau1212@gmail.com>
     */
    public function update(MenuItemRequest $request, $id)
    {
        $menuItem = MenuItem::where('id', $id)->first();

        $data = $request->validated();

        $menuItem->update($data);

        return response()->json($menuItem);
    }

    /**
     * Delete a menu item
     *
     * @param \App\Models\MenuItem $menuItem
     * @return void
     * @author Nderi Kamau <nderikamau1212@gmail.com>
     */
    public function destroy($id)
    {
        $menuItem = MenuItem::where('id', $id)->first();

        if (!$menuItem) {
            return response()->json(['error' => 'Menu item not found'], 404);
        }

        if ($menuItem->children()->exists()) {
            return response()->json(['error' => 'Cannot delete menu item with children'], 400);
        }

        $menuItem->delete();
        
        return response()->json(null, 200);
    }
}
