'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Input } from '@tatx/ui/components/input';
import { Label } from '@tatx/ui/components/label';
import { Switch } from '@tatx/ui/components/switch';
import { Slider } from '@tatx/ui/components/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tatx/ui/components/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@tatx/ui/components/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@tatx/ui/components/dialog';
import { Badge } from '@tatx/ui/components/badge';
import { Separator } from '@tatx/ui/components/separator';
import {
  Settings,
  DollarSign,
  Percent,
  MapPin,
  Bell,
  Shield,
  CreditCard,
  Users,
  Car,
  Store,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  ShoppingBag,
  Download,
} from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  baseFare: number;
  perKm: number;
  perMinute: number;
  minFare: number;
  surgeMultiplier: number;
}

interface CommissionTier {
  id: string;
  name: string;
  commission: number;
  minOrders: number;
}

const defaultRidePricing: PricingTier[] = [
  { id: '1', name: 'Economy', baseFare: 5, perKm: 1.5, perMinute: 0.5, minFare: 10, surgeMultiplier: 1.0 },
  { id: '2', name: 'Comfort', baseFare: 8, perKm: 2.0, perMinute: 0.75, minFare: 15, surgeMultiplier: 1.2 },
  { id: '3', name: 'Premium', baseFare: 12, perKm: 3.0, perMinute: 1.0, minFare: 25, surgeMultiplier: 1.5 },
  { id: '4', name: 'Luxury', baseFare: 20, perKm: 5.0, perMinute: 1.5, minFare: 50, surgeMultiplier: 2.0 },
  { id: '5', name: 'Van', baseFare: 15, perKm: 3.5, perMinute: 1.25, minFare: 30, surgeMultiplier: 1.8 },
];

const defaultCommissionTiers: CommissionTier[] = [
  { id: '1', name: 'Standard', commission: 15, minOrders: 0 },
  { id: '2', name: 'Silver', commission: 12, minOrders: 100 },
  { id: '3', name: 'Gold', commission: 10, minOrders: 500 },
  { id: '4', name: 'Platinum', commission: 8, minOrders: 1000 },
];

