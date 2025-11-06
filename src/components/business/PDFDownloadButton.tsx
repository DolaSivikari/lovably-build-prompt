import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PDFDownloadButtonProps {
  pdfDocument: React.ReactElement;
  fileName: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export const PDFDownloadButton = ({
  pdfDocument,
  fileName,
  variant = "default",
  size = "default",
}: PDFDownloadButtonProps) => {
  const { toast } = useToast();

  const handleDownload = useCallback(async () => {
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const blob = await pdf(pdfDocument).toBlob();
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "PDF Downloaded",
        description: `${fileName} has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  }, [fileName, pdfDocument, toast]);

  return (
    <Button onClick={handleDownload} variant={variant} size={size}>
      <Download className="h-4 w-4 mr-2" />
      Download PDF
    </Button>
  );
};
