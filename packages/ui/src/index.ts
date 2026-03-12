/**
 * @tatx/ui
 * Shared UI components for Tatx platform
 * Built with Shadcn UI and Radix UI primitives
 */

// Export utility functions
export { cn } from './utils/cn';

// Export hooks
export { useToast } from './hooks/use-toast';

// Export components
export { Button, buttonVariants } from './components/button';
export type { ButtonProps } from './components/button';

export { Input } from './components/input';
export type { InputProps } from './components/input';

export { Label } from './components/label';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/card';
export type { CardProps } from './components/card';

export { Badge } from './components/badge';
export type { BadgeProps } from './components/badge';

export { Avatar, AvatarImage, AvatarFallback } from './components/avatar';

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './components/dialog';

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from './components/dropdown-menu';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs';

export { Switch } from './components/switch';

export { Checkbox } from './components/checkbox';

export { RadioGroup, RadioGroupItem } from './components/radio-group';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectSeparator } from './components/select';

export { Slider } from './components/slider';

export { Progress } from './components/progress';

export { Separator } from './components/separator';

export { ScrollArea, ScrollBar } from './components/scroll-area';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/tooltip';

export { Toast, ToastProvider, ToastViewport, ToastAction, ToastClose, ToastTitle, ToastDescription } from './components/toast';
export { Toaster } from './components/toaster';

export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from './components/alert-dialog';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/accordion';

export { Popover, PopoverTrigger, PopoverContent } from './components/popover';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './components/table';
