import React from 'react';
import { View, Image } from 'react-native';
import { DangerLevel as DangerLevelType } from '../types';

interface DangerLevelProps {
  level: DangerLevelType;
  size?: 'small' | 'medium' | 'large';
}

const dangerImages = {
  1: require('@/assets/images/danger_1.webp'),
  2: require('@/assets/images/danger_2.webp'),
  3: require('@/assets/images/danger_3.webp'),
  4: require('@/assets/images/danger_4.webp'),
  5: require('@/assets/images/danger_5.webp'),
} as const;

export function DangerLevel({ level, size = 'medium' }: DangerLevelProps) {
  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
  };

  const containerSize = sizeMap[size];
  const sizeClass = {
    small: 'w-10 h-10',
    medium: 'w-[60px] h-[60px]',
    large: 'w-20 h-20',
  }[size];

  return (
    <View className={`items-center justify-center ${sizeClass}`}>
      <Image
        source={dangerImages[level]}
        className={sizeClass}
        resizeMode="contain"
      />
    </View>
  );
}
