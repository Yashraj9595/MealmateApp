import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  useColorScheme,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from '../../services/api';
import { useLoading } from '../../contexts/LoadingContext';
import { useUser } from '../../contexts/UserContext';
import type { RootStackParamList } from '../../navigation/types';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

interface Address {
  houseFlat: string;
  streetArea: string;
  college: string;
  landmark: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  country: string;
}

interface FormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: Address;
  messName: string;
  messAddress: Address;
  messImage: string | null;
}

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [role, setRole] = useState('user');
  const isDarkMode = useColorScheme() === 'dark';
  const { setIsLoading } = useLoading();
  const { updateUser } = useUser();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      houseFlat: '',
      streetArea: '',
      college: '',
      landmark: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
      country: '',
    },
    messName: '',
    messAddress: {
      houseFlat: '',
      streetArea: '',
      landmark: '',
      city: '',
      district: '',
      state: '',
      pincode: '',
      country: '',
      college: '',
    },
    messImage: null,
  });

  const handleImagePicker = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 800,
      maxWidth: 800,
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        setFormData({ ...formData, messImage: response.assets[0].uri });
      }
    });
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    if (role === 'mess_owner' && !formData.messName) {
      Alert.alert('Error', 'Please enter mess name');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const userData = {
        studentId: '', // Generate or get from somewhere if needed
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobileNumber,
        password: formData.password,
        role: role,
        address: role === 'user' ? formData.address : formData.messAddress,
        ...(role === 'mess_owner' && {
          messDetails: {
            name: formData.messName,
            address: formData.messAddress,
            image: formData.messImage || undefined,
          },
        }),
      };

      const response = await authService.register(userData);
      
      // Update user context
      updateUser(response.user);
    } catch (error: any) {
      const message = error.response?.data?.message || 'An error occurred during registration';
      Alert.alert('Error', message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    options: any = {}
  ) => (
    <View className="mb-4">
      <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        {label}
      </Text>
      <TextInput
        className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#9CA3AF"
        {...options}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50 dark:bg-slate-900"
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-4xl font-bold text-primary dark:text-primary-dark">
            MealMate
          </Text>
          <Text className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Create your account
          </Text>
        </View>

        {/* Role Selection */}
        <View className="mb-6">
          <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Select Role
          </Text>
          <View className="flex-row space-x-4">
            {['user', 'mess_owner'].map((r) => (
              <TouchableOpacity
                key={r}
                className={`flex-1 py-3 rounded-lg ${
                  role === r
                    ? 'bg-primary dark:bg-primary-dark'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
                onPress={() => setRole(r)}
              >
                <Text
                  className={`text-center font-medium ${
                    role === r
                      ? 'text-white'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {r === 'user' ? 'Student' : 'Mess Owner'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Basic Information */}
        {renderInput('Full Name', formData.fullName, (text) =>
          setFormData({ ...formData, fullName: text })
        )}
        {renderInput('Mobile Number', formData.mobileNumber, (text) =>
          setFormData({ ...formData, mobileNumber: text })
        )}
        {renderInput('Email', formData.email, (text) =>
          setFormData({ ...formData, email: text }),
          { keyboardType: 'email-address', autoCapitalize: 'none' }
        )}
        {renderInput('Password', formData.password, (text) =>
          setFormData({ ...formData, password: text }),
          { secureTextEntry: true }
        )}
        {renderInput('Confirm Password', formData.confirmPassword, (text) =>
          setFormData({ ...formData, confirmPassword: text }),
          { secureTextEntry: true }
        )}

        {/* Address Information */}
        <View className="mt-6">
          <Text className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
            {role === 'user' ? 'Your Address' : 'Mess Details'}
          </Text>
          
          {role === 'mess_owner' && (
            renderInput('Mess Name', formData.messName, (text) =>
              setFormData({ ...formData, messName: text })
            )
          )}

          {/* Address Fields */}
          {renderInput('House/Flat No.', 
            role === 'user' ? formData.address.houseFlat : formData.messAddress.houseFlat,
            (text) => {
              const addressType = role === 'user' ? 'address' : 'messAddress';
              setFormData({
                ...formData,
                [addressType]: { ...formData[addressType], houseFlat: text }
              });
            }
          )}
          
          {renderInput('Street/Area',
            role === 'user' ? formData.address.streetArea : formData.messAddress.streetArea,
            (text) => {
              const addressType = role === 'user' ? 'address' : 'messAddress';
              setFormData({
                ...formData,
                [addressType]: { ...formData[addressType], streetArea: text }
              });
            }
          )}

          {/* Mess Image Upload for mess owners */}
          {role === 'mess_owner' && (
            <View className="mt-4">
              <Text className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Mess Image
              </Text>
              <TouchableOpacity
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4 items-center"
                onPress={handleImagePicker}
              >
                {formData.messImage ? (
                  <Image
                    source={{ uri: formData.messImage }}
                    className="w-full h-48 rounded-lg"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="items-center">
                    <Icon name="add-photo-alternate" size={48} color={isDarkMode ? '#94A3B8' : '#64748B'} />
                    <Text className="text-slate-500 dark:text-slate-400 mt-2">
                      Upload Mess Image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Register Button */}
        <TouchableOpacity
          className="w-full bg-primary dark:bg-primary-dark py-3 rounded-lg items-center mt-8"
          onPress={handleRegister}
        >
          <Text className="text-white font-semibold text-base">
            Create Account
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-primary dark:text-primary-dark font-semibold">
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen; 