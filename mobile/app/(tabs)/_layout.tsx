import { Tabs } from 'expo-router';
// Simplistic Icon rendering without loading massive sets in Expo template automatically
function TabBarIcon({ name, color }: { name: string; color: string }) {
  // Using emoji mappings for simplicity to avoid asset loading issues in rapid MVP
  const map: any = { home: '🏠', qr: '📱', sos: '🚨' };
  return <Text style={{ fontSize: 24, color }}>{map[name]}</Text>;
}
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#db2777',
      tabBarStyle: { borderTopWidth: 0, elevation: 10, height: 60, paddingBottom: 10 },
      headerStyle: { backgroundColor: '#db2777' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' }
    }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'My Card',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          title: 'Scan Me',
          tabBarIcon: ({ color }) => <TabBarIcon name="qr" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sos"
        options={{
          title: 'Emergency',
          tabBarIcon: ({ color }) => <TabBarIcon name="sos" color={color} />,
        }}
      />
    </Tabs>
  );
}
