import React from 'react';
import { ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { DangerLevelGuide } from '@/app/features/avalanche/screens/DangerLevelGuide';

export default function DangerGuide() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Danger Level Guide',
          headerLargeTitle: true,
        }}
      />
      <ScrollView>
        <DangerLevelGuide />
      </ScrollView>
    </>
  );
}
