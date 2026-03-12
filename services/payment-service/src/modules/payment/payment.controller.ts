import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Request,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import {
  ProcessPaymentDto,
  RefundPaymentDto,
  SaveCardDto,
  DeleteCardDto,
  SetDefaultCardDto,
  PaymentResponse,
  PaymentMethodsResponse,
  SavedCardResponse,
  PaymentMethod,
} from '../../dto/payment.dto';

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('process')
  @ApiOperation({ summary: 'Process a payment' })
  @ApiBody({ type: ProcessPaymentDto })
  async processPayment(
    @Request() req: any,
    @Body() dto: ProcessPaymentDto,
  ): Promise<PaymentResponse> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.paymentService.processPayment(userId, dto);
  }

  @Post('refund')
  @ApiOperation({ summary: 'Process a refund' })
  @ApiBody({ type: RefundPaymentDto })
  async processRefund(
    @Request() req: any,
    @Body() dto: RefundPaymentDto,
  ): Promise<PaymentResponse> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.paymentService.processRefund(userId, dto);
  }

  @Get('methods')
  @ApiOperation({ summary: 'Get available payment methods' })
  async getAvailableMethods(
    @Request() req: any,
  ): Promise<PaymentMethodsResponse> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.paymentService.getAvailableMethods(userId);
  }

  @Get('saved-cards')
  @ApiOperation({ summary: 'Get saved cards' })
  async getSavedCards(
    @Request() req: any,
  ): Promise<SavedCardResponse[]> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.paymentService.getSavedCards(userId);
  }

  @Post('saved-cards')
  @ApiOperation({ summary: 'Save a new card' })
  @ApiBody({ type: SaveCardDto })
  async saveCard(
    @Request() req: any,
    @Body() dto: SaveCardDto,
  ): Promise<SavedCardResponse> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.paymentService.saveCard(userId, dto.token, dto.nickname, dto.isDefault);
  }

  @Delete('saved-cards/:cardId')
  @ApiOperation({ summary: 'Delete a saved card' })
  @ApiParam({ name: 'cardId', description: 'Card ID to delete' })
  async deleteCard(
    @Request() req: any,
    @Param('cardId') cardId: string,
  ): Promise<void> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.paymentService.deleteCard(userId, cardId);
  }

  @Put('saved-cards/:cardId/set-default')
  @ApiOperation({ summary: 'Set a card as default' })
  @ApiParam({ name: 'cardId', description: 'Card ID to set as default' })
  async setDefaultCard(
    @Request() req: any,
    @Param('cardId') cardId: string,
  ): Promise<SavedCardResponse> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.paymentService.setDefaultCard(userId, cardId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiParam({ name: 'id', description: 'Payment ID' })
  async getPayment(@Param('id') id: string): Promise<PaymentResponse> {
    return this.paymentService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get payments for current user' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of results' })
  @ApiQuery({ name: 'offset', required: false, type: Number, description: 'Offset for pagination' })
  async getPayments(
    @Request() req: any,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ): Promise<PaymentResponse[]> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.paymentService.findByUserId(userId, limit, offset);
  }
}
