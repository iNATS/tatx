import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentModule } from './modules/payment/payment.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { GatewayService } from './modules/gateway/gateway.service';
import { HealthController } from './common/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, 
      envFilePath: ['.env.local', '.env'] 
    }),
    GatewayModule,
    PaymentModule,
    WalletModule,
    WebhookModule,
  ],
  controllers: [HealthController],
})
export class AppModule implements OnModuleInit {
  constructor(private gatewayService: GatewayService) {}

  async onModuleInit() {
    // Gateway strategies are auto-registered via dependency injection
    // This is just for logging purposes
    const strategies = this.gatewayService.getAllStrategies();
    const availableProviders = this.gatewayService.getAvailableProviders();
    
    console.log('Payment Service initialized');
    console.log(`Registered gateway providers: ${strategies.map(s => s.getProvider()).join(', ')}`);
    console.log(`Available gateway providers: ${availableProviders.join(', ')}`);
  }
}
