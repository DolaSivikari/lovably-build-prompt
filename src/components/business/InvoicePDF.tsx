import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { formatCurrency } from '@/utils/currency';
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
  invoiceTypeBadge: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '4 8',
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-end',
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
  balanceDue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff3cd',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1 solid #e0e0e0',
    fontSize: 9,
    color: '#666',
  },
  paymentInstructions: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e8f5e9',
    fontSize: 9,
    lineHeight: 1.6,
  },
  terms: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 8,
    lineHeight: 1.6,
  },
  overdueNotice: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffebee',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#c62828',
    textAlign: 'center',
  },
  paidStamp: {
    position: 'absolute',
    top: 200,
    right: 100,
    fontSize: 48,
    color: '#4caf50',
    fontWeight: 'bold',
    opacity: 0.3,
    transform: 'rotate(-30deg)',
  },
});

interface InvoicePDFProps {
  invoice: any;
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

export const InvoicePDF = ({ invoice, client, project, lineItems, companyInfo }: InvoicePDFProps) => {
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

  const balanceDue = invoice.total_cents - invoice.amount_paid_cents;
  const isOverdue = invoice.due_date && new Date(invoice.due_date) < new Date() && balanceDue > 0 && invoice.status !== 'cancelled';
  const isPaid = invoice.status === 'paid';

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Paid Stamp */}
        {isPaid && <Text style={styles.paidStamp}>PAID</Text>}

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

        {invoice.invoice_type && (
          <View style={styles.invoiceTypeBadge}>
            <Text>{invoice.invoice_type.toUpperCase()} INVOICE</Text>
          </View>
        )}

        <Text style={styles.title}>INVOICE</Text>

        {/* Overdue Notice */}
        {isOverdue && (
          <View style={styles.overdueNotice}>
            <Text>⚠ THIS INVOICE IS OVERDUE - IMMEDIATE PAYMENT REQUIRED</Text>
          </View>
        )}

        {/* Invoice Details */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice #:</Text>
            <Text style={styles.value}>{invoice.invoice_number}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Issue Date:</Text>
            <Text style={styles.value}>{format(new Date(invoice.invoice_date), 'MMMM d, yyyy')}</Text>
          </View>
          {invoice.due_date && (
            <View style={styles.row}>
              <Text style={styles.label}>Due Date:</Text>
              <Text style={[styles.value, isOverdue && { color: '#c62828', fontWeight: 'bold' }]}>
                {format(new Date(invoice.due_date), 'MMMM d, yyyy')}
              </Text>
            </View>
          )}
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
            <Text style={styles.totalValue}>{formatCurrency(invoice.subtotal_cents)}</Text>
          </View>
          
          {invoice.discount_amount_cents > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>
                Discount {invoice.discount_type === 'percentage' ? `(${invoice.discount_percentage}%)` : ''}:
              </Text>
              <Text style={styles.totalValue}>-{formatCurrency(invoice.discount_amount_cents)}</Text>
            </View>
          )}
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (HST {(invoice.tax_rate * 100).toFixed(1)}%):</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.tax_amount_cents)}</Text>
          </View>
          
          <View style={styles.grandTotal}>
            <Text>TOTAL:</Text>
            <Text>{formatCurrency(invoice.total_cents)}</Text>
          </View>

          {invoice.amount_paid_cents > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Amount Paid:</Text>
              <Text style={[styles.totalValue, { color: '#4caf50' }]}>
                -{formatCurrency(invoice.amount_paid_cents)}
              </Text>
            </View>
          )}
          
          {balanceDue > 0 && (
            <View style={styles.balanceDue}>
              <Text>BALANCE DUE:</Text>
              <Text>{formatCurrency(balanceDue)}</Text>
            </View>
          )}
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>NOTES</Text>
            <Text style={styles.companyInfo}>{invoice.notes}</Text>
          </View>
        )}

        {/* Payment Instructions */}
        {balanceDue > 0 && (
          <View style={styles.paymentInstructions}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>PAYMENT INSTRUCTIONS</Text>
            <Text>
              Please make payment payable to: Ascent Group{'\n'}
              {invoice.payment_instructions || 'Payment can be made by cash, check, credit card, wire transfer, or e-transfer.'}
              {'\n\n'}
              E-Transfer: payments@ascentgroup.ca{'\n'}
              Wire Transfer: Contact us for banking details{'\n'}
              {'\n'}
              Please include invoice number {invoice.invoice_number} with your payment.
            </Text>
          </View>
        )}

        {/* Terms */}
        <View style={styles.terms}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>TERMS & CONDITIONS</Text>
          <Text>
            1. Payment is due within 30 days of invoice date unless otherwise specified.{'\n'}
            2. Late payments may be subject to a 2% monthly interest charge.{'\n'}
            3. All work has been completed in accordance with industry standards.{'\n'}
            4. We carry full liability insurance and WSIB coverage.{'\n'}
            5. Any disputes must be raised within 7 days of invoice date.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={{ textAlign: 'center' }}>
            Thank you for your business! For questions about this invoice, please contact us at (416) 555-0100.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
