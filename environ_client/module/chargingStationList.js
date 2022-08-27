import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ChargingStation from './chargingStation';

export default function ChargingStationList() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedItemFlag, setSelectedItemFlag] = useState(false);

    const [data, setData] = useState([
        {
            id: 0,
            name: "Charging Station 1",
            bgColor: "#D09040",
            price: "$250",
            type: "Featured",
            sizes: [6, 7, 8, 9, 10, 16],
        },
        {
            id: 1,
            name: "Charging Station 2",
            bgColor: "#D3D1C8",
            type: "Featured",
            price: "$150",
            sizes: [6, 7, 8, 9, 10, 12],
        },
        {
            id: 2,
            name: "Charging Station 3",
            type: "Featured",
            bgColor: "#303946",
            price: "$160",
            sizes: [6, 7, 8, 9, 10],
        }
    ])

    const onPressChargeListPage  = () => {
        alert('Back');
        setSelectedItemFlag(false);
    }

    const renderFeaturedItems = (item, index) => {
        return (
            <TouchableOpacity
                style={{ height: 100, width: 100, justifyContent: "center" }}
                onPress={() => {
                    setSelectedItem(item);
                    setSelectedItemFlag(true);
                }}
            >
                <View>
                    <View>
                        <Text style={{ color: Colors.black, marginTop: 20 }}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <View>
            {!selectedItemFlag &&
                <FlatList
                    horizontal='true' data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => renderFeaturedItems(item, index)}></FlatList>
            }
            {selectedItemFlag &&
              <ChargingStation onPressChargeListPage={onPressChargeListPage}></ChargingStation>
            }

        </View>
    );

}