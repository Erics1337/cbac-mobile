import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useColorScheme } from '@/lib/useColorScheme';

interface HtmlContentProps {
  html: string;
  contentPadding?: number;
}

export function HtmlContent({ html, contentPadding = 32 }: HtmlContentProps) {
  const { width } = useWindowDimensions();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <RenderHtml
      contentWidth={width - contentPadding}
      source={{ html }}
      baseStyle={{
        color: isDarkColorScheme ? '#f3f4f6' : '#000000',
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'System'
      }}
      systemFonts={['System']}
      classesStyles={{
        'text-base': {
          fontSize: 16,
          lineHeight: 24
        }
      }}
      tagsStyles={{
        a: {
          color: isDarkColorScheme ? '#60a5fa' : '#1d4ed8',
          textDecorationLine: 'underline'
        },
        strong: {
          fontWeight: 'bold'
        },
        em: {
          fontStyle: 'italic'
        },
        p: {
          marginBottom: 16
        }
      }}
    />
  );
}
