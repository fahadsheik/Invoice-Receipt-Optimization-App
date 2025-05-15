import { Invoice } from '../types/Invoice';

// In-memory store for invoices
// In a real app, this would use AsyncStorage or a database
let invoices: Invoice[] = [];
let currentInvoiceId: string | null = null;

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Process a new invoice
export const processInvoice = (): Invoice => {
  const newInvoice: Invoice = {
    id: generateId(),
    invoiceNumber: 'INV-2025-05-15',
    vendorName: 'Acme Supplies Inc.',
    poNumber: 'PO-2025-0042',
    amount: '5,280.00',
    date: '2025-05-15',
    dueDate: '2025-06-15',
    status: 'ingested',
    createdAt: new Date().toISOString(),
  };
  
  invoices.push(newInvoice);
  currentInvoiceId = newInvoice.id;
  
  return newInvoice;
};

// Save an invoice
export const saveInvoice = (invoice: Invoice): void => {
  const index = invoices.findIndex(i => i.id === invoice.id);
  
  if (index >= 0) {
    invoices[index] = invoice;
  } else {
    invoices.push(invoice);
  }
  
  currentInvoiceId = invoice.id;
};

// Get all invoices
export const getAllInvoices = (): Invoice[] => {
  // Add a couple of sample invoices if the store is empty
  if (invoices.length === 0) {
    invoices = [
      {
        id: generateId(),
        invoiceNumber: 'INV-2025-04-22',
        vendorName: 'TechSys Solutions',
        poNumber: 'PO-2025-0037',
        amount: '3,750.00',
        date: '2025-04-22',
        dueDate: '2025-05-22',
        status: 'completed',
        createdAt: '2025-04-22T10:23:45Z',
      },
      {
        id: generateId(),
        invoiceNumber: 'INV-2025-05-01',
        vendorName: 'Global Logistics Inc.',
        poNumber: 'PO-2025-0038',
        amount: '2,125.50',
        date: '2025-05-01',
        dueDate: '2025-06-01',
        status: 'failed',
        createdAt: '2025-05-01T14:15:20Z',
      },
    ];
  }
  
  // Sort invoices by creation date (newest first)
  return [...invoices].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Get the current invoice being processed
export const getCurrentInvoice = (): Invoice | null => {
  if (!currentInvoiceId) return null;
  return invoices.find(i => i.id === currentInvoiceId) || null;
};

// Update the status of an invoice
export const updateInvoiceStatus = (id: string, status: string): void => {
  const index = invoices.findIndex(i => i.id === id);
  
  if (index >= 0) {
    invoices[index] = {
      ...invoices[index],
      status,
    };
  }
};