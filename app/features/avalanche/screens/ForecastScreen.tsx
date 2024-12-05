import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { AvalancheAPI } from '../api';
import { DangerLevel as DangerLevelType, Zone } from '../types';
import { ElevationBands } from '../components/ElevationBands';
import { AvalancheProblems } from '../components/AvalancheProblems';
import { DangerLevel } from '../components/DangerLevel';
import { CBAC_ZONES } from '../types';
import { ChevronDown } from 'lucide-react-native';
import { HtmlContent } from '../components/HtmlContent';

export function ForecastScreen() {
  const [selectedZone, setSelectedZone] = useState<Zone>(CBAC_ZONES[0]);
  const [showZoneSelector, setShowZoneSelector] = useState(false);

  const { data: forecast, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ['avalancheForecast', selectedZone.id],
    queryFn: () => AvalancheAPI.getForecast(selectedZone),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const currentDanger = forecast?.danger.find(d => d.valid_day === 'current');

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-destructive text-base">Failed to load forecast</Text>
        <Pressable
          className="mt-4 bg-primary px-4 py-2 rounded-lg"
          onPress={() => refetch()}
        >
          <Text className="text-primary-foreground">Try Again</Text>
        </Pressable>
      </View>
    );
  }

  if (isLoading || !forecast || !currentDanger) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-foreground">Loading forecast...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
        />
      }
    >
      {/* Zone Selector */}
      <Pressable
        className="flex-row items-center justify-between p-3 bg-card rounded-lg mb-4 border border-border"
        onPress={() => setShowZoneSelector(!showZoneSelector)}
      >
        <Text className="text-base font-medium text-card-foreground">{selectedZone.name}</Text>
        <ChevronDown size={20} className="text-muted-foreground" />
      </Pressable>

      {showZoneSelector && (
        <View className="bg-card rounded-lg mb-4 border border-border overflow-hidden">
          {CBAC_ZONES.map((zone) => (
            <Pressable
              key={zone.id}
              className="p-3 border-b border-border"
              onPress={() => {
                setSelectedZone(zone);
                setShowZoneSelector(false);
              }}
            >
              <Text className={`text-base ${zone.id === selectedZone.id
                ? "text-primary font-medium"
                : "text-card-foreground"
                }`}>
                {zone.name}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      <View className="mb-6">
        <Text className="text-2xl font-semibold text-foreground">{forecast.forecast_zone[0].name}</Text>
        <Text className="text-base text-muted-foreground mt-1">
          {new Date(forecast.published_time).toLocaleDateString()}
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-lg font-semibold text-foreground mb-3">Overall Danger</Text>
        <DangerLevel
          level={Math.min(5, Math.max(1, Math.max(currentDanger.upper, currentDanger.middle, currentDanger.lower))) as DangerLevelType}
          size="large"
        />
      </View>

      <View className="mb-6">
        <Text className="text-lg font-semibold text-foreground mb-3">Danger by Elevation</Text>
        <ElevationBands dangerRating={currentDanger} />
      </View>

      <View className="mb-6">
        <AvalancheProblems problems={forecast.forecast_avalanche_problems} />
      </View>

      <View className="mb-6">
        <Text className="text-lg font-semibold text-foreground mb-3">Bottom Line</Text>
        <View className="bg-white dark:bg-card rounded-lg p-4">
          <HtmlContent html={forecast.bottom_line} />
        </View>
      </View>

      <View className="mt-6 pt-4 border-t border-border">
        <Text className="text-sm text-muted-foreground mb-1">
          Forecast by {forecast.author}
        </Text>
        <Text className="text-sm text-muted-foreground">
          Expires: {new Date(forecast.expires_time).toLocaleString()}
        </Text>
      </View>
    </ScrollView>
  );
}
