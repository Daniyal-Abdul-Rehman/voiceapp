import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

interface TranscriptionViewProps {
  text: string;
}

const TranscriptionView: React.FC<TranscriptionViewProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transcription</Text>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.transcriptionText}>{text}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  scrollContainer: {
    flex: 1,
  },
  transcriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    marginBottom: 16,
  },
});

export default TranscriptionView;
