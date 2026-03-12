import { Module } from '@nestjs/common';
import { DeliveryZoneService } from './delivery-zone.service';
import { DeliveryZoneController } from './delivery-zone.controller';

@Module({
  providers: [DeliveryZoneService],
  controllers: [DeliveryZoneController],
  exports: [DeliveryZoneService],
})
export class DeliveryZoneModule {}
