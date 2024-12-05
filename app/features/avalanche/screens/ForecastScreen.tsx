import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { AvalancheAPI } from '../api';
import { DangerLevel as DangerLevelType, Zone } from '../types';
import { ElevationBands } from '../components/ElevationBands';
import { AvalancheProblems } from '../components/AvalancheProblems';
import { DangerLevel } from '../components/DangerLevel';
import { CBAC_ZONES } from '../types';
import { ChevronDown } from 'lucide-react-native';

export function ForecastScreen() {
  const [selectedZone, setSelectedZone] = useState<Zone>(CBAC_ZONES[0]);
  const [showZoneSelector, setShowZoneSelector] = useState(false);

  const { data: forecast, isLoading, isError, refetch } = useQuery({
    queryKey: ['avalancheForecast', selectedZone.id],
    queryFn: () => AvalancheAPI.getForecast(selectedZone),
    staleTime: 1000 * 60 * 60, // Consider data stale after 1 hour
    gcTime: 1000 * 60 * 60 * 24, // Keep in cache for 24 hours
  });

  const currentDanger = forecast?.danger.find(d => d.valid_day === 'current');

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load forecast</Text>
      </View>
    );
  }

  if (isLoading || !forecast || !currentDanger) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading forecast...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <Pressable 
        style={styles.zoneSelector}
        onPress={() => setShowZoneSelector(!showZoneSelector)}
      >
        <Text style={styles.zoneSelectorText}>{selectedZone.name}</Text>
        <ChevronDown size={20} />
      </Pressable>

      {showZoneSelector && (
        <View style={styles.zoneList}>
          {CBAC_ZONES.map((zone) => (
            <Pressable
              key={zone.id}
              style={styles.zoneItem}
              onPress={() => {
                setSelectedZone(zone);
                setShowZoneSelector(false);
              }}
            >
              <Text style={[
                styles.zoneItemText,
                zone.id === selectedZone.id && styles.selectedZoneText
              ]}>
                {zone.name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.header}>
        <Text style={styles.title}>{forecast.forecast_zone[0].name}</Text>
        <Text style={styles.date}>
          {new Date(forecast.published_time).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overall Danger</Text>
        <DangerLevel 
          level={Math.min(5, Math.max(1, Math.max(currentDanger.upper, currentDanger.middle, currentDanger.lower))) as DangerLevelType} 
          size="large" 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Danger by Elevation</Text>
        <ElevationBands dangerRating={currentDanger} />
      </View>

      <View style={styles.section}>
        <AvalancheProblems problems={forecast.forecast_avalanche_problems} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bottom Line</Text>
        <Text style={styles.bottomLine}>
          {forecast.bottom_line
            .replace(/<\/?p>/g, '')
            .replace(/&nbsp;/g, ' ')
            .trim()}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Forecast by {forecast.author}
        </Text>
        <Text style={styles.footerText}>
          Expires: {new Date(forecast.expires_time).toLocaleString()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  date: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  bottomLine: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  footer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  zoneSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  zoneSelectorText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  zoneList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  zoneItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  zoneItemText: {
    fontSize: 16,
    color: '#374151',
  },
  selectedZoneText: {
    color: '#2563EB',
    fontWeight: '500',
  },
});
