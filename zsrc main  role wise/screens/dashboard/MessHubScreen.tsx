import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';
import { messService } from '../../services/api';
import { useLoading } from '../../contexts/LoadingContext';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  type: 'event' | 'announcement' | 'maintenance';
  icon: string;
  messId?: string;
}

interface Feedback {
  id: string;
  user: string;
  content: string;
  date: string;
  rating: number;
  avatar: string;
  messId?: string;
}

const fallbackAnnouncements: Announcement[] = [
    {
      id: '1',
    title: 'Special Menu for Independence Day',
    content:
      'Join us for a special Independence Day menu featuring traditional Indian dishes and desserts.',
    date: '2024-08-15',
    author: 'Mess Committee',
    type: 'event',
    icon: 'flag',
    messId: 'mess1',
    },
    {
      id: '2',
    title: 'New Vendor Partnership',
    content:
      'We are pleased to announce our partnership with a new organic vegetables supplier to enhance meal quality.',
    date: '2024-07-01',
    author: 'Management',
    type: 'announcement',
    icon: 'handshake',
    messId: 'mess1',
    },
    {
      id: '3',
    title: 'Maintenance Schedule',
    content:
      'The mess will undergo routine maintenance on Sunday. Alternative arrangements will be made.',
    date: '2024-06-30',
    author: 'Maintenance Team',
    type: 'maintenance',
    icon: 'tools',
    messId: 'mess1',
    },
  ];

const fallbackFeedbacks: Feedback[] = [
    {
      id: '1',
    user: 'John D.',
    content: 'The food quality has improved significantly in the past month.',
    date: '2024-06-25',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=John+D&background=0D8ABC&color=fff',
    messId: 'mess1',
    },
    {
      id: '2',
    user: 'Sarah M.',
    content: 'Would appreciate more variety in breakfast options.',
    date: '2024-06-24',
    rating: 4,
    avatar: 'https://ui-avatars.com/api/?name=Sarah+M&background=9333EA&color=fff',
    messId: 'mess1',
  },
  {
    id: '3',
    user: 'Raj K.',
    content: 'The new salad bar is a great addition!',
    date: '2024-06-23',
      rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Raj+K&background=22C55E&color=fff',
    messId: 'mess1',
  },
];

