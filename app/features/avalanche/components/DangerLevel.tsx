import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
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

  return (
    <View style={[styles.container, { width: containerSize, height: containerSize }]}>
      <Image
        source={dangerImages[level]}
        style={{ width: containerSize, height: containerSize }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
