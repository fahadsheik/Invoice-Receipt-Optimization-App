import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the upload screen
  return <Redirect href="/upload" />;
}