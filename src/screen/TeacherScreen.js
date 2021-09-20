import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { useFonts, Nunito_700Bold, Nunito_300Light, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import { checkConnected } from '../checknet';
import NoConnectScreen from './NoConnectScreen';
import HomeBtn from '../components/HomeBtn';
const TeacherScreen = ({ navigation }) => {
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
                <View style={{ flex: 1 }}>
                    <View style={{ marginHorizontal: 10 }}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>Ц.Амарбаяр</Text>
                            <Text style={styles.titleText}>{getCurrentDate()}</Text>
                        </View>
                        <View style={styles.titleS}>
                            <Text style={styles.titleSub}>Багш, автомашины засварчин мэргэжлийн</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, flexWrap: 'wrap' }}>
                        <HomeBtn txt="Ирцийн мэдээлэл оруулах" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic2.png`)} onPress={() => navigation.navigate('IrcScreen', {zo: 2})} />
                        <HomeBtn txt="Явцын үнэлгээ хийх" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic1.png`)} onPress={() => navigation.navigate('DunScreen')} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, flexWrap: 'wrap' }}>
                        <HomeBtn txt="Идэвх оролцоо" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic6.png`)} onPress={() => navigation.navigate('IrcScreen')} />
                        <HomeBtn txt="Бие даалт" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic5.png`)} onPress={() => navigation.navigate('DunScreen')} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, flexWrap: 'wrap' }}>
                        <HomeBtn txt="Өмнөх мэдлэг ур чадварын үнэлгээ хийх" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic3.png`)} onPress={() => navigation.navigate('IrcScreen')} />
                        <HomeBtn txt="Үнэлгээний шалгуур үзүүлэлт оруулах" style={{ backgroundColor: '#fff' }} icon={require(`../../assets/ic4.png`)} onPress={() => navigation.navigate('DunScreen')} />
                    </View>
                </View>
            ) : <NoConnectScreen onCheck={checkConnected} />
        )
    }
}
export default TeacherScreen
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
