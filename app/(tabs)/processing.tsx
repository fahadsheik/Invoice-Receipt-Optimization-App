import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import ProcessingStages from '../../components/invoice/ProcessingStages';
import InvoiceSummary from '../../components/invoice/InvoiceSummary';
import { getCurrentInvoice, updateInvoiceStatus } from '../../models/invoiceStore';

export default function ProcessingScreen() {
  const router = useRouter();
  const [invoice, setInvoice] = useState(getCurrentInvoice());
  const [currentStage, setCurrentStage] = useState(0);
  
  const stages = [
    { name: 'Ingested', status: 'complete', duration: 2 },
    { name: 'Validated', status: 'in-progress', duration: 3 },
    { name: 'Checked', status: 'pending', duration: 2 },
    { name: 'ERP Push', status: 'pending', duration: 4 },
  ];

  useEffect(() => {
    if (!invoice) {
      // If no invoice is being processed, redirect to upload
      router.replace('/upload');
      return;
    }

    let stageIndex = 0;
    const processStages = () => {
      if (stageIndex >= stages.length) {
        // All stages completed, redirect to log
        updateInvoiceStatus(invoice.id, 'completed');
        router.replace('/log');
        return;
      }
      
      // Set current stage as in-progress
      setCurrentStage(stageIndex);
      
      // Update invoice status
      const currentStageName = stages[stageIndex].name.toLowerCase();
      updateInvoiceStatus(invoice.id, currentStageName);
      setInvoice(getCurrentInvoice());
      
      // Move to next stage after delay
      setTimeout(() => {
        stageIndex++;
        processStages();
      }, stages[stageIndex].duration * 1000);
    };
    
    processStages();
    
    // Clean up timeout if component unmounts
    return () => clearTimeout();
  }, []);

  if (!invoice) {
    return (
      <View style={styles.container}>
        <Text style={styles.noInvoiceText}>No invoice being processed</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Processing Invoice</Text>
          <InvoiceSummary invoice={invoice} />
        </View>
        
        <View style={styles.stagesCard}>
          <Text style={styles.stagesTitle}>Processing Pipeline</Text>
          <ProcessingStages stages={stages} currentStage={currentStage} />
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Current Stage</Text>
          <Text style={styles.infoValue}>{stages[currentStage].name}</Text>
          
          <Text style={styles.infoTitle}>Status</Text>
          <View style={[styles.statusBadge, getStatusStyle(stages[currentStage].status)]}>
            <Text style={styles.statusText}>{formatStatus(stages[currentStage].status)}</Text>
          </View>
          
          <Text style={styles.infoNote}>
            Processing will automatically continue through all stages
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

function getStatusStyle(status) {
  switch (status) {
    case 'complete':
      return styles.statusComplete;
    case 'in-progress':
      return styles.statusInProgress;
    case 'pending':
      return styles.statusPending;
    default:
      return {};
  }
}

function formatStatus(status) {
  switch (status) {
    case 'complete':
      return 'Complete';
    case 'in-progress':
      return 'In Progress';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  stagesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stagesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 4,
    marginTop: 12,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  statusBadge: {
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  statusComplete: {
    backgroundColor: '#E6F9ED',
  },
  statusInProgress: {
    backgroundColor: '#E6F0FF',
  },
  statusPending: {
    backgroundColor: '#F2F2F7',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoNote: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 16,
    fontStyle: 'italic',
  },
  noInvoiceText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 32,
  },
});