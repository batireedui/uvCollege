import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { useFonts, Nunito_700Bold, Nunito_300Light, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { MyContext } from '../context/MyContext';
import { checkConnected } from '../checknet';
const Header = () => {
    const state = useContext(MyContext);
    let [fontsLoaded] = useFonts({
        Nunito_700Bold,
        Nunito_300Light,
        Nunito_800ExtraBold
    });
    const getCurrentDate = () => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();

        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
    }
    if (!fontsLoaded) {
        return <Text>Түр хүлээнэ үү</Text>;
    } else {
        return (
            <View style={{ marginHorizontal: 10 }}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>{state.theUser.lname}</Text>
                    <Text style={styles.titleText}>{getCurrentDate()}</Text>
                </View>
                <View style={styles.titleS}>
                    <Text style={styles.titleSub}>{state.theUser.at}</Text>
                </View>
            </View>
        )
    }
}
export default Header
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
    },
})
