"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Check, Coffee, UtensilsCrossed, Moon, Star, Clock, Users, Shield, Zap, Heart } from "lucide-react-native"

const { width } = Dimensions.get("window")

interface Plan {
  id: string
  name: string
  duration: string
  price: number
  originalPrice?: number
  meals: {
    breakfast: boolean
    lunch: boolean
    dinner: boolean
  }
  features: string[]
  popular?: boolean
  savings?: string
  color: {
    primary: string
    secondary: string
    accent: string
  }
}

const mockPlans: Plan[] = [
  {
    id: "1",
    name: "Basic Plan",
    duration: "Monthly",
    price: 1200,
    originalPrice: 1500,
    meals: { breakfast: true, lunch: true, dinner: false },
    features: ["2 meals per day", "Basic menu variety", "Standard portion size", "Email support"],
    savings: "Save ₹300",
    color: {
      primary: "#3B82F6",
      secondary: "#EFF6FF",
      accent: "#1D4ED8",
    },
  },
  {
    id: "2",
    name: "Premium Plan",
    duration: "Monthly",
    price: 1800,
    originalPrice: 2200,
    meals: { breakfast: true, lunch: true, dinner: true },
    features: [
      "3 meals per day",
      "Premium menu variety",
      "Large portion size",
      "Priority support",
      "Weekend specials",
      "Customizable meals",
    ],
    popular: true,
    savings: "Save ₹400",
    color: {
      primary: "#10B981",
      secondary: "#ECFDF5",
      accent: "#047857",
    },
  },
  {
    id: "3",
    name: "Gold Plan",
    duration: "Monthly",
    price: 2500,
    originalPrice: 3000,
    meals: { breakfast: true, lunch: true, dinner: true },
    features: [
      "3 premium meals per day",
      "Gourmet menu variety",
      "Extra large portions",
      "24/7 support",
      "Daily specials",
      "Fully customizable",
      "Nutritionist consultation",
      "Home delivery option",
    ],
    savings: "Save ₹500",
    color: {
      primary: "#F59E0B",
      secondary: "#FFFBEB",
      accent: "#D97706",
    },
  },
]

