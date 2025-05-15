import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FileText, Check, Clock, X } from 'lucide-react-native';

export default function InvoiceListItem({ invoice }) {
  const getStatusIcon = () => {
    switch (invoice.status) {
      case 'completed':
        return <Check size={16} color="#34C759" />;
      case 'failed':
        return <X size={16} color="#FF3B30" />;
      default:
        return <Clock size={16} color="#FF9500" />;
    }
  };
  
  const getStatusColor = () => {
    switch (invoice.status) {
      case 'completed':
        return styles.statusCompleted;
      case 'failed':
        return styles.statusFailed;
      default:
        return styles.statusProcessing;
    }
  };
  
  const getStatusText = () => {
    switch (invoice.status) {
      case 'completed':
        return 'Completed • ERP Pushed';
      case 'failed':
        return 'Failed • Error';
      case 'ingested':
        return 'Processing • Ingested';
      case 'validated':
        return 'Processing • Validated';
      case 'checked':
        return 'Processing • Checked';
      default:
        return 'Processing';
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>
        <FileText size={24} color="#007AFF" />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
          <Text style={styles.amount}>${invoice.amount}</Text>
        </View>
        
        <Text style={styles.vendorName}>{invoice.vendorName}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.date}>Due: {invoice.dueDate}</Text>
          
          <View style={[styles.statusBadge, getStatusColor()]}>
            {getStatusIcon()}
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  vendorName: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#8E8E93',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: '#E6F9ED',
  },
  statusProcessing: {
    backgroundColor: '#FFF5E6',
  },
  statusFailed: {
    backgroundColor: '#FFEFEF',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});