import React, { useContext, useState } from 'react';
import { AppContext } from '../_layout';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, StyleSheet, TextInput, Button, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ExposureScreen() {
  const { connected, setConnected, infected, setInfected, exposed, setExposed } = useContext(AppContext);

  const getExposedStatus = (exposedCode?: number): string => {
    switch (exposedCode) {
      case 0:
        return ' Exposed';
      case 1:
        return ' Infected';
      default:
        return ' N/A';
    }
  };

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
        <ThemedText type="subtitle" style={styles.marginTop}>Exposure Status</ThemedText>
        <ThemedText>Exposure Status:
          <ThemedText type="defaultSemiBold">{exposed.isExposed ? ' Exposed' : ' Not Exposed'}</ThemedText>
        </ThemedText>
        <ThemedText>Notified At:
          <ThemedText type="defaultSemiBold">{exposed.notifiedAt ? exposed.notifiedAt : ' N/A'}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.marginBottom}>Notified by someone who is:
          <ThemedText type="defaultSemiBold">{getExposedStatus(exposed.exposedCode)}</ThemedText>
        </ThemedText>
      </ThemedView>
      {!exposed.isExposed && <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.marginTop}>Send Exposure Warnings</ThemedText>
        <ThemedText>
Inform your recent contacts about your infection and exposure status anonymously.       </ThemedText>
        <ThemedText style={styles.marginBottom}>
          By clicking SEND, I authorize EpiGuard to send anonymous exposure warnings to my network.
        </ThemedText>
        <Button
          onPress={() => console.log('button pressed')}
          title="Send"
          color="#841584"
          accessibilityLabel="Authorize"
        />
      </ThemedView> }
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
  input: {
    height: 40,
    marginHorizontal: 12,
    marginBottom: 24,
    borderWidth: 1,
    padding: 10,
  },
  marginTop: {
    marginTop: 12,
  },
  marginBottom: {
    marginBottom: 10,
  }
});
