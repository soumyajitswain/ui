import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ChargingStationList from './chargingStationList';

export default function Landing() {
    const [chargeStationSelection, setChageStationSelection] = useState("");

    const onPressChargeStationSelection = () => {

    }

    return (
        <View>
            <View style={styles.section}>
                <Text size={20} white>
                    Enviorn
                </Text>
            </View>
            <View style={styles.sectionLarge}>
                <ChargingStationList onPressChargeStationSelection={onPressChargeStationSelection}></ChargingStationList>
            </View>
            <View style={[styles.section, styles.section]}>
                <Text color="#19e7f7" hCenter size={15} style={styles.description}>
                    
                </Text>
                <View style={styles.priceContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text white bold size={50} style={styles.price}>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    bgImage: {
        flex: 1,
        marginHorizontal: -20,
    },
    section: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    sectionLarge: {
        flex: 2,
        justifyContent: 'space-around',
        borderWidth: '0.5px'
    },
    sectionHeader: {
        marginBottom: 8,
    },
    priceContainer: {
        alignItems: 'center',
    },
    description: {
        padding: 15,
        lineHeight: 25,
    },
    titleDescription: {
        color: '#19e7f7',
        textAlign: 'center',
        fontFamily: fonts.primaryRegular,
        fontSize: 15,
    },
    title: {
        marginTop: 30,
    },
    price: {
        marginBottom: 5,
    },
    priceLink: {
        borderBottomWidth: 1,
    },
});