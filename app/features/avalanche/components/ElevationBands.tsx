import React from 'react';
import { View, Text } from 'react-native';
import { DangerLevel } from './DangerLevel';
import { DangerRating } from '../types';

interface ElevationBandsProps {
  dangerRating: DangerRating;
}

export function ElevationBands({ dangerRating }: ElevationBandsProps) {
  return (
    <View className="bg-muted rounded-xl p-4 space-y-3">
      <View className="flex-row justify-between items-center px-2">
        <Text className="text-base font-medium text-foreground">Alpine</Text>
        <DangerLevel level={dangerRating.upper} size="small" />
      </View>
      
      <View className="h-px bg-border" />
      
      <View className="flex-row justify-between items-center px-2">
        <Text className="text-base font-medium text-foreground">Treeline</Text>
        <DangerLevel level={dangerRating.middle} size="small" />
      </View>
      
      <View className="h-px bg-border" />
      
      <View className="flex-row justify-between items-center px-2">
        <Text className="text-base font-medium text-foreground">Below Treeline</Text>
        <DangerLevel level={dangerRating.lower} size="small" />
      </View>
    </View>
  );
}
