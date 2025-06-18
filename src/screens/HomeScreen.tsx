import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  SafeAreaView, 
  StatusBar, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import AudioListItem from '../components/AudioListItem';
import { getAudios, deleteAudio } from '../services/api';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have this installed

interface HomeScreenProps {
  navigation: any;
}

interface AudioItem {
  id: string;
  title: string;
  uploadedAt: string;
  duration: string;
  emotion?: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [recordings, setRecordings] = useState<AudioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchAudios = async () => {
    try {
      const audios = await getAudios();
      // Transform the data to match your UI requirements
      const formattedAudios = audios.map(audio => ({
        id: audio.id,
        title: audio.title,
        date: new Date(audio.uploadedAt).toLocaleDateString(),
        duration: audio.duration,
        emotion: audio.emotion
      }));
      setRecordings(formattedAudios);
    } catch (err) {
      setError('Failed to load recordings');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAudios();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAudios();
  };

  const handleRecordingPress = (id: string, title: string) => {
    navigation.navigate('Player', { id, title });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAudio(id);
      setRecordings(prev => prev.filter(recording => recording.id !== id));
    } catch (err) {
      console.error('Error deleting recording:', err);
      // You might want to show an error message to the user
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4A6FA5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Text style={styles.refreshText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A6FA5" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Voice Perplexity</Text>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AudioListItem
            title={item.title}
            date={item.date}
            duration={item.duration}
            emotion={item.emotion}
            onPress={() => handleRecordingPress(item.id, item.title)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        style={styles.list}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#4A6FA5',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
  refreshButton: {
    padding: 8,
  },
  refreshText: {
    color: '#4A6FA5',
    fontSize: 16,
  },
});

export default HomeScreen;