<?php

namespace Database\Seeders;

use App\Models\MenuItem;
use Illuminate\Database\Seeder;

class MenuItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menuItems = json_decode(file_get_contents(
            database_path('data/menuData.json')
        ), true);

        $this->seedMenuItems($menuItems);
    }

    /**
     * Recursive function to seed the menu items with their children
     *
     * @param array $items
     * @param integer|null $parentId
     * @return void
     * @author Nderi Kamau <nderikamau1212@gmail.com>
     */
    private function seedMenuItems(array $items, int $parentId = null): void
    {
        foreach ($items as $item) {
            // Create the menu item
            $menuItem = MenuItem::create([
                'name' => $item['name'],
                'parent_id' => $parentId
            ]);

            // Recursively seed the children if the exists
            if (isset($item['children']) && count($item['children']) > 0) {
                $this->seedMenuItems($item['children'], $menuItem->id);
            }
        }
    }

}
