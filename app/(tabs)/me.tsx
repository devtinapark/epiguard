import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Button, Platform } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F9E3A0', dark: '#F9E3A0' }}
      headerImage={
        <Image
          source={require('@/assets/images/epiguard.gif')}
          style={styles.epiguardLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Me</ThemedText>
      </ThemedView>
      <ThemedText>Me</ThemedText>
      <Button
        onPress={() => console.log('button pressed')}
        title="Press"
        color="#841584"
        accessibilityLabel="Press"
      />
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
