"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator, Linking } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import {
  Star,
  MapPin,
  Phone,
  Clock,
  Coffee,
  UtensilsCrossed,
  Moon,
  Info,
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  Navigation,
  Heart,
} from "lucide-react-native"

interface MessInfo {
  id: string
  name: string
  image: string
  rating: number
  address: string
  contact: string
  timings: {
    breakfast: string
    lunch: string
    dinner: string
  }
  description: string
  amenities: string[]
}

interface Announcement {
  id: string
  title: string
  content: string
  type: "info" | "warning" | "success"
  date: string
  priority: "high" | "medium" | "low"
}

const mockMessInfo: MessInfo = {
  id: "1",
  name: "Green Valley Mess",
  image: "/placeholder.svg?height=200&width=400",
  rating: 4.5,
  address: "123 College Road, Near ABC University, City - 123456",
  contact: "+91 9876543210",
  timings: {
    breakfast: "7:30 AM - 9:30 AM",
    lunch: "12:00 PM - 2:00 PM",
    dinner: "7:00 PM - 9:00 PM",
  },
  description: "Serving fresh, homely meals with love and care for over 10 years.",
  amenities: ["AC Dining", "WiFi", "Parking", "Home Delivery"],
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Special Weekend Menu",
    content: "This weekend we're serving special biryani and desserts. Don't miss out!",
    type: "success",
    date: "2024-01-15",
    priority: "high",
  },
  {
    id: "2",
    title: "Maintenance Notice",
    content: "Kitchen maintenance scheduled for tomorrow 2-4 PM. Lunch will be served early.",
    type: "warning",
    date: "2024-01-14",
    priority: "medium",
  },
  {
    id: "3",
    title: "New Payment Method",
    content: "We now accept UPI payments for your convenience. Scan QR code at the counter.",
    type: "info",
    date: "2024-01-13",
    priority: "low",
  },
]

