import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AudioPlayerProps {
  title: string;
  currentTime: string;
  totalTime: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onBack: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  currentTime,
  totalTime,
  isPlaying,
  onPlayPause,
  onBack
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Voice Perplexity</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        
        <TouchableOpacity style={styles.playButton} onPress={onPlayPause}>
          <Ionicons 
            name={isPlaying ? "pause" : "play"} 
            size={32} 
            color="#333333" 
          />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>{currentTime}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '30%' }]} />
          </View>
          <Text style={styles.timeText}>{totalTime}</Text>
        </View>
        
        <View style={styles.waveform}>
          {/* Placeholder for waveform visualization */}
          {Array.from({ length: 30 }).map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.waveformBar, 
                { height: Math.random() * 40 + 10 }
              ]} 
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A6FA5',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 40,
    textAlign: 'center',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  timeText: {
    fontSize: 14,
    color: '#333333',
    width: 50,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#EEEEEE',
    borderRadius: 2,
    marginHorizontal: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4A6FA5',
    borderRadius: 2,
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 60,
    width: '100%',
    justifyContent: 'space-between',
  },
  waveformBar: {
    width: 3,
    backgroundColor: '#EEEEEE',
    borderRadius: 1.5,
  },
});

export default AudioPlayer;
