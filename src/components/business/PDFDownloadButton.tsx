import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { toast } from 'sonner';

interface PDFDownloadButtonProps {
  document: React.ReactElement;
  filename: string;
  buttonText?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export const PDFDownloadButton = ({
  document,
  filename,
  buttonText = 'Download PDF',
  variant = 'outline',
  size = 'sm',
  className = '',
}: PDFDownloadButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      
      // Generate PDF blob
      const blob = await pdf(document).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const linkElement = window.document.createElement('a');
      linkElement.href = url;
      linkElement.download = `${filename}.pdf`;
      linkElement.click();
      
      // Cleanup
      URL.revokeObjectURL(url);
      
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={loading}
      className={className}
    >
      <FileDown className="h-4 w-4 mr-2" />
      {loading ? 'Generating...' : buttonText}
    </Button>
  );
};
