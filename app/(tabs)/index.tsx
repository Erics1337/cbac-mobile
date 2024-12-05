import * as React from "react";
import { ScrollView, View, Image } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from "@/components/ui/text";
import { DangerLevel } from '@/app/features/avalanche/components/DangerLevel';
import { DangerLevel as DangerLevelType, CBAC_ZONES } from '@/app/features/avalanche/types';
import { ForecastScreen } from '@/app/features/avalanche/screens/ForecastScreen';

export default function Home() {
  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Avalanche Forecast',
          headerLargeTitle: true,
        }} 
      />
      <ForecastScreen />
    </>
  );
}

function AvalancheDangerScreen() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <ScrollView className="flex-1 bg-background">
      <Stack.Screen options={{ 
        title: "Avalanche Danger",
        headerRight: () => (
          <Text className="text-sm text-gray-500 mr-4">{formattedDate}</Text>
        ),
      }} />
      
      {CBAC_ZONES.map((zone) => (
        <View key={zone.id} className="mb-8 px-4">
          <Text className="text-xl font-semibold mb-6">{zone.name}</Text>
          
          <View className="bg-gray-100 rounded-lg overflow-hidden">
            <View className="p-4 border-b border-gray-200">
              <Text className="text-base font-medium mb-2">Above Treeline</Text>
              <View className="flex-row items-center">
                <Image 
                  source={require('@/assets/images/danger_2.webp')}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Text className="ml-3 text-lg">2 - Moderate</Text>
              </View>
            </View>
            
            <View className="p-4 border-b border-gray-200">
              <Text className="text-base font-medium mb-2">Near Treeline</Text>
              <View className="flex-row items-center">
                <Image 
                  source={require('@/assets/images/danger_2.webp')}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Text className="ml-3 text-lg">2 - Moderate</Text>
              </View>
            </View>
            
            <View className="p-4">
              <Text className="text-base font-medium mb-2">Below Treeline</Text>
              <View className="flex-row items-center">
                <Image 
                  source={require('@/assets/images/danger_1.webp')}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <Text className="ml-3 text-lg">1 - Low</Text>
              </View>
            </View>
          </View>
        </View>
      ))}

      <View className="px-4 py-6 bg-gray-50">
        <Text className="text-xl font-semibold mb-6">Danger Scale</Text>
        
        <View className="space-y-6">
          {[5, 4, 3, 2, 1].map((level) => (
            <View key={level} className="bg-white rounded-lg p-4 shadow-sm">
              <View className="flex-row items-start">
                <Image 
                  source={getDangerImage(level)}
                  className="w-12 h-12"
                  resizeMode="contain"
                />
                <View className="ml-3 flex-1">
                  <Text className="text-lg font-medium mb-1">
                    {level} - {getDangerLabel(level)}
                  </Text>
                  <Text className="text-gray-600 mb-3">{getTravelAdvice(level)}</Text>
                  <Text className="text-gray-600 text-sm">{getLikelihood(level)}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function getDangerLabel(level: number): string {
  const labels = {
    5: 'Extreme',
    4: 'High',
    3: 'Considerable',
    2: 'Moderate',
    1: 'Low'
  };
  return labels[level as keyof typeof labels];
}

function getDangerImage(level: number) {
  const images = {
    1: require('@/assets/images/danger_1.webp'),
    2: require('@/assets/images/danger_2.webp'),
    3: require('@/assets/images/danger_3.webp'),
    4: require('@/assets/images/danger_4.webp'),
    5: require('@/assets/images/danger_5.webp'),
  };
  return images[level as keyof typeof images];
}

function getTravelAdvice(level: number): string {
  const advice = {
    5: 'Extraordinarily dangerous avalanche conditions. Avoid all avalanche terrain.',
    4: 'Very dangerous avalanche conditions. Travel in avalanche terrain not recommended.',
    3: 'Dangerous avalanche conditions. Careful snowpack evaluation, cautious route-finding and conservative decision-making essential.',
    2: 'Heightened avalanche conditions on specific terrain features. Evaluate snow and terrain carefully; identify features of concern.',
    1: 'Generally safe avalanche conditions. Watch for unstable snow on isolated terrain features.'
  };
  return advice[level as keyof typeof advice];
}

function getLikelihood(level: number): string {
  const likelihood = {
    5: 'Natural and human-triggered avalanches certain.',
    4: 'Natural avalanches likely; human-triggered avalanches very likely.',
    3: 'Natural avalanches possible; human-triggered avalanches likely.',
    2: 'Natural avalanches unlikely; human-triggered avalanches possible.',
    1: 'Natural and human-triggered avalanches unlikely.'
  };
  return likelihood[level as keyof typeof likelihood];
}