export default function SettingsPage() {
  const [ridePricing, setRidePricing] = useState<PricingTier[]>(defaultRidePricing);
  const [commissionTiers, setCommissionTiers] = useState<CommissionTier[]>(defaultCommissionTiers);
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'Tatx',
    supportEmail: 'support@tatx.sa',
    supportPhone: '+966 800 123 4567',
    currency: 'SAR',
    language: 'ar',
    timezone: 'Asia/Riyadh',
  });
  const [featureFlags, setFeatureFlags] = useState({
    ridesEnabled: true,
    foodDeliveryEnabled: true,
    groceryDeliveryEnabled: true,
    courierEnabled: true,
    walletEnabled: true,
    subscriptionsEnabled: true,
    surgePricingEnabled: true,
    scheduledRidesEnabled: true,
    rideSharingEnabled: false,
    contactlessDeliveryEnabled: true,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    newRideAlerts: true,
    newOrderAlerts: true,
    lowBalanceAlerts: true,
    disputeAlerts: true,
    weeklyReports: true,
  });
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);

  const handleSaveSettings = () => {
    console.log('Saving settings...');
    // In a real app, this would call an API
  };

  const handleSavePricing = () => {
    console.log('Saving pricing...');
    setShowPricingDialog(false);
    setEditingTier(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Platform Settings</h1>
            <p className="text-gray-600 mt-1">
              Configure platform settings, pricing, and features
            </p>
          </div>
          <Button onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">
              <Settings className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="pricing">
              <DollarSign className="w-4 h-4 mr-2" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="commission">
              <Percent className="w-4 h-4 mr-2" />
              Commission
            </TabsTrigger>
            <TabsTrigger value="features">
              <Car className="w-4 h-4 mr-2" />
              Features
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Information</CardTitle>
                <CardDescription>
                  Basic information about your platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input
                      id="platformName"
                      value={platformSettings.platformName}
                      onChange={(e) =>
                        setPlatformSettings({
                          ...platformSettings,
                          platformName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={platformSettings.currency}
                      onValueChange={(value) =>
                        setPlatformSettings({
                          ...platformSettings,
                          currency: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                        <SelectItem value="KWD">KWD - Kuwaiti Dinar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Default Language</Label>
                    <Select
                      value={platformSettings.language}
                      onValueChange={(value) =>
                        setPlatformSettings({
                          ...platformSettings,
                          language: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={platformSettings.timezone}
                      onValueChange={(value) =>
                        setPlatformSettings({
                          ...platformSettings,
                          timezone: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Riyadh">
                          Asia/Riyadh (GMT+3)
                        </SelectItem>
                        <SelectItem value="Asia/Dubai">
                          Asia/Dubai (GMT+4)
                        </SelectItem>
                        <SelectItem value="Asia/Kuwait">
                          Asia/Kuwait (GMT+3)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={platformSettings.supportEmail}
                      onChange={(e) =>
                        setPlatformSettings({
                          ...platformSettings,
                          supportEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      value={platformSettings.supportPhone}
                      onChange={(e) =>
                        setPlatformSettings({
                          ...platformSettings,
                          supportPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Areas</CardTitle>
                <CardDescription>
                  Manage cities and regions where services are available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-brand-600" />
                      <div>
                        <div className="font-medium">Riyadh</div>
                        <div className="text-sm text-gray-600">
                          All services enabled
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-success-100 text-success-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-brand-600" />
                      <div>
                        <div className="font-medium">Jeddah</div>
                        <div className="text-sm text-gray-600">
                          All services enabled
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-success-100 text-success-700">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-brand-600" />
                      <div>
                        <div className="font-medium">Dammam</div>
                        <div className="text-sm text-gray-600">
                          Limited services
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-warning-100 text-warning-700">Limited</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service Area
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Settings */}
          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ride Pricing</CardTitle>
                    <CardDescription>
                      Configure pricing for different vehicle types
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowPricingDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ridePricing.map((tier) => (
                    <div
                      key={tier.id}
                      className="p-4 border rounded-lg space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Car className="w-5 h-5 text-brand-600" />
                          <div>
                            <div className="font-medium">{tier.name}</div>
                            <div className="text-sm text-gray-600">
                              Min fare: SAR {tier.minFare.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            Base: SAR {tier.baseFare.toFixed(2)}
                          </Badge>
                          <Badge variant="outline">
                            {tier.perKm.toFixed(2)}/km
                          </Badge>
                          <Badge variant="outline">
                            {tier.surgeMultiplier}x surge
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingTier(tier);
                              setShowPricingDialog(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Pricing</CardTitle>
                <CardDescription>
                  Configure pricing for food and grocery delivery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Base Delivery Fee</Label>
                    <Input type="number" defaultValue={3.99} />
                  </div>
                  <div>
                    <Label>Per KM Fee</Label>
                    <Input type="number" defaultValue={1.5} />
                  </div>
                  <div>
                    <Label>Free Delivery Above</Label>
                    <Input type="number" defaultValue={100} />
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Small Package</Label>
                    <Input type="number" defaultValue={5} />
                  </div>
                  <div>
                    <Label>Medium Package</Label>
                    <Input type="number" defaultValue={10} />
                  </div>
                  <div>
                    <Label>Large Package</Label>
                    <Input type="number" defaultValue={20} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Surge Pricing</CardTitle>
                <CardDescription>
                  Configure dynamic pricing during high demand
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Surge Pricing</div>
                    <div className="text-sm text-gray-600">
                      Automatically adjust prices during peak hours
                    </div>
                  </div>
                  <Switch
                    checked={featureFlags.surgePricingEnabled}
                    onCheckedChange={(checked) =>
                      setFeatureFlags({
                        ...featureFlags,
                        surgePricingEnabled: checked,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Low Demand Multiplier</Label>
                    <Input type="number" defaultValue={1.0} step={0.1} />
                  </div>
                  <div>
                    <Label>Medium Demand Multiplier</Label>
                    <Input type="number" defaultValue={1.5} step={0.1} />
                  </div>
                  <div>
                    <Label>High Demand Multiplier</Label>
                    <Input type="number" defaultValue={2.0} step={0.1} />
                  </div>
                </div>
                <div>
                  <Label>Maximum Surge Multiplier</Label>
                  <Slider defaultValue={[3]} max={5} step={0.5} />
                  <div className="text-sm text-gray-600 mt-2">3.0x</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commission Settings */}
          <TabsContent value="commission" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Commission Tiers</CardTitle>
                    <CardDescription>
                      Configure commission rates for merchants
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Tier
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commissionTiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="p-4 border rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Store className="w-5 h-5 text-brand-600" />
                        <div>
                          <div className="font-medium">{tier.name}</div>
                          <div className="text-sm text-gray-600">
                            Min {tier.minOrders} orders/month
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className="text-lg" variant="outline">
                          {tier.commission}% Commission
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Default Commission Settings</CardTitle>
                <CardDescription>
                  Configure default commission rates for different services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Food Delivery Commission</Label>
                    <div className="relative">
                      <Input type="number" defaultValue={15} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>Grocery Delivery Commission</Label>
                    <div className="relative">
                      <Input type="number" defaultValue={12} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>Courier Service Commission</Label>
                    <div className="relative">
                      <Input type="number" defaultValue={20} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>
                  <div>
                    <Label>Ride Commission</Label>
                    <div className="relative">
                      <Input type="number" defaultValue={15} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feature Flags */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Features</CardTitle>
                <CardDescription>
                  Enable or disable platform services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-brand-600" />
                    <div>
                      <div className="font-medium">Ride Hailing</div>
                      <div className="text-sm text-gray-600">
                        Enable ride booking services
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={featureFlags.ridesEnabled}
                    onCheckedChange={(checked) =>
                      setFeatureFlags({ ...featureFlags, ridesEnabled: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Store className="w-5 h-5 text-orange-600" />
                    <div>
                      <div className="font-medium">Food Delivery</div>
                      <div className="text-sm text-gray-600">
                        Enable restaurant food delivery
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={featureFlags.foodDeliveryEnabled}
                    onCheckedChange={(checked) =>
                      setFeatureFlags({
                        ...featureFlags,
                        foodDeliveryEnabled: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-medium">Grocery Delivery</div>
                      <div className="text-sm text-gray-600">
                        Enable grocery and supermarket delivery
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={featureFlags.groceryDeliveryEnabled}
                    onCheckedChange={(checked) =>
                      setFeatureFlags({
                        ...featureFlags,
                        groceryDeliveryEnabled: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">Courier Service</div>
                      <div className="text-sm text-gray-600">
                        Enable package delivery services
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={featureFlags.courierEnabled}
                    onCheckedChange={(checked) =>
                      setFeatureFlags({
                        ...featureFlags,
                        courierEnabled: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Features</CardTitle>
                <CardDescription>
                  Configure additional platform features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Digital Wallet</div>
                    <div className="text-sm text-gray-600">
                      Enable in-app wallet for payments
                    </div>
                  </div>
                  <Switch
                    checked={featureFlags.walletEnabled}
                    onCheckedChange={(checked) =>
                      setFeatureFlags({ ...featureFlags, walletEnabled: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Subscriptions</div>
                    <div className="text-sm text-gray-600">
                      Enable Tatx Pro membership program
                    </div>
                  </div>
                  <Switch
                    checked={featureFlags.subscriptionsEnabled}
                    onCheckedChange={(checked) =>
                      setFeatureFlags({
                        ...featureFlags,
                        subscriptionsEnabled: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Scheduled Rides</div>
                    <div className="text-sm text-gray-600">
                      Allow users to schedule rides in advance
                    </div>
                  </div>
                  <Switch
                    checked={featureFlags.scheduledRidesEnabled}
                    onCheckedChange={(checked) =>
                      setFeatureFlags({
                        ...featureFlags,
                        scheduledRidesEnabled: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Contactless Delivery</div>
                    <div className="text-sm text-gray-600">
                      Enable contactless delivery option
                    </div>
                  </div>
                  <Switch
                    checked={featureFlags.contactlessDeliveryEnabled}
                    onCheckedChange={(checked) =>
                      setFeatureFlags({
                        ...featureFlags,
                        contactlessDeliveryEnabled: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how admins receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-600">
                      Receive notifications via email
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">SMS Notifications</div>
                    <div className="text-sm text-gray-600">
                      Receive notifications via SMS
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        smsNotifications: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-gray-600">
                      Receive browser push notifications
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: checked,
                      })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">New Ride Alerts</div>
                    <div className="text-sm text-gray-600">
                      Get notified about new ride requests
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.newRideAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        newRideAlerts: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">New Order Alerts</div>
                    <div className="text-sm text-gray-600">
                      Get notified about new orders
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.newOrderAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        newOrderAlerts: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Dispute Alerts</div>
                    <div className="text-sm text-gray-600">
                      Get notified about payment disputes
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.disputeAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        disputeAlerts: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Weekly Reports</div>
                    <div className="text-sm text-gray-600">
                      Receive weekly analytics reports
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        weeklyReports: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure platform security and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-gray-600">
                      Require 2FA for admin accounts
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Session Timeout</div>
                    <div className="text-sm text-gray-600">
                      Auto-logout after inactivity
                    </div>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Password Requirements</div>
                    <div className="text-sm text-gray-600">
                      Minimum 8 characters, 1 uppercase, 1 number
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">API Rate Limiting</div>
                    <div className="text-sm text-gray-600">
                      Limit API requests per minute
                    </div>
                  </div>
                  <Input type="number" defaultValue={100} className="w-[100px]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>
                  View and manage system audit logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Logs
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="p-3 bg-gray-50 rounded text-sm">
                    <span className="text-gray-600">Today, 10:30 AM - </span>
                    <span className="font-medium">Admin user updated pricing settings</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded text-sm">
                    <span className="text-gray-600">Today, 09:15 AM - </span>
                    <span className="font-medium">New driver approved: Mohammed Hassan</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded text-sm">
                    <span className="text-gray-600">Yesterday, 04:45 PM - </span>
                    <span className="font-medium">Restaurant approved: Al Baik</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

// Import Package icon
function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
