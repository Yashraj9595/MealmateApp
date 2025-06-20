import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, addDays, differenceInDays } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../contexts/ThemeContext';
import { leaveService } from '../../services/api';

interface LeaveRequest {
  id: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'mess' | 'hostel';
}

const fallbackLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-07-05'),
    reason: 'Family vacation',
    status: 'approved',
    type: 'mess',
  },
  {
    id: '2',
    startDate: new Date('2024-07-10'),
    endDate: new Date('2024-07-10'),
    reason: 'Doctor appointment',
    status: 'pending',
    type: 'hostel',
  },
  {
    id: '3',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-06-17'),
    reason: 'Attending a wedding',
    status: 'rejected',
    type: 'mess',
  },
];

const LeaveScreen = () => {
  const { isDarkMode } = useTheme();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 1));
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [reason, setReason] = useState('');
  const [leaveType, setLeaveType] = useState<'mess' | 'hostel'>('mess');
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(fallbackLeaveRequests);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        setLoading(true);
        const response = await leaveService.getLeaveRequests();
        if (response.data) {
          setLeaveRequests(response.data.requests.map((req: any) => ({
            ...req,
            startDate: new Date(req.startDate),
            endDate: new Date(req.endDate),
          })) || []);
          setError(null); // Clear any previous errors on success
        } else {
          // If response.data is null/undefined but no error, use fallback and log
          setError(response.message || 'Failed to fetch leave requests.');
          setLeaveRequests(fallbackLeaveRequests);
          console.warn('API response empty for leave requests, using fallback.', response.message);
        }
      } catch (err: any) {
        // Check if it's a 404 or network error, then use fallback without alert
        if (err.response?.status === 404 || err.code === 'ERR_NETWORK') {
          console.warn('Backend for leave requests not found or unreachable, using fallback data.');
          setLeaveRequests(fallbackLeaveRequests);
          setError('Backend service for leave requests is currently unavailable. Displaying fallback data.');
        } else {
          const message = err.response?.data?.message || err.message || 'Failed to fetch leave requests.';
          setError(message);
          Alert.alert('Error', `Failed to load leave requests: ${message}`);
          setLeaveRequests(fallbackLeaveRequests); // Ensure fallback if other error
        }
        console.error('Detailed error fetching leave requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleStartDateChange = (event: any, date?: Date) => {
    setShowStartDatePicker(false);
    if (date) {
      setStartDate(date);
      if (date > endDate) {
        setEndDate(addDays(date, 1));
      }
    }
  };

  const handleEndDateChange = (event: any, date?: Date) => {
    setShowEndDatePicker(false);
    if (date) {
      setEndDate(date);
    }
  };

  const handleSubmitLeave = async () => {
    if (!reason.trim()) {
      Alert.alert('Error', 'Please provide a reason for your leave.');
      return;
    }

    try {
      setLoading(true);
      await leaveService.submitLeaveRequest({
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        reason,
        type: leaveType,
      });
      Alert.alert('Success', 'Leave request submitted successfully.');
      setReason('');
      // Refresh leave requests after submission - re-fetch to ensure consistency
      const response = await leaveService.getLeaveRequests();
      if (response.data) {
        setLeaveRequests(response.data.requests.map((req: any) => ({
          ...req,
          startDate: new Date(req.startDate),
          endDate: new Date(req.endDate),
        })) || []);
        setError(null); // Clear error after successful re-fetch
      } else {
        setError(response.message || 'Failed to refresh leave requests after submission.');
        setLeaveRequests(fallbackLeaveRequests);
        Alert.alert('Warning', 'Leave submitted, but failed to refresh data.');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Failed to submit leave request.';
      setError(message);
      Alert.alert('Error', `Failed to submit leave request: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 dark:text-green-400';
      case 'rejected':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-yellow-600 dark:text-yellow-400';
    }
  };

  const getStatusIcon = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'approved':
        return 'check-circle';
      case 'rejected':
        return 'close-circle';
      default:
        return 'clock-outline';
    }
  };

  const numberOfDays = differenceInDays(endDate, startDate) + 1;

  if (loading) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Text className={isDarkMode ? 'text-white' : 'text-gray-900'}>Loading leave requests...</Text>
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

        {/* New Leave Request Form */}
        <View className="m-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            New Leave Request
          </Text>

          {/* Leave Type Selection */}
          <View className="flex-row mb-4">
            <TouchableOpacity
              onPress={() => setLeaveType('mess')}
              className={`flex-1 p-3 rounded-lg mr-2 border-2 ${
                leaveType === 'mess'
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <View className="items-center">
                <Icon
                  name="food"
                  size={24}
                  color={
                    leaveType === 'mess'
                      ? isDarkMode ? '#60A5FA' : '#2563EB'
                      : isDarkMode ? '#9CA3AF' : '#6B7280'
                  }
                />
                <Text
                  className={`mt-1 font-medium ${
                    leaveType === 'mess'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Mess Leave
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLeaveType('hostel')}
              className={`flex-1 p-3 rounded-lg border-2 ${
                leaveType === 'hostel'
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <View className="items-center">
                <Icon
                  name="home"
                  size={24}
                  color={
                    leaveType === 'hostel'
                      ? isDarkMode ? '#60A5FA' : '#2563EB'
                      : isDarkMode ? '#9CA3AF' : '#6B7280'
                  }
                />
                <Text
                  className={`mt-1 font-medium ${
                    leaveType === 'hostel'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Hostel Leave
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Date Pickers */}
          <View className="mb-4">
            <View className="flex-row justify-between mb-2">
              <View className="flex-1 mr-2">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </Text>
                <TouchableOpacity
                  onPress={() => setShowStartDatePicker(true)}
                  className="flex-row items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <Text className="text-gray-800 dark:text-white">
                    {format(startDate, 'PPP')}
                  </Text>
                  <Icon
                    name="calendar"
                    size={20}
                    color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                  />
                </TouchableOpacity>
                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={handleStartDateChange}
                    minimumDate={new Date()}
                  />
                )}
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </Text>
                <TouchableOpacity
                  onPress={() => setShowEndDatePicker(true)}
                  className="flex-row items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <Text className="text-gray-800 dark:text-white">
                    {format(endDate, 'PPP')}
                  </Text>
                  <Icon
                    name="calendar"
                    size={20}
                    color={isDarkMode ? '#9CA3AF' : '#6B7280'}
                  />
                </TouchableOpacity>
                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={handleEndDateChange}
                    minimumDate={startDate}
                  />
                )}
              </View>
            </View>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Selected: {numberOfDays} day(s)
            </Text>
          </View>

          {/* Reason Input */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Reason for Leave
            </Text>
            <TextInput
              className="w-full h-24 px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white align-top"
              placeholder="E.g., Medical leave, family event"
              placeholderTextColor={isDarkMode ? '#94A3B8' : '#64748B'}
              multiline
              textAlignVertical="top"
              value={reason}
              onChangeText={setReason}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmitLeave}
            className="w-full bg-blue-500 dark:bg-blue-600 py-3 rounded-lg items-center"
          >
            <Text className="text-white font-semibold text-base">
              Submit Leave Request
            </Text>
          </TouchableOpacity>
        </View>

        {/* Leave Request History */}
        <View className="m-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Leave History
          </Text>
          {leaveRequests.length === 0 ? (
            <Text className="text-gray-500 dark:text-gray-400 text-center">
              No leave requests found.
            </Text>
          ) : (
            leaveRequests.map((request) => (
              <View
                key={request.id}
                className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex-row justify-between items-center"
              >
                <View className="flex-1 mr-3">
                  <Text className="font-medium text-gray-800 dark:text-white">
                    {format(request.startDate, 'MMM dd')} - {format(request.endDate, 'MMM dd, yyyy')}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Reason: {request.reason}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    Type: {request.type === 'mess' ? 'Mess Leave' : 'Hostel Leave'}
                  </Text>
                </View>
                <View className="items-end">
                  <View className="flex-row items-center">
                    <Icon
                      name={getStatusIcon(request.status)}
                      size={16}
                      className="mr-1"
                      color={
                        request.status === 'approved'
                          ? isDarkMode ? '#34D399' : '#10B981'
                          : request.status === 'rejected'
                          ? isDarkMode ? '#F87171' : '#EF4444'
                          : isDarkMode ? '#FCD34D' : '#F59E0B'
                      }
                    />
                    <Text className={`font-semibold ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Days: {differenceInDays(request.endDate, request.startDate) + 1}
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaveScreen; 