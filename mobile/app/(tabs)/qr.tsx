import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { api } from '../../utils/api';

export default function QRCodeScreen() {
  const [patientId, setPatientId] = useState<string | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      try {
        const res = await api.get('/patient/me');
        setPatientId(res.data.patient._id);
      } catch (e) {
        console.log('Error fetching ID', e);
      }
    };
    fetchId();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Digital Card</Text>
      <Text style={styles.subtitle}>Present this to hospital staff for quick access to your records.</Text>
      
      <View style={styles.qrContainer}>
        {patientId ? (
          <QRCode
            value={patientId}
            size={250}
            color="#db2777"
            backgroundColor="#ffffff"
          />
        ) : (
          <Text>Loading QR Code...</Text>
        )}
      </View>
      <Text style={styles.patientId}>ID: {patientId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '900', color: '#1f2937', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center', paddingHorizontal: 40, marginBottom: 40 },
  qrContainer: { padding: 30, backgroundColor: '#fff', borderRadius: 30, shadowColor: '#db2777', shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
  patientId: { marginTop: 30, fontSize: 16, fontWeight: 'bold', color: '#9ca3af', letterSpacing: 2 }
});