export default function PlanScreen() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    try {
      // Simulate API call
      setTimeout(() => {
        setPlans(mockPlans)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      Alert.alert("Error", "Failed to load meal plans. Please try again.")
      setIsLoading(false)
    }
  }

  const handleSubscribe = async () => {
    if (!selectedPlan) return

    try {
      Alert.alert("Success", "Successfully subscribed to the plan!")
    } catch (error) {
      Alert.alert("Error", "Failed to subscribe to the plan. Please try again.")
    }
  }

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case "breakfast":
        return <Coffee size={20} color="#10B981" />
      case "lunch":
        return <UtensilsCrossed size={20} color="#10B981" />
      case "dinner":
        return <Moon size={20} color="#10B981" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600 text-lg">Loading meal plans...</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Enhanced Header */}
      <LinearGradient
        colors={["#3B82F6", "#1D4ED8", "#1E40AF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-16 pb-8 rounded-b-3xl"
      >
        <View className="items-center">
          <Text className="text-4xl font-bold text-white mb-2">Choose Your Plan</Text>
          <Text className="text-blue-100 text-lg text-center">Select the perfect meal plan for your lifestyle</Text>
          <View className="flex-row items-center mt-4 bg-white/20 px-4 py-2 rounded-full">
            <Star size={16} color="#FCD34D" />
            <Text className="text-white ml-2 font-medium">Most Popular Plans</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-4 -mt-6" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          {plans.map((plan, index) => (
            <TouchableOpacity
              key={plan.id}
              className={`bg-white rounded-3xl p-6 mb-6 shadow-lg ${
                selectedPlan === plan.id ? "border-2 transform scale-[1.02]" : "border border-gray-100"
              }`}
              style={{
                borderColor: selectedPlan === plan.id ? plan.color.primary : "#F3F4F6",
                shadowColor: plan.color.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: selectedPlan === plan.id ? 0.3 : 0.1,
                shadowRadius: 8,
                elevation: selectedPlan === plan.id ? 8 : 4,
              }}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <View className="absolute -top-3 left-6 right-6 items-center">
                  <View
                    className="px-6 py-2 rounded-full flex-row items-center"
                    style={{ backgroundColor: plan.color.primary }}
                  >
                    <Star size={16} color="white" />
                    <Text className="text-white font-bold ml-2">MOST POPULAR</Text>
                  </View>
                </View>
              )}

              {/* Plan Header */}
              <View className="flex-row justify-between items-start mb-6 mt-2">
                <View className="flex-1">
                  <Text className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</Text>
                  <Text className="text-gray-500 text-lg">{plan.duration}</Text>
                  {plan.savings && (
                    <View
                      className="mt-2 px-3 py-1 rounded-full self-start"
                      style={{ backgroundColor: plan.color.secondary }}
                    >
                      <Text className="font-semibold text-sm" style={{ color: plan.color.accent }}>
                        {plan.savings}
                      </Text>
                    </View>
                  )}
                </View>

                <View className="items-end">
                  <View className="flex-row items-baseline">
                    <Text className="text-3xl font-bold text-gray-900">₹{plan.price}</Text>
                    <Text className="text-gray-500 ml-1">/month</Text>
                  </View>
                  {plan.originalPrice && (
                    <Text className="text-gray-400 line-through text-lg">₹{plan.originalPrice}</Text>
                  )}
                </View>
              </View>

              {/* Meals Section */}
              <View className="mb-6">
                <Text className="text-gray-900 font-bold text-lg mb-4">Meals Included</Text>
                <View className="flex-row justify-between">
                  {Object.entries(plan.meals).map(([meal, included]) => (
                    <View
                      key={meal}
                      className={`flex-1 mx-1 p-4 rounded-2xl ${included ? "bg-green-50" : "bg-gray-50"}`}
                    >
                      <View className="items-center">
                        <View className={`p-3 rounded-full mb-2 ${included ? "bg-green-100" : "bg-gray-100"}`}>
                          {getMealIcon(meal)}
                        </View>
                        <Text className={`font-medium capitalize ${included ? "text-green-700" : "text-gray-400"}`}>
                          {meal}
                        </Text>
                        {included && (
                          <View className="mt-1">
                            <Check size={16} color="#10B981" />
                          </View>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>

              {/* Features Section */}
              <View>
                <Text className="text-gray-900 font-bold text-lg mb-4">Plan Features</Text>
                <View className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <View key={featureIndex} className="flex-row items-center">
                      <View className="p-1.5 rounded-full mr-3" style={{ backgroundColor: plan.color.secondary }}>
                        <Check size={14} color={plan.color.primary} />
                      </View>
                      <Text className="text-gray-700 text-base flex-1">{feature}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Selection Indicator */}
              {selectedPlan === plan.id && (
                <View className="absolute top-4 right-4">
                  <View
                    className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: plan.color.primary }}
                  >
                    <Check size={20} color="white" />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Additional Info */}
        <View className="bg-blue-50 rounded-2xl p-6 mb-6">
          <View className="flex-row items-center mb-3">
            <Shield size={24} color="#3B82F6" />
            <Text className="text-blue-900 font-bold text-lg ml-3">Why Choose Our Plans?</Text>
          </View>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Zap size={16} color="#3B82F6" />
              <Text className="text-blue-800 ml-3">Flexible meal customization</Text>
            </View>
            <View className="flex-row items-center">
              <Heart size={16} color="#3B82F6" />
              <Text className="text-blue-800 ml-3">Fresh, healthy ingredients</Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={16} color="#3B82F6" />
              <Text className="text-blue-800 ml-3">On-time meal delivery</Text>
            </View>
            <View className="flex-row items-center">
              <Users size={16} color="#3B82F6" />
              <Text className="text-blue-800 ml-3">24/7 customer support</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Enhanced Bottom Action */}
      <View className="bg-white px-6 py-4 border-t border-gray-100">
        <TouchableOpacity
          className={`rounded-2xl p-4 items-center ${selectedPlan ? "opacity-100" : "opacity-50"}`}
          disabled={!selectedPlan}
          onPress={handleSubscribe}
        >
          <LinearGradient
            colors={selectedPlan ? ["#3B82F6", "#1D4ED8"] : ["#9CA3AF", "#6B7280"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="w-full rounded-2xl p-4 items-center"
          >
            <Text className="text-white font-bold text-lg">{selectedPlan ? "Subscribe to Plan" : "Select a Plan"}</Text>
            {selectedPlan && <Text className="text-blue-100 text-sm mt-1">Start your meal journey today!</Text>}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}
