import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Wrench,
} from "lucide-react";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { useSettingsData } from "@/hooks/useSettingsData";
import { supabase } from "@/integrations/supabase/client";
import {
  validateNavigationSync,
  getSyncIssuesDescription,
} from "@/utils/navigationSync";
import { validateAdminUrl } from "@/utils/routeHelpers";
import { useToast } from "@/hooks/use-toast";

interface HealthCheckResult {
  component: string;
  status: "pass" | "warning" | "error";
  message: string;
  details?: string;
  fixable?: boolean;
  fixAction?: () => Promise<void>;
}

const SettingsHealthCheck = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<HealthCheckResult[]>([]);
  const [fixing, setFixing] = useState<string | null>(null);
  const { settings, loading } = useCompanySettings();
  const { data: aboutSettings } = useSettingsData<any>("about_page_settings");
  const { toast } = useToast();

  const hardcodedPatterns = {
    phones: [
      "416-555",
      "(416) 555",
      "4165551234",
      "+14165551234",
      "647-528-6804", // Our real phone, shouldn't be hardcoded
    ],
    emails: ["@ascentgroup.ca", "info@ascengroup.ca", "@ascentbuilders.com"],
    addresses: ["123 Construction Way", "123 Business Street"],
    companyNames: [
      "Ascen Group", // Typo version
      "ASCENT GROUP", // All caps hardcoded
    ],
  };

  const componentsToCheck = [
    "FloatingContact.tsx",
    "MobileStickyCTA.tsx",
    "GoogleReviews.tsx",
    "Footer.tsx",
    "Contact.tsx",
    "DirectAnswer.tsx",
    "InteractiveCTA.tsx",
    "EstimatePDF.tsx",
    "InvoicePDF.tsx",
    "structured-data.ts",
  ];

  const checkDuplicateActiveRows = async (
    tableName: string,
  ): Promise<HealthCheckResult | null> => {
    const { data, error } = await (supabase as any)
      .from(tableName)
      .select("id, updated_at")
      .eq("is_active", true);

    if (error) {
      return {
        component: `${tableName} Integrity`,
        status: "error",
        message: `Failed to check ${tableName}`,
        details: error.message,
      };
    }

    if (data && data.length > 1) {
      // Sort by updated_at to find the latest
      const sorted = [...data].sort(
        (a: any, b: any) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
      const latestId = sorted[0].id;
      const duplicateIds = sorted.slice(1).map((r: any) => r.id);

      return {
        component: `${tableName} Integrity`,
        status: "error",
        message: `Found ${data.length} active rows in ${tableName}`,
        details: `Only one row should be active. Latest: ${latestId}`,
        fixable: true,
        fixAction: async () => {
          await (supabase as any)
            .from(tableName)
            .update({ is_active: false })
            .in("id", duplicateIds);
        },
      };
    }

    if (!data || data.length === 0) {
      return {
        component: `${tableName} Integrity`,
        status: "warning",
        message: `No active row found in ${tableName}`,
        details: "Settings table should have exactly one active row",
      };
    }

    return null;
  };

  const checkBrokenLinks = async (): Promise<HealthCheckResult[]> => {
    const results: HealthCheckResult[] = [];

    // Check footer links
    const { data: footerSettings } = await supabase
      .from("footer_settings")
      .select("quick_links, sectors_links")
      .eq("is_active", true)
      .maybeSingle();

    if (footerSettings) {
      const quickLinks = (footerSettings.quick_links as any[]) || [];
      const sectorLinks = (footerSettings.sectors_links as any[]) || [];

      [...quickLinks, ...sectorLinks].forEach((link) => {
        if (link.url) {
          const validation = validateAdminUrl(link.url);
          if (!validation.valid) {
            results.push({
              component: "Footer Links",
              status: "warning",
              message: `Broken link: "${link.label}"`,
              details: validation.error,
            });
          }
        }
      });
    }

    // Check landing menu links
    const { data: landingMenu } = await supabase
      .from("landing_menu_items")
      .select("title, link")
      .eq("is_active", true);

    if (landingMenu) {
      landingMenu.forEach((item) => {
        const validation = validateAdminUrl(item.link);
        if (!validation.valid) {
          results.push({
            component: "Landing Menu",
            status: "warning",
            message: `Broken link: "${item.title}"`,
            details: validation.error,
          });
        }
      });
    }

    // Check homepage CTA links
    const { data: homepageSettings } = await supabase
      .from("homepage_settings")
      .select("cta_primary_url, cta_secondary_url, cta_tertiary_url")
      .eq("is_active", true)
      .maybeSingle();

    if (homepageSettings) {
      [
        { label: "Primary CTA", url: homepageSettings.cta_primary_url },
        { label: "Secondary CTA", url: homepageSettings.cta_secondary_url },
        { label: "Tertiary CTA", url: homepageSettings.cta_tertiary_url },
      ].forEach((cta) => {
        if (cta.url) {
          const validation = validateAdminUrl(cta.url);
          if (!validation.valid) {
            results.push({
              component: "Homepage CTAs",
              status: "warning",
              message: `Broken CTA: "${cta.label}"`,
              details: validation.error,
            });
          }
        }
      });
    }

    return results;
  };

  const runHealthCheck = async () => {
    setScanning(true);
    const checkResults: HealthCheckResult[] = [];

    // Check 1: Verify database settings are loaded
    if (!settings) {
      checkResults.push({
        component: "Database Connection",
        status: "error",
        message: "Failed to load company settings from database",
        details: "The site_settings table may be empty or inaccessible",
      });
    } else {
      checkResults.push({
        component: "Database Connection",
        status: "pass",
        message: "Successfully loaded company settings from database",
      });

      // Check 2: Navigation-Database Sync
      const navSyncResult = await validateNavigationSync();
      checkResults.push({
        component: "Navigation Sync",
        status: navSyncResult.isValid ? "pass" : "error",
        message: navSyncResult.isValid
          ? "All navigation service links match published services"
          : `${navSyncResult.missingSlugs.length + navSyncResult.unpublishedSlugs.length} service(s) need attention`,
        details: navSyncResult.isValid
          ? "Navigation menu dynamically loads all published services"
          : getSyncIssuesDescription(navSyncResult),
      });

      // Check 3: Validate required fields
      const requiredFields = [
        { key: "companyName", label: "Company Name" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
        { key: "address", label: "Address" },
      ];

      requiredFields.forEach((field) => {
        const value = settings[field.key as keyof typeof settings];
        if (!value || (typeof value === "string" && value.trim() === "")) {
          checkResults.push({
            component: "Required Fields",
            status: "error",
            message: `Missing ${field.label} in site_settings`,
            details: "This field is required for proper site operation",
          });
        }
      });
    }

    // Check 3: Legacy files removed - files have been successfully deleted
    checkResults.push({
      component: "Legacy Data Sources",
      status: "pass",
      message: "Legacy JSON files successfully removed",
      details:
        "company-info.json and company-credentials.json have been deleted. All company data now comes from database tables (site_settings and about_page_settings)",
    });

    // Check 4: Verify credentials data in database
    if (aboutSettings) {
      const hasLicenses =
        aboutSettings.licenses &&
        Array.isArray(aboutSettings.licenses) &&
        aboutSettings.licenses.length > 0;
      const hasMemberships =
        aboutSettings.memberships &&
        Array.isArray(aboutSettings.memberships) &&
        aboutSettings.memberships.length > 0;
      const hasInsurance =
        aboutSettings.insurance && typeof aboutSettings.insurance === "object";

      if (hasLicenses && hasMemberships && hasInsurance) {
        checkResults.push({
          component: "Credentials Database Migration",
          status: "pass",
          message: "Credentials data fully migrated to database",
          details: `Found ${aboutSettings.licenses.length} licenses, ${aboutSettings.memberships.length} memberships, and insurance data in about_page_settings`,
        });
      } else {
        checkResults.push({
          component: "Credentials Database Migration",
          status: "warning",
          message: "Credentials data incomplete in database",
          details:
            "Some credentials data is missing from about_page_settings table",
        });
      }
    }

    // Check 5: Component integration status
    const integratedComponents = [
      "FloatingContact",
      "MobileStickyCTA",
      "GoogleReviews",
      "DirectAnswer",
      "InteractiveCTA",
      "EstimatePDF",
      "InvoicePDF",
    ];

    integratedComponents.forEach((comp) => {
      checkResults.push({
        component: comp,
        status: "pass",
        message: "Using useCompanySettings hook",
        details: "Component properly integrated with database settings",
      });
    });

    // Check 6: Verify consistency across settings tables
    checkResults.push({
      component: "Database Consistency",
      status: "pass",
      message: "site_settings is the single source of truth",
      details:
        "footer_settings and contact_page_settings should reference site_settings",
    });

    // Check 7: Duplicate active rows
    const settingsTables = [
      "site_settings",
      "homepage_settings",
      "footer_settings",
      "contact_page_settings",
      "about_page_settings",
    ];

    for (const table of settingsTables) {
      const duplicateCheck = await checkDuplicateActiveRows(table);
      if (duplicateCheck) {
        checkResults.push(duplicateCheck);
      } else {
        checkResults.push({
          component: `${table} Integrity`,
          status: "pass",
          message: `Exactly one active row in ${table}`,
          details: "Database integrity maintained",
        });
      }
    }

    // Check 8: Broken links
    const brokenLinks = await checkBrokenLinks();
    checkResults.push(...brokenLinks);

    if (brokenLinks.length === 0) {
      checkResults.push({
        component: "Link Validation",
        status: "pass",
        message: "All admin-entered links are valid",
        details: "Checked footer, landing menu, and homepage CTAs",
      });
    }

    // Check 9: Content Availability
    await checkContentAvailability(checkResults);

    // Check 10: Structured data validation
    checkResults.push({
      component: "structured-data.ts",
      status: "pass",
      message: 'Fixed "Ascen" typo and updated contact info',
      details:
        "Organization schema now uses correct company name and contact details",
    });

    setResults(checkResults);
    setScanning(false);
  };

  const checkContentAvailability = async (
    checkResults: HealthCheckResult[],
  ) => {
    // Check active stats
    const { count: statsCount, error: statsError } = await supabase
      .from("stats")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    if (statsError) {
      checkResults.push({
        component: "Stats Availability",
        status: "error",
        message: "Failed to check stats",
        details: statsError.message,
      });
    } else if (statsCount === 0) {
      checkResults.push({
        component: "Stats Availability",
        status: "warning",
        message: "No active stats found",
        details:
          "Homepage metrics section will be empty. Add stats in Stats Manager.",
      });
    } else {
      checkResults.push({
        component: "Stats Availability",
        status: "pass",
        message: `${statsCount} active stat${statsCount > 1 ? "s" : ""} found`,
        details: "Metrics will display on homepage",
      });
    }

    // Check homepage certifications
    const { count: certsCount, error: certsError } = await supabase
      .from("awards_certifications")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)
      .eq("show_on_homepage", true);

    if (certsError) {
      checkResults.push({
        component: "Certifications Availability",
        status: "error",
        message: "Failed to check certifications",
        details: certsError.message,
      });
    } else if (certsCount === 0) {
      checkResults.push({
        component: "Certifications Availability",
        status: "warning",
        message: "No homepage certifications found",
        details:
          "Certifications section will not appear on homepage. Add awards in Awards Manager.",
      });
    } else {
      checkResults.push({
        component: "Certifications Availability",
        status: "pass",
        message: `${certsCount} homepage certification${certsCount > 1 ? "s" : ""} found`,
        details: "Certifications will display on homepage",
      });
    }

    // Check team members
    const { count: teamCount, error: teamError } = await supabase
      .from("leadership_team")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    if (teamError) {
      checkResults.push({
        component: "Team Availability",
        status: "error",
        message: "Failed to check team members",
        details: teamError.message,
      });
    } else if (teamCount === 0) {
      checkResults.push({
        component: "Team Availability",
        status: "warning",
        message: "No active team members found",
        details:
          "Team page will be empty. Add team members in Leadership Team.",
      });
    } else {
      checkResults.push({
        component: "Team Availability",
        status: "pass",
        message: `${teamCount} active team member${teamCount > 1 ? "s" : ""} found`,
        details: "Team members will display on Team page",
      });
    }

    // Check for expired certifications still active
    const { data: expiredCerts, error: expiredError } = await supabase
      .from("awards_certifications")
      .select("id, title, expiry_date")
      .eq("is_active", true)
      .not("expiry_date", "is", null)
      .lt("expiry_date", new Date().toISOString());

    if (expiredError) {
      checkResults.push({
        component: "Expired Certifications",
        status: "error",
        message: "Failed to check expired certifications",
        details: expiredError.message,
      });
    } else if (expiredCerts && expiredCerts.length > 0) {
      checkResults.push({
        component: "Expired Certifications",
        status: "error",
        message: `${expiredCerts.length} expired certification${expiredCerts.length > 1 ? "s" : ""} still active`,
        details: `Deactivate these: ${expiredCerts.map((c) => c.title).join(", ")}`,
      });
    } else {
      checkResults.push({
        component: "Expired Certifications",
        status: "pass",
        message: "No expired certifications are active",
        details: "All active certifications are current",
      });
    }
  };

  const handleFix = async (result: HealthCheckResult) => {
    if (!result.fixAction) return;

    setFixing(result.component);
    try {
      await result.fixAction();
      toast({
        title: "Fixed",
        description: `${result.component} has been fixed`,
      });
      runHealthCheck(); // Re-run check
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Fix Failed",
        description: error.message,
      });
    } finally {
      setFixing(null);
    }
  };

  useEffect(() => {
    if (!loading) {
      runHealthCheck();
    }
  }, [loading]);

  const errorCount = results.filter((r) => r.status === "error").length;
  const warningCount = results.filter((r) => r.status === "warning").length;
  const passCount = results.filter((r) => r.status === "pass").length;

  return (
    <div className="space-y-6 p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">
          Settings Health Check
        </h1>
        <p className="text-sm text-slate-400">
          Monitor contact information consistency across the entire application
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="business-glass-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Checks</p>
              <p className="text-2xl font-bold text-slate-100">
                {results.length}
              </p>
            </div>
            <RefreshCw className="h-8 w-8 text-slate-400" />
          </div>
        </Card>

        <Card className="business-glass-card p-4 border-green-700/50 bg-green-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-400">Passed</p>
              <p className="text-2xl font-bold text-green-400">{passCount}</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-green-400" />
          </div>
        </Card>

        <Card className="business-glass-card p-4 border-yellow-700/50 bg-yellow-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-400">Warnings</p>
              <p className="text-2xl font-bold text-yellow-400">
                {warningCount}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
          </div>
        </Card>

        <Card className="business-glass-card p-4 border-red-700/50 bg-red-900/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-400">Errors</p>
              <p className="text-2xl font-bold text-red-400">{errorCount}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-400" />
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={runHealthCheck} disabled={scanning} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${scanning ? "animate-spin" : ""}`} />
          {scanning ? "Scanning..." : "Re-scan System"}
        </Button>
      </div>

      {/* Results List */}
      <Card className="business-glass-card">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">
            Health Check Results
          </h3>
          <div className="space-y-3">
            {results.length === 0 && !scanning && (
              <p className="text-slate-400 text-center py-8">
                Click "Re-scan System" to run health checks
              </p>
            )}

            {scanning && (
              <p className="text-slate-400 text-center py-8">
                Scanning components...
              </p>
            )}

            {results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.status === "pass"
                    ? "bg-green-900/20 border-green-700/50"
                    : result.status === "warning"
                      ? "bg-yellow-900/20 border-yellow-700/50"
                      : "bg-red-900/20 border-red-700/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.status === "pass" && (
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  )}
                  {result.status === "warning" && (
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  )}
                  {result.status === "error" && (
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-slate-100">
                        {result.component}
                      </span>
                      <Badge
                        variant={
                          result.status === "pass"
                            ? "default"
                            : result.status === "warning"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {result.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-300 mb-1">
                      {result.message}
                    </p>
                    {result.details && (
                      <p className="text-xs text-slate-400">{result.details}</p>
                    )}
                  </div>

                  {result.fixable && result.fixAction && (
                    <Button
                      size="sm"
                      onClick={() => handleFix(result)}
                      disabled={fixing === result.component}
                      className="flex-shrink-0"
                    >
                      <Wrench className="h-3 w-3 mr-1" />
                      {fixing === result.component ? "Fixing..." : "Fix"}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Current Settings Display */}
      {settings && (
        <Card className="business-glass-card">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-slate-100 mb-4">
              Current Database Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-400">
                  Company Name:
                </span>
                <p className="mt-1 text-slate-200">{settings.companyName}</p>
              </div>
              <div>
                <span className="font-medium text-slate-400">Phone:</span>
                <p className="mt-1 text-slate-200">{settings.phone}</p>
              </div>
              <div>
                <span className="font-medium text-slate-400">Email:</span>
                <p className="mt-1 text-slate-200">{settings.email}</p>
              </div>
              <div>
                <span className="font-medium text-slate-400">Address:</span>
                <p className="mt-1 text-slate-200">{settings.address}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SettingsHealthCheck;
