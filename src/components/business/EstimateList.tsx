import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Edit, Trash, Download, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/utils/currency";
import { StatusBadge } from "./StatusBadge";

interface Estimate {
  id: string;
  estimate_number: string;
  created_at: string;
  client?: { name: string; company?: string | null } | null;
  project?: { name: string } | null;
  status: string;
  total_cents: number;
  valid_until?: string | null;
}

interface EstimateListProps {
  estimates: Estimate[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  onConvertToInvoice?: (id: string) => void;
}

export const EstimateList = ({
  estimates,
  onEdit,
  onDelete,
  onDownload,
  onConvertToInvoice,
}: EstimateListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Number</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Valid Until</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {estimates.map((estimate) => (
          <TableRow key={estimate.id}>
            <TableCell className="font-mono">
              #{estimate.estimate_number}
            </TableCell>
            <TableCell>
              {estimate.client?.name}
              {estimate.client?.company && (
                <div className="text-sm text-muted-foreground">
                  {estimate.client.company}
                </div>
              )}
            </TableCell>
            <TableCell>{estimate.project?.name || "-"}</TableCell>
            <TableCell>
              {new Date(estimate.created_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {estimate.valid_until
                ? new Date(estimate.valid_until).toLocaleDateString()
                : "-"}
            </TableCell>
            <TableCell>
              <StatusBadge status={estimate.status} type="estimate" />
            </TableCell>
            <TableCell className="text-right font-semibold">
              {formatCurrency(estimate.total_cents)}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(estimate.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDownload(estimate.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </DropdownMenuItem>
                  {onConvertToInvoice && estimate.status === "approved" && (
                    <DropdownMenuItem
                      onClick={() => onConvertToInvoice(estimate.id)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Convert to Invoice
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => onDelete(estimate.id)}
                    className="text-destructive"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
