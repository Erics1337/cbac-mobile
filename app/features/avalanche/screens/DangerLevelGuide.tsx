import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DangerLevel } from '../components/DangerLevel';
import { DangerLevel as DangerLevelType } from '../types';

export function DangerLevelGuide() {
  const levels: DangerLevelType[] = [1, 2, 3, 4, 5];

  const dangerColors = {
    1: 'bg-green-100 dark:bg-green-950',
    2: 'bg-yellow-100 dark:bg-yellow-950',
    3: 'bg-orange-100 dark:bg-orange-950',
    4: 'bg-red-100 dark:bg-red-950',
    5: 'bg-red-200 dark:bg-red-950',
  };

  const dangerTextColors = {
    1: 'text-green-700 dark:text-green-300',
    2: 'text-yellow-700 dark:text-yellow-300',
    3: 'text-orange-700 dark:text-orange-300',
    4: 'text-red-700 dark:text-red-300',
    5: 'text-red-700 dark:text-red-300',
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 space-y-6">
        <View className="bg-card rounded-xl p-4 space-y-3">
          <Text className="text-xl font-semibold text-card-foreground">Understanding Avalanche Danger</Text>
          <Text className="text-base text-muted-foreground">
            The North American Avalanche Danger Scale helps you assess the risk level in the backcountry.
            Each level combines the likelihood of avalanches with their expected size and distribution.
          </Text>
        </View>

        <View className="space-y-6">
          {levels.map((level) => (
            <View
              key={level}
              className="bg-background dark:bg-background rounded-xl p-1"
            >
              <View className={`rounded-xl p-4 space-y-4 ${dangerColors[level]}`}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 pr-4">
                    <Text className={`text-xl font-semibold ${dangerTextColors[level]}`}>
                      {level}. {getDangerLabel(level)}
                    </Text>
                    <Text className={`text-base mt-1 ${dangerTextColors[level]} opacity-90`}>
                      {getDangerDescription(level)}
                    </Text>
                  </View>
                  <DangerLevel level={level} size="large" />
                </View>

                <View className="bg-background/80 dark:bg-background/40 rounded-lg p-3 space-y-2">
                  <Text className="text-sm font-medium text-foreground">Travel Advice</Text>
                  <Text className="text-sm text-muted-foreground">{getTravelAdvice(level)}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
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

function getDangerDescription(level: DangerLevelType): string {
  const descriptions = {
    1: 'Generally safe avalanche conditions',
    2: 'Heightened conditions on specific terrain',
    3: 'Dangerous avalanche conditions',
    4: 'Very dangerous conditions',
    5: 'Exceptionally dangerous conditions'
  };
  return descriptions[level];
}

function getTravelAdvice(level: DangerLevelType): string {
  const advice = {
    1: 'Generally safe conditions. Watch for unstable snow on isolated terrain features. Practice normal caution.',
    2: 'Heightened avalanche conditions on specific terrain features. Evaluate snow carefully and identify features of concern.',
    3: 'Dangerous avalanche conditions. Careful snowpack evaluation, cautious route-finding and conservative decision-making essential.',
    4: 'Very dangerous avalanche conditions. Travel in avalanche terrain is not recommended. Safest to avoid avalanche terrain entirely.',
    5: 'Avoid all avalanche terrain. Natural and human-triggered avalanches are certain. Avalanches could run into mature forests or valley bottoms.'
  };
  return advice[level];
}
