'use client';

import React from 'react';
import { Badge } from '@tatx/ui/components/badge';
import { Button } from '@tatx/ui/components/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@tatx/ui/components/table';
import { Car, MapPin, Clock, MoreHorizontal, Phone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tatx/ui/components/dropdown-menu';

interface Ride {
  id: string;
  customer: string;
  driver: string;
  pickup: string;
  dropoff: string;
  status: 'REQUESTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  fare: number;
  time: string;
  vehicleType: string;
}

interface RecentRidesTableProps {
  rides?: Ride[];
  className?: string;
}

const defaultRides: Ride[] = [
  {
    id: 'RD-2024-001',
    customer: 'Ahmed Al-Saud',
    driver: 'Mohammed Hassan',
    pickup: 'King Fahd Road, Riyadh',
    dropoff: 'Riyadh Park Mall',
    status: 'IN_PROGRESS',
    fare: 45.5,
    time: '5 min ago',
    vehicleType: 'Economy',
  },
  {
    id: 'RD-2024-002',
    customer: 'Fatima Al-Zahrani',
    driver: 'Khalid Ibrahim',
    pickup: 'Olaya District',
    dropoff: 'King Khalid Airport',
    status: 'COMPLETED',
    fare: 120.0,
    time: '12 min ago',
    vehicleType: 'Premium',
  },
  {
    id: 'RD-2024-003',
    customer: 'Sarah Mohammed',
    driver: 'Waiting for driver',
    pickup: 'Al Malqa District',
    dropoff: 'Granada Mall',
    status: 'REQUESTED',
    fare: 32.0,
    time: 'Just now',
    vehicleType: 'Economy',
  },
  {
    id: 'RD-2024-004',
    customer: 'Omar Farooq',
    driver: 'Abdullah Ahmed',
    pickup: 'Diplomatic Quarter',
    dropoff: 'King Saud University',
    status: 'COMPLETED',
    fare: 28.5,
    time: '25 min ago',
    vehicleType: 'Comfort',
  },
  {
    id: 'RD-2024-005',
    customer: 'Nora Al-Rashid',
    driver: 'Cancelled',
    pickup: 'Al Nakheel',
    dropoff: 'Al Rawdah',
    status: 'CANCELLED',
    fare: 0,
    time: '1 hour ago',
    vehicleType: 'Luxury',
  },
];

const statusColors: Record<string, string> = {
  REQUESTED: 'bg-warning-100 text-warning-700',
  IN_PROGRESS: 'bg-brand-100 text-brand-700',
  COMPLETED: 'bg-success-100 text-success-700',
  CANCELLED: 'bg-error-100 text-error-700',
};

export function RecentRidesTable({
  rides = defaultRides,
  className,
}: RecentRidesTableProps) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Rides</h3>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ride ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fare</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rides.map((ride) => (
              <TableRow key={ride.id}>
                <TableCell className="font-medium">{ride.id}</TableCell>
                <TableCell>{ride.customer}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-gray-400" />
                    {ride.driver}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-3 h-3 text-success-500" />
                    <span className="truncate max-w-[150px]">{ride.pickup}</span>
                    <span>→</span>
                    <MapPin className="w-3 h-3 text-error-500" />
                    <span className="truncate max-w-[150px]">{ride.dropoff}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[ride.status]}>
                    {ride.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  {ride.fare > 0 ? (
                    <span className="font-medium">SAR {ride.fare.toFixed(2)}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Track Ride</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
