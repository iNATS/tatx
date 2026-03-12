'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { Card, CardContent, CardHeader, CardTitle } from '@tatx/ui/components/card';
import { Button } from '@tatx/ui/components/button';
import { Badge } from '@tatx/ui/components/badge';
import { Input } from '@tatx/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tatx/ui/components/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@tatx/ui/components/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@tatx/ui/components/dialog';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Eye,
  Shield,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@tatx/ui/components/dropdown-menu';

const paymentMethodData = [
  { name: 'MADA', value: 35 },
  { name: 'Credit Card', value: 25 },
  { name: 'Wallet', value: 20 },
  { name: 'Cash', value: 12 },
  { name: 'STC Pay', value: 8 },
];

const revenueData = [
  { date: 'Mon', revenue: 45200, commission: 6780, driverEarnings: 45200 - 6780 },
  { date: 'Tue', revenue: 52300, commission: 7845, driverEarnings: 52300 - 7845 },
  { date: 'Wed', revenue: 61500, commission: 9225, driverEarnings: 61500 - 9225 },
  { date: 'Thu', revenue: 48900, commission: 7335, driverEarnings: 48900 - 7335 },
  { date: 'Fri', revenue: 78500, commission: 11775, driverEarnings: 78500 - 11775 },
  { date: 'Sat', revenue: 89200, commission: 13380, driverEarnings: 89200 - 13380 },
  { date: 'Sun', revenue: 72100, commission: 10815, driverEarnings: 72100 - 10815 },
];

const allPayments = [
  {
    id: 'PAY-2024-001',
    type: 'Ride',
    customer: 'Ahmed Al-Saud',
    amount: 45.5,
    method: 'MADA',
    status: 'COMPLETED',
    date: '2024-03-12 10:30',
    reference: 'RD-2024-001',
  },
  {
    id: 'PAY-2024-002',
    type: 'Order',
    customer: 'Fatima Al-Zahrani',
    amount: 120.0,
    method: 'Credit Card',
    status: 'COMPLETED',
    date: '2024-03-12 10:25',
    reference: 'OD-2024-001',
  },
  {
    id: 'PAY-2024-003',
    type: 'Ride',
    customer: 'Mohammed Hassan',
    amount: 32.0,
    method: 'Wallet',
    status: 'PENDING',
    date: '2024-03-12 10:20',
    reference: 'RD-2024-002',
  },
  {
    id: 'PAY-2024-004',
    type: 'Order',
    customer: 'Sarah Mohammed',
    amount: 89.5,
    method: 'MADA',
    status: 'REFUNDED',
    date: '2024-03-12 09:45',
    reference: 'OD-2024-002',
  },
  {
    id: 'PAY-2024-005',
    type: 'Ride',
    customer: 'Khalid Ibrahim',
    amount: 78.0,
    method: 'STC Pay',
    status: 'FAILED',
    date: '2024-03-12 09:30',
    reference: 'RD-2024-003',
  },
  {
    id: 'PAY-2024-006',
    type: 'Order',
    customer: 'Omar Farooq',
    amount: 156.0,
    method: 'Credit Card',
    status: 'COMPLETED',
    date: '2024-03-12 09:15',
    reference: 'OD-2024-003',
  },
  {
    id: 'PAY-2024-007',
    type: 'Ride',
    customer: 'Layla Ahmed',
    amount: 42.5,
    method: 'Cash',
    status: 'COMPLETED',
    date: '2024-03-12 09:00',
    reference: 'RD-2024-004',
  },
  {
    id: 'PAY-2024-008',
    type: 'Order',
    customer: 'Fahad Al-Otaibi',
    amount: 234.0,
    method: 'MADA',
    status: 'DISPUTED',
    date: '2024-03-12 08:45',
    reference: 'OD-2024-004',
  },
];

