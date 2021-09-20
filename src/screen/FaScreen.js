import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { useFonts, Nunito_700Bold, Nunito_300Light, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import { checkConnected } from '../checknet';
import NoConnectScreen from './NoConnectScreen';
import HomeBtn from '../components/HomeBtn';
const FaScreen = ({navigation}) => {
    const [connectStatus, setConnectStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const unelsen = [
        {
            ner: "Хосломол хөдөлгүүрийн ялгааг тогтоосон",
            chn: "Автомашины бүтэц зохион байгуулалтыг тайлбарлах",
            dun: "Чадамжтай",
            tailbar: "Үнэлгээний тайлбар"
        },
        {
            ner: "Ажиллах зарчмыг тайлбарласан",
            chn: "Автомашины бүтэц зохион байгуулалтыг тайлбарлах",
            dun: "ХЧЭ",
            tailbar: "Үнэлгээний тайлбар"
        },
        {
            ner: "Тахир гол шатуны механизмын эд ангийн үүрэг бүтцийг оновчтой хэлсэн ",
            chn: "Автомашины бүтэц зохион байгуулалтыг тайлбарлах",
            dun: "ХЧЭ",
            tailbar: "Үнэлгээний тайлбар"
        }
        ,
        {
            ner: "Хөдөлгүүрийн үндсэн үзүүлэлтүүдийг нэрлэсэн",
            chn: "Механизмын ажиллах зарчмыг тайлбарласан ",
            dun: "Чадамжтай",
            tailbar: "Үнэлгээний тайлбар"
        },
        {
            ner: "Ажлын дараалалыг ялгасан",
            chn: "Хөдөлгөөнгүй эд ангиудыг нэрлэсэн",
            dun: "Чадамжтай",
            tailbar: "Үнэлгээний тайлбар"
        }
    ]
    const Unelgee = [
        {
            ner: "ДШХ-ийн төрлийг ялгасан",
            chn: "Автомашины бүтэц зохион байгуулалтыг тайлбарлах",
            dun: "Чадамжтай",
            tailbar: "Үнэлгээний тайлбар"
        },
        {
            ner: "ДШХ-ийг нэрлэсэн",
            chn: "Автомашины бүтэц зохион байгуулалтыг тайлбарлах",
            dun: "ХЧЭ",
            tailbar: "Үнэлгээний тайлбар"
        },
        {
            ner: "Хөдөлгүүрийн үндсэн үзүүлэлтүүдийг ялгасан",
            chn: "Автомашины бүтэц зохион байгуулалтыг тайлбарлах",
            dun: "ХЧЭ",
            tailbar: "Үнэлгээний тайлбар"
        }
        ,
        {
            ner: "Хөдөлгүүрийн үндсэн үзүүлэлтүүдийг нэрлэсэн",
            chn: "Автомашины бүтэц зохион байгуулалтыг тайлбарлах",
            dun: "Чадамжтай",
            tailbar: "Үнэлгээний тайлбар"
        },
        {
            ner: "Ажлын дараалалыг ялгасан",
            chn: "Автомашины бүтэц зохион байгуулалтыг тайлбарлах",
            dun: "Чадамжтай",
            tailbar: "Үнэлгээний тайлбар"
        }
    ]
    const createTwoButtonAlert = (alertTailbar) =>
    Alert.alert(
      "Үнэлгээний тухай",
      alertTailbar,
    );
    console.log(Unelgee.map(el => (el.ner)));
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
                <View style={{flex: 1}}>
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
                        <HomeBtn txt="Ирцийн мэдээлэл" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic2.png`)} onPress={() => navigation.navigate('IrcScreen', {zo: 1})} />
                        <HomeBtn txt="Үнэлгээ" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic1.png`)} onPress={() => navigation.navigate('DunScreen')} />
                    </View>
                    <View style={{ margin: 15, height: 200}}>
                        <Text style={styles.subT}>Удахгүй хийгдэх үнэлгээ</Text>
                        <ScrollView>
                        {
                            unelsen.map(el => (
                                <TouchableOpacity key={el.ner} style={styles.list} onPress={() => createTwoButtonAlert(el.tailbar)}>
                                    <View>
                                        <Text style={{ fontFamily: 'Nunito_700Bold', }}>{el.ner}</Text>
                                        <Text style={{ fontFamily: 'Nunito_300Light', fontSize: 10 }}>{el.chn}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                        </ScrollView>
                    </View>
                    <View style={{ margin: 15, flexGrow:  2}}>
                        <Text style={styles.subT}>Сүүлийн үнэлгээ</Text>
                        <ScrollView>
                        {
                            Unelgee.map(el => (
                                <TouchableOpacity key={el.ner} style={styles.list} onPress={() => createTwoButtonAlert(el.tailbar)}>
                                    <View style={{flex: 1}}>
                                        <Text style={{ fontFamily: 'Nunito_700Bold', }}>{el.ner}</Text>
                                        <Text style={{ fontFamily: 'Nunito_300Light', fontSize: 10 }}>{el.chn}</Text>
                                    </View>
                                    <Text style={[el.dun === "Чадамжтай" ? { backgroundColor: '#008229' } : { backgroundColor: '#ce0b2e', }, styles.listBtn]}>{el.dun}</Text>
                                </TouchableOpacity>
                            ))
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
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
