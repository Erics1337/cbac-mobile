import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={problemImages[problem.name as keyof typeof problemImages]}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.problemName}>{problem.name}</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.likelihoodContainer}>
          <Text style={styles.label}>Likelihood</Text>
          <View style={styles.likelihoodBar}>
            {likelihoodScale.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.likelihoodSegment,
                  {
                    backgroundColor: index <= likelihoodIndex ? '#DC2626' : '#E5E7EB',
                  },
                ]}
              />
            ))}
          </View>
          <Text style={styles.likelihoodText}>{problem.likelihood}</Text>
        </View>

        <View style={styles.sizeContainer}>
          <Text style={styles.label}>Size Range</Text>
          <Text style={styles.sizeText}>D{problem.size[0]} - D{problem.size[1]}</Text>
        </View>
      </View>
    </View>
  );
}

export function AvalancheProblems({ problems }: AvalancheProblemsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avalanche Problems</Text>
      {problems.map((problem, index) => (
        <ProblemCard key={index} problem={problem} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: {
    width: 40,
    height: 40,
  },
  problemName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1F2937',
  },
  details: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  likelihoodContainer: {
    gap: 4,
  },
  likelihoodBar: {
    flexDirection: 'row',
    gap: 4,
    height: 8,
  },
  likelihoodSegment: {
    flex: 1,
    borderRadius: 4,
  },
  likelihoodText: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },
  sizeContainer: {
    gap: 4,
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
});
