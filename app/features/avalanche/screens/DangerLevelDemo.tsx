import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DangerLevel } from '../components/DangerLevel';
import { DangerLevel as DangerLevelType } from '../types';

export function DangerLevelDemo() {
  const levels: DangerLevelType[] = [1, 2, 3, 4, 5];

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 gap-8">
        <View>
          <Text className="text-xl font-semibold mb-4">Understanding Avalanche Danger Levels</Text>
          <Text className="text-base text-muted-foreground mb-6">
            Learn about the five avalanche danger levels and what they mean for backcountry travel.
          </Text>
        </View>

        {levels.map((level) => (
          <View key={level} className="gap-4">
            <DangerLevel level={level} size="large" />
            <View className="gap-2">
              <Text className="text-lg font-medium">{getDangerLabel(level)}</Text>
              <Text className="text-base text-muted-foreground">{getTravelAdvice(level)}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function getDangerLabel(level: DangerLevelType): string {
  const labels = {
    1: 'Low',
    2: 'Moderate',
    3: 'Considerable',
    4: 'High',
    5: 'Extreme'
  };
  return labels[level];
}

function getTravelAdvice(level: DangerLevelType): string {
  const advice = {
    1: 'Generally safe conditions. Normal caution advised.',
    2: 'Heightened avalanche conditions on specific terrain features. Evaluate snow carefully.',
    3: 'Dangerous avalanche conditions. Careful snowpack evaluation, cautious route-finding and conservative decision-making essential.',
    4: 'Very dangerous avalanche conditions. Travel in avalanche terrain not recommended.',
    5: 'Avoid all avalanche terrain. Natural and human-triggered avalanches certain.'
  };
  return advice[level];
}
