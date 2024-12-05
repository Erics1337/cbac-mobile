import React from 'react';
import { View, Text, Image } from 'react-native';
import { AvalancheProblem } from '../types';

interface AvalancheProblemsProps {
  problems: AvalancheProblem[];
}

const problemImages = {
  'Loose Dry': require('@/assets/images/problems/loose_dry.webp'),
  'Loose Wet': require('@/assets/images/problems/loose_wet.webp'),
  'Wind Slab': require('@/assets/images/problems/wind_slab.webp'),
  'Storm Slab': require('@/assets/images/problems/storm_slab.webp'),
  'Persistent Slab': require('@/assets/images/problems/persistent_slab.webp'),
  'Deep Persistent Slab': require('@/assets/images/problems/deep_persistent_slab.webp'),
  'Wet Slab': require('@/assets/images/problems/wet_slab.webp'),
  'Glide': require('@/assets/images/problems/glide.png'),
  'Cornice': require('@/assets/images/problems/cornice.png'),
} as const;

const likelihoodScale = ['Unlikely', 'Possible', 'Likely', 'Very Likely', 'Almost Certain'] as const;

function ProblemCard({ problem }: { problem: AvalancheProblem }) {
  const likelihoodIndex = likelihoodScale.indexOf(problem.likelihood as typeof likelihoodScale[number]);

  return (
    <View className="bg-card rounded-xl p-4 space-y-4 shadow-sm">
      <View className="flex-row items-center space-x-3">
        <Image
          source={problemImages[problem.name as keyof typeof problemImages]}
          className="w-10 h-10"
          resizeMode="contain"
        />
        <Text className="text-lg font-medium text-card-foreground">{problem.name}</Text>
      </View>

      <View className="space-y-3">
        <View className="space-y-1">
          <Text className="text-sm font-medium text-muted-foreground mb-1">Likelihood</Text>
          <View className="flex-row space-x-1 h-2">
            {likelihoodScale.map((_, index) => (
              <View
                key={index}
                className={`flex-1 rounded ${
                  index <= likelihoodIndex ? "bg-destructive" : "bg-muted"
                }`}
              />
            ))}
          </View>
          <Text className="text-sm text-foreground mt-1">{problem.likelihood}</Text>
        </View>

        <View className="space-y-1">
          <Text className="text-sm font-medium text-muted-foreground">Size Range</Text>
          <Text className="text-base font-medium text-foreground">
            D{problem.size[0]} - D{problem.size[1]}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function AvalancheProblems({ problems }: AvalancheProblemsProps) {
  return (
    <View className="space-y-4">
      <Text className="text-xl font-semibold text-foreground mb-2">Avalanche Problems</Text>
      {problems.map((problem, index) => (
        <ProblemCard key={index} problem={problem} />
      ))}
    </View>
  );
}
