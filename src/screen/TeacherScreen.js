import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { useFonts, Nunito_700Bold, Nunito_300Light, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import { checkConnected } from '../checknet';
import NoConnectScreen from './NoConnectScreen';
import Header from '../components/Header';
import HomeBtn from '../components/HomeBtn';

const TeacherScreen = ({ navigation }) => {
    const [connectStatus, setConnectStatus] = useState(false);
    const [loading, setLoading] = useState(false);

    checkConnected().then(res => {
        setConnectStatus(res)
    });
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
            connectStatus ? (
                <View>
                    <Header />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, flexWrap: 'wrap' }}>
                        <HomeBtn txt="Ирцийн мэдээлэл оруулах" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic2.png`)} onPress={() => navigation.navigate('InsertIrc')} />
                        <HomeBtn txt="Манай анги" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic1.png`)} onPress={() => navigation.navigate('InsertYvc')} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, flexWrap: 'wrap' }}>
                        <HomeBtn txt="Ангиуд" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic6.png`)} onPress={() => navigation.navigate('TeacherClass')} />
                        <HomeBtn txt="Хичээлүүд" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic5.png`)} onPress={() => navigation.navigate('TeacherLesson')} />
                    </View>
                    {/*
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, flexWrap: 'wrap' }}>
                        <HomeBtn txt="Өмнөх мэдлэг ур чадварын үнэлгээ хийх" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic3.png`)} onPress={() => navigation.navigate('')} />
                        <HomeBtn txt="Үнэлгээний шалгуур үзүүлэлт оруулах" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic4.png`)} onPress={() => navigation.navigate('')} />
            </View>*/}
                </View>
            ) : <NoConnectScreen onCheck={checkConnected} />
        )
    }
}
export default TeacherScreen
const styles = StyleSheet.create({

})
