import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, Upload, CheckCircle2 } from 'lucide-react';

interface ImportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const ImportContactsDialog = ({ open, onOpenChange, onSuccess }: ImportContactsDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [contactCount, setContactCount] = useState(0);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (open) {
      checkAvailableContacts();
    }
  }, [open]);

  const checkAvailableContacts = async () => {
    setChecking(true);
    try {
      // Count contacts that haven't been imported yet
      const { count, error } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .or('status.is.null,status.neq.imported');

      if (error) throw error;
      setContactCount(count || 0);
    } catch (error) {
      console.error('Error checking contacts:', error);
      toast({
        title: 'Error',
        description: 'Failed to check available contacts',
        variant: 'destructive',
      });
    } finally {
      setChecking(false);
    }
  };

  const handleImport = async () => {
    setLoading(true);
    try {
      // Fetch all non-imported contact submissions
      const { data: contacts, error: fetchError } = await supabase
        .from('contact_submissions')
        .select('*')
        .or('status.is.null,status.neq.imported');

      if (fetchError) throw fetchError;
      if (!contacts || contacts.length === 0) {
        toast({
          title: 'No contacts',
          description: 'No new contacts to import',
        });
        return;
      }

      // Check for existing clients by email to avoid duplicates
      const emails = contacts.map(c => c.email).filter(Boolean);
      const { data: existingClients, error: checkError } = await supabase
        .from('business_clients')
        .select('email')
        .in('email', emails);

      if (checkError) throw checkError;

      const existingEmails = new Set(existingClients?.map(c => c.email) || []);

      // Prepare clients data
      const clientsToImport = contacts
        .filter(contact => !existingEmails.has(contact.email))
        .map(contact => ({
          contact_name: contact.name,
          email: contact.email,
          phone: contact.phone || '',
          company_name: contact.company || null,
          client_type: (contact.submission_type === 'commercial' ? 'commercial' : 'residential') as 'commercial' | 'residential',
          source: 'website_contact_form',
          notes: contact.message || '',
        }));

      if (clientsToImport.length === 0) {
        toast({
          title: 'No new clients',
          description: 'All contacts have already been imported',
        });
        onOpenChange(false);
        return;
      }

      // Bulk insert clients
      const { error: insertError } = await supabase
        .from('business_clients')
        .insert(clientsToImport);

      if (insertError) throw insertError;

      // Mark contacts as imported
      const { error: updateError } = await supabase
        .from('contact_submissions')
        .update({ status: 'imported' })
        .in('email', clientsToImport.map(c => c.email));

      if (updateError) throw updateError;

      toast({
        title: 'Success!',
        description: `Imported ${clientsToImport.length} new clients`,
      });

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error importing contacts:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to import contacts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-slate-200">Import Contacts from Website</DialogTitle>
          <DialogDescription className="text-slate-400">
            This will create new clients from your website contact form submissions.
            Duplicate emails will be skipped automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {checking ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Upload className="h-10 w-10 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-200">{contactCount}</p>
                    <p className="text-sm text-slate-400">
                      {contactCount === 1 ? 'contact' : 'contacts'} available to import
                    </p>
                  </div>
                </div>
              </div>

              {contactCount > 0 && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-slate-300">
                      <p className="font-medium mb-1">What will happen:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-400">
                        <li>New clients will be created with contact information</li>
                        <li>Duplicate emails will be skipped automatically</li>
                        <li>Original messages will be saved in client notes</li>
                        <li>Contact submissions will be marked as "imported"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {contactCount === 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-400">No new contacts available to import.</p>
                  <p className="text-sm text-slate-500 mt-2">
                    All contact submissions have already been imported or there are no submissions yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="border-slate-700 hover:bg-slate-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={loading || checking || contactCount === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Importing...' : `Import ${contactCount} ${contactCount === 1 ? 'Contact' : 'Contacts'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
