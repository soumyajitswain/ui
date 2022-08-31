import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Payment() {
    const makePayment = () => {
        alert('Make Payment');
    }
    return (
        <View>
            <View style={[styles.container, {
                backgroundColor: "grey",
                flexDirection: "row"
            }]}>
                <Text>Unit consumed:</Text><Text>30</Text>
            </View>
            <View style={[styles.container, {
                flexDirection: "row"
            }]}>
                <Text>Amount:</Text><Text>100</Text>
            </View>
            <TouchableOpacity>
                <Text onPress={makePayment}>Payment</Text>
            </TouchableOpacity>
        </View>
    )

}
const styles = StyleSheet.create(
    {
        container: {
        }
    }
)