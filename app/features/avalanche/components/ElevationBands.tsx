import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DangerLevel } from './DangerLevel';
import { DangerRating } from '../types';

interface ElevationBandsProps {
  dangerRating: DangerRating;
}

export function ElevationBands({ dangerRating }: ElevationBandsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.band}>
        <Text style={styles.label}>Alpine</Text>
        <DangerLevel level={dangerRating.upper} size="small" />
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.band}>
        <Text style={styles.label}>Treeline</Text>
        <DangerLevel level={dangerRating.middle} size="small" />
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.band}>
        <Text style={styles.label}>Below Treeline</Text>
        <DangerLevel level={dangerRating.lower} size="small" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  band: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
});
