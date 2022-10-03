import React, { createContext, useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'

import Header from '../components/Header'
import { serverUrl } from '../Const'
import axios from 'react-native-axios'
import { MyContext } from "../context/MyContext";
import { Input, MyButton, Icon } from "../components/login";
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectList from 'react-native-dropdown-select-list'
import Spinning from '../components/Spinning'
const InsertIrc = () => {
    const state = useContext(MyContext);
    const [load, setLoad] = useState(false);
    const [myclass, setmyclass] = useState([]);

    const [mylesson, setmylesson] = useState([]);

    const [selectDate, setSelectDate] = useState(new Date());
    const [selectCag, setSelectCag] = useState(0);
    const [selectLesson, setSelectLesson] = useState("0");
    const [selectClass, setSelectClass] = useState(0);

    const [error, setError] = useState("");
    const [too, setToo] = useState("");
    const [btn, setBtn] = useState(false);
    const [studentList, setStudentList] = useState([]);

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    function toJSONLocal(date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(true);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    useEffect(() => {
        setLoad(true);
        axios.post(serverUrl + "teacherclass.php", {
            "tid": parseInt(state.theUser.id),
        })
            .then(data => { setmyclass(data.data); setLoad(false); console.log(data.data); })
            .catch(err => { console.log(err); setmyclass("nodata"); setLoad(false); });
        return () => {

        }
    }, []);
    useEffect(() => {
        if (Platform.OS === 'ios') {
            setShow(true);
        }
        axios.post(serverUrl + "teacherlesson.php", {
            "tid": parseInt(state.theUser.id),
        })
            .then(data => { setmylesson(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, []);
    const checkIrc = () => {
        if (selectClass == "0") {
            Alert.alert("Хичээл орсон ангиа сонгоно уу!");
        }
        else if (selectLesson == "0") {
            Alert.alert("Хичээлээ сонгоно уу!");
        }
        else if (selectCag == "0") {
            Alert.alert("Цагаа сонгоно уу!");
        }
        else {
            setLoad(true);
            axios.post(serverUrl + "checkirc.php", {
                "selectDate": toJSONLocal(selectDate),
                "selectClass": selectClass,
                "selectCag": selectCag,
                "teacherid": state.theUser.id,
            })
                .then(data => {
                    setStudentList(data.data);
                    if (typeof (data.data) === "string" && data.data === "duplicate") {
                        Alert.alert("Та " + toJSONLocal(selectDate) + " өдрийн " + selectCag + "-р цагт өөр ангид хичээлийн бүртгэл хийсэн байна.");
                        setToo("");
                        setBtn(false);
                    }
                    else if (typeof (data.data) === "string" && data.data !== "nodata") {
                        Alert.alert("Энэ ангид " + toJSONLocal(selectDate) + " өдрийн " + selectCag + "-р цагт " + data.data + " багш хичээлийн бүртгэл хийсэн байна.");
                        setToo("");
                        setBtn(false);
                    }
                    else if (typeof (data.data) === "string" && data.data === "nodata") {
                        axios.post(serverUrl + "studentListClass.php", {
                            "classid": selectClass
                        })
                            .then(datas => {
                                setStudentList(datas.data);
                                setToo("Нийт " + datas.data.length + " суралцагч.");
                                setBtn(true);
                            })
                            .catch(err => { console.log(err); setLoad(false); });
                    }
                    else {
                        Alert.alert("Энэ ангид та өмнө нь ирц бүртгэл хийсэн байна. Ирцийн мэдээллийг өөрчлөх гэж байгаа бол өөрчлөлтөө хийсний дараа хадгалах товчлуур дарна уу.");
                        setToo("Нийт " + data.data.length + " суралцагч.");
                        setBtn(true);
                    }
                    setLoad(false);
                })
                .catch(err => { console.log(err); setLoad(false); });

        }
    };

    const dateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        if (Platform.OS === 'android') {
            setShow(false);
        }
        setSelectDate(currentDate);
        setStudentList("nodata");
        setBtn(false);
    };
    const sendIrc = () => {
        if (selectClass == "0") {
            Alert.alert("Хичээл орсон ангиа сонгоно уу!");
        }
        else if (selectLesson == "0") {
            Alert.alert("Хичээлээ сонгоно уу!");
        }
        else if (selectCag == "0") {
            Alert.alert("Цагаа сонгоно уу!");
        }
        else {
            axios.post(serverUrl + "studentircadd.php", {
                "ircObj": studentList,
                "selectLesson": selectLesson,
                "selectDate": toJSONLocal(selectDate),
                "selectClass": selectClass,
                "selectCag": selectCag,
                "teacherid": state.theUser.id,
            })
                .then(data => {
                    console.log(data.data);
                    if (data.data == "1") {
                        Alert.alert("Ирцийн мэдээлэл амжилттай бүртгэгдлээ.");
                    }

                })
                .catch(err => { setError("err") });
        }
    };

    let temparrstudent = [];
    let aa = 1;

    const clickbtn = (id, btn) => {
        //console.log(id + "--" + btn);
        let i1 = 0;
        let i2 = 0;
        let i3 = 0;
        let i4 = 0;
        temparrstudent = [...studentList];
        for (const ele of temparrstudent) {
            if (ele.id === id) {
                ele.tuluv = btn;
            }
            if (ele.tuluv == 1)
                i1++;
            else if (ele.tuluv == 2)
                i2++;
            else if (ele.tuluv == 3)
                i3++;
            else
                i4++;
        }
        let sum = i1 + i2 + i3 + i4;
        setToo("Нийт: " + sum + " Ирсэн: " + i1 + " Өвчтэй: " + i2 + " Чөлөөтэй: " + i3 + " Тасалсан: " + i4);
        setStudentList(temparrstudent);
    };

    const clickIdevh = (id, btn) => {
        //console.log(id + "--" + btn);
        temparrstudent = [...studentList];
        for (const ele of temparrstudent) {
            if (ele.id === id) {
                ele.idevh = btn;
            }
        }
        setStudentList(temparrstudent);
    };

    const changeVal = () => {
        setStudentList("nodata");
        setBtn(false);
    }
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View>
                <SelectList
                    setSelected={setSelectClass}
                    placeholder="Ангиа сонгоно уу"
                    search={false}
                    boxStyles={styles.dropbox}
                    dropdownStyles={styles.drop}
                    dropdownItemStyles={styles.dropitem}
                    dropdownTextStyles={styles.droptext}
                    onSelect={() => changeVal()}
                    data={myclass !== "nodata" ? myclass.length > 0 ?
                        myclass.map((el, index) => (
                            { key: el.id, value: el.name }
                        )
                        ) : [] : []}
                />
                <SelectList
                    setSelected={setSelectLesson}
                    placeholder="Хичээлээ сонгоно уу"
                    search={false}
                    boxStyles={styles.dropbox}
                    dropdownStyles={styles.drop}
                    dropdownItemStyles={styles.dropitem}
                    dropdownTextStyles={styles.droptext}
                    onSelect={() => changeVal()}
                    data={mylesson !== "nodata" ? mylesson.length > 0 ?
                        mylesson.map((el, index) => (
                            { value: el.lessonName, key: el.id }
                        )
                        ) : [] : []}
                />
                <View style={{ marginHorizontal: 16, marginTop: 8, justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {
                            Platform.OS === 'android' ?
                                <TouchableOpacity
                                    onPress={showDatepicker}
                                    style={{ backgroundColor: "#D8D8D8", alignItems: 'center', padding: 5, borderRadius: 5 }}>
                                    <Text>Өдрөө сонгоно уу</Text>
                                </TouchableOpacity>
                                : <Text style={{ fontWeight: 'bold' }}>Өдрөө сонгоно уу</Text>
                        }
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            Platform.OS === 'android' ?
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{toJSONLocal(selectDate)}</Text>
                                </View>
                                : null
                        }
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={selectDate}
                                mode={mode}
                                onChange={dateChange}
                            />
                        )}
                    </View>
                </View>
                <SelectList
                    setSelected={setSelectCag}
                    placeholder="Цагаа сонгоно уу"
                    search={false}
                    boxStyles={styles.dropbox}
                    dropdownStyles={styles.drop}
                    dropdownItemStyles={styles.dropitem}
                    dropdownTextStyles={styles.droptext}
                    onSelect={() => changeVal()}
                    data={[
                        { value: "1-р цаг", key: 1 },
                        { value: "2-р цаг", key: 2 },
                        { value: "3-р цаг", key: 3 },
                        { value: "4-р цаг", key: 4 },
                        { value: "5-р цаг", key: 5 },
                        { value: "6-р цаг", key: 6 },
                        { value: "7-р цаг", key: 7 },
                        { value: "8-р цаг", key: 8 },
                    ]}
                />
                <View style={{ marginVertical: 10 }}>
                    <MyButton title="ШАЛГАХ" onPress={() => checkIrc()} />
                </View>
            </View>
            <SafeAreaView style={{ flex: 1 }}>
                {load === false ?
                    <ScrollView>
                        {btn && (<View>
                            <MyButton title="ХАДГАЛАХ" onPress={() => sendIrc()} background="#ff8301" />
                        </View>)}
                        {typeof (studentList) !== "string" ?
                            studentList.length > 0 ?
                                studentList.map((e, index) =>
                                    <View key={index} style={{ marginHorizontal: 15, marginVertical: 8, backgroundColor: "#d9d9d9", padding: 8, borderRadius: 5 }}>
                                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', }}>
                                                <Text style={styles.nameText}>{index + 1}. </Text>
                                                <Text style={styles.nameText}>{e.fname}</Text>
                                                <Text style={[styles.nameText, { textTransform: 'uppercase' }]}>{e.lname}</Text>
                                            </View>
                                            <View style={{ backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 3 }}>
                                                {e.tuluv == 1 ? <Text style={[styles.stateText, { color: "#198754" }]}>Ирсэн</Text> :
                                                    (e.tuluv == 2 ? <Text style={[styles.stateText, { color: "#31D2F2" }]}>Өвчтэй</Text> :
                                                        (e.tuluv == 3 ? <Text style={[styles.stateText, { color: "#0D6EFD" }]}>Чөлөөтэй</Text> : <Text style={[styles.stateText, { color: "#5C636A" }]}>Тасалсан</Text>))}
                                            </View></View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <TouchableOpacity onPress={() => clickbtn(e.id, 1)} style={[styles.btnStyle, { backgroundColor: "#198754" }]}><Text style={styles.btnText}>Ирсэн</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => clickbtn(e.id, 2)} style={[styles.btnStyle, { backgroundColor: "#31D2F2" }]}><Text style={styles.btnText}>Өвчтэй</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => clickbtn(e.id, 3)} style={[styles.btnStyle, { backgroundColor: "#0D6EFD" }]}><Text style={styles.btnText}>Чөлөөтэй</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => clickbtn(e.id, 4)} style={[styles.btnStyle, { backgroundColor: "#5C636A" }]}><Text style={styles.btnText}>Тасалсан</Text></TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
                                            <TouchableOpacity onPress={() => clickIdevh(e.id, 0)} style={[styles.btnStyle, { backgroundColor: "#fff", opacity: e.idevh == 0 ? 1 : 0.5}]}>
                                                <Image source={require(`../../assets/emoji/0.jpg`)} style={{ width: 40, height: 40 }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => clickIdevh(e.id, 1)} style={[styles.btnStyle, { backgroundColor: "#fff", opacity: e.idevh == 1 ? 1 : 0.5 }]}>
                                                <Image source={require(`../../assets/emoji/1.jpg`)} style={{ width: 40, height: 40 }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => clickIdevh(e.id, 2)} style={[styles.btnStyle, { backgroundColor: "#fff", opacity: e.idevh == 2 ? 1 : 0.5 }]}>
                                                <Image source={require(`../../assets/emoji/2.jpg`)} style={{ width: 40, height: 40 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                                : null : null
                        }
                        {btn && (<View>
                            <MyButton title="ХАДГАЛАХ" onPress={() => sendIrc()} background="#ff8301" />
                        </View>)}
                    </ScrollView>
                    : <Spinning />}</SafeAreaView>
        </View>
    )
}

export default InsertIrc

const styles = StyleSheet.create({
    stateText: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    btnStyle: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
    },
    btnText: {
        color: "#fff"
    },
    nameText: {
        fontSize: 16,
        marginRight: 3
    },
    dropbox: {
        borderRadius: 5, marginHorizontal: 16, marginTop: 8
    },
    drop: {
        borderRadius: 5, marginHorizontal: 16, marginTop: -1, paddingVertical: 0, marginVertical: 0, backgroundColor: '#ececec'
    },
    dropitem: {
        borderRadius: 5, marginTop: 3, paddingVertical: 5, marginVertical: 0
    },
    droptext: {
        color: 'gray'
    }
})
