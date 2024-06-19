import React, { useContext } from 'react';
import { AppContext } from '../_layout';
import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function InfectionScreen() {
  const { connected, setConnected, infected, setInfected, exposed, setExposed } = useContext(AppContext);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F9E3A0', dark: '#F9E3A0' }}
      headerImage={
        <Image
          source={require('@/assets/images/epiguard.gif')}
          style={styles.epiguardLogo}
        />
      }>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Infection Status</ThemedText>
        <ThemedText>Verified Status:
           <ThemedText type="defaultSemiBold">{ infected ? ' Infected' : ' Not Infected'}</ThemedText>
        </ThemedText>
        <ThemedText>Verified Date Time:
          <ThemedText type="defaultSemiBold">{infected ? ' infected' : ' not infected'}</ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 50,
    height: 100,
    width: 120,
    alignSelf: 'center',
  },
});
