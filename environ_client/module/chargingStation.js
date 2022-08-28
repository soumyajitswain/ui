import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TransactionProgress from './transactionProgress';

export default function ChargingStation({ onPressChargeListPage }) {
    const [chargingStarted, setChanrgingStarted] = useState(false);

    const onPressStartCharging = () => {
        alert('Charging started')
        setChanrgingStarted(true);
    }
    const onPressBackChargeDetail = () => {
        setChanrgingStarted(false);
    }
    return (
        <View>
            {!chargingStarted &&
                <View>
                    <Text>Charging station detail</Text>
                    <TouchableOpacity>
                        <Text onPress={onPressChargeListPage}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text onPress={onPressStartCharging}>Start</Text>
                    </TouchableOpacity>
                </View>
            }
            {chargingStarted &&
                <TransactionProgress onPressBackChargeDetail={onPressBackChargeDetail}></TransactionProgress>
            }
        </View>
    );
}