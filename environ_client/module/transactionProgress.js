import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TransactionProgress({ onPressBackChargeDetail }) {
    return (
        <View>
            <Text>Transaction Progress</Text>
            <TouchableOpacity>
                <Text onPress={onPressBackChargeDetail}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text onPress={onPressBackChargeDetail}>Stop</Text>
            </TouchableOpacity>

        </View>
    );
}