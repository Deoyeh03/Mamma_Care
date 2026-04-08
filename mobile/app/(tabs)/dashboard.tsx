import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { api } from '../../utils/api';

export default function PatientDashboard() {
  const [patient, setPatient] = useState<any>(null);
  const [vitals, setVitals] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDetails = async () => {
    try {
      const res = await api.get('/patient/me');
      setPatient(res.data.patient);
      setVitals(res.data.vitals);
    } catch (e) {
      console.log('Error fetching details', e);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDetails();
    setRefreshing(false);
  };

  if (!patient) return <View style={styles.center}><Text>Loading...</Text></View>;

  return (
    <ScrollView 
      style={styles.container} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.greeting}>Hello, {patient.name.split(' ')[0]}</Text>
        <Text style={styles.subtitle}>Estimated Due Date: {new Date(patient.edd).toLocaleDateString()}</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Text style={styles.infoVal}>{patient.bloodGroup}</Text>
          <Text style={styles.infoLabel}>Blood Grp</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoVal}>{vitals.length}</Text>
          <Text style={styles.infoLabel}>Visits</Text>
        </View>
      </View>

      <Text style={styles.historyTitle}>Clinical History</Text>
      
      {vitals.length === 0 ? (
        <Text style={styles.noData}>No visit data recorded yet.</Text>
      ) : (
        vitals.map((v, i) => (
          <View key={i} style={styles.historyCard}>
            <Text style={styles.historyDate}>{new Date(v.createdAt).toLocaleDateString()}</Text>
            <View style={styles.historyMetrics}>
              <View>
                <Text style={styles.metricLabel}>BP</Text>
                <Text style={styles.metricVal}>{v.bloodPressure}</Text>
              </View>
              <View>
                <Text style={styles.metricLabel}>Weight</Text>
                <Text style={styles.metricVal}>{v.weight}kg</Text>
              </View>
              <View>
                <Text style={styles.metricLabel}>FHR</Text>
                <Text style={styles.metricVal}>{v.fetalHeartRate ? \`\${v.fetalHeartRate} bpm\` : '-'}</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cardHeader: { backgroundColor: '#db2777', padding: 25, paddingBottom: 40 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  subtitle: { fontSize: 16, color: '#fbcfe8', marginTop: 5 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: -20, paddingHorizontal: 20 },
  infoBox: { backgroundColor: '#fff', padding: 20, borderRadius: 15, width: '45%', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 5 },
  infoVal: { fontSize: 24, fontWeight: '900', color: '#db2777' },
  infoLabel: { fontSize: 12, color: '#6b7280', fontWeight: 'bold', marginTop: 5, textTransform: 'uppercase' },
  historyTitle: { fontSize: 20, fontWeight: 'bold', padding: 20, paddingTop: 30 },
  noData: { textAlign: 'center', color: '#9ca3af', marginTop: 20 },
  historyCard: { backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 15, padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#f3f4f6' },
  historyDate: { fontSize: 14, fontWeight: 'bold', color: '#6b7280', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#f3f4f6', paddingBottom: 10 },
  historyMetrics: { flexDirection: 'row', justifyContent: 'space-between' },
  metricLabel: { fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', fontWeight: 'bold' },
  metricVal: { fontSize: 16, fontWeight: '900', color: '#1f2937', marginTop: 5 }
});
