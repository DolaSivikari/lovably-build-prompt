import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { formatCurrency } from "@/utils/currency";
import { LineItem } from "@/utils/calculations";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#1a365d",
  },
  logoSection: {
    width: "40%",
  },
  logo: {
    width: 120,
    height: "auto",
    marginBottom: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 4,
  },
  titleSection: {
    width: "50%",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 8,
  },
  invoiceNumber: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 10,
    color: "#666",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  infoBox: {
    width: "48%",
    padding: 15,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 10,
    color: "#334155",
    marginBottom: 3,
  },
  table: {
    marginTop: 25,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1a365d",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  tableHeaderText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  col1: { width: "50%" },
  col2: { width: "15%", textAlign: "right" },
  col3: { width: "20%", textAlign: "right" },
  col4: { width: "15%", textAlign: "right" },
  totalsSection: {
    marginTop: 20,
    marginLeft: "55%",
    padding: 15,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalLabel: {
    fontSize: 10,
    color: "#64748b",
  },
  totalValue: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "right",
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#1a365d",
  },
  grandTotalText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a365d",
  },
  dueBox: {
    marginTop: 20,
    padding: 15,
    borderLeftWidth: 4,
    borderRadius: 4,
  },
  dueBoxPending: {
    backgroundColor: "#fffbeb",
    borderLeftColor: "#f59e0b",
  },
  dueBoxOverdue: {
    backgroundColor: "#fef2f2",
    borderLeftColor: "#ef4444",
  },
  dueBoxPaid: {
    backgroundColor: "#f0fdf4",
    borderLeftColor: "#22c55e",
  },
  dueText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#92400e",
  },
  overdueText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#dc2626",
  },
  paidText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#15803d",
  },
  notesSection: {
    marginTop: 25,
    padding: 15,
    backgroundColor: "#fffbeb",
    borderLeftWidth: 3,
    borderLeftColor: "#f59e0b",
  },
  notesTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#92400e",
    marginBottom: 6,
  },
  notesText: {
    fontSize: 9,
    color: "#78350f",
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  footerText: {
    textAlign: "center",
    fontSize: 9,
    color: "#94a3b8",
  },
  paymentTerms: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#dbeafe",
    borderRadius: 4,
  },
  paymentTermsText: {
    fontSize: 9,
    color: "#1e40af",
    textAlign: "center",
  },
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

