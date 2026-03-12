import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  Request,
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
import { WalletService } from './wallet.service';
import {
  TopupWalletDto,
  AutoTopupConfigDto,
  TransferFundsDto,
  WalletTransactionFilterDto,
  WalletBalanceResponse,
  WalletTransactionResponse,
  WalletTransferResponse,
} from '../../dto/wallet.dto';

@ApiTags('Wallet')
@ApiBearerAuth()
@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('balance')
  @ApiOperation({ summary: 'Get wallet balance' })
  async getBalance(
    @Request() req: any,
  ): Promise<WalletBalanceResponse> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.walletService.getWallet(userId);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get full wallet details' })
  async getWallet(
    @Request() req: any,
  ): Promise<WalletBalanceResponse> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.walletService.getWallet(userId);
  }

  @Post('topup')
  @ApiOperation({ summary: 'Top-up wallet' })
  @ApiBody({ type: TopupWalletDto })
  async topup(
    @Request() req: any,
    @Body() dto: TopupWalletDto,
  ): Promise<WalletBalanceResponse> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.walletService.topup(userId, dto);
  }

  @Post('auto-topup')
  @ApiOperation({ summary: 'Configure auto top-up' })
  @ApiBody({ type: AutoTopupConfigDto })
  async configureAutoTopup(
    @Request() req: any,
    @Body() dto: AutoTopupConfigDto,
  ): Promise<WalletBalanceResponse> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.walletService.configureAutoTopup(userId, dto);
  }

  @Post('transfer')
  @ApiOperation({ summary: 'Transfer funds to another user' })
  @ApiBody({ type: TransferFundsDto })
  async transferFunds(
    @Request() req: any,
    @Body() dto: TransferFundsDto,
  ): Promise<WalletTransferResponse> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    return this.walletService.transferFunds(userId, dto);
  }

  @Get('transactions')
  @ApiOperation({ summary: 'Get wallet transaction history' })
  @ApiQuery({ name: 'type', required: false, enum: ['CREDIT', 'DEBIT'] })
  @ApiQuery({ name: 'category', required: false, enum: ['RIDE', 'ORDER', 'TOPUP', 'REFUND', 'PROMO', 'CASHBACK', 'TRANSFER_IN', 'TRANSFER_OUT'] })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date (ISO format)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date (ISO format)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTransactions(
    @Request() req: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('type') type?: 'CREDIT' | 'DEBIT',
    @Query('category') category?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<{ transactions: WalletTransactionResponse[]; total: number }> {
    const userId = req.user?.userId || req.user?.id || req.user?.sub;
    
    const filter: WalletTransactionFilterDto = {
      page,
      limit,
      type: type as any,
      category: category as any,
      startDate,
      endDate,
    };

    return this.walletService.getUserTransactions(userId, filter);
  }

  @Get(':customerId')
  @ApiOperation({ summary: 'Get wallet by customer ID (admin)' })
  @ApiParam({ name: 'customerId', description: 'Customer ID' })
  async getWalletByCustomerId(
    @Param('customerId') customerId: string,
  ): Promise<WalletBalanceResponse> {
    return this.walletService.getWallet(customerId);
  }
}
