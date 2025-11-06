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
  dueBox: { marginTop: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
  dueText: { fontSize: 12, fontWeight: 'bold' },
  overdueText: { fontSize: 12, fontWeight: 'bold', color: '#dc2626' },
  footer: { position: 'absolute', bottom: 40, left: 40, right: 40, textAlign: 'center', fontSize: 10, color: '#666' },
});

interface InvoicePDFProps {
  invoice: {
    invoice_number: string;
    issue_date: string;
    due_date: string;
    line_items: LineItem[];
    subtotal_cents: number;
    tax_rate: number;
    tax_amount_cents: number;
    discount_cents: number;
    total_cents: number;
    paid_cents: number;
    balance_cents: number;
    status: string;
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

export const InvoicePDF = ({ invoice, client, companyInfo }: InvoicePDFProps) => {
  const isOverdue = new Date(invoice.due_date) < new Date() && invoice.balance_cents > 0;
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.subtitle}>#{invoice.invoice_number}</Text>
          <Text style={styles.subtitle}>Issue Date: {new Date(invoice.issue_date).toLocaleDateString()}</Text>
          <Text style={styles.subtitle}>Due Date: {new Date(invoice.due_date).toLocaleDateString()}</Text>
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
            <Text style={styles.sectionTitle}>Bill To:</Text>
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
          {invoice.line_items.map((item, index) => (
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
            <Text style={styles.totalValue}>{formatCurrency(invoice.subtotal_cents)}</Text>
          </View>
          {invoice.discount_cents > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Discount:</Text>
              <Text style={styles.totalValue}>-{formatCurrency(invoice.discount_cents)}</Text>
            </View>
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax ({(invoice.tax_rate * 100).toFixed(2)}%):</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.tax_amount_cents)}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text>TOTAL:</Text>
            <Text>{formatCurrency(invoice.total_cents)}</Text>
          </View>
          {invoice.paid_cents > 0 && (
            <>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Paid:</Text>
                <Text style={styles.totalValue}>-{formatCurrency(invoice.paid_cents)}</Text>
              </View>
              <View style={[styles.grandTotal, { marginTop: 10 }]}>
                <Text>BALANCE DUE:</Text>
                <Text>{formatCurrency(invoice.balance_cents)}</Text>
              </View>
            </>
          )}
        </View>

        {/* Payment Due Box */}
        {invoice.balance_cents > 0 && (
          <View style={styles.dueBox}>
            <Text style={isOverdue ? styles.overdueText : styles.dueText}>
              {isOverdue ? 'OVERDUE: ' : 'Amount Due: '}
              {formatCurrency(invoice.balance_cents)}
            </Text>
            <Text style={[styles.subtitle, { marginTop: 5 }]}>
              {isOverdue ? `Payment was due on ${new Date(invoice.due_date).toLocaleDateString()}` : `Payment due by ${new Date(invoice.due_date).toLocaleDateString()}`}
            </Text>
          </View>
        )}

        {/* Notes */}
        {invoice.notes && (
          <View style={[styles.section, { marginTop: 30 }]}>
            <Text style={styles.sectionTitle}>Notes:</Text>
            <Text>{invoice.notes}</Text>
          </View>
        )}

        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};
