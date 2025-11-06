import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency } from '@/utils/currency';
import { LineItem } from '@/utils/calculations';

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica' },
  header: { marginBottom: 30 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 12, color: '#666' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', marginBottom: 8 },
  label: { width: '30%', fontWeight: 'bold' },
  value: { width: '70%' },
  table: { marginTop: 20 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#000', paddingBottom: 8, marginBottom: 8, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#eee' },
  col1: { width: '50%' },
  col2: { width: '15%', textAlign: 'right' },
  col3: { width: '20%', textAlign: 'right' },
  col4: { width: '15%', textAlign: 'right' },
  totalsSection: { marginTop: 20, marginLeft: '50%' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  totalLabel: { fontWeight: 'bold' },
  totalValue: { textAlign: 'right' },
  grandTotal: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8, borderTopWidth: 2, borderTopColor: '#000', fontWeight: 'bold', fontSize: 14 },
  footer: { position: 'absolute', bottom: 40, left: 40, right: 40, textAlign: 'center', fontSize: 10, color: '#666' },
});

interface EstimatePDFProps {
  estimate: {
    estimate_number: string;
    created_at: string;
    valid_until?: string | null;
    line_items: LineItem[];
    subtotal_cents: number;
    tax_rate: number;
    tax_amount_cents: number;
    discount_cents: number;
    total_cents: number;
    notes?: string | null;
  };
  client?: {
    name: string;
    company?: string | null;
    email?: string | null;
    phone?: string | null;
  } | null;
  companyInfo?: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
}

export const EstimatePDF = ({ estimate, client, companyInfo }: EstimatePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ESTIMATE</Text>
        <Text style={styles.subtitle}>#{estimate.estimate_number}</Text>
        <Text style={styles.subtitle}>Date: {new Date(estimate.created_at).toLocaleDateString()}</Text>
        {estimate.valid_until && (
          <Text style={styles.subtitle}>Valid Until: {new Date(estimate.valid_until).toLocaleDateString()}</Text>
        )}
      </View>

      {/* Company Info */}
      {companyInfo && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>From:</Text>
          <Text>{companyInfo.name}</Text>
          {companyInfo.address && <Text>{companyInfo.address}</Text>}
          {companyInfo.phone && <Text>Phone: {companyInfo.phone}</Text>}
          {companyInfo.email && <Text>Email: {companyInfo.email}</Text>}
        </View>
      )}

      {/* Client Info */}
      {client && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>To:</Text>
          <Text>{client.name}</Text>
          {client.company && <Text>{client.company}</Text>}
          {client.email && <Text>Email: {client.email}</Text>}
          {client.phone && <Text>Phone: {client.phone}</Text>}
        </View>
      )}

      {/* Line Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.col1}>Description</Text>
          <Text style={styles.col2}>Qty</Text>
          <Text style={styles.col3}>Unit Price</Text>
          <Text style={styles.col4}>Total</Text>
        </View>
        {estimate.line_items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.col1}>{item.description}</Text>
            <Text style={styles.col2}>{item.quantity}</Text>
            <Text style={styles.col3}>{formatCurrency(item.unit_price_cents)}</Text>
            <Text style={styles.col4}>{formatCurrency(item.line_total_cents || 0)}</Text>
          </View>
        ))}
      </View>

      {/* Totals */}
      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>{formatCurrency(estimate.subtotal_cents)}</Text>
        </View>
        {estimate.discount_cents > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount:</Text>
            <Text style={styles.totalValue}>-{formatCurrency(estimate.discount_cents)}</Text>
          </View>
        )}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax ({(estimate.tax_rate * 100).toFixed(2)}%):</Text>
          <Text style={styles.totalValue}>{formatCurrency(estimate.tax_amount_cents)}</Text>
        </View>
        <View style={styles.grandTotal}>
          <Text>TOTAL:</Text>
          <Text>{formatCurrency(estimate.total_cents)}</Text>
        </View>
      </View>

      {/* Notes */}
      {estimate.notes && (
        <View style={[styles.section, { marginTop: 30 }]}>
          <Text style={styles.sectionTitle}>Notes:</Text>
          <Text>{estimate.notes}</Text>
        </View>
      )}

      <Text style={styles.footer}>Thank you for your business!</Text>
    </Page>
  </Document>
);
