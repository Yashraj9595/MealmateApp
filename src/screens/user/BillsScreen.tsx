"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Modal } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons"

interface Bill {
  id: string
  description: string
  amount: number
  status: "paid" | "pending" | "overdue"
  date: string
  dueDate: string
  billPeriod: string
  items: {
    name: string
    quantity: number
    rate: number
    amount: number
  }[]
}

const mockBills: Bill[] = [
  {
    id: "1",
    description: "Monthly Meal Plan - January 2024",
    amount: 1800,
    status: "paid",
    date: "2024-01-01",
    dueDate: "2024-01-05",
    billPeriod: "Jan 1 - Jan 31, 2024",
    items: [
      { name: "Breakfast", quantity: 31, rate: 30, amount: 930 },
      { name: "Lunch", quantity: 31, rate: 50, amount: 1550 },
      { name: "Dinner", quantity: 25, rate: 40, amount: 1000 },
    ],
  },
  {
    id: "2",
    description: "Monthly Meal Plan - February 2024",
    amount: 1650,
    status: "pending",
    date: "2024-02-01",
    dueDate: "2024-02-05",
    billPeriod: "Feb 1 - Feb 29, 2024",
    items: [
      { name: "Breakfast", quantity: 29, rate: 30, amount: 870 },
      { name: "Lunch", quantity: 29, rate: 50, amount: 1450 },
      { name: "Dinner", quantity: 22, rate: 40, amount: 880 },
    ],
  },
  {
    id: "3",
    description: "Monthly Meal Plan - March 2024",
    amount: 1900,
    status: "overdue",
    date: "2024-03-01",
    dueDate: "2024-03-05",
    billPeriod: "Mar 1 - Mar 31, 2024",
    items: [
      { name: "Breakfast", quantity: 31, rate: 30, amount: 930 },
      { name: "Lunch", quantity: 31, rate: 50, amount: 1550 },
      { name: "Dinner", quantity: 28, rate: 40, amount: 1120 },
    ],
  },
]

