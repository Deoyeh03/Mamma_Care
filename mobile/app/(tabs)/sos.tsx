import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { api } from '../../utils/api';

export default function SOSScreen() {
  const [loading, setLoading] = useState(false);

  const triggerSOS = async () => {
    setLoading(true);
    try {
      await api.post('/patient/sos');
      Alert.alert("Emergency Alert Sent", "Hospital staff have been notified immediately.");
    } catch (e) {
      Alert.alert("Connection Error", "Failed to send alert. Try calling directly.");
    } finally {
      setLoading(false);
    }
  };

  const confirmSOS = () => {
    Alert.alert(
      "Trigger Emergency SOS?",
      "Are you sure you want to alert the hospital staff? This should be used for emergencies only.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Trigger SOS", onPress: triggerSOS, style: "destructive" }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency SOS</Text>
      <Text style={styles.subtitle}>If you are experiencing severe pain, bleeding, or other complications, press the button below to alert hospital staff.</Text>

      <TouchableOpacity 
        style={styles.sosButton} 
        onPress={confirmSOS}
        disabled={loading}
      >
        <View style={styles.pulseBg} />
        {loading ? <ActivityIndicator size="large" color="#fff" /> : <Text style={styles.sosText}>SOS</Text>}
      </TouchableOpacity>

      <Text style={styles.helperText}>Help will arrive shortly after pressing.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 30 },
  title: { fontSize: 32, fontWeight: '900', color: '#ef4444', marginBottom: 15 },
  subtitle: { fontSize: 16, color: '#6b7280', textAlign: 'center', marginBottom: 60, lineHeight: 24 },
  sosButton: { 
    width: 220, height: 220, borderRadius: 110, backgroundColor: '#ef4444', 
    alignItems: 'center', justifyContent: 'center', 
    shadowColor: '#ef4444', shadowOpacity: 0.5, shadowRadius: 30, elevation: 15 
  },
  pulseBg: { position: 'absolute', width: 250, height: 250, borderRadius: 125, borderWidth: 2, borderColor: '#fee2e2' },
  sosText: { fontSize: 56, fontWeight: '900', color: '#fff', letterSpacing: 5 },
  helperText: { marginTop: 60, fontSize: 14, color: '#9ca3af', fontWeight: 'bold' }
});
