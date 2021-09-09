import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFonts, Nunito_700Bold, Nunito_300Light } from '@expo-google-fonts/nunito';

import { checkConnected } from '../checknet';
import NoConnectScreen from './NoConnectScreen';
export default function MainScreen() {
    const [connectStatus, setConnectStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    checkConnected().then(res => {
        setConnectStatus(res)
    });
    let [fontsLoaded] = useFonts({
        Nunito_700Bold,
        Nunito_300Light
    });

    if (!fontsLoaded) {
        return <Text>Түр хүлээнэ үү</Text>;
    } else {
        return (
            connectStatus ? (
                <View>
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>Бат-Ирээдүй</Text>
                            <Text style={styles.titleText}>75%</Text>
                        </View>
                        <View style={styles.titleS}>
                            <Text style={styles.titleSub}>Мэдээллийн технологич 1.5 жил - 1-р курс</Text>
                        </View>
                    </View>
                    <View>
                    </View>
                </View>
            ) : <NoConnectScreen onCheck={checkConnected} />
        )
    }
}

const styles = StyleSheet.create({
    title: {
        height: 55,
        backgroundColor: '#880e4f',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    titleS: {
        backgroundColor: '#880e4f',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 15,
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30
    },
    titleText: {
        color: '#fff',
        fontFamily: 'Nunito_700Bold',
        backgroundColor: '#560027',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10
    },
    titleSub: {
        color: '#fff',
        fontFamily: 'Nunito_300Light',
        alignItems: 'center'
    }
})
