import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CircularProgress from './components/CircularProgress';

export default function TransactionProgress({ onPressBackChargeDetail }) {
    return (
        <View>
            <CircularProgress percent={80}></CircularProgress>
            <TouchableOpacity>
                <Text onPress={onPressBackChargeDetail}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text onPress={onPressBackChargeDetail}>Stop</Text>
            </TouchableOpacity>

        </View>
    );
}