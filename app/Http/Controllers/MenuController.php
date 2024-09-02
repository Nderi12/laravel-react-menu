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
    public function update(MenuItemRequest $request, MenuItem $menuItem)
    {
        $request->validated();

        $menuItem->update($request->all());

        return response()->json($menuItem);
    }

    /**
     * Delete a menu item
     *
     * @param \App\Models\MenuItem $menuItem
     * @return void
     * @author Nderi Kamau <nderikamau1212@gmail.com>
     */
    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();
        
        return response()->json(null, 204);
    }
}
