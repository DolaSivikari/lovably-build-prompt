import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from "lucide-react";

interface ImportContactsDialogProps {
  open: boolean;
  onClose: () => void;
  onImport: (contacts: Array<{ name: string; email?: string; company?: string; phone?: string }>) => void;
}

export const ImportContactsDialog = ({
  open,
  onClose,
  onImport,
}: ImportContactsDialogProps) => {
  const [csvText, setCsvText] = useState("");
  const [error, setError] = useState("");

  const handleImport = () => {
    try {
      setError("");
      
      // Parse CSV (simple parsing - name, email, company, phone)
      const lines = csvText.trim().split('\n');
      const contacts = lines.slice(1).map(line => {
        const [name, email, company, phone] = line.split(',').map(s => s.trim());
        return { name, email, company, phone };
      }).filter(c => c.name);

      if (contacts.length === 0) {
        setError("No valid contacts found. Please check your CSV format.");
        return;
      }

      onImport(contacts);
      setCsvText("");
      onClose();
    } catch (err) {
      setError("Error parsing CSV. Please check the format.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import Contacts</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              Paste CSV data with columns: <strong>Name, Email, Company, Phone</strong>
              <br />
              Example:
              <pre className="mt-2 text-xs bg-muted p-2 rounded">
                Name,Email,Company,Phone{'\n'}
                John Doe,john@example.com,Acme Corp,(555) 123-4567
              </pre>
            </AlertDescription>
          </Alert>

          <Textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder="Paste your CSV data here..."
            rows={10}
            className="font-mono text-sm"
          />

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={!csvText.trim()}>
              <Upload className="h-4 w-4 mr-2" />
              Import Contacts
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
