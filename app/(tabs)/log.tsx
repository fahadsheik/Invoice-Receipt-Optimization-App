import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FileText, Check, CircleAlert as AlertCircle, Filter } from 'lucide-react-native';
import { getAllInvoices } from '../../models/invoiceStore';
import InvoiceListItem from '../../components/invoice/InvoiceListItem';

export default function LogScreen() {
  const [filter, setFilter] = useState('all');
  const allInvoices = getAllInvoices();
  
  const filteredInvoices = filter === 'all' 
    ? allInvoices 
    : allInvoices.filter(invoice => invoice.status === filter);
  
  const filterOptions = [
    { key: 'all', label: 'All' },
    { key: 'completed', label: 'Completed' },
    { key: 'failed', label: 'Failed' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ERP Feed Log</Text>
        
        <View style={styles.filterContainer}>
          <Filter size={16} color="#8E8E93" style={styles.filterIcon} />
          <View style={styles.filterButtons}>
            {filterOptions.map(option => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterButton,
                  filter === option.key && styles.filterButtonActive
                ]}
                onPress={() => setFilter(option.key)}
              >
                <Text 
                  style={[
                    styles.filterButtonText,
                    filter === option.key && styles.filterButtonTextActive
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      
      {filteredInvoices.length > 0 ? (
        <FlatList
          data={filteredInvoices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <InvoiceListItem invoice={item} />}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <View style={styles.emptyState}>
          <FileText size={48} color="#C7C7CC" />
          <Text style={styles.emptyStateText}>No invoices found</Text>
          <Text style={styles.emptyStateSubText}>
            {filter === 'all' 
              ? 'Upload and process invoices to see them here'
              : `No ${filter} invoices available`
            }
          </Text>
        </View>
      )}
      
      <View style={styles.summarySection}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryIconContainer}>
              <FileText size={24} color="#007AFF" />
            </View>
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryValue}>{allInvoices.length}</Text>
              <Text style={styles.summaryLabel}>Total Invoices</Text>
            </View>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIconContainer, { backgroundColor: '#E6F9ED' }]}>
              <Check size={24} color="#34C759" />
            </View>
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryValue}>
                {allInvoices.filter(i => i.status === 'completed').length}
              </Text>
              <Text style={styles.summaryLabel}>Completed</Text>
            </View>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryItem}>
            <View style={[styles.summaryIconContainer, { backgroundColor: '#FFEFEF' }]}>
              <AlertCircle size={24} color="#FF3B30" />
            </View>
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryValue}>
                {allInvoices.filter(i => i.status === 'failed').length}
              </Text>
              <Text style={styles.summaryLabel}>Failed</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterIcon: {
    marginRight: 8,
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#F2F2F7',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 16,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginTop: 8,
  },
  summarySection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    marginHorizontal: 12,
  },
});