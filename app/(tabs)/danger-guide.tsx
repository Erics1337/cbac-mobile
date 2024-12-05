import React from 'react';
import { ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { DangerLevelDemo } from '@/app/features/avalanche/screens/DangerLevelDemo';

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
        <DangerLevelDemo />
      </ScrollView>
    </>
  );
}
