import React, { useContext, useState } from 'react';
import { AppContext } from '../_layout';
import { Image, StyleSheet, TextInput, Button, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const { connected, setConnected, infected, setInfected, exposed, setExposed, encounters, setEncounters } = useContext(AppContext);
  const [medicalWallet, setMedicalWallet] = useState<string>('');

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
        <ThemedText type="subtitle" style={styles.marginTop}>My Profile</ThemedText>
        <ThemedText>Name:
          <ThemedText type="defaultSemiBold"> Vitalik Buterin</ThemedText>
        </ThemedText>
        <ThemedText style={styles.marginBottom}>DOB:
          <ThemedText type="defaultSemiBold"> 01-31-1994</ThemedText>
        </ThemedText>
        <ThemedText type="subtitle" style={styles.marginTop}>Infection Status</ThemedText>
        <ThemedText>Verified Status:
           <ThemedText type="defaultSemiBold">{infected.isInfected ? ' Infected' : ' Not Infected'}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.marginBottom}>Verified At:
          <ThemedText type="defaultSemiBold">{infected.infectedAt}</ThemedText>
        </ThemedText>
        <ThemedText type="subtitle" style={styles.marginTop}>Authorize New Verification</ThemedText>
        <ThemedText>
          Type in wallet address of authorized medical professional:
        </ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={setMedicalWallet}
          value={medicalWallet}
          placeholder=""
          keyboardType="default"
        />
        <ThemedText style={styles.marginBottom}>
          By clicking SUBMIT, I authorize the medical professional of the above wallet address to verify my infection status.
        </ThemedText>
        <Button
          onPress={() => console.log('button pressed')}
          title="Submit"
          color="#841584"
          accessibilityLabel="Authorize"
        />
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
