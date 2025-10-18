import { lazy, Suspense } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

// Lazy load react-quill only when needed
const ReactQuill = lazy(() => import('react-quill'));

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  label?: string;
}

const RichTextEditor = ({ 
  value, 
  onChange, 
  maxLength = 50000,
  label = "Content"
}: RichTextEditorProps) => {
  const currentLength = value.length;
  const percentUsed = (currentLength / maxLength) * 100;
  const isNearLimit = percentUsed >= 90;
  const isAtLimit = currentLength >= maxLength;

  const handleChange = (content: string) => {
    // Prevent exceeding max length
    if (content.length <= maxLength) {
      onChange(content);
    }
  };

  return (
    <div className="space-y-2">
      <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded" />}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline'],
              ['link', 'image'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean'],
            ],
          }}
        />
      </Suspense>
      
      <div className="flex items-center justify-between text-xs">
        <span className={`${
          isAtLimit ? 'text-destructive font-semibold' : 
          isNearLimit ? 'text-warning' : 
          'text-muted-foreground'
        }`}>
          {currentLength.toLocaleString()} / {maxLength.toLocaleString()} characters
          {isNearLimit && !isAtLimit && ' ⚠️ Approaching limit'}
          {isAtLimit && ' ⛔ Maximum length reached'}
        </span>
      </div>

      {isNearLimit && (
        <Alert variant={isAtLimit ? "destructive" : "default"} className="mt-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {isAtLimit 
              ? `${label} has reached the maximum length. Please reduce content to save.`
              : `${label} is approaching the maximum length limit.`
            }
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default RichTextEditor;
