'use client';

import React, { useState } from 'react';
import { Badge } from '@tatx/ui/components/badge';
import { Button } from '@tatx/ui/components/button';
import { Input } from '@tatx/ui/components/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@tatx/ui/components/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@tatx/ui/components/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@tatx/ui/components/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@tatx/ui/components/dialog';
import {
  MoreHorizontal,
  Search,
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Ban,
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'CUSTOMER' | 'DRIVER' | 'MERCHANT' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  joinedDate: string;
  totalRides?: number;
  totalOrders?: number;
  rating?: number;
  verified?: boolean;
}

interface UserTableProps {
  users?: UserData[];
  className?: string;
}

const defaultUsers: UserData[] = [
  {
    id: 'USR-001',
    name: 'Ahmed Al-Saud',
    email: 'ahmed.saud@email.com',
    phone: '+966 50 123 4567',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    joinedDate: '2024-01-15',
    totalRides: 45,
    totalOrders: 23,
    verified: true,
  },
  {
    id: 'DRV-001',
    name: 'Mohammed Hassan',
    email: 'mohammed.hassan@email.com',
    phone: '+966 55 987 6543',
    role: 'DRIVER',
    status: 'ACTIVE',
    joinedDate: '2024-02-01',
    totalRides: 312,
    rating: 4.8,
    verified: true,
  },
  {
    id: 'MER-001',
    name: 'Al Baik Restaurant',
    email: 'contact@albaik.sa',
    phone: '+966 11 234 5678',
    role: 'MERCHANT',
    status: 'ACTIVE',
    joinedDate: '2024-01-20',
    totalOrders: 1250,
    rating: 4.9,
    verified: true,
  },
  {
    id: 'USR-002',
    name: 'Fatima Al-Zahrani',
    email: 'fatima.z@email.com',
    phone: '+966 56 111 2222',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    joinedDate: '2024-03-10',
    totalRides: 12,
    totalOrders: 8,
    verified: false,
  },
  {
    id: 'DRV-002',
    name: 'Khalid Ibrahim',
    email: 'khalid.ibrahim@email.com',
    phone: '+966 50 333 4444',
    role: 'DRIVER',
    status: 'INACTIVE',
    joinedDate: '2024-02-15',
    totalRides: 89,
    rating: 4.5,
    verified: true,
  },
  {
    id: 'USR-003',
    name: 'Sarah Mohammed',
    email: 'sarah.m@email.com',
    phone: '+966 54 555 6666',
    role: 'CUSTOMER',
    status: 'BLOCKED',
    joinedDate: '2024-01-05',
    totalRides: 5,
    totalOrders: 2,
    verified: false,
  },
];

const roleColors: Record<string, string> = {
  CUSTOMER: 'bg-blue-100 text-blue-700',
  DRIVER: 'bg-green-100 text-green-700',
  MERCHANT: 'bg-orange-100 text-orange-700',
  ADMIN: 'bg-purple-100 text-purple-700',
};

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-success-100 text-success-700',
  INACTIVE: 'bg-gray-100 text-gray-700',
  BLOCKED: 'bg-error-100 text-error-700',
};

export function UserTable({ users = defaultUsers, className }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEdit = (user: UserData) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: UserData) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className={className}>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="CUSTOMER">Customers</SelectItem>
            <SelectItem value="DRIVER">Drivers</SelectItem>
            <SelectItem value="MERCHANT">Merchants</SelectItem>
            <SelectItem value="ADMIN">Admins</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
            <SelectItem value="BLOCKED">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-brand-600" />
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-3 h-3 text-gray-400" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-3 h-3 text-gray-400" />
                      {user.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={roleColors[user.role]}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[user.status]}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {user.role === 'DRIVER' && (
                      <>
                        <div>{user.totalRides} rides</div>
                        {user.rating && (
                          <div className="text-warning-600">★ {user.rating}</div>
                        )}
                      </>
                    )}
                    {user.role === 'MERCHANT' && (
                      <>
                        <div>{user.totalOrders} orders</div>
                        {user.rating && (
                          <div className="text-warning-600">★ {user.rating}</div>
                        )}
                      </>
                    )}
                    {user.role === 'CUSTOMER' && (
                      <>
                        <div>{user.totalRides} rides</div>
                        <div>{user.totalOrders} orders</div>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {new Date(user.joinedDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEdit(user)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {user.status === 'ACTIVE' ? (
                        <DropdownMenuItem className="text-error-600">
                          <Ban className="w-4 h-4 mr-2" />
                          Block User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-success-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Activate User
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-error-600"
                        onClick={() => handleDelete(user)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user profile here.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <Input defaultValue={selectedUser.name} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <Input defaultValue={selectedUser.email} type="email" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <Input defaultValue={selectedUser.phone} />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Role</label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CUSTOMER">Customer</SelectItem>
                    <SelectItem value="DRIVER">Driver</SelectItem>
                    <SelectItem value="MERCHANT">Merchant</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="BLOCKED">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
