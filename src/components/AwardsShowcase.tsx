import { useState, useEffect } from 'react';
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Shield, Star, CheckCircle2, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AwardCertification {
  id: string;
  title: string;
  issuing_organization: string;
  date_received: string;
  expiry_date: string | null;
  category: 'certification' | 'award' | 'membership' | 'accreditation';
  badge_image_url: string | null;
  credential_number: string | null;
  verification_url: string | null;
  description: string | null;
  display_order: number;
  is_active: boolean;
}

interface AwardsShowcaseProps {
  homepageOnly?: boolean;
  maxItems?: number;
}

const AwardsShowcase = ({ homepageOnly = false, maxItems }: AwardsShowcaseProps) => {
  const [awards, setAwards] = useState<AwardCertification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        let query = supabase
          .from('awards_certifications')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (homepageOnly) {
          query = query.eq('show_on_homepage', true);
        }

        if (maxItems) {
          query = query.limit(maxItems);
        }

        const { data, error } = await query;

        if (error) throw error;
        setAwards(data as AwardCertification[] || []);
      } catch (error) {
        console.error('Error fetching awards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, [homepageOnly, maxItems]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'certification':
        return Shield;
      case 'award':
        return Star;
      case 'membership':
        return CheckCircle2;
      case 'accreditation':
        return Award;
      default:
        return Award;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  if (awards.length === 0) {
    return null;
  }

  const groupedAwards = awards.reduce((acc, award) => {
    if (!acc[award.category]) {
      acc[award.category] = [];
    }
    acc[award.category].push(award);
    return acc;
  }, {} as Record<string, AwardCertification[]>);

  return (
    <div className="space-y-12">
      {Object.entries(groupedAwards).map(([category, categoryAwards]) => (
        <div key={category}>
          <h3 className="text-2xl font-bold mb-6 capitalize flex items-center gap-2">
            {React.createElement(getCategoryIcon(category), {
              className: 'w-6 h-6 text-primary',
            })}
            {category}s
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryAwards.map((award) => {
              const Icon = getCategoryIcon(award.category);
              return (
                <Card
                  key={award.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    {award.badge_image_url ? (
                      <div className="mb-4 flex justify-center">
                        <img
                          src={award.badge_image_url}
                          alt={award.title}
                          className="h-24 w-24 object-contain"
                        />
                      </div>
                    ) : (
                      <div className="mb-4 flex justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                    )}

                    <h4 className="text-lg font-bold mb-2 text-center">{award.title}</h4>

                    <p className="text-sm text-muted-foreground text-center mb-3">
                      {award.issuing_organization}
                    </p>

                    {award.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {award.description}
                      </p>
                    )}

                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Issued:</span>
                        <span className="font-medium">
                          {new Date(award.date_received).toLocaleDateString()}
                        </span>
                      </div>

                      {award.expiry_date && (
                        <div className="flex justify-between">
                          <span>Expires:</span>
                          <span className="font-medium">
                            {new Date(award.expiry_date).toLocaleDateString()}
                          </span>
                        </div>
                      )}

                      {award.credential_number && (
                        <div className="flex justify-between">
                          <span>Credential:</span>
                          <span className="font-mono text-xs">{award.credential_number}</span>
                        </div>
                      )}
                    </div>

                    {award.verification_url && (
                      <a
                        href={award.verification_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                      >
                        Verify Credential
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AwardsShowcase;