const statusColors: Record<string, string> = {
  COMPLETED: 'bg-success-100 text-success-700',
  PENDING: 'bg-warning-100 text-warning-700',
  FAILED: 'bg-error-100 text-error-700',
  REFUNDED: 'bg-blue-100 text-blue-700',
  DISPUTED: 'bg-purple-100 text-purple-700',
  PROCESSING: 'bg-indigo-100 text-indigo-700',
};

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<typeof allPayments[0] | null>(null);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');

  const filteredPayments = allPayments.filter((payment) => {
    const matchesSearch =
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod =
      methodFilter === 'all' || payment.method === methodFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    return matchesSearch && matchesStatus && matchesMethod && matchesType;
  });

  const handleRefund = () => {
    console.log('Processing refund:', {
      paymentId: selectedPayment?.id,
      amount: refundAmount,
      reason: refundReason,
    });
    setShowRefundDialog(false);
    setRefundAmount('');
    setRefundReason('');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Payment Management</h1>
            <p className="text-gray-600 mt-1">
              Monitor transactions, process refunds, and manage disputes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync Payments
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue (Today)"
            value="SAR 72.1K"
            icon={<DollarSign className="w-6 h-6 text-brand-600" />}
            trend={15.3}
            iconBgColor="bg-brand-100"
          />
          <StatsCard
            title="Total Transactions"
            value="1,456"
            icon={<CreditCard className="w-6 h-6 text-blue-600" />}
            trend={12.5}
            iconBgColor="bg-blue-100"
          />
          <StatsCard
            title="Commission Earned"
            value="SAR 10.8K"
            icon={<TrendingUp className="w-6 h-6 text-success-600" />}
            trend={18.2}
            iconBgColor="bg-success-100"
          />
          <StatsCard
            title="Failed Payments"
            value="23"
            icon={<AlertCircle className="w-6 h-6 text-error-600" />}
            trend={-8.5}
            iconBgColor="bg-error-100"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Pending Refunds"
            value="12"
            icon={<Clock className="w-6 h-6 text-warning-600" />}
            trend={-5.2}
            iconBgColor="bg-warning-100"
          />
          <StatsCard
            title="Total Refunds (Today)"
            value="SAR 2,450"
            icon={<RefreshCw className="w-6 h-6 text-purple-600" />}
            trend={-12.5}
            iconBgColor="bg-purple-100"
          />
          <StatsCard
            title="Disputed Payments"
            value="5"
            icon={<AlertCircle className="w-6 h-6 text-orange-600" />}
            trend={-22.5}
            iconBgColor="bg-orange-100"
          />
          <StatsCard
            title="Success Rate"
            value="98.2%"
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            trend={1.2}
            iconBgColor="bg-green-100"
          />
        </div>

        {/* Revenue Chart */}
        <RevenueChart data={revenueData} />

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by ID, customer, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Ride">Rides</SelectItem>
                  <SelectItem value="Order">Orders</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                  <SelectItem value="DISPUTED">Disputed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Filter by method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="MADA">MADA</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Wallet">Wallet</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="STC Pay">STC Pay</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart
                data={paymentMethodData}
                type="pie"
                xAxisKey="name"
                dataKeys={[{ key: 'value', color: '#00bcd4' }]}
                height={300}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart
                data={revenueData}
                type="bar"
                xAxisKey="date"
                dataKeys={[
                  { key: 'revenue', color: '#00bcd4', name: 'Revenue' },
                  { key: 'commission', color: '#22c55e', name: 'Commission' },
                  { key: 'refunds', color: '#ef4444', name: 'Refunds' },
                ]}
                height={300}
              />
            </CardContent>
          </Card>
        </div>

        {/* Payment Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Transactions</CardTitle>
              <Badge variant="outline">{filteredPayments.length} payments</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.type}</Badge>
                      </TableCell>
                      <TableCell>{payment.customer}</TableCell>
                      <TableCell className="font-medium">
                        SAR {payment.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{payment.method}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[payment.status]}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {payment.date}
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
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {payment.status === 'COMPLETED' && (
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedPayment(payment);
                                  setShowRefundDialog(true);
                                }}
                              >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Process Refund
                              </DropdownMenuItem>
                            )}
                            {payment.status === 'DISPUTED' && (
                              <DropdownMenuItem>
                                <Shield className="w-4 h-4 mr-2" />
                                Resolve Dispute
                              </DropdownMenuItem>
                            )}
                            {payment.status === 'FAILED' && (
                              <DropdownMenuItem>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Retry Payment
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Refund Dialog */}
      <Dialog open={showRefundDialog} onOpenChange={setShowRefundDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Refund</DialogTitle>
            <DialogDescription>
              {selectedPayment &&
                `Processing refund for payment ${selectedPayment.id}`}
            </DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Original Amount</label>
                  <p className="text-sm mt-1">SAR {selectedPayment.amount.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Customer</label>
                  <p className="text-sm mt-1">{selectedPayment.customer}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Refund Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(e.target.value)}
                  max={selectedPayment.amount}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Refund Reason
                </label>
                <textarea
                  className="w-full p-3 border rounded-md min-h-[100px]"
                  placeholder="Please provide a reason for the refund..."
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRefundDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleRefund}
              disabled={!refundAmount || !refundReason.trim()}
            >
              Process Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
