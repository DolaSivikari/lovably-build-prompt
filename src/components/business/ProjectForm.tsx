import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ClientSelector } from './ClientSelector';
import { CurrencyInput } from './CurrencyInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ProjectFormProps {
  projectId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PROJECT_STATUSES = [
  { value: 'lead', label: 'Lead' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const PROJECT_TYPES = [
  'Interior Painting',
  'Exterior Painting',
  'Restoration',
  'Waterproofing',
  'Masonry',
  'Caulking',
  'Mixed Services',
];

export const ProjectForm = ({ projectId, onSuccess, onCancel }: ProjectFormProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    project_name: '',
    client_id: '',
    project_type: '',
    status: 'lead',
    priority: 'normal',
    site_address_line1: '',
    site_address_line2: '',
    site_city: '',
    site_province: 'ON',
    site_postal_code: '',
    description: '',
    notes: '',
    square_footage: '',
    estimated_value_cents: 0,
    actual_value_cents: 0,
    inquiry_date: '',
    quote_date: '',
    scheduled_start_date: '',
    estimated_completion_date: '',
    actual_completion_date: '',
    crew_assignment: '',
  });

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    const { data, error } = await supabase
      .from('business_projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error) {
      toast.error('Failed to load project');
      return;
    }

    if (data) {
      setFormData({
        ...data,
        square_footage: data.square_footage?.toString() || '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const submitData: any = {
      ...formData,
      square_footage: formData.square_footage ? parseFloat(formData.square_footage) : null,
      inquiry_date: formData.inquiry_date || null,
      quote_date: formData.quote_date || null,
      scheduled_start_date: formData.scheduled_start_date || null,
      estimated_completion_date: formData.estimated_completion_date || null,
      actual_completion_date: formData.actual_completion_date || null,
    };

    if (projectId) {
      const { error } = await supabase
        .from('business_projects')
        .update(submitData)
        .eq('id', projectId);

      if (error) {
        toast.error('Failed to update project');
        setLoading(false);
        return;
      }
      toast.success('Project updated successfully');
    } else {
      const { error } = await supabase
        .from('business_projects')
        .insert([submitData]);

      if (error) {
        toast.error('Failed to create project');
        setLoading(false);
        return;
      }
      toast.success('Project created successfully');
    }

    setLoading(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="project_name">Project Name *</Label>
          <Input
            id="project_name"
            value={formData.project_name}
            onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Client *</Label>
          <ClientSelector
            value={formData.client_id}
            onChange={(clientId) => setFormData({ ...formData, client_id: clientId })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="project_type">Project Type</Label>
          <Select value={formData.project_type} onValueChange={(value) => setFormData({ ...formData, project_type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRIORITIES.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>{priority.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="square_footage">Square Footage</Label>
          <Input
            id="square_footage"
            type="number"
            step="0.01"
            value={formData.square_footage}
            onChange={(e) => setFormData({ ...formData, square_footage: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Site Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="site_address_line1">Address Line 1</Label>
            <Input
              id="site_address_line1"
              value={formData.site_address_line1}
              onChange={(e) => setFormData({ ...formData, site_address_line1: e.target.value })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="site_address_line2">Address Line 2</Label>
            <Input
              id="site_address_line2"
              value={formData.site_address_line2}
              onChange={(e) => setFormData({ ...formData, site_address_line2: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site_city">City</Label>
            <Input
              id="site_city"
              value={formData.site_city}
              onChange={(e) => setFormData({ ...formData, site_city: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site_province">Province</Label>
            <Input
              id="site_province"
              value={formData.site_province}
              onChange={(e) => setFormData({ ...formData, site_province: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="site_postal_code">Postal Code</Label>
            <Input
              id="site_postal_code"
              value={formData.site_postal_code}
              onChange={(e) => setFormData({ ...formData, site_postal_code: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="estimated_value_cents">Estimated Value</Label>
          <CurrencyInput
            value={formData.estimated_value_cents}
            onChange={(cents) => setFormData({ ...formData, estimated_value_cents: cents })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="actual_value_cents">Actual Value</Label>
          <CurrencyInput
            value={formData.actual_value_cents}
            onChange={(cents) => setFormData({ ...formData, actual_value_cents: cents })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="inquiry_date">Inquiry Date</Label>
          <Input
            id="inquiry_date"
            type="date"
            value={formData.inquiry_date}
            onChange={(e) => setFormData({ ...formData, inquiry_date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quote_date">Quote Date</Label>
          <Input
            id="quote_date"
            type="date"
            value={formData.quote_date}
            onChange={(e) => setFormData({ ...formData, quote_date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scheduled_start_date">Scheduled Start</Label>
          <Input
            id="scheduled_start_date"
            type="date"
            value={formData.scheduled_start_date}
            onChange={(e) => setFormData({ ...formData, scheduled_start_date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimated_completion_date">Estimated Completion</Label>
          <Input
            id="estimated_completion_date"
            type="date"
            value={formData.estimated_completion_date}
            onChange={(e) => setFormData({ ...formData, estimated_completion_date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="actual_completion_date">Actual Completion</Label>
          <Input
            id="actual_completion_date"
            type="date"
            value={formData.actual_completion_date}
            onChange={(e) => setFormData({ ...formData, actual_completion_date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="crew_assignment">Crew Assignment</Label>
          <Input
            id="crew_assignment"
            value={formData.crew_assignment}
            onChange={(e) => setFormData({ ...formData, crew_assignment: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Internal Notes</Label>
        <Textarea
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : projectId ? 'Update Project' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
};
