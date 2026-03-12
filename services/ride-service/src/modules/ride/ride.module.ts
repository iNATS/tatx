import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { PricingModule } from '../pricing/pricing.module';
import { MatchingModule } from '../matching/matching.module';

@Module({
  imports: [PricingModule, MatchingModule],
  providers: [RideService],
  controllers: [RideController],
  exports: [RideService],
})
export class RideModule {}
