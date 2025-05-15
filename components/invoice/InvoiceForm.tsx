import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function InvoiceForm() {
  // In a real app, these would come from OCR/ML processing of the invoice
  const extractedData = {
    vendorName: 'Acme Supplies Inc.',
    invoiceNumber: 'INV-2025-05-15',
    poNumber: 'PO-2025-0042',
    amount: '5,280.00',
    date: '2025-05-15',
    dueDate: '2025-06-15',
  };

  return (
    <View style={styles.container}>
      <View style={styles.formRow}>
        <View style={styles.formField}>
          <Text style={styles.label}>Vendor Name</Text>
          <TextInput
            style={styles.input}
            value={extractedData.vendorName}
            editable={false}
          />
        </View>
      </View>
      
      <View style={styles.formRow}>
        <View style={styles.formField}>
          <Text style={styles.label}>Invoice Number</Text>
          <TextInput
            style={styles.input}
            value={extractedData.invoiceNumber}
            editable={false}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>PO Number</Text>
          <TextInput
            style={styles.input}
            value={extractedData.poNumber}
            editable={false}
          />
        </View>
      </View>
      
      <View style={styles.formRow}>
        <View style={styles.formField}>
          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={`$${extractedData.amount}`}
            editable={false}
          />
        </View>
      </View>
      
      <View style={styles.formRow}>
        <View style={styles.formField}>
          <Text style={styles.label}>Invoice Date</Text>
          <TextInput
            style={styles.input}
            value={extractedData.date}
            editable={false}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>Due Date</Text>
          <TextInput
            style={styles.input}
            value={extractedData.dueDate}
            editable={false}
          />
        </View>
      </View>
      
      <View style={styles.confidenceBlock}>
        <Text style={styles.confidenceText}>
          Extraction Confidence: <Text style={styles.confidenceValue}>High</Text>
        </Text>
        <Text style={styles.confidenceNote}>
          All fields were extracted with high confidence from the document
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  formField: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#000000',
  },
  confidenceBlock: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginHorizontal: 8,
  },
  confidenceText: {
    fontSize: 14,
    color: '#000000',
  },
  confidenceValue: {
    color: '#34C759',
    fontWeight: '600',
  },
  confidenceNote: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
});