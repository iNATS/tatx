import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { prisma } from '@tatx/database';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateMenuItemDto,
  UpdateMenuItemDto,
  CreateModifierGroupDto,
  UpdateModifierGroupDto,
  CreateModifierDto,
  UpdateModifierDto,
  CreateInventoryDto,
  UpdateInventoryDto,
  UpdateStockDto,
} from './dto';

@Injectable()
export class MenuService {
  // ==================== Category Methods ====================

  /**
   * Get category by ID
   */
  async getCategoryById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        menuItems: {
          where: { isAvailable: true },
          include: {
            modifierGroups: {
              include: {
                modifiers: { where: { isAvailable: true } },
              },
            },
          },
        },
        modifierGroups: {
          include: {
            modifiers: { where: { isAvailable: true } },
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  /**
   * Get all categories for a restaurant
   */
  async getCategories(restaurantId: string, activeOnly = true) {
    return prisma.category.findMany({
      where: {
        restaurantId,
        ...(activeOnly && { isActive: true }),
      },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { menuItems: true },
        },
      },
    });
  }

  /**
   * Create category
   */
  async createCategory(restaurantId: string, data: CreateCategoryDto) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return prisma.category.create({
      data: {
        ...data,
        restaurantId,
      },
    });
  }

  /**
   * Update category
   */
  async updateCategory(id: string, data: UpdateCategoryDto) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return prisma.category.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete category (soft delete)
   */
  async deleteCategory(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return prisma.category.update({
      where: { id },
      data: { isActive: false },
    });
  }

  /**
   * Reorder categories
   */
  async reorderCategories(restaurantId: string, categoryOrder: { id: string; sortOrder: number }[]) {
    const updates = categoryOrder.map(({ id, sortOrder }) =>
      prisma.category.update({
        where: { id },
        data: { sortOrder },
      }),
    );

    await Promise.all(updates);
    return this.getCategories(restaurantId);
  }

  // ==================== Menu Item Methods ====================

  /**
   * Get menu item by ID
   */
  async getItemById(id: string) {
    const item = await prisma.menuItem.findUnique({
      where: { id },
      include: {
        category: true,
        modifierGroups: {
          include: {
            modifiers: { where: { isAvailable: true } },
          },
        },
        inventory: true,
        _count: {
          select: {
            orderItems: true,
            reviews: true,
          },
        },
      },
    });

    if (!item) {
      throw new NotFoundException('Menu item not found');
    }

    return item;
  }

  /**
   * Get all menu items for a restaurant
   */
  async getMenuItems(
    restaurantId: string,
    options?: {
      categoryId?: string;
      availableOnly?: boolean;
      featuredOnly?: boolean;
      search?: string;
    },
  ) {
    const where: Record<string, unknown> = { restaurantId };

    if (options?.categoryId) {
      where.categoryId = options.categoryId;
    }

    if (options?.availableOnly) {
      where.isAvailable = true;
    }

    if (options?.featuredOnly) {
      where.isFeatured = true;
    }

    if (options?.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { nameAr: { contains: options.search, mode: 'insensitive' } },
        { description: { contains: options.search, mode: 'insensitive' } },
      ];
    }

    return prisma.menuItem.findMany({
      where,
      orderBy: [{ isFeatured: 'desc' }, { isPopular: 'desc' }, { name: 'asc' }],
      include: {
        category: true,
        modifierGroups: {
          include: {
            modifiers: { where: { isAvailable: true } },
          },
        },
        inventory: true,
      },
    });
  }

  /**
   * Get popular items for a restaurant
   */
  async getPopularItems(restaurantId: string, limit = 10) {
    return prisma.menuItem.findMany({
      where: {
        restaurantId,
        isAvailable: true,
      },
      orderBy: [{ isPopular: 'desc' }, { isFeatured: 'desc' }],
      take: limit,
      include: {
        category: true,
        inventory: true,
      },
    });
  }

  /**
   * Create menu item
   */
  async createMenuItem(restaurantId: string, data: CreateMenuItemDto) {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    // Validate category if provided
    if (data.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      if (category.restaurantId !== restaurantId) {
        throw new BadRequestException('Category does not belong to this restaurant');
      }
    }

    // Create menu item with nutritional info
    const { nutritionalInfo, modifierGroupIds, ...itemData } = data;

    const menuItem = await prisma.menuItem.create({
      data: {
        ...itemData,
        restaurantId,
        calories: nutritionalInfo?.calories,
        protein: nutritionalInfo?.protein,
        carbs: nutritionalInfo?.carbs,
        fat: nutritionalInfo?.fat,
      },
    });

    // Connect modifier groups if provided
    if (modifierGroupIds && modifierGroupIds.length > 0) {
      await prisma.menuItem.update({
        where: { id: menuItem.id },
        data: {
          modifierGroups: {
            connect: modifierGroupIds.map((id) => ({ id })),
          },
        },
      });
    }

    return this.getItemById(menuItem.id);
  }

  /**
   * Update menu item
   */
  async updateMenuItem(id: string, data: UpdateMenuItemDto) {
    const item = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Menu item not found');
    }

    // Validate category if being updated
    if (data.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      if (category.restaurantId !== item.restaurantId) {
        throw new BadRequestException('Category does not belong to this restaurant');
      }
    }

    const { nutritionalInfo, ...itemData } = data;

    return prisma.menuItem.update({
      where: { id },
      data: {
        ...itemData,
        ...(nutritionalInfo && {
          calories: nutritionalInfo.calories,
          protein: nutritionalInfo.protein,
          carbs: nutritionalInfo.carbs,
          fat: nutritionalInfo.fat,
        }),
      },
      include: {
        modifierGroups: {
          include: {
            modifiers: { where: { isAvailable: true } },
          },
        },
      },
    });
  }

  /**
   * Delete menu item (soft delete by setting isAvailable to false)
   */
  async deleteMenuItem(id: string) {
    const item = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Menu item not found');
    }

    return prisma.menuItem.update({
      where: { id },
      data: { isAvailable: false },
    });
  }

  /**
   * Update item availability
   */
  async updateItemAvailability(id: string, isAvailable: boolean, reason?: string) {
    const item = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Menu item not found');
    }

    return prisma.menuItem.update({
      where: { id },
      data: { isAvailable },
    });
  }

  /**
   * Toggle item availability
   */
  async toggleItemAvailability(id: string) {
    const item = await prisma.menuItem.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Menu item not found');
    }

    return prisma.menuItem.update({
      where: { id },
      data: { isAvailable: !item.isAvailable },
    });
  }

  /**
   * Bulk update item availability
   */
  async bulkUpdateAvailability(restaurantId: string, itemIds: string[], isAvailable: boolean) {
    await prisma.menuItem.updateMany({
      where: {
        id: { in: itemIds },
        restaurantId,
      },
      data: { isAvailable },
    });

    return { success: true, updatedCount: itemIds.length };
  }

  // ==================== Modifier Group Methods ====================

  /**
   * Get modifier group by ID
   */
  async getModifierGroupById(id: string) {
    const group = await prisma.modifierGroup.findUnique({
      where: { id },
      include: {
        modifiers: {
          orderBy: { sortOrder: 'asc' },
        },
        category: true,
      },
    });

    if (!group) {
      throw new NotFoundException('Modifier group not found');
    }

    return group;
  }

  /**
   * Get all modifier groups for a restaurant
   */
  async getModifierGroups(restaurantId: string) {
    // Get categories for the restaurant
    const categories = await prisma.category.findMany({
      where: { restaurantId },
      include: {
        modifierGroups: {
          include: {
            modifiers: {
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
    });

    // Get modifier groups from menu items as well
    const menuItems = await prisma.menuItem.findMany({
      where: { restaurantId },
      include: {
        modifierGroups: {
          include: {
            modifiers: {
              orderBy: { sortOrder: 'asc' },
            },
          },
        },
      },
    });

    // Collect all unique modifier groups
    const allGroups = new Map();

    categories.forEach((cat) => {
      cat.modifierGroups.forEach((group) => {
        allGroups.set(group.id, group);
      });
    });

    menuItems.forEach((item) => {
      item.modifierGroups.forEach((group) => {
        allGroups.set(group.id, group);
      });
    });

    return Array.from(allGroups.values());
  }

  /**
   * Create modifier group
   */
  async createModifierGroup(data: CreateModifierGroupDto) {
    // Validate category if provided
    if (data.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: data.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    return prisma.modifierGroup.create({
      data,
    });
  }

  /**
   * Update modifier group
   */
  async updateModifierGroup(id: string, data: UpdateModifierGroupDto) {
    const group = await prisma.modifierGroup.findUnique({
      where: { id },
    });

    if (!group) {
      throw new NotFoundException('Modifier group not found');
    }

    return prisma.modifierGroup.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete modifier group
   */
  async deleteModifierGroup(id: string) {
    const group = await prisma.modifierGroup.findUnique({
      where: { id },
    });

    if (!group) {
      throw new NotFoundException('Modifier group not found');
    }

    return prisma.modifierGroup.delete({
      where: { id },
    });
  }

  // ==================== Modifier Methods ====================

  /**
   * Get modifier by ID
   */
  async getModifier(id: string) {
    const modifier = await prisma.modifier.findUnique({
      where: { id },
      include: {
        modifierGroup: true,
      },
    });

    if (!modifier) {
      throw new NotFoundException('Modifier not found');
    }

    return modifier;
  }

  /**
   * Get all modifiers for a group
   */
  async getModifiers(groupId: string, availableOnly = true) {
    return prisma.modifier.findMany({
      where: {
        modifierGroupId: groupId,
        ...(availableOnly && { isAvailable: true }),
      },
      orderBy: { sortOrder: 'asc' },
    });
  }

  /**
   * Create modifier
   */
  async createModifier(groupId: string, data: CreateModifierDto) {
    const group = await prisma.modifierGroup.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw new NotFoundException('Modifier group not found');
    }

    return prisma.modifier.create({
      data: {
        ...data,
        modifierGroupId: groupId,
      },
    });
  }

  /**
   * Update modifier
   */
  async updateModifier(id: string, data: UpdateModifierDto) {
    const modifier = await prisma.modifier.findUnique({
      where: { id },
    });

    if (!modifier) {
      throw new NotFoundException('Modifier not found');
    }

    return prisma.modifier.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete modifier
   */
  async deleteModifier(id: string) {
    const modifier = await prisma.modifier.findUnique({
      where: { id },
    });

    if (!modifier) {
      throw new NotFoundException('Modifier not found');
    }

    return prisma.modifier.delete({
      where: { id },
    });
  }

  /**
   * Bulk update modifier availability
   */
  async bulkUpdateModifierAvailability(groupIds: string[], isAvailable: boolean) {
    await prisma.modifier.updateMany({
      where: {
        modifierGroupId: { in: groupIds },
      },
      data: { isAvailable },
    });

    return { success: true };
  }

  // ==================== Inventory Methods ====================

  /**
   * Get inventory for a menu item
   */
  async getInventory(menuItemId: string) {
    const inventory = await prisma.menuItemInventory.findUnique({
      where: { menuItemId },
    });

    if (!inventory) {
      return null;
    }

    return inventory;
  }

  /**
   * Create inventory tracking for a menu item
   */
  async createInventory(menuItemId: string, data: CreateInventoryDto) {
    const item = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
    });

    if (!item) {
      throw new NotFoundException('Menu item not found');
    }

    return prisma.menuItemInventory.upsert({
      where: { menuItemId },
      update: data,
      create: {
        menuItemId,
        ...data,
      },
    });
  }

  /**
   * Update inventory
   */
  async updateInventory(menuItemId: string, data: UpdateInventoryDto) {
    const inventory = await prisma.menuItemInventory.findUnique({
      where: { menuItemId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found for this item');
    }

    return prisma.menuItemInventory.update({
      where: { menuItemId },
      data,
    });
  }

  /**
   * Update stock quantity
   */
  async updateStock(menuItemId: string, data: UpdateStockDto) {
    const inventory = await prisma.menuItemInventory.findUnique({
      where: { menuItemId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found for this item');
    }

    // Auto-toggle availability based on stock
    const isAvailable = data.quantity > 0;

    await prisma.menuItem.update({
      where: { id: menuItemId },
      data: { isAvailable },
    });

    return prisma.menuItemInventory.update({
      where: { menuItemId },
      data: {
        quantity: data.quantity,
        lastRestocked: data.lastRestocked || new Date(),
      },
    });
  }

  /**
   * Get low stock items for a restaurant
   */
  async getLowStockItems(restaurantId: string) {
    const items = await prisma.menuItem.findMany({
      where: { restaurantId },
      include: {
        inventory: true,
      },
    });

    const lowStockItems = items
      .filter((item) => {
        if (!item.inventory || !item.inventory.trackInventory) return false;
        return item.inventory.quantity <= item.inventory.lowStockThreshold;
      })
      .map((item) => ({
        menuItemId: item.id,
        menuItemName: item.name,
        currentQuantity: item.inventory!.quantity,
        lowStockThreshold: item.inventory!.lowStockThreshold,
        alertType: item.inventory!.quantity === 0 ? 'OUT_OF_STOCK' : 'LOW_STOCK',
        createdAt: new Date(),
      }));

    return lowStockItems;
  }

  /**
   * Get all inventory items for a restaurant
   */
  async getAllInventory(restaurantId: string) {
    return prisma.menuItem.findMany({
      where: { restaurantId },
      include: {
        inventory: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Delete inventory tracking
   */
  async deleteInventory(menuItemId: string) {
    const inventory = await prisma.menuItemInventory.findUnique({
      where: { menuItemId },
    });

    if (!inventory) {
      throw new NotFoundException('Inventory not found for this item');
    }

    return prisma.menuItemInventory.delete({
      where: { menuItemId },
    });
  }
}
