import {Button, Text} from '@/components/ui';
import {AlertTriangle, Settings, Info, AlertCircle} from 'lucide-react-native';
import {Tabs} from 'expo-router';
import {Pressable} from 'react-native';

export const unstable_settings = {
  initialRouteName: "index",
};

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Forecast',
          tabBarIcon: ({color}) => <AlertTriangle color={color} />,
        }}
      />
      <Tabs.Screen
        name="danger-guide"
        options={{
          title: 'Danger',
          tabBarIcon: ({color}) => <AlertCircle color={color} />,
        }}
      />
      <Tabs.Screen
        name="problem-guide"
        options={{
          title: 'Problems',
          tabBarIcon: ({color}) => <Info color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({color}) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
}
