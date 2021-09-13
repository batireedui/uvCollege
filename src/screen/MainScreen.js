import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useFonts, Nunito_700Bold, Nunito_300Light } from '@expo-google-fonts/nunito';

import { checkConnected } from '../checknet';
import NoConnectScreen from './NoConnectScreen';
import HomeBtn from '../components/HomeBtn';
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
                            <Text style={styles.titleText}>95%</Text>
                        </View>
                        <View style={styles.titleS}>
                            <Text style={styles.titleSub}>Мэдээллийн технологич 1.5 жил - 1-р курс</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                        <HomeBtn txt = "Ирцийн мэдээлэл" style={{backgroundColor: '#fff'}} icon={require(`../../assets/ic2.png`)}/>
                        <HomeBtn txt = "Үнэлгээ" style={{backgroundColor: '#fff'}} icon={require(`../../assets/ic1.png`)}/>
                    </View>
                </View>
            ) : <NoConnectScreen onCheck={checkConnected} />
        )
    }
}

const styles = StyleSheet.create({
    HomeBtn:{
        padding: 20,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
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