export default function MessHubScreen() {
  const [messInfo, setMessInfo] = useState<MessInfo | null>(null)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    loadMessData()
  }, [])

  const loadMessData = async () => {
    try {
      setTimeout(() => {
        setMessInfo(mockMessInfo)
        setAnnouncements(mockAnnouncements)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      Alert.alert("Error", "Failed to load mess information. Please try again.")
      setIsLoading(false)
    }
  }

  const handleCall = () => {
    if (messInfo?.contact) {
      Linking.openURL(`tel:${messInfo.contact}`)
    }
  }

  const handleGetDirections = () => {
    if (messInfo?.address) {
      const url = `https://maps.google.com/?q=${encodeURIComponent(messInfo.address)}`
      Linking.openURL(url)
    }
  }

  const getAnnouncementConfig = (type: Announcement["type"]) => {
    switch (type) {
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-700",
          icon: Info,
          iconColor: "#3B82F6",
        }
      case "warning":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          icon: AlertTriangle,
          iconColor: "#F59E0B",
        }
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          icon: CheckCircle,
          iconColor: "#10B981",
        }
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-700",
          icon: Info,
          iconColor: "#6B7280",
        }
    }
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600 text-lg">Loading mess information...</Text>
      </View>
    )
  }

  if (!messInfo) return null

  return (
    <View className="flex-1 bg-gray-50">
      {/* Enhanced Header */}
      <LinearGradient
        colors={["#059669", "#047857", "#065f46"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-16 pb-8 rounded-b-3xl"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-4xl font-bold text-white mb-2">Mess Hub</Text>
            <Text className="text-green-100 text-lg">Your dining destination</Text>
          </View>
          <TouchableOpacity
            className={`p-3 rounded-2xl ${isFavorite ? "bg-red-500" : "bg-white/20"}`}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Heart size={24} color={isFavorite ? "white" : "white"} fill={isFavorite ? "white" : "none"} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-4 -mt-6" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          {/* Mess Info Card */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-lg">
            <Image source={{ uri: messInfo.image }} className="w-full h-48 rounded-2xl mb-6" resizeMode="cover" />

            <View className="flex-row justify-between items-start mb-4">
              <View className="flex-1">
                <Text className="text-3xl font-bold text-gray-900 mb-2">{messInfo.name}</Text>
                <View className="flex-row items-center mb-3">
                  <Star size={20} color="#F59E0B" fill="#F59E0B" />
                  <Text className="text-amber-600 ml-2 font-semibold text-lg">{messInfo.rating} Rating</Text>
                  <Text className="text-gray-400 ml-2">• Excellent</Text>
                </View>
                <Text className="text-gray-600 text-base leading-6">{messInfo.description}</Text>
              </View>
            </View>

            {/* Contact Info */}
            <View className="space-y-4 mb-6">
              <TouchableOpacity
                className="flex-row items-center bg-gray-50 p-4 rounded-2xl"
                onPress={handleGetDirections}
              >
                <MapPin size={20} color="#6B7280" />
                <Text className="text-gray-700 ml-3 flex-1 text-base">{messInfo.address}</Text>
                <Navigation size={16} color="#3B82F6" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center bg-gray-50 p-4 rounded-2xl" onPress={handleCall}>
                <Phone size={20} color="#6B7280" />
                <Text className="text-gray-700 ml-3 flex-1 text-base">{messInfo.contact}</Text>
                <MessageCircle size={16} color="#10B981" />
              </TouchableOpacity>
            </View>

            {/* Amenities */}
            <View className="mb-4">
              <Text className="text-xl font-bold text-gray-900 mb-3">Amenities</Text>
              <View className="flex-row flex-wrap">
                {messInfo.amenities.map((amenity, index) => (
                  <View key={index} className="bg-blue-50 px-4 py-2 rounded-full mr-2 mb-2">
                    <Text className="text-blue-700 font-medium">{amenity}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Timings Card */}
          <View className="bg-white rounded-3xl p-6 mb-6 shadow-lg">
            <View className="flex-row items-center mb-6">
              <Clock size={24} color="#3B82F6" />
              <Text className="text-2xl font-bold text-gray-900 ml-3">Meal Timings</Text>
            </View>

            <View className="space-y-4">
              <View className="flex-row items-center justify-between bg-orange-50 p-5 rounded-2xl border border-orange-200">
                <View className="flex-row items-center">
                  <Coffee size={24} color="#EA580C" />
                  <Text className="text-gray-900 font-semibold ml-4 text-lg">Breakfast</Text>
                </View>
                <Text className="text-orange-600 font-bold text-lg">{messInfo.timings.breakfast}</Text>
              </View>

              <View className="flex-row items-center justify-between bg-green-50 p-5 rounded-2xl border border-green-200">
                <View className="flex-row items-center">
                  <UtensilsCrossed size={24} color="#16A34A" />
                  <Text className="text-gray-900 font-semibold ml-4 text-lg">Lunch</Text>
                </View>
                <Text className="text-green-600 font-bold text-lg">{messInfo.timings.lunch}</Text>
              </View>

              <View className="flex-row items-center justify-between bg-purple-50 p-5 rounded-2xl border border-purple-200">
                <View className="flex-row items-center">
                  <Moon size={24} color="#7C3AED" />
                  <Text className="text-gray-900 font-semibold ml-4 text-lg">Dinner</Text>
                </View>
                <Text className="text-purple-600 font-bold text-lg">{messInfo.timings.dinner}</Text>
              </View>
            </View>
          </View>

          {/* Announcements */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-4">Latest Announcements</Text>

            {announcements.map((announcement) => {
              const config = getAnnouncementConfig(announcement.type)
              const AnnouncementIcon = config.icon

              return (
                <View key={announcement.id} className={`${config.bg} border ${config.border} p-6 rounded-2xl mb-4`}>
                  <View className="flex-row items-start mb-3">
                    <AnnouncementIcon size={24} color={config.iconColor} />
                    <View className="flex-1 ml-3">
                      <View className="flex-row items-center justify-between mb-2">
                        <Text className={`font-bold text-lg ${config.text}`}>{announcement.title}</Text>
                        {announcement.priority === "high" && (
                          <View className="bg-red-100 px-2 py-1 rounded-full">
                            <Text className="text-red-600 text-xs font-medium">HIGH</Text>
                          </View>
                        )}
                      </View>
                      <Text className={`${config.text} text-base leading-6 mb-3`}>{announcement.content}</Text>
                      <Text className="text-gray-500 text-sm">
                        {new Date(announcement.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Text>
                    </View>
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
