<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\MenuItem;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MenuItemTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test adding a new menu item with children.
     *
     * @return void
     */
    public function test_it_can_add_a_new_menu_item_with_children()
    {
        $parentData = [
            'name' => 'Parent Menu Item',
            'parent_id' => null
        ];

        // Make POST request to create a new parent menu item
        $parentResponse = $this->postJson('/api/menus', $parentData);

        // Assert that the parent menu item was created successfully
        $parentResponse->assertStatus(201)
                       ->assertJsonFragment(['name' => 'Parent Menu Item']);

        $parentId = $parentResponse->json('id');

        // Simulate form input data for the child menu item
        $childData = [
            'name' => 'Child Menu Item',
            'parent_id' => $parentId
        ];

        // Make POST request to create a new child menu item
        $childResponse = $this->postJson('/api/menus', $childData);

        // Assert that the child menu item was created successfully
        $childResponse->assertStatus(201)
                      ->assertJsonFragment(['name' => 'Child Menu Item']);

        // Verify both parent and child items are in the database
        $this->assertDatabaseHas('menu_items', ['name' => 'Parent Menu Item']);
        $this->assertDatabaseHas('menu_items', ['name' => 'Child Menu Item', 'parent_id' => $parentId]);
    }

    /**
     * Test editing an existing menu item with children.
     *
     * @return void
     */
    public function test_it_can_edit_a_menu_item_with_children()
    {
        // Create a parent menu item
        $parentMenuItem = MenuItem::factory()->create([
            'name' => 'Original Parent Menu Item'
        ]);

        // Create a child menu item
        $childMenuItem = MenuItem::factory()->create([
            'name' => 'Original Child Menu Item',
            'parent_id' => $parentMenuItem->id
        ]);

        // Simulate form input data for updating the parent menu item
        $updatedParentData = ['name' => 'Updated Parent Menu Item'];

        // Make PUT request to update the parent menu item
        $parentResponse = $this->putJson("/api/menus/{$parentMenuItem->id}", $updatedParentData);

        // Assert that the parent menu item was updated successfully
        $parentResponse->assertStatus(200)
                       ->assertJsonFragment(['name' => 'Updated Parent Menu Item']);

        // Verify the parent menu item in the database is updated
        $this->assertDatabaseHas('menu_items', ['name' => 'Updated Parent Menu Item']);

        // Simulate form input data for updating the child menu item
        $updatedChildData = ['name' => 'Updated Child Menu Item'];

        // Make PUT request to update the child menu item
        $childResponse = $this->putJson("/api/menus/{$childMenuItem->id}", $updatedChildData);

        // Assert that the child menu item was updated successfully
        $childResponse->assertStatus(200)
                      ->assertJsonFragment(['name' => 'Updated Child Menu Item']);

        // Verify the child menu item in the database is updated
        $this->assertDatabaseHas('menu_items', ['name' => 'Updated Child Menu Item']);
    }

    /**
     * Test deleting a menu item with children is prevented.
     *
     * @return void
     */
    public function test_it_cannot_delete_a_menu_item_with_children()
    {
        // Create a parent menu item
        $parentMenuItem = MenuItem::factory()->create();

        // Create a child menu item
        $childMenuItem = MenuItem::factory()->create(['parent_id' => $parentMenuItem->id]);

        // Make DELETE request to delete the parent menu item
        $response = $this->deleteJson("/api/menus/{$parentMenuItem->id}");

        // Assert that the deletion is prevented
        $response->assertStatus(400)
                 ->assertJsonFragment(['error' => 'Cannot delete menu item with children']);

        // Verify the database still has the parent and child menu items
        $this->assertDatabaseHas('menu_items', ['id' => $parentMenuItem->id]);
        $this->assertDatabaseHas('menu_items', ['id' => $childMenuItem->id]);
    }
}
