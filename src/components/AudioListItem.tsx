import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AudioListItemProps {
  id: string;
  title: string;
  date: string;
  duration: string;
  emotion?: string;
  emotion_confidence?: number;
  onPress: () => void;
  onDelete?: (id: string) => Promise<void>;
}

const AudioListItem: React.FC<AudioListItemProps> = ({ 
  id,
  title, 
  date, 
  duration, 
  emotion,
  emotion_confidence,
  onPress,
  onDelete
}) => {
  const handleDelete = () => {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (onDelete) {
              try {
                await onDelete(id);
              } catch (error) {
                Alert.alert('Error', 'Failed to delete recording');
              }
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.date}>{date}</Text>
          {emotion && (
            <View style={styles.emotionBadge}>
              <Text style={styles.emotionText}>
                {emotion} {emotion_confidence && `(${Math.round(emotion_confidence * 100)}%)`}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.duration}>{duration}</Text>
        {onDelete ? (
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={20} color="#ff4444" />
          </TouchableOpacity>
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#4A6FA5" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  infoContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  date: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  emotionBadge: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  emotionText: {
    fontSize: 12,
    color: '#1976D2',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 16,
    color: '#333333',
    marginRight: 12,
  },
  deleteButton: {
    padding: 4,
  },
});

export default AudioListItem;