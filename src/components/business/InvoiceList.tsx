import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash, Download, DollarSign } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/utils/currency";
import { StatusBadge } from "./StatusBadge";

interface Invoice {
  id: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  client?: { name: string; company?: string | null } | null;
  project?: { name: string } | null;
  status: string;
  total_cents: number;
  paid_cents: number;
  balance_cents: number;
}

interface InvoiceListProps {
  invoices: Invoice[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  onRecordPayment: (id: string) => void;
}

export const InvoiceList = ({
  invoices,
  onEdit,
  onDelete,
  onDownload,
  onRecordPayment,
}: InvoiceListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Issue Date</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-right">Balance</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => {
          const isOverdue = new Date(invoice.due_date) < new Date() && invoice.balance_cents > 0;
          
          return (
            <TableRow key={invoice.id}>
              <TableCell className="font-mono">#{invoice.invoice_number}</TableCell>
              <TableCell>
                {invoice.client?.name}
                {invoice.client?.company && (
                  <div className="text-sm text-muted-foreground">{invoice.client.company}</div>
                )}
              </TableCell>
              <TableCell>{invoice.project?.name || "-"}</TableCell>
              <TableCell>{new Date(invoice.issue_date).toLocaleDateString()}</TableCell>
              <TableCell className={isOverdue ? "text-destructive font-semibold" : ""}>
                {new Date(invoice.due_date).toLocaleDateString()}
                {isOverdue && <div className="text-xs">OVERDUE</div>}
              </TableCell>
              <TableCell>
                <StatusBadge status={invoice.status} type="invoice" />
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatCurrency(invoice.total_cents)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatCurrency(invoice.balance_cents)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(invoice.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    {invoice.balance_cents > 0 && (
                      <DropdownMenuItem onClick={() => onRecordPayment(invoice.id)}>
                        <DollarSign className="h-4 w-4 mr-2" />
                        Record Payment
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => onDownload(invoice.id)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(invoice.id)} className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
