import React, { useContext, useState } from 'react';
import { AppContext } from '../_layout';
import { Image, StyleSheet, TextInput, Button, Platform, Clipboard} from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Component from '../component';
import ReadTest from '../readTest';
import SendTest from '../sendTest';

export default function HomeScreen() {
  const { readRequested, infected, address, setAddress, sendTestAddress, setSendTestAddress } = useContext(AppContext);
  const [medicalWallet, setMedicalWallet] = useState<string>('');
  const hospitalAddress = "0x2047c0d4658f9e13ebeb8e14ec069f8aa9bee9220a8d257ee0bab18ab766274";
  const vitalikAddress = "0xe0f0b547949656061405b79c89c4c44f4a711e27578f7bd2f74152da59545f";
  const tinaAddress = "0x2e610c56cef9d810c6a70fd6c9cbdf79e4112eae83baec9e25c23cf2128bede";
  const formatTimestampToDate = (timestamp) => {
    if (!timestamp) return '';
    const secondsTimestamp = Number(timestamp);
    const date = new Date(secondsTimestamp * 1000);
    return date.toUTCString();
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
      {address === hospitalAddress &&
      (<ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.marginTop}>My Profile</ThemedText>
        <ThemedText>Name:
          <ThemedText type="defaultSemiBold"> Tom J. Johnson, M.D.</ThemedText>
        </ThemedText>
        <ThemedText style={styles.marginBottom}>License #:
          <ThemedText type="defaultSemiBold"> ABC123</ThemedText>
        </ThemedText>
        <ThemedText type="subtitle" style={styles.marginTop}>Verification Requests</ThemedText>
          <ThemedText>(1) Request Received from:
            <ThemedText type="defaultSemiBold"> 0x00e0f0b547949656061405b79C89c4C44f4A711E27578f7BD2F74152da59545F</ThemedText>
          </ThemedText>
        <ThemedText style={styles.marginBottom}>Request Received At:
          <ThemedText type="defaultSemiBold"> test</ThemedText>
        </ThemedText>
        <ThemedText type="subtitle" style={styles.marginTop}>Send New Verification</ThemedText>
        <ThemedText style={styles.marginBottom}>
          By clicking SUBMIT, I authorize EpiGuard to send the medical verification to the above wallet address.
        </ThemedText>
      <SendTest />
      </ThemedView>)
}
      {address === vitalikAddress &&
      (<ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle" style={styles.marginTop}>My Profile</ThemedText>
        <ThemedText>Name:
          <ThemedText type="defaultSemiBold"> Vitalik Buterin</ThemedText>
        </ThemedText>
        <ThemedText style={styles.marginBottom}>DOB:
          <ThemedText type="defaultSemiBold"> 01-31-1994</ThemedText>
        </ThemedText>
        <ThemedText type="subtitle" style={styles.marginTop}>Infection Status</ThemedText>

{ readRequested &&
(
<>
            <ThemedText>Verified Status:
              <ThemedText type="defaultSemiBold">{infected.isInfected ? ' Infected' : ' Not Infected'}</ThemedText>
            </ThemedText>
            <ThemedText style={styles.marginBottom}>Verified At:
              <ThemedText type="defaultSemiBold"> {formatTimestampToDate(infected.verifiedAt)}</ThemedText>
            </ThemedText>
</>
)}
        <ReadTest />
        <ThemedText type="subtitle" style={styles.marginTop}>Authorize New Verification</ThemedText>
        <ThemedText>PCP Name:
          <ThemedText type="defaultSemiBold"> Tom J. Johnson, M.D.</ThemedText>
        </ThemedText>
        <ThemedText style={styles.marginBottom}>PCP License #:
          <ThemedText type="defaultSemiBold"> ABC123</ThemedText>
        </ThemedText>
        <ThemedText style={styles.marginBottom}>
          By clicking SUBMIT, I authorize the medical professional of the above to verify my infection status.
        </ThemedText>
        <Button
          onPress={() => console.log('address', address)}
          title="Submit"
          color="#841584"
          accessibilityLabel="Authorize"
        />
      </ThemedView>
    )
}
      {address === tinaAddress &&
        (<ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle" style={styles.marginTop}>My Profile</ThemedText>
          <ThemedText>Name:
            <ThemedText type="defaultSemiBold"> Tina Park</ThemedText>
          </ThemedText>
          <ThemedText style={styles.marginBottom}>DOB:
            <ThemedText type="defaultSemiBold"> 01-01-2024</ThemedText>
          </ThemedText>
          <ThemedText type="subtitle" style={styles.marginTop}>Infection Status</ThemedText>
        <ThemedText>Verified Status:
          <ThemedText type="defaultSemiBold">{infected.isInfected ? ' Infected' : ' Not Infected'}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.marginBottom}>Verified At:
          <ThemedText type="defaultSemiBold">{infected.verifiedAt}</ThemedText>
        </ThemedText>
        <ReadTest />
        <ThemedText type="subtitle" style={styles.marginTop}>Authorize New Verification</ThemedText>
        <ThemedText>PCP Name:
          <ThemedText type="defaultSemiBold"> Tom J. Johnson, M.D.</ThemedText>
        </ThemedText>
        <ThemedText style={styles.marginBottom}>PCP License #:
          <ThemedText type="defaultSemiBold"> ABC123</ThemedText>
        </ThemedText>
        <ThemedText style={styles.marginBottom}>
          By clicking SUBMIT, I authorize the medical professional of the above to verify my infection status.
        </ThemedText>
        <Button
          onPress={() => console.log('address', address)}
          title="Submit"
          color="#841584"
          accessibilityLabel="Authorize"
        />
      </ThemedView>
      )
}
{address === "" && (
  <ThemedText>
    Connect your wallet.
  </ThemedText>
) }

      <Component />
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
