import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { GatewayModule } from '../gateway/gateway.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [GatewayModule, WalletModule],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
