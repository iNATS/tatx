import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { prisma } from '@tatx/database';
import { RideStatus, VehicleType, CancellationReason } from './enums/ride.enums';
import { CreateRideDto, UpdateRideDto } from './dto/create-ride.dto';
import {
  AcceptRideDto,
  StartRideDto,
  CompleteRideDto,
  CancelRideDto,
  RateRideDto,
  AssignDriverDto,
} from './dto/ride-actions.dto';
import { RideHistoryQueryDto } from './dto/query-ride.dto';
import { PricingService } from '../pricing/pricing.service';
import { MatchingService } from '../matching/matching.service';

interface RideWithRelations {
  id: string;
  rideNumber: string;
  riderId: string;
  driverId: string | null;
  status: RideStatus;
  category: string;
  pickupAddress: string;
  pickupAddressAr: string | null;
  pickupLatitude: any;
  pickupLongitude: any;
  dropoffAddress: string;
  dropoffAddressAr: string | null;
  dropoffLatitude: any;
  dropoffLongitude: any;
  distance: any;
  duration: number | null;
  vehicleType: VehicleType;
  baseFare: any;
  distanceFare: any;
  timeFare: any;
  surgeMultiplier: any;
  totalFare: any;
  finalFare: any;
  driverEarnings: any;
  paymentMethod: string | null;
  scheduledAt: Date | null;
  requestedAt: Date | null;
  acceptedAt: Date | null;
  driverArrivedAt: Date | null;
  startedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  cancellationReason: string | null;
  cancelledBy: string | null;
  cancellationFee: any;
  passengerCount: number;
  luggageCount: number;
  notes: string | null;
  rating: number | null;
  driverRating: number | null;
  riderRating: number | null;
  tip: any;
  createdAt: Date;
  updatedAt: Date;
  rider?: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
      phone: string;
      avatar: string | null;
    };
  };
  driver?: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
      phone: string;
      avatar: string | null;
    };
    vehicle: {
      type: VehicleType;
      make: string;
      model: string;
      color: string;
      licensePlate: string;
    } | null;
    rating: any;
    totalRides: number;
  };
}

@Injectable()
export class RideService {
  private readonly logger = new Logger(RideService.name);
  private readonly CANCELLATION_FEE_THRESHOLD_MINUTES = 5;
  private readonly CANCELLATION_FEE_AMOUNT = 10; // SAR

  constructor(
    private pricingService: PricingService,
    private matchingService: MatchingService,
  ) {}