const MessHubScreen = () => {
  const { isDarkMode } = useTheme();
  const { setIsLoading } = useLoading();
  const [activeTab, setActiveTab] = useState('announcements');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [announcements, setAnnouncements] = useState<Announcement[]>(fallbackAnnouncements);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(fallbackFeedbacks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessHubData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Announcements
        const annResponse = await messService.getAnnouncements();
        if (annResponse.success && annResponse.data?.announcements) {
          setAnnouncements(annResponse.data.announcements.map(ann => ({
            ...ann,
            date: new Date(ann.date).toISOString().split('T')[0],
          })) || []);
        } else {
          console.warn('API response empty for announcements, using fallback.', annResponse.message);
          setAnnouncements(fallbackAnnouncements);
        }

        // Fetch Feedbacks
        const fbResponse = await messService.getFeedbacks();
        if (fbResponse.success && fbResponse.data?.feedbacks) {
          setFeedbacks(fbResponse.data.feedbacks.map(fb => ({
            ...fb,
            date: new Date(fb.date).toISOString().split('T')[0],
          })) || []);
        } else {
          console.warn('API response empty for feedbacks, using fallback.', fbResponse.message);
          setFeedbacks(fallbackFeedbacks);
        }

      } catch (err: any) {
        if (err.response?.status === 404 || err.code === 'ERR_NETWORK') {
          setError('Backend service for Mess Hub is currently unavailable. Displaying fallback data.');
        } else {
          const message = err.response?.data?.message || err.message || 'Failed to fetch Mess Hub data.';
          setError(message);
          Alert.alert('Error', `Failed to load Mess Hub data: ${message}`);
        }
        console.error('Detailed error fetching Mess Hub data:', err);
        setAnnouncements(fallbackAnnouncements);
        setFeedbacks(fallbackFeedbacks);
      } finally {
        setLoading(false);
    }
  };

    fetchMessHubData();
  }, []);

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) {
      Alert.alert('Error', 'Please write your feedback before submitting.');
      return;
    }

    try {
      setIsLoading(true);
      // Assuming a default messId for now, adjust as needed
      const messId = 'mess1'; 
      await messService.submitFeedback({ messId, rating: feedbackRating, content: feedbackText });
      Alert.alert('Success', 'Feedback submitted successfully.');
      setFeedbackText('');
      setFeedbackRating(5);
      // Re-fetch feedbacks to show the newly submitted one
      const fbResponse = await messService.getFeedbacks();
      if (fbResponse.success && fbResponse.data?.feedbacks) {
        setFeedbacks(fbResponse.data.feedbacks.map(fb => ({
          ...fb,
          date: new Date(fb.date).toISOString().split('T')[0],
        })) || []);
      } else {
        Alert.alert('Warning', fbResponse.message || 'Failed to refresh feedbacks after submission.');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to submit feedback.';
      Alert.alert('Error', `Failed to submit feedback: ${message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => interactive && setFeedbackRating(star)}
            disabled={!interactive}
          >
            <Icon
              name={star <= (interactive ? feedbackRating : rating) ? 'star' : 'star-outline'}
              size={interactive ? 32 : 16}
              color={star <= (interactive ? feedbackRating : rating) 
                ? isDarkMode ? '#FBBF24' : '#EAB308'
                : isDarkMode ? '#4B5563' : '#9CA3AF'
              }
              style={{ marginRight: 4 }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case 'event':
        return {
          bg: isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50',
          icon: isDarkMode ? '#60A5FA' : '#2563EB',
        };
      case 'announcement':
        return {
          bg: isDarkMode ? 'bg-green-900/30' : 'bg-green-50',
          icon: isDarkMode ? '#34D399' : '#059669',
        };
      case 'maintenance':
        return {
          bg: isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-50',
          icon: isDarkMode ? '#FBBF24' : '#D97706',
        };
      default:
        return {
          bg: isDarkMode ? 'bg-gray-900/30' : 'bg-gray-50',
          icon: isDarkMode ? '#9CA3AF' : '#6B7280',
        };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#111827' : '#F9FAFB'}
      />
      <ScrollView className="flex-1">
        {/* Error Message */}
        {error && (
          <View className="mx-4 mt-4 p-3 bg-red-100 dark:bg-red-900 rounded-lg flex-row items-center">
            <Icon name="alert-circle-outline" size={20} color={isDarkMode ? '#FECACA' : '#EF4444'} />
            <Text className="ml-2 text-red-700 dark:text-red-300 flex-1">
              {error}
              </Text>
          </View>
        )}

        {/* Tabs */}
        <View className="m-4 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm">
          <View className="flex-row">
            <TouchableOpacity
              onPress={() => setActiveTab('announcements')}
              className={`flex-1 p-3 rounded-lg ${
                activeTab === 'announcements'
                  ? 'bg-blue-500 dark:bg-blue-600'
                  : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  activeTab === 'announcements'
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Announcements
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('feedback')}
              className={`flex-1 p-3 rounded-lg ${
                activeTab === 'feedback'
                  ? 'bg-blue-500 dark:bg-blue-600'
                  : 'bg-transparent'
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  activeTab === 'feedback'
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Feedback
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <View className="mx-4 space-y-4">
            {loading ? (
              <Text className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading announcements...</Text>
            ) : announcements.length === 0 ? (
              <Text className="text-gray-500 dark:text-gray-400 text-center">No announcements found.</Text>
            ) : (
              announcements.map((announcement) => {
                const colors = getAnnouncementColor(announcement.type);
                return (
            <View
              key={announcement.id}
                    className={`p-4 rounded-xl shadow-sm ${colors.bg}`}
            >
                    <View className="flex-row items-start space-x-4">
                      <View className="bg-white dark:bg-gray-800 rounded-full p-3">
                        <Icon name={announcement.icon} size={24} color={colors.icon} />
                      </View>
                <View className="flex-1">
                        <View className="flex-row justify-between items-start">
                          <Text className="text-lg font-semibold text-gray-800 dark:text-white flex-1">
                    {announcement.title}
                  </Text>
                        </View>
                        <Text className="text-gray-600 dark:text-gray-300 mt-2">
                          {announcement.content}
                        </Text>
                        <View className="flex-row justify-between items-center mt-3">
                          <Text className="text-sm text-gray-500 dark:text-gray-400">
                            Posted by {announcement.author}
                  </Text>
                          <Text className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(announcement.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            </View>
        </View>
                );
              })
            )}
          </View>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <View className="mx-4 space-y-4">
            {/* Feedback Input */}
            <View className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Share Your Feedback
            </Text>
              <View className="items-center mb-4">
                {renderStars(feedbackRating, true)}
            </View>
              <View className="bg-gray-50 dark:bg-gray-700 rounded-xl p-2">
            <TextInput
                  value={feedbackText}
                  onChangeText={setFeedbackText}
                  placeholder="Write your feedback here..."
              placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
              multiline
                  numberOfLines={4}
                  className="text-gray-800 dark:text-white p-2 min-h-[100px]"
                  textAlignVertical="top"
            />
          </View>
          <TouchableOpacity
                className="mt-4 bg-blue-500 dark:bg-blue-600 p-3 rounded-xl"
                onPress={handleSubmitFeedback}
          >
                <Text className="text-white text-center font-semibold">
              Submit Feedback
            </Text>
          </TouchableOpacity>
        </View>

            {/* Recent Feedbacks */}
            <Text className="text-lg font-semibold text-gray-800 dark:text-white">
              Recent Feedbacks
          </Text>
            {loading ? (
              <Text className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading feedbacks...</Text>
            ) : feedbacks.length === 0 ? (
              <Text className="text-gray-500 dark:text-gray-400 text-center">No feedbacks found.</Text>
            ) : (
              feedbacks.map((feedback) => (
            <View
                  key={feedback.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
                  <View className="flex-row items-center space-x-3">
                    <Image
                      source={{ uri: feedback.avatar }}
                      className="w-10 h-10 rounded-full"
                    />
                    <View className="flex-1">
                      <Text className="font-medium text-gray-800 dark:text-white">
                        {feedback.user}
                      </Text>
                      <View className="flex-row items-center space-x-2">
                        {renderStars(feedback.rating)}
                        <Text className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(feedback.date).toLocaleDateString()}
                  </Text>
                </View>
                    </View>
                  </View>
                  <Text className="text-gray-600 dark:text-gray-300 mt-3">
                    {feedback.content}
                  </Text>
                </View>
              ))
            )}
              </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MessHubScreen; 