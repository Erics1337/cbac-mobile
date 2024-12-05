import React from 'react';
import { Stack } from 'expo-router';
import { AvalancheProblemGuide } from '@/app/features/avalanche/screens/AvalancheProblemGuide';

export default function ProblemGuideScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Avalanche Problems',
          headerLargeTitle: true,
        }} 
      />
      <AvalancheProblemGuide />
    </>
  );
}
