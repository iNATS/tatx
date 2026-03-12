'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { Progress } from '@tatx/ui/components/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@tatx/ui/components/dialog';
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Star,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Utensils,
} from 'lucide-react';

interface Restaurant {
  id: string;
  name: string;
  nameAr?: string;
  merchantName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  cuisine: string[];
  rating?: number;
  totalOrders?: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  submittedDate: string;
  commissionRate: number;
  deliveryRadius: number;
  minOrderAmount: number;
  documents: {
    type: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
  }[];
  isOpenNow: boolean;
  estimatedDeliveryTime: number;
}

interface RestaurantCardProps {
  restaurant?: Restaurant;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  className?: string;
}

const defaultRestaurant: Restaurant = {
  id: 'RES-001',
  name: 'Al Baik',
  nameAr: 'البايك',
  merchantName: 'Al Baik Co.',
  email: 'contact@albaik.sa',
  phone: '+966 11 234 5678',
  address: 'King Fahd Road, Riyadh',
  city: 'Riyadh',
  cuisine: ['Fast Food', 'Chicken', 'Arabic'],
  rating: 4.8,
  totalOrders: 1250,
  status: 'PENDING',
  submittedDate: '2024-03-10',
  commissionRate: 15,
  deliveryRadius: 5,
  minOrderAmount: 25,
  documents: [
    { type: 'Commercial Registration', status: 'APPROVED' },
    { type: 'Food License', status: 'APPROVED' },
    { type: 'Health Certificate', status: 'PENDING' },
    { type: 'Tax Registration', status: 'APPROVED' },
  ],
  isOpenNow: true,
  estimatedDeliveryTime: 30,
};

export function RestaurantCard({
  restaurant = defaultRestaurant,
  onApprove,
  onReject,
  className,
}: RestaurantCardProps) {
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const documentProgress = Math.round(
    (restaurant.documents.filter((d) => d.status === 'APPROVED').length /
      restaurant.documents.length) *
      100
  );

  const handleApprove = () => {
    onApprove?.(restaurant.id);
  };

  const handleReject = () => {
    onReject?.(restaurant.id);
    setShowRejectDialog(false);
  };

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <Store className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                  {restaurant.nameAr && (
                    <span className="text-gray-500 text-sm">
                      ({restaurant.nameAr})
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{restaurant.merchantName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={
                      restaurant.status === 'PENDING'
                        ? 'secondary'
                        : restaurant.status === 'APPROVED'
                        ? 'default'
                        : 'destructive'
                    }
                  >
                    {restaurant.status}
                  </Badge>
                  {restaurant.isOpenNow ? (
                    <Badge className="bg-success-100 text-success-700">
                      Open Now
                    </Badge>
                  ) : (
                    <Badge variant="outline">Closed</Badge>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetailsDialog(true)}
            >
              View Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{restaurant.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {restaurant.estimatedDeliveryTime} min
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                Min: SAR {restaurant.minOrderAmount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {restaurant.cuisine[0]}
              </span>
            </div>
          </div>

          {restaurant.rating && (
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
              <span className="font-medium">{restaurant.rating}</span>
              <span className="text-sm text-gray-600">
                ({restaurant.totalOrders} orders)
              </span>
            </div>
          )}

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Document Verification</span>
              <span className="text-sm text-gray-600">{documentProgress}%</span>
            </div>
            <Progress value={documentProgress} className="h-2" />
            <div className="flex gap-2 mt-2 flex-wrap">
              {restaurant.documents.map((doc, index) => (
                <Badge
                  key={index}
                  variant={
                    doc.status === 'APPROVED'
                      ? 'default'
                      : doc.status === 'PENDING'
                      ? 'secondary'
                      : 'destructive'
                  }
                  className="text-xs"
                >
                  {doc.status === 'APPROVED' && (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  )}
                  {doc.status === 'PENDING' && (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {doc.status === 'REJECTED' && (
                    <XCircle className="w-3 h-3 mr-1" />
                  )}
                  {doc.type}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span className="font-medium">Cuisines:</span>
            {restaurant.cuisine.map((c, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {c}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          {restaurant.status === 'PENDING' && (
            <>
              <Button
                className="flex-1 bg-success-600 hover:bg-success-700"
                onClick={handleApprove}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                variant="outline"
                className="flex-1 text-error-600 border-error-200 hover:bg-error-50"
                onClick={() => setShowRejectDialog(true)}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </>
          )}
          {restaurant.status === 'APPROVED' && (
            <Button variant="outline" className="flex-1">
              Manage Restaurant
            </Button>
          )}
          {restaurant.status === 'REJECTED' && (
            <Button variant="outline" className="flex-1">
              Resubmit Request
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Restaurant Details</DialogTitle>
            <DialogDescription>
              Complete information about {restaurant.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {restaurant.email}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {restaurant.phone}
                </div>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Address</label>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  {restaurant.address}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Commission Rate</label>
                <p className="text-sm mt-1">{restaurant.commissionRate}%</p>
              </div>
              <div>
                <label className="text-sm font-medium">Delivery Radius</label>
                <p className="text-sm mt-1">{restaurant.deliveryRadius} km</p>
              </div>
              <div>
                <label className="text-sm font-medium">Submitted Date</label>
                <p className="text-sm mt-1">
                  {new Date(restaurant.submittedDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Badge
                  variant={
                    restaurant.status === 'PENDING'
                      ? 'secondary'
                      : restaurant.status === 'APPROVED'
                      ? 'default'
                      : 'destructive'
                  }
                  className="mt-1"
                >
                  {restaurant.status}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Documents Status
              </label>
              <div className="space-y-2">
                {restaurant.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span className="text-sm">{doc.type}</span>
                    <Badge
                      variant={
                        doc.status === 'APPROVED'
                          ? 'default'
                          : doc.status === 'PENDING'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Restaurant</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this restaurant application.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <textarea
              className="w-full p-3 border rounded-md min-h-[100px]"
              placeholder="Enter rejection reason..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
