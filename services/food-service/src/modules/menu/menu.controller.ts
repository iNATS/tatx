import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { MenuService } from './menu.service';
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
  UpdateItemAvailabilityDto,
} from './dto';

@ApiTags('menu')
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // ==================== Category Endpoints ====================

  @Get('category/:id')
  @ApiOperation({ summary: 'Get category by ID with menu items' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  async getCategoryById(@Param('id') id: string) {
    return this.menuService.getCategoryById(id);
  }

  @Get('restaurant/:restaurantId/categories')
  @ApiOperation({ summary: 'Get all categories for a restaurant' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean, example: true })
  async getCategories(
    @Param('restaurantId') restaurantId: string,
    @Query('activeOnly', new DefaultValuePipe(true), ParseBoolPipe) activeOnly: boolean,
  ) {
    return this.menuService.getCategories(restaurantId, activeOnly);
  }

  @Post('restaurant/:restaurantId/categories')
  @ApiOperation({ summary: 'Create a new category' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  async createCategory(@Param('restaurantId') restaurantId: string, @Body() data: CreateCategoryDto) {
    return this.menuService.createCategory(restaurantId, data);
  }

  @Put('category/:id')
  @ApiOperation({ summary: 'Update category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  async updateCategory(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    return this.menuService.updateCategory(id, data);
  }

  @Delete('category/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete category (soft delete)' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  async deleteCategory(@Param('id') id: string) {
    await this.menuService.deleteCategory(id);
  }

  @Put('restaurant/:restaurantId/categories/reorder')
  @ApiOperation({ summary: 'Reorder categories' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  async reorderCategories(
    @Param('restaurantId') restaurantId: string,
    @Body() categoryOrder: { id: string; sortOrder: number }[],
  ) {
    return this.menuService.reorderCategories(restaurantId, categoryOrder);
  }

  // ==================== Menu Item Endpoints ====================

  @Get('item/:id')
  @ApiOperation({ summary: 'Get menu item by ID' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  async getItemById(@Param('id') id: string) {
    return this.menuService.getItemById(id);
  }

  @Get('restaurant/:restaurantId/items')
  @ApiOperation({ summary: 'Get all menu items for a restaurant' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiQuery({ name: 'availableOnly', required: false, type: Boolean, example: true })
  @ApiQuery({ name: 'featuredOnly', required: false, type: Boolean, example: false })
  @ApiQuery({ name: 'search', required: false, type: String })
  async getMenuItems(
    @Param('restaurantId') restaurantId: string,
    @Query('categoryId') categoryId?: string,
    @Query('availableOnly', new DefaultValuePipe(true), ParseBoolPipe) availableOnly: boolean,
    @Query('featuredOnly', new DefaultValuePipe(false), ParseBoolPipe) featuredOnly: boolean,
    @Query('search') search?: string,
  ) {
    return this.menuService.getMenuItems(restaurantId, { categoryId, availableOnly, featuredOnly, search });
  }

  @Get('restaurant/:restaurantId/items/popular')
  @ApiOperation({ summary: 'Get popular menu items for a restaurant' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async getPopularItems(
    @Param('restaurantId') restaurantId: string,
    @Query('limit', new DefaultValuePipe(10), ParseBoolPipe as unknown as typeof Number) limit: number,
  ) {
    return this.menuService.getPopularItems(restaurantId, limit);
  }

  @Post('restaurant/:restaurantId/items')
  @ApiOperation({ summary: 'Create a new menu item' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  @ApiResponse({ status: 201, description: 'Menu item created successfully' })
  async createMenuItem(@Param('restaurantId') restaurantId: string, @Body() data: CreateMenuItemDto) {
    return this.menuService.createMenuItem(restaurantId, data);
  }

  @Put('item/:id')
  @ApiOperation({ summary: 'Update menu item' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  @ApiResponse({ status: 200, description: 'Menu item updated successfully' })
  async updateMenuItem(@Param('id') id: string, @Body() data: UpdateMenuItemDto) {
    return this.menuService.updateMenuItem(id, data);
  }

  @Delete('item/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete menu item (soft delete)' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  async deleteMenuItem(@Param('id') id: string) {
    await this.menuService.deleteMenuItem(id);
  }

  @Put('item/:id/availability')
  @ApiOperation({ summary: 'Update menu item availability' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  async updateItemAvailability(@Param('id') id: string, @Body() data: UpdateItemAvailabilityDto) {
    return this.menuService.updateItemAvailability(id, data.isAvailable, data.reason);
  }

  @Post('item/:id/availability/toggle')
  @ApiOperation({ summary: 'Toggle menu item availability' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  async toggleItemAvailability(@Param('id') id: string) {
    return this.menuService.toggleItemAvailability(id);
  }

  @Put('restaurant/:restaurantId/items/availability/bulk')
  @ApiOperation({ summary: 'Bulk update menu item availability' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  async bulkUpdateAvailability(
    @Param('restaurantId') restaurantId: string,
    @Body() data: { itemIds: string[]; isAvailable: boolean },
  ) {
    return this.menuService.bulkUpdateAvailability(restaurantId, data.itemIds, data.isAvailable);
  }

  // ==================== Modifier Group Endpoints ====================

  @Get('modifier-group/:id')
  @ApiOperation({ summary: 'Get modifier group by ID' })
  @ApiParam({ name: 'id', description: 'Modifier group ID' })
  async getModifierGroupById(@Param('id') id: string) {
    return this.menuService.getModifierGroupById(id);
  }

  @Get('restaurant/:restaurantId/modifier-groups')
  @ApiOperation({ summary: 'Get all modifier groups for a restaurant' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  async getModifierGroups(@Param('restaurantId') restaurantId: string) {
    return this.menuService.getModifierGroups(restaurantId);
  }

  @Post('modifier-groups')
  @ApiOperation({ summary: 'Create a new modifier group' })
  @ApiResponse({ status: 201, description: 'Modifier group created successfully' })
  async createModifierGroup(@Body() data: CreateModifierGroupDto) {
    return this.menuService.createModifierGroup(data);
  }

  @Put('modifier-group/:id')
  @ApiOperation({ summary: 'Update modifier group' })
  @ApiParam({ name: 'id', description: 'Modifier group ID' })
  async updateModifierGroup(@Param('id') id: string, @Body() data: UpdateModifierGroupDto) {
    return this.menuService.updateModifierGroup(id, data);
  }

  @Delete('modifier-group/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete modifier group' })
  @ApiParam({ name: 'id', description: 'Modifier group ID' })
  async deleteModifierGroup(@Param('id') id: string) {
    await this.menuService.deleteModifierGroup(id);
  }

  // ==================== Modifier Endpoints ====================

  @Get('modifier/:id')
  @ApiOperation({ summary: 'Get modifier by ID' })
  @ApiParam({ name: 'id', description: 'Modifier ID' })
  async getModifier(@Param('id') id: string) {
    return this.menuService.getModifier(id);
  }

  @Get('modifier-group/:groupId/modifiers')
  @ApiOperation({ summary: 'Get all modifiers for a group' })
  @ApiParam({ name: 'groupId', description: 'Modifier group ID' })
  @ApiQuery({ name: 'availableOnly', required: false, type: Boolean, example: true })
  async getModifiers(
    @Param('groupId') groupId: string,
    @Query('availableOnly', new DefaultValuePipe(true), ParseBoolPipe) availableOnly: boolean,
  ) {
    return this.menuService.getModifiers(groupId, availableOnly);
  }

  @Post('modifier-group/:groupId/modifiers')
  @ApiOperation({ summary: 'Create a new modifier' })
  @ApiParam({ name: 'groupId', description: 'Modifier group ID' })
  @ApiResponse({ status: 201, description: 'Modifier created successfully' })
  async createModifier(@Param('groupId') groupId: string, @Body() data: CreateModifierDto) {
    return this.menuService.createModifier(groupId, data);
  }

  @Put('modifier/:id')
  @ApiOperation({ summary: 'Update modifier' })
  @ApiParam({ name: 'id', description: 'Modifier ID' })
  async updateModifier(@Param('id') id: string, @Body() data: UpdateModifierDto) {
    return this.menuService.updateModifier(id, data);
  }

  @Delete('modifier/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete modifier' })
  @ApiParam({ name: 'id', description: 'Modifier ID' })
  async deleteModifier(@Param('id') id: string) {
    await this.menuService.deleteModifier(id);
  }

  @Put('modifiers/bulk-availability')
  @ApiOperation({ summary: 'Bulk update modifier availability' })
  async bulkUpdateModifierAvailability(@Body() data: { groupIds: string[]; isAvailable: boolean }) {
    return this.menuService.bulkUpdateModifierAvailability(data.groupIds, data.isAvailable);
  }

  // ==================== Inventory Endpoints ====================

  @Get('item/:id/inventory')
  @ApiOperation({ summary: 'Get inventory for a menu item' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  async getInventory(@Param('id') id: string) {
    return this.menuService.getInventory(id);
  }

  @Post('item/:id/inventory')
  @ApiOperation({ summary: 'Create inventory tracking for a menu item' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  @ApiResponse({ status: 201, description: 'Inventory created successfully' })
  async createInventory(@Param('id') id: string, @Body() data: CreateInventoryDto) {
    return this.menuService.createInventory(id, data);
  }

  @Put('item/:id/inventory')
  @ApiOperation({ summary: 'Update inventory for a menu item' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  async updateInventory(@Param('id') id: string, @Body() data: UpdateInventoryDto) {
    return this.menuService.updateInventory(id, data);
  }

  @Put('item/:id/inventory/stock')
  @ApiOperation({ summary: 'Update stock quantity for a menu item' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  async updateStock(@Param('id') id: string, @Body() data: UpdateStockDto) {
    return this.menuService.updateStock(id, data);
  }

  @Get('restaurant/:restaurantId/inventory/low-stock')
  @ApiOperation({ summary: 'Get low stock items for a restaurant' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  async getLowStockItems(@Param('restaurantId') restaurantId: string) {
    return this.menuService.getLowStockItems(restaurantId);
  }

  @Get('restaurant/:restaurantId/inventory')
  @ApiOperation({ summary: 'Get all inventory items for a restaurant' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant ID' })
  async getAllInventory(@Param('restaurantId') restaurantId: string) {
    return this.menuService.getAllInventory(restaurantId);
  }

  @Delete('item/:id/inventory')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete inventory tracking for a menu item' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  async deleteInventory(@Param('id') id: string) {
    await this.menuService.deleteInventory(id);
  }
}
