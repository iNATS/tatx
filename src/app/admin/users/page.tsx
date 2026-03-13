"use client";

import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, MoreHorizontal, Mail, Shield } from 'lucide-react';

const USERS = [
  { id: 1, name: 'أحمد علي', email: 'ahmed@example.com', role: 'عميل', status: 'نشط', joined: '2024-01-10' },
  { id: 2, name: 'سارة خالد', email: 'sara@example.com', role: 'مورد', status: 'نشط', joined: '2024-02-15' },
  { id: 3, name: 'فهد محمد', email: 'fahd@example.com', role: 'مندوب', status: 'محظور', joined: '2023-12-05' },
];

export default function AdminUsersPage() {
  return (
    <div className="flex bg-[#F8F9FA] min-h-screen" dir="rtl">
      <PortalSidebar role="admin" title="Admin" />
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div className="text-right">
            <h1 className="text-4xl font-black mb-2">إدارة المستخدمين</h1>
            <p className="text-muted-foreground font-bold">إدارة حسابات العملاء، المناديب، والموردين.</p>
          </div>
          <Button className="rounded-2xl h-14 px-8 font-black gap-2">
            <UserPlus className="w-5 h-5" />
            إضافة مستخدم
          </Button>
        </header>

        <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="p-8 border-b">
            <div className="flex items-center gap-4 flex-row-reverse">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="بحث عن مستخدم..." className="pr-10 h-12 rounded-xl bg-secondary/50 border-none text-right font-bold" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow>
                  <TableHead className="text-right py-6 font-black">المستخدم</TableHead>
                  <TableHead className="text-right font-black">الدور</TableHead>
                  <TableHead className="text-right font-black">الحالة</TableHead>
                  <TableHead className="text-right font-black">تاريخ الانضمام</TableHead>
                  <TableHead className="text-left font-black">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS.map((user) => (
                  <TableRow key={user.id} className="hover:bg-secondary/10 transition-colors">
                    <TableCell className="py-6">
                      <div className="flex flex-col text-right">
                        <span className="font-black">{user.name}</span>
                        <span className="text-xs text-muted-foreground font-bold">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-black px-3 py-1">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={user.status === 'نشط' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-bold">{user.joined}</TableCell>
                    <TableCell className="text-left">
                      <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}