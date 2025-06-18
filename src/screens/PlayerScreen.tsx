import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView, ActivityIndicator, Text } from 'react-native';
import { Audio } from 'expo-av';
import AudioPlayer from '../components/AudioPlayer';
import TranscriptionView from '../components/TranscriptionView';
import { getAudioById } from '../services/api';

interface PlayerScreenProps {
  route: any;
  navigation: any;
}

const PlayerScreen: React.FC<PlayerScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioData, setAudioData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        // Fetch audio data from your API
        const data = await getAudioById(id);
        setAudioData(data);

        // Set up audio playback
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });
       console.log(data)
        const { sound: audioSound } = await Audio.Sound.createAsync(
          { uri: data.url },
          { shouldPlay: false },
          onPlaybackStatusUpdate
        );
        setSound(audioSound);
      } catch (error) {
        console.error('Failed to load audio', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [id]);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  };

  const handlePlayPause = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const handleSeek = async (value: number) => {
    if (!sound) return;
    await sound.setPositionAsync(value * duration);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4A6FA5" />
      </View>
    );
  }

  if (!audioData) {
    return (
      <View style={styles.centered}>
        <Text>Audio not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A6FA5" />
      <AudioPlayer
        title={audioData.title}
        currentTime={formatTime(position)}
        totalTime={formatTime(duration)}
        isPlaying={isPlaying}
        progress={duration ? position / duration : 0}
        onPlayPause={handlePlayPause}
        onBack={handleBack}
        onSeek={handleSeek}
      />
      <ScrollView style={styles.transcriptionContainer}>
        <TranscriptionView text={audioData.transcription || "No transcription available"} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function to format milliseconds to MM:SS
const formatTime = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  transcriptionContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerScreen;