"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, TextInput, Modal } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Plus, FileText, Send } from "lucide-react-native"

interface LeaveRequest {
  id: string
  reason: string
  startDate: string
  endDate: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  responseDate?: string
  adminNote?: string
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    reason: "Family function",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    status: "approved",
    submittedAt: "2024-01-10",
    responseDate: "2024-01-11",
    adminNote: "Approved for family function",
  },
  {
    id: "2",
    reason: "Medical emergency",
    startDate: "2024-01-20",
    endDate: "2024-01-22",
    status: "pending",
    submittedAt: "2024-01-18",
  },
]

export default function LeaveScreen() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showNewLeaveModal, setShowNewLeaveModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all")

  // Form states
  const [reason, setReason] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    loadLeaveRequests()
  }, [])

  const loadLeaveRequests = async () => {
    try {
      setTimeout(() => {
        setLeaveRequests(mockLeaveRequests)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      Alert.alert("Error", "Failed to load leave requests. Please try again.")
      setIsLoading(false)
    }
  }

  const handleSubmitLeave = async () => {
    if (!reason || !startDate || !endDate) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    try {
      const newRequest: LeaveRequest = {
        id: Date.now().toString(),
        reason,
        startDate,
        endDate,
        status: "pending",
        submittedAt: new Date().toISOString(),
      }

      setLeaveRequests((prev) => [newRequest, ...prev])
      Alert.alert("Success", "Leave request submitted successfully!")
      setReason("")
      setStartDate("")
      setEndDate("")
      setShowNewLeaveModal(false)
    } catch (error) {
      Alert.alert("Error", "Failed to submit leave request. Please try again.")
    }
  }

  const getStatusConfig = (status: LeaveRequest["status"]) => {
    switch (status) {
      case "approved":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-700",
          icon: CheckCircle,
          iconColor: "#10B981",
          label: "Approved",
        }
      case "pending":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-700",
          icon: Clock,
          iconColor: "#F59E0B",
          label: "Pending",
        }
      case "rejected":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-700",
          icon: XCircle,
          iconColor: "#EF4444",
          label: "Rejected",
        }
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-700",
          icon: AlertCircle,
          iconColor: "#6B7280",
          label: "Unknown",
        }
    }
  }

  const filteredRequests = leaveRequests.filter((request) => filterStatus === "all" || request.status === filterStatus)

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="mt-4 text-gray-600 text-lg">Loading leave requests...</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Enhanced Header */}
      <LinearGradient
        colors={["#10B981", "#059669", "#047857"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-16 pb-8 rounded-b-3xl"
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-4xl font-bold text-white mb-2">Leave Requests</Text>
            <Text className="text-green-100 text-lg">Manage your meal leave requests</Text>
          </View>
          <TouchableOpacity className="bg-white/20 p-4 rounded-2xl" onPress={() => setShowNewLeaveModal(true)}>
            <Plus size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filter Tabs */}
      <View className="px-4 -mt-4 mb-4">
        <View className="bg-white rounded-2xl p-2 shadow-sm">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-2">
              {[
                { key: "all", label: "All Requests" },
                { key: "pending", label: "Pending" },
                { key: "approved", label: "Approved" },
                { key: "rejected", label: "Rejected" },
              ].map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  className={`px-6 py-3 rounded-xl ${filterStatus === filter.key ? "bg-green-500" : "bg-gray-100"}`}
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
          {filteredRequests.length === 0 ? (
            <View className="bg-white rounded-2xl p-8 items-center">
              <FileText size={48} color="#9CA3AF" />
              <Text className="text-gray-500 text-lg font-medium mt-4">No leave requests found</Text>
              <Text className="text-gray-400 text-center mt-2">
                {filterStatus === "all"
                  ? "You haven't submitted any leave requests yet"
                  : `No ${filterStatus} requests found`}
              </Text>
            </View>
          ) : (
            filteredRequests.map((request) => {
              const statusConfig = getStatusConfig(request.status)
              const StatusIcon = statusConfig.icon

              return (
                <View
                  key={request.id}
                  className={`bg-white rounded-2xl p-6 mb-4 shadow-sm border ${statusConfig.border}`}
                >
                  <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-1">
                      <Text className="text-xl font-bold text-gray-900 mb-2">{request.reason}</Text>
                      <View className="flex-row items-center mb-2">
                        <Calendar size={16} color="#6B7280" />
                        <Text className="text-gray-600 ml-2">
                          {new Date(request.startDate).toLocaleDateString()} -{" "}
                          {new Date(request.endDate).toLocaleDateString()}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Clock size={16} color="#6B7280" />
                        <Text className="text-gray-500 ml-2">
                          Submitted on {new Date(request.submittedAt).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>

                    <View className={`${statusConfig.bg} px-4 py-2 rounded-full border ${statusConfig.border}`}>
                      <View className="flex-row items-center">
                        <StatusIcon size={16} color={statusConfig.iconColor} />
                        <Text className={`${statusConfig.text} font-medium ml-2`}>{statusConfig.label}</Text>
                      </View>
                    </View>
                  </View>

                  {request.adminNote && (
                    <View className="bg-gray-50 rounded-xl p-4 mt-4">
                      <Text className="text-gray-700 font-medium mb-1">Admin Note:</Text>
                      <Text className="text-gray-600">{request.adminNote}</Text>
                    </View>
                  )}

                  {request.responseDate && (
                    <View className="mt-3 pt-3 border-t border-gray-100">
                      <Text className="text-gray-500 text-sm">
                        Response on {new Date(request.responseDate).toLocaleDateString()}
                      </Text>
                    </View>
                  )}
                </View>
              )
            })
          )}
        </View>
      </ScrollView>

      {/* New Leave Request Modal */}
      <Modal visible={showNewLeaveModal} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 bg-white">
          <View className="px-6 pt-16 pb-6 bg-green-500">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-white">New Leave Request</Text>
              <TouchableOpacity className="bg-white/20 p-2 rounded-full" onPress={() => setShowNewLeaveModal(false)}>
                <XCircle size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView className="flex-1 px-6 py-6">
            <View className="space-y-6">
              <View>
                <Text className="text-gray-700 font-semibold text-lg mb-3">Reason for Leave</Text>
                <TextInput
                  className="bg-gray-50 rounded-2xl p-4 text-gray-900 text-base"
                  placeholder="Enter your reason for leave (e.g., Family function, Medical emergency)"
                  value={reason}
                  onChangeText={setReason}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-gray-700 font-semibold text-lg mb-3">Start Date</Text>
                  <TextInput
                    className="bg-gray-50 rounded-2xl p-4 text-gray-900 text-base"
                    placeholder="YYYY-MM-DD"
                    value={startDate}
                    onChangeText={setStartDate}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-700 font-semibold text-lg mb-3">End Date</Text>
                  <TextInput
                    className="bg-gray-50 rounded-2xl p-4 text-gray-900 text-base"
                    placeholder="YYYY-MM-DD"
                    value={endDate}
                    onChangeText={setEndDate}
                  />
                </View>
              </View>

              <View className="bg-blue-50 rounded-2xl p-4">
                <View className="flex-row items-center mb-2">
                  <AlertCircle size={20} color="#3B82F6" />
                  <Text className="text-blue-900 font-semibold ml-2">Leave Policy</Text>
                </View>
                <Text className="text-blue-800 text-sm leading-5">
                  • Submit requests at least 24 hours in advance{"\n"}• Leave deduction applies for continuous absences
                  {"\n"}• Emergency leaves are processed immediately{"\n"}• You'll receive confirmation within 24 hours
                </Text>
              </View>
            </View>
          </ScrollView>

          <View className="px-6 py-4 border-t border-gray-100">
            <TouchableOpacity className="bg-green-500 rounded-2xl p-4 items-center" onPress={handleSubmitLeave}>
              <View className="flex-row items-center">
                <Send size={20} color="white" />
                <Text className="text-white font-bold text-lg ml-2">Submit Request</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}
