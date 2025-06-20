import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';
import { messService } from '../../services/api';

interface MealPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
}

const fallbackMealPlans: MealPlan[] = [
  {
    id: '1',
    name: 'Basic Plan',
    description: 'Access to daily mess meals',
    price: 3000,
    duration: '/month',
    features: ['3 meals a day', 'Standard menu'],
    isPopular: false,
  },
  {
    id: '2',
    name: 'Premium Plan',
    description: 'Includes special meals and extra features',
    price: 4500,
    duration: '/month',
    features: [
      '3 meals a day',
      'Expanded menu options',
      'Weekend special meals',
      'Priority seating',
    ],
    isPopular: true,
  },
  {
    id: '3',
    name: 'Student Lite',
    description: 'Budget-friendly plan for light eaters',
    price: 2000,
    duration: '/month',
    features: ['2 meals a day', 'Basic menu'],
    isPopular: false,
  },
];

const PlanScreen = () => {
  const { isDarkMode } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [autoRenew, setAutoRenew] = useState(false);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>(fallbackMealPlans);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        setLoading(true);
        const response = await messService.getMealPlans();
        if (response.data) {
          setMealPlans(response.data.plans || []);
          setError(null); // Clear any previous errors on success
        } else {
          // If response.data is null/undefined but no error, use fallback and log
          setError(response.message || 'Failed to fetch meal plans.');
          setMealPlans(fallbackMealPlans);
          console.warn('API response empty for meal plans, using fallback.', response.message);
        }
      } catch (err: any) {
        // Check if it's a 404 or network error, then use fallback without alert
        if (err.response?.status === 404 || err.code === 'ERR_NETWORK') {
          console.warn('Backend for meal plans not found or unreachable, using fallback data.');
          setMealPlans(fallbackMealPlans);
          setError('Backend service for meal plans is currently unavailable. Displaying fallback data.');
        } else {
          const message = err.response?.data?.message || err.message || 'Failed to fetch meal plans.';
          setError(message);
          Alert.alert('Error', `Failed to load meal plans: ${message}`);
          setMealPlans(fallbackMealPlans); // Ensure fallback if other error
        }
        console.error('Detailed error fetching meal plans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPlans();
  }, []);

  const getFeatureIcon = (feature: string) => {
    if (feature.includes('meals')) return 'food';
    if (feature.includes('menu')) return 'food-variant';
    if (feature.includes('seating')) return 'seat';
    if (feature.includes('support')) return 'headset';
    if (feature.includes('weekend')) return 'calendar-weekend';
    if (feature.includes('health')) return 'heart-pulse';
    if (feature.includes('nutrition')) return 'nutrition';
    return 'check';
  };

  if (loading) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading meal plans...</Text>
      </SafeAreaView>
    );
  }

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

        {/* Header */}
        <View className="m-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Text className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Choose Your Plan
          </Text>
          <Text className="text-base text-gray-600 dark:text-gray-300">
            Select a meal plan that best suits your needs
          </Text>
        </View>

        {/* Plans */}
        <View className="mx-4 mb-4">
          {mealPlans.length > 0 ? (mealPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              className="mb-4"
            >
              <View
                className={`p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-transparent'
                }`}
              >
                {plan.isPopular && (
                  <View className="absolute top-0 right-0 bg-blue-500 dark:bg-blue-600 px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    <Text className="text-white text-sm font-medium">
                      Popular
                    </Text>
                  </View>
                )}
                <View className="mb-4">
                  <Text className="text-xl font-bold text-gray-800 dark:text-white">
                    {plan.name}
                  </Text>
                  <Text className="text-base text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </Text>
                </View>
                <View className="flex-row items-baseline mb-4">
                  <Text className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    ₹{plan.price.toLocaleString()}
                  </Text>
                  <Text className="text-base text-gray-500 dark:text-gray-400 ml-1">
                    {plan.duration}
                  </Text>
                </View>
                <View>
                  {plan.features.map((feature, index) => (
                    <View
                      key={index}
                      className="flex-row items-center mb-2"
                    >
                      <Icon
                        name={getFeatureIcon(feature)}
                        size={20}
                        color={isDarkMode ? '#60A5FA' : '#2563EB'}
                        className="mr-2"
                      />
                      <Text className="text-base text-gray-700 dark:text-gray-300">
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))) : (
            <Text className="text-gray-500 dark:text-gray-400 text-center">
              No meal plans available.
            </Text>
          )}
        </View>

        {/* Auto-renewal Toggle */}
        <View className="mx-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-base font-medium text-gray-800 dark:text-white">
                Auto-renewal
              </Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                Automatically renew your plan at the end of each month
              </Text>
            </View>
            <Switch
              value={autoRenew}
              onValueChange={setAutoRenew}
              trackColor={{
                false: isDarkMode ? '#374151' : '#E5E7EB',
                true: isDarkMode ? '#60A5FA' : '#2563EB',
              }}
              thumbColor={isDarkMode ? '#F3F4F6' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Terms and Conditions */}
        <View className="mx-4 mb-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Text className="text-sm text-gray-600 dark:text-gray-300">
            By selecting a plan, you agree to our Terms of Service and Privacy
            Policy. Plans can be cancelled anytime before the renewal date.
          </Text>
        </View>

        {/* Subscribe Button */}
        <View className="m-4">
          <TouchableOpacity
            disabled={!selectedPlan}
            className={`p-4 rounded-xl shadow ${
              selectedPlan
                ? 'bg-blue-500 dark:bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {selectedPlan ? 'Subscribe' : 'Select a Plan'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlanScreen;