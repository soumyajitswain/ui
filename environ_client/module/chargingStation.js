import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ChargingStation({onPressChargeListPage}) {
    return(
        <View>
            <Text>Charging station detail</Text>
            <TouchableOpacity>
                <Text onPress={onPressChargeListPage}>LOGIN</Text>
            </TouchableOpacity>

        </View>
    );
}