export default function BillsScreen() {
  const [bills, setBills] = useState<Bill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null)
  const [showBillDetails, setShowBillDetails] = useState(false)
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "pending" | "overdue">("all")

  useEffect(() => {
    loadBills()
  }, [])

  const loadBills = async () => {
    try {
      setTimeout(() => {
        setBills(mockBills)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      Alert.alert("Error", "Failed to load bills. Please try again.")
      setIsLoading(false)
    }
  }

  const getStatusConfig = (status: Bill["status"]) => {
    switch (status) {
      case "paid":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          icon: MaterialCommunityIcons,
          iconName: "check-circle",
          iconColor: "#10B981",
          label: "Paid",
        }
      case "pending":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          icon: MaterialCommunityIcons,
          iconName: "clock-outline",
          iconColor: "#F59E0B",
          label: "Pending",
        }
      case "overdue":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-700",
          icon: MaterialCommunityIcons,
          iconName: "alert-circle",
          iconColor: "#EF4444",
          label: "Overdue",
        }
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-700",
          icon: MaterialCommunityIcons,
          iconName: "alert-circle",
          iconColor: "#6B7280",
          label: "Unknown",
        }
    }
  }

  const handlePayment = () => {
    Alert.alert("Payment", "Redirecting to payment gateway...", [
      { text: "OK", onPress: () => console.log("Payment initiated") },
    ])
  }

  const handleViewBill = (bill: Bill) => {
    setSelectedBill(bill)
    setShowBillDetails(true)
  }

  const filteredBills = bills.filter((bill) => filterStatus === "all" || bill.status === filterStatus)

  const totalOutstanding = bills.filter((bill) => bill.status !== "paid").reduce((sum, bill) => sum + bill.amount, 0)

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600 text-lg">Loading bills...</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Enhanced Header */}
      <LinearGradient
        colors={["#7C3AED", "#5B21B6", "#4C1D95"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-16 pb-8 rounded-b-3xl"
      >
        <Text className="text-4xl font-bold text-white mb-2">Bills & Payments</Text>
        <Text className="text-purple-100 text-lg mb-4">Manage your meal expenses</Text>

        {totalOutstanding > 0 && (
          <View className="bg-white/20 rounded-2xl p-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-purple-100 text-sm">Outstanding Amount</Text>
                <Text className="text-white text-2xl font-bold">₹{totalOutstanding}</Text>
              </View>
              <MaterialCommunityIcons name="currency-inr" size={32} color="white" />
            </View>
          </View>
        )}
      </LinearGradient>

      {/* Filter Tabs */}
      <View className="px-4 -mt-4 mb-4">
        <View className="bg-white rounded-2xl p-2 shadow-sm">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-2">
              {[
                { key: "all", label: "All Bills" },
                { key: "pending", label: "Pending" },
                { key: "paid", label: "Paid" },
                { key: "overdue", label: "Overdue" },
              ].map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  className={`px-6 py-3 rounded-xl ${filterStatus === filter.key ? "bg-purple-500" : "bg-gray-100"}`}
                  onPress={() => setFilterStatus(filter.key as any)}
                >
                  <Text className={`font-medium ${filterStatus === filter.key ? "text-white" : "text-gray-600"}`}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="py-2">
          {filteredBills.map((bill) => {
            const statusConfig = getStatusConfig(bill.status)
            const StatusIcon = statusConfig.icon

            return (
              <TouchableOpacity
                key={bill.id}
                className={`bg-white rounded-2xl p-6 mb-4 shadow-sm border ${statusConfig.border}`}
                onPress={() => handleViewBill(bill)}
              >
                <View className="flex-row justify-between items-start mb-4">
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-900 mb-2">{bill.description}</Text>
                    <View className="flex-row items-center mb-2">
                      <Feather name="calendar" size={16} color="#6B7280" />
                      <Text className="text-gray-600 ml-2">{bill.billPeriod}</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Feather name="clock" size={16} color="#6B7280" />
                      <Text className="text-gray-500 ml-2">Due: {new Date(bill.dueDate).toLocaleDateString()}</Text>
                    </View>
                  </View>

                  <View className={`${statusConfig.bg} px-4 py-2 rounded-full border ${statusConfig.border}`}>
                    <View className="flex-row items-center">
                      <StatusIcon name={statusConfig.iconName} size={16} color={statusConfig.iconColor} />
                      <Text className={`${statusConfig.text} font-medium ml-2`}>{statusConfig.label}</Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <TouchableOpacity className="bg-blue-50 p-2 rounded-lg mr-3">
                      <Feather name="eye" size={20} color="#3B82F6" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-50 p-2 rounded-lg">
                      <Feather name="download" size={20} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-3xl font-bold text-gray-900">₹{bill.amount}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>

      {/* Pay Button */}
      {totalOutstanding > 0 && (
        <View className="px-6 py-4 bg-white border-t border-gray-100">
          <TouchableOpacity className="rounded-2xl p-4 items-center" onPress={handlePayment}>
            <LinearGradient
              colors={["#7C3AED", "#5B21B6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="w-full rounded-2xl p-4 items-center"
            >
              <View className="flex-row items-center">
                <MaterialCommunityIcons name="credit-card" size={20} color="white" />
                <Text className="text-white font-bold text-lg ml-2">Pay Outstanding Bills (₹{totalOutstanding})</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {/* Bill Details Modal */}
      <Modal visible={showBillDetails} animationType="slide" presentationStyle="pageSheet">
        {selectedBill && (
          <View className="flex-1 bg-white">
            <View className="px-6 pt-16 pb-6 bg-purple-500">
              <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-white">Bill Details</Text>
                <TouchableOpacity className="bg-white/20 p-2 rounded-full" onPress={() => setShowBillDetails(false)}>
                  <MaterialCommunityIcons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="flex-1 px-6 py-6">
              <View className="bg-gray-50 rounded-2xl p-6 mb-6">
                <Text className="text-2xl font-bold text-gray-900 mb-2">{selectedBill.description}</Text>
                <Text className="text-gray-600 text-lg mb-4">{selectedBill.billPeriod}</Text>

                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-700">Total Amount:</Text>
                  <Text className="text-3xl font-bold text-gray-900">₹{selectedBill.amount}</Text>
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-xl font-bold text-gray-900 mb-4">Bill Breakdown</Text>
                {selectedBill.items.map((item, index) => (
                  <View key={index} className="flex-row justify-between items-center py-3 border-b border-gray-100">
                    <View className="flex-1">
                      <Text className="text-gray-900 font-medium">{item.name}</Text>
                      <Text className="text-gray-500">
                        {item.quantity} × ₹{item.rate}
                      </Text>
                    </View>
                    <Text className="text-gray-900 font-semibold">₹{item.amount}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            {selectedBill.status !== "paid" && (
              <View className="px-6 py-4 border-t border-gray-100">
                <TouchableOpacity className="bg-purple-500 rounded-2xl p-4 items-center" onPress={handlePayment}>
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="credit-card" size={20} color="white" />
                    <Text className="text-white font-bold text-lg ml-2">Pay Now - ₹{selectedBill.amount}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </Modal>
    </View>
  )
}
