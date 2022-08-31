import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ProgressViewIOSBase } from 'react-native';
import CircularProgress from './components/CircularProgress';
import Payment from './payment';

export default function TransactionProgress({ onPressBackChargeDetail }) {
    const [percent, setPercent] = useState(100);
    const [openInvoicePage, setOpenInvoicePage] = useState(false);
    const onPressOpenInvoicePage = () => {
        setOpenInvoicePage(true);
    }

    return (
        <View>
            {percent != 100 &&
                <View>
                    <CircularProgress percent={percent}></CircularProgress>
                    <TouchableOpacity>
                        <Text onPress={onPressBackChargeDetail}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text onPress={onPressBackChargeDetail}>Stop</Text>
                    </TouchableOpacity>
                </View>
            }
            {percent == 100 &&
               <Payment></Payment>
            }


        </View>
    );
}