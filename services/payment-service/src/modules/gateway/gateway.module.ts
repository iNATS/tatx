import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { HyperPayStrategy } from './providers/hyperpay.strategy';
import { StripeStrategy } from './providers/stripe.strategy';
import { TabbyStrategy } from './providers/tabby.strategy';
import { TamaraStrategy } from './providers/tamara.strategy';
import { ApplePayStrategy } from './providers/applepay.strategy';
import { GooglePayStrategy } from './providers/googlepay.strategy';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    GatewayService,
    HyperPayStrategy,
    StripeStrategy,
    TabbyStrategy,
    TamaraStrategy,
    ApplePayStrategy,
    GooglePayStrategy,
  ],
  controllers: [GatewayController],
  exports: [GatewayService],
})
export class GatewayModule {}
