import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FileText, Calendar, DollarSign, Building } from 'lucide-react-native';

export default function InvoiceSummary({ invoice }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <FileText size={20} color="#007AFF" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Invoice Number</Text>
          <Text style={styles.infoValue}>{invoice.invoiceNumber}</Text>
        </View>
      </View>
      
      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <Building size={20} color="#007AFF" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Vendor</Text>
          <Text style={styles.infoValue}>{invoice.vendorName}</Text>
        </View>
      </View>
      
      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <DollarSign size={20} color="#007AFF" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Amount</Text>
          <Text style={styles.infoValue}>${invoice.amount}</Text>
        </View>
      </View>
      
      <View style={styles.infoRow}>
        <View style={styles.iconContainer}>
          <Calendar size={20} color="#007AFF" />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Due Date</Text>
          <Text style={styles.infoValue}>{invoice.dueDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
});