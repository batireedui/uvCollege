import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Image } from 'react-native'
import { useFonts, Nunito_700Bold, Nunito_300Light, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import { checkConnected } from '../checknet';
import NoConnectScreen from './NoConnectScreen';
import HomeBtn from '../components/HomeBtn';
import axios from 'react-native-axios'
import { MyContext } from '../context/MyContext'
import { serverUrl } from '../Const'
import Header from '../components/Header'
const FaScreen = ({ navigation }) => {
    const [connectStatus, setConnectStatus] = useState(false);
    const [load, setLoad] = useState(false);

    const state = useContext(MyContext);
    const [irc, setIrc] = useState([]);
    useEffect(() => {
        setLoad(true);
        axios.post(serverUrl + "showirc.php", {
            "sid": parseInt(state.theUser.id),
            "zo": 1
        })
            .then(data => {
                console.log(data.data);
                setIrc(data.data)
                setLoad(false);
            })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, []);



    let irsen = 0;
    let uvchtei = 0;
    let chuluutei = 0;
    let tas = 0;
    if (irc.length > 0 && irc !== "nodata") {
        irsen = irc.filter(el => el.state == 1).length;
        uvchtei = irc.filter(el => el.state == 2).length;
        chuluutei = irc.filter(el => el.state == 3).length;
        tas = irc.filter(el => el.state == 4).length;
    };
    console.log(irsen);

    const createTwoButtonAlert = (alertTailbar) =>
        Alert.alert(
            "Үнэлгээний тухай",
            alertTailbar,
        );
    checkConnected().then(res => {
        setConnectStatus(res)
    });
    let [fontsLoaded] = useFonts({
        Nunito_700Bold,
        Nunito_300Light,
        Nunito_800ExtraBold
    });

    if (!fontsLoaded) {
        return <Text>Түр хүлээнэ үү</Text>;
    } else {
        return (
            connectStatus ? (
                <View style={{ flex: 1 }}>
                    <Header />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#e2e2e2' }}>
                        <Text style={styles.infoTxt}>Ирсэн: {irsen * 2}</Text>
                        <Text style={styles.infoTxt}>Өвчтэй: {uvchtei * 2}</Text>
                        <Text style={styles.infoTxt}>Чөлөөтэй: {chuluutei * 2}</Text>
                        <Text style={styles.infoTxt}>Тасалсан: {tas * 2}</Text>
                    </View>
                    <View style={{ flex: 1, margin: 15 }}>
                        <Text style={styles.subT}>Ирцийн мэдээлэл</Text>
                        <ScrollView style={{}}>
                            {
                                irc !== "nodata" ?
                                    irc.length > 0 ?
                                        irc.map(el => (
                                            <TouchableOpacity key={el.id} style={[styles.list, {}]} onPress={() => createTwoButtonAlert(el.state)}>
                                                <Text style={{ fontFamily: 'Nunito_700Bold', }}>{el.lessonName}</Text>
                                                <Text>{el.ognoo} {el.cag}-р цаг</Text>
                                                <View style={{ width: 75, alignSelf: 'flex-end' }}>
                                                    {el.state == 1 ? <Text style={[styles.stText, { backgroundColor: "#198754" }]}>Ирсэн</Text> :
                                                        (el.state == 2 ? <Text style={[styles.stText, { backgroundColor: "#31D2F2" }]}>Өвчтэй</Text> :
                                                            (el.state == 3 ? <Text style={[styles.stText, { backgroundColor: "#0D6EFD" }]}>Чөлөөтэй</Text> : <Text style={[styles.stText, { backgroundColor: "#5C636A" }]}>Тасалсан</Text>))}
                                                </View>
                                                <TouchableOpacity>
                                                    <Image source={require(`../../assets/emoji/0.jpg`)} style={{ width: 25, height: 25 }} />
                                                </TouchableOpacity>
                                            </TouchableOpacity>
                                        )) : <Text style={{ color: 'red', marginTop: 15 }}>Ирцийн мэдээлэл бүртгэгдээгүй байна</Text> : <Text style={{ color: 'red', marginTop: 15 }}>Ирцийн мэдээлэл бүртгэгдээгүй байна</Text>
                            }
                        </ScrollView>
                    </View>
                </View>
            ) : <NoConnectScreen onCheck={checkConnected} />
        )
    }
}
export default FaScreen
const styles = StyleSheet.create({
    stText: {
        color: '#fff',
        textAlign: 'center',
        padding: 5
    },
    infoTxt: {
        textAlign: 'center',
        fontFamily: 'Nunito_700Bold',
    },
    listBtn: {
        textAlign: 'center',
        width: 110,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
        fontFamily: 'Nunito_700Bold',
        color: '#fff'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'space-around',
        borderBottomWidth: 1
    },
    HomeBtn: {
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
    },
    subT: {
        color: '#880e4f',
        fontSize: 20,
        fontFamily: 'Nunito_800ExtraBold',

    }
})