  /**
   * Create a new ride request
   */
  async createRide(dto: CreateRideDto): Promise<RideWithRelations> {
    // Calculate fare estimate
    const fareEstimate = await this.pricingService.calculateFare({
      pickupLatitude: dto.pickupLatitude,
      pickupLongitude: dto.pickupLongitude,
      dropoffLatitude: dto.dropoffLatitude,
      dropoffLongitude: dto.dropoffLongitude,
      vehicleType: dto.vehicleType || VehicleType.ECONOMY,
      promoCode: dto.promoCode,
    });

    // Generate unique ride number
    const rideNumber = await this.generateRideNumber();

    // Create the ride
    const ride = await prisma.ride.create({
      data: {
        rideNumber,
        riderId: dto.riderId,
        status: RideStatus.REQUESTED,
        category: dto.category || 'REGULAR',
        pickupAddress: dto.pickupAddress,
        pickupAddressAr: dto.pickupAddressAr,
        pickupLatitude: dto.pickupLatitude,
        pickupLongitude: dto.pickupLongitude,
        pickupName: dto.pickupName,
        pickupNameAr: dto.pickupNameAr,
        pickupPhone: dto.pickupPhone,
        pickupNotes: dto.pickupNotes,
        pickupNotesAr: dto.pickupNotesAr,
        dropoffAddress: dto.dropoffAddress,
        dropoffAddressAr: dto.dropoffAddressAr,
        dropoffLatitude: dto.dropoffLatitude,
        dropoffLongitude: dto.dropoffLongitude,
        dropoffName: dto.dropoffName,
        dropoffNameAr: dto.dropoffNameAr,
        dropoffPhone: dto.dropoffPhone,
        dropoffNotes: dto.dropoffNotes,
        dropoffNotesAr: dto.dropoffNotesAr,
        vehicleType: dto.vehicleType || VehicleType.ECONOMY,
        passengerCount: dto.passengerCount || 1,
        luggageCount: dto.luggageCount || 0,
        notes: dto.notes,
        notesAr: dto.notesAr,
        isForSomeoneElse: dto.isForSomeoneElse || false,
        recipientName: dto.recipientName,
        recipientPhone: dto.recipientPhone,
        paymentMethod: dto.paymentMethod,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : null,
        distance: dto.estimatedDistance || fareEstimate.distance,
        duration: dto.estimatedDuration || fareEstimate.duration,
        baseFare: fareEstimate.baseFare,
        distanceFare: fareEstimate.distanceFare,
        timeFare: fareEstimate.timeFare,
        surgeMultiplier: fareEstimate.surgeMultiplier,
        surgeReason: fareEstimate.surgeReason,
        totalFare: fareEstimate.subtotal,
        discount: fareEstimate.discount || 0,
        tax: fareEstimate.tax,
        serviceFee: fareEstimate.serviceFee,
        finalFare: fareEstimate.total,
        requestedAt: new Date(),
      },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    this.logger.log(`Ride ${rideNumber} created by rider ${dto.riderId}`);

    // Start driver matching process
    this.matchingService.findAndNotifyDrivers({
      rideId: ride.id,
      pickupLatitude: Number(dto.pickupLatitude),
      pickupLongitude: Number(dto.pickupLongitude),
      vehicleType: dto.vehicleType || VehicleType.ECONOMY,
      estimatedFare: fareEstimate.total,
    }).catch((err) => {
      this.logger.error(`Failed to start driver matching for ride ${ride.id}: ${err.message}`);
    });

    return ride as RideWithRelations;
  }

  /**
   * Get ride by ID with full details
   */
  async findById(id: string): Promise<RideWithRelations> {
    const ride = await prisma.ride.findUnique({
      where: { id },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
        payment: true,
      },
    });

    if (!ride) {
      throw new NotFoundException(`Ride with ID ${id} not found`);
    }

    return ride as RideWithRelations;
  }

  /**
   * Get ride by ride number
   */
  async findByRideNumber(rideNumber: string): Promise<RideWithRelations> {
    const ride = await prisma.ride.findUnique({
      where: { rideNumber },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
      },
    });

    if (!ride) {
      throw new NotFoundException(`Ride with number ${rideNumber} not found`);
    }

    return ride as RideWithRelations;
  }

