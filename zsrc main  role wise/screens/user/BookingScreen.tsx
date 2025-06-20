import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { DashboardStackScreenProps } from '../../navigation/types';

type Meal = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};

const BookingScreen: React.FC<DashboardStackScreenProps<'Booking'>> = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const [meals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Veg Thali',
      price: 80,
      description: 'Complete meal with roti, rice, dal, sabzi, and salad',
      image: 'https://example.com/veg-thali.jpg'
    },
    {
      id: '2',
      name: 'Non-Veg Thali',
      price: 120,
      description: 'Complete meal with roti, rice, dal, chicken curry, and salad',
      image: 'https://example.com/non-veg-thali.jpg'
    }
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Meals</Text>
        <Text style={styles.subtitle}>Select and book your meals</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="magnify" size={24} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search meals..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.mealList}>
          {meals.map((meal) => (
            <TouchableOpacity
              key={meal.id}
              style={styles.mealCard}
              onPress={() => {/* Handle meal selection */}}
            >
              <View style={styles.mealContent}>
                <View style={styles.mealInfo}>
                  <Text style={styles.mealName}>
                    {meal.name}
                  </Text>
                  <Text style={styles.mealDescription}>
                    {meal.description}
                  </Text>
                  <Text style={styles.mealPrice}>
                    ₹{meal.price}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {/* Handle booking */}}
                >
                  <Icon name="plus" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {/* Handle checkout */}}
        >
          <Text style={styles.checkoutButtonText}>
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  mealList: {
    padding: 16,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mealContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  mealDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  mealPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginTop: 8,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    padding: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  checkoutButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingScreen; 