export const InvoicePDF = ({
  invoice,
  client,
  companyInfo,
}: InvoicePDFProps) => {
  const isOverdue =
    new Date(invoice.due_date) < new Date() && invoice.balance_cents > 0;
  const isPaid = invoice.balance_cents === 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logo and Title */}
        <View style={styles.headerContainer}>
          <View style={styles.logoSection}>
            {companyInfo && (
              <>
                <Text style={styles.companyName}>{companyInfo.name}</Text>
                {companyInfo.address && (
                  <Text style={styles.infoText}>{companyInfo.address}</Text>
                )}
                {companyInfo.phone && (
                  <Text style={styles.infoText}>{companyInfo.phone}</Text>
                )}
                {companyInfo.email && (
                  <Text style={styles.infoText}>{companyInfo.email}</Text>
                )}
              </>
            )}
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{invoice.invoice_number}</Text>
            <Text style={styles.dateText}>
              Issue Date:{" "}
              {new Date(invoice.issue_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>

        {/* Client Info and Payment Details */}
        <View style={styles.infoSection}>
          {client && (
            <View style={styles.infoBox}>
              <Text style={styles.sectionTitle}>Bill To</Text>
              <Text
                style={[styles.infoText, { fontWeight: "bold", fontSize: 11 }]}
              >
                {client.name}
              </Text>
              {client.company && (
                <Text style={styles.infoText}>{client.company}</Text>
              )}
              {client.email && (
                <Text style={styles.infoText}>{client.email}</Text>
              )}
              {client.phone && (
                <Text style={styles.infoText}>{client.phone}</Text>
              )}
            </View>
          )}
          <View style={styles.infoBox}>
            <Text style={styles.sectionTitle}>Payment Details</Text>
            <Text style={styles.infoText}>
              Invoice Date: {new Date(invoice.issue_date).toLocaleDateString()}
            </Text>
            <Text style={[styles.infoText, { fontWeight: "bold" }]}>
              Due Date: {new Date(invoice.due_date).toLocaleDateString()}
            </Text>
            <Text
              style={[
                styles.infoText,
                {
                  marginTop: 4,
                  color: isPaid ? "#15803d" : isOverdue ? "#dc2626" : "#0369a1",
                  fontWeight: "bold",
                },
              ]}
            >
              Status: {isPaid ? "PAID" : isOverdue ? "OVERDUE" : "PENDING"}
            </Text>
          </View>
        </View>

        {/* Line Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.col1, styles.tableHeaderText]}>
              Description
            </Text>
            <Text style={[styles.col2, styles.tableHeaderText]}>Qty</Text>
            <Text style={[styles.col3, styles.tableHeaderText]}>
              Unit Price
            </Text>
            <Text style={[styles.col4, styles.tableHeaderText]}>Total</Text>
          </View>
          {invoice.line_items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{item.description}</Text>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>
                {formatCurrency(item.unit_price_cents)}
              </Text>
              <Text style={styles.col4}>
                {formatCurrency(item.line_total_cents || 0)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.subtotal_cents)}
            </Text>
          </View>
          {invoice.discount_cents > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Discount</Text>
              <Text style={styles.totalValue}>
                -{formatCurrency(invoice.discount_cents)}
              </Text>
            </View>
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Tax ({(invoice.tax_rate * 100).toFixed(1)}%)
            </Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.tax_amount_cents)}
            </Text>
          </View>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalText}>TOTAL</Text>
            <Text style={styles.grandTotalText}>
              {formatCurrency(invoice.total_cents)}
            </Text>
          </View>
          {invoice.paid_cents > 0 && (
            <>
              <View style={[styles.totalRow, { marginTop: 10 }]}>
                <Text style={styles.totalLabel}>Amount Paid</Text>
                <Text style={[styles.totalValue, { color: "#15803d" }]}>
                  -{formatCurrency(invoice.paid_cents)}
                </Text>
              </View>
              <View style={styles.grandTotal}>
                <Text style={styles.grandTotalText}>BALANCE DUE</Text>
                <Text
                  style={[
                    styles.grandTotalText,
                    {
                      color:
                        invoice.balance_cents === 0 ? "#15803d" : "#dc2626",
                    },
                  ]}
                >
                  {formatCurrency(invoice.balance_cents)}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Payment Status Box */}
        {invoice.balance_cents > 0 ? (
          <View
            style={[
              styles.dueBox,
              isOverdue ? styles.dueBoxOverdue : styles.dueBoxPending,
            ]}
          >
            <Text style={isOverdue ? styles.overdueText : styles.dueText}>
              {isOverdue ? "⚠ PAYMENT OVERDUE" : "● PAYMENT DUE"}
            </Text>
            <Text
              style={[
                styles.infoText,
                { marginTop: 6, color: isOverdue ? "#7f1d1d" : "#78350f" },
              ]}
            >
              Amount Due: {formatCurrency(invoice.balance_cents)}
            </Text>
            <Text
              style={[
                styles.infoText,
                { color: isOverdue ? "#7f1d1d" : "#78350f" },
              ]}
            >
              {isOverdue
                ? `Payment was due on ${new Date(invoice.due_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`
                : `Please remit payment by ${new Date(invoice.due_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
            </Text>
          </View>
        ) : (
          <View style={[styles.dueBox, styles.dueBoxPaid]}>
            <Text style={styles.paidText}>✓ PAID IN FULL</Text>
            <Text style={[styles.infoText, { marginTop: 6, color: "#14532d" }]}>
              Thank you for your payment!
            </Text>
          </View>
        )}

        {/* Payment Terms */}
        <View style={styles.paymentTerms}>
          <Text style={styles.paymentTermsText}>
            Payment Terms: Net 30 Days • Late payments subject to 1.5% monthly
            interest charge
          </Text>
        </View>

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>NOTES</Text>
            <Text style={styles.notesText}>{invoice.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your business!</Text>
          {companyInfo && (
            <Text style={styles.footerText}>
              {companyInfo.name} • {companyInfo.phone} • {companyInfo.email}
            </Text>
          )}
        </View>
      </Page>
    </Document>
  );
};