  /**
   * Get rides by rider ID with pagination
   */
  async findByRiderId(riderId: string, query?: RideHistoryQueryDto) {
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = { riderId };

    if (query?.status) {
      where.status = query.status;
    }

    if (query?.category) {
      where.category = query.category;
    }

    if (query?.vehicleType) {
      where.vehicleType = query.vehicleType;
    }

    if (query?.startDate || query?.endDate) {
      where.createdAt = {};
      if (query.startDate) {
        where.createdAt.gte = new Date(query.startDate);
      }
      if (query.endDate) {
        where.createdAt.lte = new Date(query.endDate);
      }
    }

    if (!query?.includeCancelled) {
      where.status = { not: RideStatus.CANCELLED };
    }

    const [rides, total] = await Promise.all([
      prisma.ride.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [query?.sortBy || 'createdAt']: query?.sortOrder || 'desc' },
        include: {
          rider: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  phone: true,
                  avatar: true,
                },
              },
            },
          },
          driver: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  phone: true,
                  avatar: true,
                },
              },
              vehicle: {
                select: {
                  type: true,
                  make: true,
                  model: true,
                  color: true,
                  licensePlate: true,
                },
              },
            },
          },
        },
      }),
      prisma.ride.count({ where }),
    ]);

    return {
      data: rides,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  /**
   * Get rides by driver ID with pagination
   */
  async findByDriverId(driverId: string, query?: RideHistoryQueryDto) {
    const page = query?.page || 1;
    const limit = query?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = { driverId };

    if (query?.status) {
      where.status = query.status;
    }

    if (query?.startDate || query?.endDate) {
      where.createdAt = {};
      if (query.startDate) {
        where.createdAt.gte = new Date(query.startDate);
      }
      if (query.endDate) {
        where.createdAt.lte = new Date(query.endDate);
      }
    }

    const [rides, total] = await Promise.all([
      prisma.ride.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [query?.sortBy || 'createdAt']: query?.sortOrder || 'desc' },
        include: {
          rider: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  phone: true,
                  avatar: true,
                },
              },
            },
          },
          driver: {
            include: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  phone: true,
                  avatar: true,
                },
              },
              vehicle: {
                select: {
                  type: true,
                  make: true,
                  model: true,
                  color: true,
                  licensePlate: true,
                },
              },
            },
          },
        },
      }),
      prisma.ride.count({ where }),
    ]);

    return {
      data: rides,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: skip + limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  /**
   * Accept a ride (driver accepts the ride request)
   */
  async acceptRide(rideId: string, dto: AcceptRideDto): Promise<RideWithRelations> {
    const ride = await this.findById(rideId);

    // Check if ride is still available
    if (ride.status !== RideStatus.REQUESTED && ride.status !== RideStatus.SEARCHING_DRIVER) {
      throw new ConflictException(`Ride is not available for acceptance. Current status: ${ride.status}`);
    }

    // Check if driver is already assigned
    if (ride.driverId && ride.driverId !== dto.driverId) {
      throw new ConflictException('Ride has already been assigned to another driver');
    }

    // Verify driver exists and is available
    const driver = await prisma.driver.findUnique({
      where: { id: dto.driverId },
      include: { user: true, vehicle: true },
    });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    if (driver.status !== 'ONLINE') {
      throw new ForbiddenException('Driver is not online');
    }

    // Update ride with driver assignment
    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        driverId: dto.driverId,
        status: RideStatus.DRIVER_ASSIGNED,
        acceptedAt: new Date(),
        metadata: {
          ...(ride.metadata || {}),
          estimatedPickupTime: dto.estimatedPickupTime,
          driverNote: dto.driverNote,
        },
      },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
      },
    });

    this.logger.log(`Ride ${rideId} accepted by driver ${dto.driverId}`);

    return updatedRide as RideWithRelations;
  }

  /**
   * Driver arrives at pickup location
   */
  async driverArrived(rideId: string, driverId: string): Promise<RideWithRelations> {
    const ride = await this.findById(rideId);

    if (ride.driverId !== driverId) {
      throw new ForbiddenException('Only the assigned driver can mark arrival');
    }

    if (ride.status !== RideStatus.DRIVER_ASSIGNED) {
      throw new ConflictException(`Invalid ride status for arrival: ${ride.status}`);
    }

    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.DRIVER_ARRIVED,
        driverArrivedAt: new Date(),
      },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
      },
    });

    this.logger.log(`Driver ${driverId} arrived for ride ${rideId}`);

    return updatedRide as RideWithRelations;
  }

  /**
   * Start the ride (begin the trip)
   */
  async startRide(rideId: string, dto: StartRideDto): Promise<RideWithRelations> {
    const ride = await this.findById(rideId);

    if (ride.driverId !== dto.driverId) {
      throw new ForbiddenException('Only the assigned driver can start the ride');
    }

    if (ride.status !== RideStatus.DRIVER_ARRIVED && ride.status !== RideStatus.DRIVER_ASSIGNED) {
      throw new ConflictException(`Invalid ride status for start: ${ride.status}`);
    }

    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.IN_PROGRESS,
        startedAt: new Date(),
        passengerCount: dto.actualPassengerCount || ride.passengerCount,
        metadata: {
          ...(ride.metadata || {}),
          actualPickupLocation: dto.actualPickupLatitude
            ? { latitude: dto.actualPickupLatitude, longitude: dto.actualPickupLongitude }
            : undefined,
        },
      },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
      },
    });

    this.logger.log(`Ride ${rideId} started by driver ${dto.driverId}`);

    return updatedRide as RideWithRelations;
  }

  /**
   * Complete the ride
   */
  async completeRide(rideId: string, dto: CompleteRideDto): Promise<RideWithRelations> {
    const ride = await this.findById(rideId);

    if (ride.driverId !== dto.driverId) {
      throw new ForbiddenException('Only the assigned driver can complete the ride');
    }

    if (ride.status !== RideStatus.IN_PROGRESS) {
      throw new ConflictException(`Invalid ride status for completion: ${ride.status}`);
    }

    // Calculate final fare if distance/duration changed
    let finalFare = ride.finalFare;
    let driverEarnings = ride.driverEarnings;

    if (dto.finalDistance || dto.finalDuration || dto.additionalCharges) {
      const fareRecalculation = await this.pricingService.recalculateFare({
        rideId,
        originalFare: Number(ride.finalFare),
        finalDistance: dto.finalDistance || Number(ride.distance),
        finalDuration: dto.finalDuration || ride.duration,
        additionalCharges: dto.additionalCharges || 0,
      });

      finalFare = fareRecalculation.finalFare;
      driverEarnings = fareRecalculation.driverEarnings;
    }

    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.COMPLETED,
        completedAt: new Date(),
        finalFare,
        driverEarnings,
        distance: dto.finalDistance || ride.distance,
        duration: dto.finalDuration || ride.duration,
        metadata: {
          ...(ride.metadata || {}),
          actualDropoffLocation: dto.actualDropoffLatitude
            ? { latitude: dto.actualDropoffLatitude, longitude: dto.actualDropoffLongitude }
            : undefined,
          additionalCharges: dto.additionalCharges,
          additionalChargesReason: dto.additionalChargesReason,
          driverNotes: dto.driverNotes,
        },
      },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
      },
    });

    // Update driver stats
    await prisma.driver.update({
      where: { id: dto.driverId },
      data: {
        totalRides: { increment: 1 },
        totalEarnings: { increment: driverEarnings || 0 },
      },
    });

    this.logger.log(`Ride ${rideId} completed by driver ${dto.driverId}`);

    return updatedRide as RideWithRelations;
  }

  /**
   * Cancel a ride
   */
  async cancelRide(rideId: string, dto: CancelRideDto): Promise<RideWithRelations> {
    const ride = await this.findById(rideId);

    // Check if ride can be cancelled
    if (
      ride.status === RideStatus.COMPLETED ||
      ride.status === RideStatus.CANCELLED
    ) {
      throw new ConflictException(`Cannot cancel ride with status: ${ride.status}`);
    }

    // Calculate cancellation fee if applicable
    let cancellationFee = 0;
    const shouldChargeFee = !dto.waiveFee;

    if (shouldChargeFee) {
      // Charge fee if cancelled after driver assigned and past threshold
      if (
        ride.acceptedAt &&
        ride.status !== RideStatus.REQUESTED &&
        ride.status !== RideStatus.SEARCHING_DRIVER
      ) {
        const timeSinceAccepted = Date.now() - ride.acceptedAt.getTime();
        const minutesSinceAccepted = timeSinceAccepted / (1000 * 60);

        if (minutesSinceAccepted > this.CANCELLATION_FEE_THRESHOLD_MINUTES) {
          cancellationFee = this.CANCELLATION_FEE_AMOUNT;
        }
      }
    }

    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        status: RideStatus.CANCELLED,
        cancelledAt: new Date(),
        cancellationReason: dto.reason,
        cancelledBy: dto.cancelledBy,
        cancellationFee,
        metadata: {
          ...(ride.metadata || {}),
          cancellationDetails: dto.details,
        },
      },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
      },
    });

    this.logger.log(
      `Ride ${rideId} cancelled by ${dto.cancelledBy}. Reason: ${dto.reason}. Fee: ${cancellationFee}`,
    );

    return updatedRide as RideWithRelations;
  }

  /**
   * Rate a completed ride
   */
  async rateRide(rideId: string, dto: RateRideDto): Promise<RideWithRelations> {
    const ride = await this.findById(rideId);

    if (ride.status !== RideStatus.COMPLETED) {
      throw new ConflictException('Can only rate completed rides');
    }

    if (ride.rating && ride.rating > 0) {
      throw new ConflictException('Ride has already been rated');
    }

    // Update ride with rating
    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        rating: dto.rating,
        driverRating: dto.rating,
        riderRating: dto.riderRating,
        tip: dto.tipAmount || 0,
        metadata: {
          ...(ride.metadata || {}),
          ratingComment: dto.comment,
          ratingCommentAr: dto.commentAr,
          cleanlinessRating: dto.cleanlinessRating,
          communicationRating: dto.communicationRating,
          safetyRating: dto.safetyRating,
          wouldRideAgain: dto.wouldRideAgain,
        },
      },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
      },
    });

    // Update driver rating
    if (ride.driverId && dto.rating) {
      const driverStats = await prisma.driver.findUnique({
        where: { id: ride.driverId },
        select: { rating: true, totalRides: true },
      });

      if (driverStats) {
        const newRating =
          (Number(driverStats.rating) * (driverStats.totalRides - 1) + dto.rating) /
          driverStats.totalRides;

        await prisma.driver.update({
          where: { id: ride.driverId },
          data: { rating: newRating },
        });
      }
    }

    // Create review record
    await prisma.review.create({
      data: {
        rideId,
        reviewerId: dto.ratedBy,
        revieweeId: ride.driverId,
        rating: dto.rating,
        comment: dto.comment,
        commentAr: dto.commentAr,
        type: 'RIDE',
      },
    });

    this.logger.log(`Ride ${rideId} rated ${dto.rating} by ${dto.ratedBy}`);

    return updatedRide as RideWithRelations;
  }

  /**
   * Assign a driver to a ride (manual assignment)
   */
  async assignDriver(rideId: string, dto: AssignDriverDto): Promise<RideWithRelations> {
    const ride = await this.findById(rideId);

    if (ride.status !== RideStatus.REQUESTED && ride.status !== RideStatus.SEARCHING_DRIVER) {
      throw new ConflictException(`Cannot assign driver to ride with status: ${ride.status}`);
    }

    if (ride.driverId) {
      throw new ConflictException('Ride already has a driver assigned');
    }

    // Verify driver exists
    const driver = await prisma.driver.findUnique({
      where: { id: dto.driverId },
      include: { user: true, vehicle: true },
    });

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: {
        driverId: dto.driverId,
        status: RideStatus.DRIVER_ASSIGNED,
        acceptedAt: new Date(),
        metadata: {
          ...(ride.metadata || {}),
          isManualAssignment: dto.isManualAssignment,
          assignedBy: dto.assignedBy,
        },
      },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
      },
    });

    this.logger.log(`Driver ${dto.driverId} manually assigned to ride ${rideId}`);

    return updatedRide as RideWithRelations;
  }

  /**
   * Update ride status
   */
  async updateStatus(rideId: string, status: string, driverId?: string): Promise<RideWithRelations> {
    const ride = await this.findById(rideId);

    // Validate status transition
    const validTransitions: Record<RideStatus, string[]> = {
      [RideStatus.REQUESTED]: ['SEARCHING_DRIVER', 'DRIVER_ASSIGNED', 'CANCELLED'],
      [RideStatus.SEARCHING_DRIVER]: ['DRIVER_ASSIGNED', 'CANCELLED', 'NO_DRIVERS_FOUND'],
      [RideStatus.DRIVER_ASSIGNED]: ['DRIVER_ARRIVED', 'CANCELLED'],
      [RideStatus.DRIVER_ARRIVED]: ['IN_PROGRESS', 'CANCELLED'],
      [RideStatus.IN_PROGRESS]: ['COMPLETED', 'CANCELLED'],
      [RideStatus.COMPLETED]: [],
      [RideStatus.CANCELLED]: [],
      [RideStatus.NO_DRIVERS_FOUND]: ['REQUESTED', 'CANCELLED'],
    };

    if (!validTransitions[ride.status].includes(status)) {
      throw new BadRequestException(
        `Invalid status transition from ${ride.status} to ${status}`,
      );
    }

    const updateData: any = { status };

    if (status === RideStatus.CANCELLED) {
      updateData.cancelledAt = new Date();
    }

    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data: updateData,
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
      },
    });

    this.logger.log(`Ride ${rideId} status updated to ${status}`);

    return updatedRide as RideWithRelations;
  }

  /**
   * Get active rides for a user
   */
  async getActiveRides(userId: string): Promise<RideWithRelations[]> {
    const rides = await prisma.ride.findMany({
      where: {
        riderId: userId,
        status: {
          in: [
            RideStatus.REQUESTED,
            RideStatus.SEARCHING_DRIVER,
            RideStatus.DRIVER_ASSIGNED,
            RideStatus.DRIVER_ARRIVED,
            RideStatus.IN_PROGRESS,
          ],
        },
      },
      include: {
        rider: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
          },
        },
        driver: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                phone: true,
                avatar: true,
              },
            },
            vehicle: {
              select: {
                type: true,
                make: true,
                model: true,
                color: true,
                licensePlate: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return rides as RideWithRelations[];
  }

  /**
   * Generate unique ride number
   */
  private async generateRideNumber(): Promise<string> {
    const prefix = 'TATX';
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    
    // Get count of rides today
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    
    const todayCount = await prisma.ride.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    // Format: TATX-YYYYMMDD-0001
    const sequence = String(todayCount + 1).padStart(4, '0');
    return `${prefix}-${dateStr}-${sequence}`;
  }
}
