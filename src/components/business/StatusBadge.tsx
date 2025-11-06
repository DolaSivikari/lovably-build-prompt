import { formatStatus } from "@/utils/statusHelpers";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface StatusBadgeProps {
  status: string;
  type?: "project" | "invoice" | "estimate" | "client";
  className?: string;
}

const getStatusConfig = (status: string, type?: string) => {
  const lowerStatus = status.toLowerCase();

  // Project statuses
  if (type === "project") {
    if (lowerStatus === "active")
      return {
        variant: "status-active" as const,
        icon: CheckCircle2,
        showDot: true,
      };
    if (lowerStatus === "planning")
      return { variant: "info" as const, icon: Clock };
    if (lowerStatus === "on_hold")
      return { variant: "warning" as const, icon: AlertCircle };
    if (lowerStatus === "completed")
      return { variant: "success" as const, icon: CheckCircle2 };
  }

  // Invoice statuses
  if (type === "invoice") {
    if (lowerStatus === "paid")
      return { variant: "success" as const, icon: DollarSign };
    if (lowerStatus === "partially_paid")
      return { variant: "info" as const, icon: DollarSign };
    if (lowerStatus === "pending")
      return { variant: "warning" as const, icon: Clock };
    if (lowerStatus === "overdue")
      return { variant: "danger" as const, icon: AlertCircle };
    if (lowerStatus === "draft")
      return { variant: "status-inactive" as const, icon: FileText };
  }

  // Estimate statuses
  if (type === "estimate") {
    if (lowerStatus === "accepted")
      return { variant: "success" as const, icon: CheckCircle2 };
    if (lowerStatus === "sent")
      return { variant: "info" as const, icon: Clock };
    if (lowerStatus === "rejected")
      return { variant: "danger" as const, icon: XCircle };
    if (lowerStatus === "draft")
      return { variant: "status-inactive" as const, icon: FileText };
  }

  // Default
  return { variant: "status-inactive" as const, icon: FileText };
};

export const StatusBadge = ({ status, type, className }: StatusBadgeProps) => {
  const config = getStatusConfig(status, type);

  return (
    <Badge
      variant={config.variant}
      size="sm"
      icon={config.icon}
      showDot={config.showDot}
      className={className}
    >
      {formatStatus(status)}
    </Badge>
  );
};
