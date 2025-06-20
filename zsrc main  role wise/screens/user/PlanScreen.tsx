import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { DashboardStackScreenProps } from '../../navigation/types';

type Plan = {
  id: string;
  name: string;
  price: number;
  duration: string;
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  features: string[];
};

const PlanScreen: React.FC<DashboardStackScreenProps<'Plan'>> = () => {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const [plans] = useState<Plan[]>([
    {
      id: '1',
      name: 'Basic Plan',
      price: 2000,
      duration: 'Monthly',
      meals: {
        breakfast: true,
        lunch: true,
        dinner: false
      },
      features: [
        'Breakfast & Lunch',
        '30 days validity',
        'Flexible timing',
        'Basic menu'
      ]
    },
    {
      id: '2',
      name: 'Premium Plan',
      price: 3500,
      duration: 'Monthly',
      meals: {
        breakfast: true,
        lunch: true,
        dinner: true
      },
      features: [
        'All meals included',
        '30 days validity',
        'Flexible timing',
        'Premium menu',
        'Priority booking'
      ]
    }
  ]);

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">
          Meal Plans
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 mt-1">
          Choose a plan that suits your needs
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              className={`bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 ${
                selectedPlan === plan.id ? 'border-2 border-blue-500' : ''
              }`}
              onPress={() => setSelectedPlan(plan.id)}
            >
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </Text>
                  <Text className="text-gray-600 dark:text-gray-400">
                    {plan.duration}
                  </Text>
                </View>
                <Text className="text-2xl font-bold text-blue-500">
                  ₹{plan.price}
                </Text>
              </View>

              <View className="mb-4">
                <Text className="text-gray-900 dark:text-white font-semibold mb-2">
                  Meals Included:
                </Text>
                <View className="flex-row space-x-4">
                  {plan.meals.breakfast && (
                    <View className="flex-row items-center">
                      <Icon name="check-circle" size={20} color="#10B981" />
                      <Text className="text-gray-600 dark:text-gray-400 ml-1">
                        Breakfast
                      </Text>
                    </View>
                  )}
                  {plan.meals.lunch && (
                    <View className="flex-row items-center">
                      <Icon name="check-circle" size={20} color="#10B981" />
                      <Text className="text-gray-600 dark:text-gray-400 ml-1">
                        Lunch
                      </Text>
                    </View>
                  )}
                  {plan.meals.dinner && (
                    <View className="flex-row items-center">
                      <Icon name="check-circle" size={20} color="#10B981" />
                      <Text className="text-gray-600 dark:text-gray-400 ml-1">
                        Dinner
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View>
                <Text className="text-gray-900 dark:text-white font-semibold mb-2">
                  Features:
                </Text>
                {plan.features.map((feature, index) => (
                  <View key={index} className="flex-row items-center mb-2">
                    <Icon name="check" size={20} color="#10B981" />
                    <Text className="text-gray-600 dark:text-gray-400 ml-2">
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View className="p-4 border-t border-gray-200 dark:border-gray-700">
        <TouchableOpacity
          className={`rounded-lg p-4 items-center ${
            selectedPlan ? 'bg-blue-500' : 'bg-gray-300'
          }`}
          disabled={!selectedPlan}
          onPress={() => {/* Handle plan selection */}}
        >
          <Text className="text-white font-semibold text-lg">
            {selectedPlan ? 'Subscribe to Plan' : 'Select a Plan'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlanScreen; 