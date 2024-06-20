import React, { useContext } from 'react';
import { AppContext } from '../_layout';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AnalyticsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F9E3A0', dark: '#F9E3A0' }}
      headerImage={
        <Image
          source={require('@/assets/images/epiguard.gif')}
          style={styles.epiguardLogo}
        />
      }>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  epiguardLogo: {
    marginTop: 0,
    height: 280,
    width: 336,
    alignSelf: 'center',
  },
});
