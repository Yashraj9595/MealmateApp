import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { DashboardStackScreenProps } from '../../navigation/types';

type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'warning' | 'success';
};

type MessInfo = {
  name: string;
  address: string;
  contact: string;
  rating: number;
  image: string;
  timings: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
};

const MessHubScreen: React.FC<DashboardStackScreenProps<'MessHub'>> = () => {
  const navigation = useNavigation();

  const [messInfo] = useState<MessInfo>({
    name: 'Delicious Mess',
    address: '123 Food Street, City',
    contact: '+91 9876543210',
    rating: 4.5,
    image: 'https://example.com/mess-image.jpg',
    timings: {
      breakfast: '7:00 AM - 9:00 AM',
      lunch: '12:00 PM - 2:00 PM',
      dinner: '7:00 PM - 9:00 PM'
    }
  });

  const [announcements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Holiday Notice',
      content: 'Mess will remain closed on 15th August for Independence Day',
      date: '2024-03-10',
      type: 'info'
    },
    {
      id: '2',
      title: 'Menu Update',
      content: 'New items added to the menu. Check out our special thali!',
      date: '2024-03-08',
      type: 'success'
    }
  ]);

  const getAnnouncementColor = (type: Announcement['type']) => {
    switch (type) {
      case 'info':
        return '#DBEAFE';
      case 'warning':
        return '#FEF3C7';
      case 'success':
        return '#D1FAE5';
      default:
        return '#F3F4F6';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.messCard}>
            <Image
              source={{ uri: messInfo.image }}
              style={styles.messImage}
              resizeMode="cover"
            />
            <View style={styles.messInfo}>
              <Text style={styles.messName}>
                {messInfo.name}
              </Text>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={20} color="#F59E0B" />
                <Text style={styles.rating}>
                  {messInfo.rating} Rating
                </Text>
              </View>
              <Text style={styles.messAddress}>
                {messInfo.address}
              </Text>
              <Text style={styles.messContact}>
                {messInfo.contact}
              </Text>
            </View>
          </View>

          <View style={styles.timingsCard}>
            <Text style={styles.sectionTitle}>
              Mess Timings
            </Text>
            <View style={styles.timingsList}>
              <View style={styles.timingRow}>
                <Text style={styles.timingLabel}>Breakfast</Text>
                <Text style={styles.timingValue}>{messInfo.timings.breakfast}</Text>
              </View>
              <View style={styles.timingRow}>
                <Text style={styles.timingLabel}>Lunch</Text>
                <Text style={styles.timingValue}>{messInfo.timings.lunch}</Text>
              </View>
              <View style={styles.timingRow}>
                <Text style={styles.timingLabel}>Dinner</Text>
                <Text style={styles.timingValue}>{messInfo.timings.dinner}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            Announcements
          </Text>

          {announcements.map((announcement) => (
            <View
              key={announcement.id}
              style={[styles.announcementCard, { backgroundColor: getAnnouncementColor(announcement.type) }]}
            >
              <Text style={styles.announcementTitle}>
                {announcement.title}
              </Text>
              <Text style={styles.announcementContent}>
                {announcement.content}
              </Text>
              <Text style={styles.announcementDate}>
                {new Date(announcement.date).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  messCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messImage: {
    width: '100%',
    height: 200,
  },
  messInfo: {
    padding: 16,
  },
  messName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  messAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  messContact: {
    fontSize: 14,
    color: '#6B7280',
  },
  timingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  timingsList: {
    gap: 8,
  },
  timingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timingLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  timingValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  announcementCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  announcementContent: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },
  announcementDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
});

export default MessHubScreen; 