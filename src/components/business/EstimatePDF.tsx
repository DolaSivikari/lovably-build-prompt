import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { formatCurrency, centsToDollars } from '@/utils/currency';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottom: '2 solid #1a1a2e',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  companyInfo: {
    fontSize: 9,
    color: '#666',
    lineHeight: 1.5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 30,
    textAlign: 'right',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 10,
    borderBottom: '1 solid #e0e0e0',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: 10,
    color: '#666',
    width: '30%',
  },
  value: {
    fontSize: 10,
    color: '#1a1a2e',
    width: '70%',
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a1a2e',
    color: '#ffffff',
    padding: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #e0e0e0',
    padding: 8,
  },
  tableRowAlt: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderBottom: '1 solid #e0e0e0',
    padding: 8,
  },
  col1: { width: '40%', fontSize: 9 },
  col2: { width: '15%', textAlign: 'right', fontSize: 9 },
  col3: { width: '15%', textAlign: 'right', fontSize: 9 },
  col4: { width: '15%', textAlign: 'right', fontSize: 9 },
  col5: { width: '15%', textAlign: 'right', fontSize: 9 },
  totalsSection: {
    marginTop: 20,
    marginLeft: 'auto',
    width: '40%',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 10,
  },
  totalLabel: {
    color: '#666',
  },
  totalValue: {
    color: '#1a1a2e',
    fontWeight: 'bold',
  },
  grandTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTop: '2 solid #1a1a2e',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1 solid #e0e0e0',
    fontSize: 9,
    color: '#666',
  },
  terms: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 8,
    lineHeight: 1.6,
  },
  validUntil: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff3cd',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#856404',
    textAlign: 'center',
  },
  signature: {
    marginTop: 40,
    borderTop: '1 solid #000',
    paddingTop: 5,
    width: '50%',
    fontSize: 9,
  },
});

interface EstimatePDFProps {
  estimate: any;
  client: any;
  project: any;
  lineItems: any[];
  companyInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
}

export const EstimatePDF = ({ estimate, client, project, lineItems, companyInfo }: EstimatePDFProps) => {
  const company = companyInfo || {
    name: 'Ascent Group Construction',
    address: '7895 Tranmere Drive, Unit #22\nMississauga, ON L5S 1V9',
    phone: '647-528-6804',
    email: 'info@ascentgroupconstruction.com',
  };
  
  const clientName = client?.company_name || client?.contact_name || 'N/A';
  const clientAddress = [
    client?.address_line1,
    client?.address_line2,
    [client?.city, client?.province, client?.postal_code].filter(Boolean).join(', '),
  ].filter(Boolean).join('\n');

  const projectAddress = project ? [
    project.site_address_line1,
    project.site_address_line2,
    [project.site_city, project.site_province, project.site_postal_code].filter(Boolean).join(', '),
  ].filter(Boolean).join('\n') : null;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>{company.name.toUpperCase()}</Text>
            <Text style={styles.companyInfo}>
              {company.address}{'\n'}
              Tel: {company.phone}{'\n'}
              {company.email}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>ESTIMATE</Text>

        {/* Estimate Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Estimate #:</Text>
            <Text style={styles.value}>{estimate.estimate_number}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{format(new Date(estimate.estimate_date), 'MMMM d, yyyy')}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Valid Until:</Text>
            <Text style={styles.value}>{format(new Date(estimate.valid_until), 'MMMM d, yyyy')}</Text>
          </View>
        </View>

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BILL TO</Text>
          <Text style={styles.value}>{clientName}</Text>
          {clientAddress && <Text style={styles.companyInfo}>{clientAddress}</Text>}
          {client?.email && <Text style={styles.companyInfo}>Email: {client.email}</Text>}
          {client?.phone && <Text style={styles.companyInfo}>Phone: {client.phone}</Text>}
        </View>

        {/* Project Information */}
        {project && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PROJECT</Text>
            <Text style={styles.value}>{project.project_name}</Text>
            {projectAddress && <Text style={styles.companyInfo}>{projectAddress}</Text>}
          </View>
        )}

        {/* Line Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Description</Text>
            <Text style={styles.col2}>Qty</Text>
            <Text style={styles.col3}>Unit</Text>
            <Text style={styles.col4}>Unit Price</Text>
            <Text style={styles.col5}>Total</Text>
          </View>
          {lineItems.map((item, index) => (
            <View key={item.id} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
              <Text style={styles.col1}>{item.description}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>{item.unit || 'ea'}</Text>
              <Text style={styles.col4}>{formatCurrency(item.unit_price_cents)}</Text>
              <Text style={styles.col5}>{formatCurrency(item.line_total_cents)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{formatCurrency(estimate.subtotal_cents)}</Text>
          </View>
          
          {estimate.discount_amount_cents > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Discount {estimate.discount_type === 'percentage' ? `(${estimate.discount_percentage}%)` : ''}:
              </Text>
              <Text style={styles.totalValue}>-{formatCurrency(estimate.discount_amount_cents)}</Text>
            </View>
          )}
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (HST {(estimate.tax_rate * 100).toFixed(1)}%):</Text>
            <Text style={styles.totalValue}>{formatCurrency(estimate.tax_amount_cents)}</Text>
          </View>
          
          <View style={styles.grandTotal}>
            <Text>TOTAL:</Text>
            <Text>{formatCurrency(estimate.total_cents)}</Text>
          </View>
        </View>

        {/* Valid Until Notice */}
        <View style={styles.validUntil}>
          <Text>This estimate is valid until {format(new Date(estimate.valid_until), 'MMMM d, yyyy')}</Text>
        </View>

        {/* Notes */}
        {estimate.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>NOTES</Text>
            <Text style={styles.companyInfo}>{estimate.notes}</Text>
          </View>
        )}

        {/* Terms */}
        <View style={styles.terms}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>TERMS & CONDITIONS</Text>
          <Text>
            1. This estimate is valid for 30 days from the date issued.{'\n'}
            2. All work will be completed in accordance with industry standards.{'\n'}
            3. Payment terms: 50% deposit required, balance due upon completion.{'\n'}
            4. Any changes to the scope of work may result in additional charges.{'\n'}
            5. We carry full liability insurance and WSIB coverage.
          </Text>
        </View>

        {/* Acceptance Signature */}
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 10 }}>ACCEPTANCE</Text>
          <Text style={{ fontSize: 9, marginBottom: 20 }}>
            By signing below, you accept this estimate and authorize Ascent Group to proceed with the work described above.
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.signature}>
              <Text>Client Signature</Text>
            </View>
            <View style={styles.signature}>
              <Text>Date</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={{ textAlign: 'center' }}>
            Thank you for considering Ascent Group for your project. We look forward to working with you.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
