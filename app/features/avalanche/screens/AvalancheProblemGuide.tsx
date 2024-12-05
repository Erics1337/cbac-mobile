import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';

interface ProblemDefinition {
  name: string;
  description: string;
  imageSource: any;
}

const AVALANCHE_PROBLEMS: ProblemDefinition[] = [
  {
    name: 'Dry Loose Avalanche',
    description: 'Release of dry unconsolidated snow. These avalanches typically occur within layers of soft snow near the surface of the snowpack. Dry loose avalanches start at a point and entrain snow as they move downhill, forming a fan-shaped avalanche. Other names for loose-dry avalanches include point-release avalanches or sluffs. Dry loose avalanches can trigger slab avalanches that break into deeper snow layers.',
    imageSource: require('@/assets/images/problems/loose_dry.webp'),
  },
  {
    name: 'Storm-Slab Avalanche',
    description: 'Release of a soft cohesive layer (a slab) of new snow which breaks within the storm snow or on the old snow surface. Storm-slab problems typically last between a few hours and few days. Storm-slabs that form over a persistent weak layer (surface hoar, depth hoar, or near-surface facets) may be termed Persistent Slabs or may develop into Persistent Slabs.',
    imageSource: require('@/assets/images/problems/storm_slab.webp'),
  },
  {
    name: 'Wind-Slab Avalanche',
    description: 'Release of a cohesive layer of snow (a slab) formed by the wind. Wind typically erodes snow from the upwind sides of terrain features and deposits snow on the downwind side. Wind slabs are often smooth and rounded and sometimes sound hollow, and can range from soft to hard. Wind slabs that form over a persistent weak layer (surface hoar, depth hoar, or near-surface facets) may be termed Persistent Slabs or may develop into Persistent Slabs.',
    imageSource: require('@/assets/images/problems/wind_slab.webp'),
  },
  {
    name: 'Cornices / Cornice Fall',
    description: 'Release of an overhanging mass of snow that forms as the wind moves snow over a sharp terrain feature, such as a ridge, and deposits snow on the down-wind side. They range from small wind lips of soft snow to large overhangs of hard snow that are 30 feet (~10 meters) or taller. They can break off the terrain suddenly and pull back onto the ridge top and catch people by surprise even on the flat ground above the slope. Even small cornices can have enough mass to be destructive and deadly. Cornice fall can entrain loose surface snow or trigger slab avalanches.',
    imageSource: require('@/assets/images/problems/cornice.png'),
  },
  {
    name: 'Persistent-Slab Avalanche',
    description: 'Release of a cohesive layer of soft to hard snow (a slab) in the middle to upper snowpack, when the bond to an underlying persistent weak layer breaks. Persistent layers include: surface hoar, depth hoar, near-surface facets, or faceted snow. Persistent weak layers can continue to produce avalanches for days, weeks or even months, making them especially dangerous and tricky. As additional snow and wind events build a thicker slab on top of the persistent weak layer, this avalanche problem may develop into a Persistent, Deep-Slab.',
    imageSource: require('@/assets/images/problems/persistent_slab.webp'),
  },
  {
    name: 'Persistent, Deep-Slab Avalanche',
    description: 'Release of a thick cohesive layer of hard snow (a slab), when the bond breaks between the slab and an underlying persistent weak layer, deep in the snowpack or near the ground. The most common persistent weak layers involved in deep, persistent slabs are depth hoar, deeply-buried surface hoar, or facets surrounding a deeply-buried crust. Persistent, Deep-Slabs are typically hard to trigger, are very destructive and dangerous due to the large mass of snow involved, and can persist for months once developed. They are often triggered from areas where the snow is shallow and weak, and are particularly difficult to forecast for and manage. They commonly develop when Persistent Slabs become more deeply-buried over time.',
    imageSource: require('@/assets/images/problems/deep_persistent_slab.webp'),
  },
  {
    name: 'Wet Loose Avalanche',
    description: 'Release of wet unconsolidated snow or slush. These avalanches typically occur within layers of wet snow near the surface of the snowpack, but they may quickly gouge into lower snowpack layers. Like Dry Loose Avalanches, they start at a point and entrain snow as they move downhill, forming a fan-shaped avalanche. They generally move slowly, but can contain enough mass to cause significant damage to trees, cars or buildings. Other names for wet loose avalanches include point-release avalanches or sluffs. Wet loose avalanches can trigger slab avalanches that break into deeper snow layers.',
    imageSource: require('@/assets/images/problems/loose_wet.webp'),
  },
  {
    name: 'Wet-Slab Avalanches',
    description: 'Release of a cohesive layer of snow (a slab) that is generally moist or wet when the flow of liquid water weakens the bond between the slab and the surface below (snow or ground). They often occur during prolonged warming events and/or rain-on-snow events. Wet slabs can be very destructive.',
    imageSource: require('@/assets/images/problems/wet_slab.webp'),
  },
  {
    name: 'Glide Avalanches',
    description: 'Release of the entire snow cover as a result of gliding over the ground. Glide avalanches can be composed of wet, moist, or almost entirely dry snow. They typically occur in very specific paths, where the slope is steep enough and the ground surface is relatively smooth. The are often proceeded by full depth cracks (glide cracks), though the time between the appearance of a crack and an avalanche can vary between seconds and months. Glide avalanches are unlikely to be triggered by a person, are nearly impossible to forecast, and thus pose a hazard that is extremely difficult to manage. Predicting the release of Glide Avalanches is very challenging. Because Glide Avalanches only occur on very specific slopes, safe travel relies on identifying and avoiding those slopes. Glide cracks are a significant indicator, as are recent Glide Avalanches.',
    imageSource: require('@/assets/images/problems/glide.png'),
  },
];

export function AvalancheProblemGuide() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-2xl font-semibold text-foreground mb-2">
          Avalanche Problem Types
        </Text>
        <Text className="text-base text-muted-foreground mb-6">
          Understanding different types of avalanche problems is crucial for safe backcountry travel.
        </Text>

        {AVALANCHE_PROBLEMS.map((problem, index) => (
          <View 
            key={index} 
            className="bg-card rounded-xl p-4 mb-4 border border-border"
          >
            <View className="flex-row items-center mb-4">
              <Image 
                source={problem.imageSource}
                className="w-12 h-12 rounded-lg mr-4"
                resizeMode="contain"
              />
              <Text className="text-lg font-semibold text-foreground flex-1">
                {problem.name}
              </Text>
            </View>
            <Text className="text-base text-muted-foreground leading-6">
              {problem.description}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
