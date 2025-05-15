import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Upload, CircleCheck as CheckCircle, File } from 'lucide-react-native';
import InvoiceForm from '../../components/invoice/InvoiceForm';
import { processInvoice } from '../../utils/invoiceProcessing';
import { saveInvoice } from '../../models/invoiceStore';

export default function UploadScreen() {
  const router = useRouter();
  const [fileSelected, setFileSelected] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleFileSelect = () => {
    // Simulate file selection process
    setFileSelected(true);
  };

  const handleStartProcessing = async () => {
    setProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Create a new invoice record with initial processing state
      const invoice = processInvoice();
      saveInvoice(invoice);
      
      // Navigate to processing screen
      router.push('/processing');
      setProcessing(false);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.uploadSection}>
          <View style={styles.uploadCard}>
            <TouchableOpacity 
              style={styles.uploadButton} 
              onPress={handleFileSelect}
              disabled={fileSelected}
            >
              {fileSelected ? (
                <CheckCircle size={48} color="#34C759" />
              ) : (
                <Upload size={48} color="#007AFF" />
              )}
              <Text style={styles.uploadText}>
                {fileSelected ? 'Invoice Selected' : 'Select Invoice'}
              </Text>
            </TouchableOpacity>
            
            {fileSelected && (
              <View style={styles.fileInfo}>
                <File size={24} color="#8E8E93" />
                <Text style={styles.fileName}>invoice_2025_05_15.pdf</Text>
                <Text style={styles.fileSize}>1.2 MB</Text>
              </View>
            )}
          </View>
        </View>

        {fileSelected && (
          <>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Extracted Information</Text>
              <InvoiceForm />
            </View>
            
            <TouchableOpacity 
              style={[
                styles.processButton, 
                processing && styles.processingButton
              ]}
              onPress={handleStartProcessing}
              disabled={processing}
            >
              <Text style={styles.processButtonText}>
                {processing ? 'Processing...' : 'Start Processing'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 16,
  },
  uploadSection: {
    marginVertical: 16,
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
    borderRadius: 8,
    marginBottom: 16,
  },
  uploadText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#007AFF',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 12,
    borderRadius: 8,
  },
  fileName: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    flex: 1,
  },
  fileSize: {
    fontSize: 12,
    color: '#8E8E93',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  processButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  processingButton: {
    backgroundColor: '#8E8E93',
  },
  processButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});