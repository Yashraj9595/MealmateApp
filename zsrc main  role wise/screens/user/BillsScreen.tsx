import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import type { DashboardStackScreenProps } from '../../navigation/types';

type Bill = {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
};

const BillsScreen: React.FC<DashboardStackScreenProps<'Bills'>> = () => {
  const navigation = useNavigation();
  const [bills] = useState<Bill[]>([
    {
      id: '1',
      date: '2024-03-01',
      amount: 1500,
      status: 'paid',
      description: 'March Mess Bill'
    },
    {
      id: '2',
      date: '2024-03-15',
      amount: 750,
      status: 'pending',
      description: 'Additional Meal Charges'
    }
  ]);

  const getStatusColor = (status: Bill['status']) => {
    switch (status) {
      case 'paid':
        return '#10B981';
      case 'pending':
        return '#F59E0B';
      case 'overdue':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bills & Payments</Text>
        <Text style={styles.subtitle}>View and manage your mess bills</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.billList}>
          {bills.map((bill) => (
            <TouchableOpacity
              key={bill.id}
              style={styles.billCard}
              onPress={() => {/* Handle bill details */}}
            >
              <View style={styles.billContent}>
                <View>
                  <Text style={styles.billDescription}>
                    {bill.description}
                  </Text>
                  <Text style={styles.billDate}>
                    {new Date(bill.date).toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.billAmountContainer}>
                  <Text style={styles.billAmount}>
                    ₹{bill.amount}
                  </Text>
                  <Text style={[styles.billStatus, { color: getStatusColor(bill.status) }]}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {/* Handle payment */}}
        >
          <Text style={styles.payButtonText}>
            Pay Outstanding Bills
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
  scrollView: {
    flex: 1,
  },
  billList: {
    padding: 16,
  },
  billCard: {
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
  billContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  billDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  billDate: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  billAmountContainer: {
    alignItems: 'flex-end',
  },
  billAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  billStatus: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  payButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BillsScreen; 