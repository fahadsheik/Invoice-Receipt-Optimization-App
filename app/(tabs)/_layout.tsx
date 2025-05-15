import { Tabs } from 'expo-router';
import { Upload, ListChecks, FileSpreadsheet } from 'lucide-react-native';
import { useEffect } from 'react';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function TabLayout() {
  useFrameworkReady();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5EA',
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: '#000000',
        },
      }}>
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Upload Invoice',
          tabBarIcon: ({ color, size }) => (
            <Upload color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="processing"
        options={{
          title: 'Processing',
          tabBarIcon: ({ color, size }) => (
            <ListChecks color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="log"
        options={{
          title: 'ERP Log',
          tabBarIcon: ({ color, size }) => (
            <FileSpreadsheet color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}