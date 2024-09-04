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
        $menuItems = MenuItem::with(['parent', 'children.parent'])->whereNull('parent_id')->get();

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
        $menuItem = MenuItem::where('id', $id)->with('parent')->first();

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
        $data = $request->validated();

        // Determine the order of the new item
        if (isset($data['parent_id'])) {
            // Get the maximum order value of the existing children
            $maxOrder = MenuItem::where('parent_id', $data['parent_id'])->max('order');
            $data['order'] = $maxOrder !== null ? $maxOrder + 1 : 1; // Increment max order or set to 1
        } else {
            // Root level item, find max order at root level
            $maxOrder = MenuItem::whereNull('parent_id')->max('order');
            $data['order'] = $maxOrder !== null ? $maxOrder + 1 : 1;
        }

        // Set depth based on parent depth if any
        $data['depth'] = isset($data['parent_id'])
            ? MenuItem::find($data['parent_id'])->depth + 1
            : 0;

        $menuItem = MenuItem::create($data);

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

        // Recalculate order if parent_id has changed
        if (isset($data['parent_id']) && $data['parent_id'] !== $menuItem->parent_id) {
            $maxOrder = MenuItem::where('parent_id', $data['parent_id'])->max('order');
            $data['order'] = $maxOrder !== null ? $maxOrder + 1 : 1;
        }

        // Recalculate depth if parent_id has changed
        if (isset($data['parent_id'])) {
            $data['depth'] = MenuItem::find($data['parent_id'])->depth + 1;
        } else {
            $data['depth'] = 0;
        }

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
