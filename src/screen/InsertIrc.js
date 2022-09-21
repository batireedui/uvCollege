import React, { createContext, useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'

import Header from '../components/Header'
import { serverUrl } from '../Const'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'react-native-axios'
import { MyContext } from "../context/MyContext";
import { Input, Button, Icon } from "../components/login";
import MyDatePicker from '../components/MyDatePicker';
const InsertIrc = () => {
    const state = useContext(MyContext);
    const [myclass, setmyclass] = useState([]);
    const [load, setLoad] = useState(false);
    const [mylesson, setmylesson] = useState([]);
    const [error, setError] = useState("");
    const [too, setToo] = useState("");
    const [btn, setBtn] = useState(false);
    const [selectDate, setSelectDate] = useState(new Date());

    function toJSONLocal(date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }

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
            setError("Хичээл орсон ангиа сонгоно уу!");
        }
        else if (selectLesson == "0") {
            setError("Хичээлээ сонгоно уу!");
        }
        else {
            setError("");
            axios.post(serverUrl + "checkirc.php", {
                "selectDate": toJSONLocal(selectDate),
                "selectClass": selectClass,
                "selectCag": selectCag,
                "teacherid": state.theUser.id,
            })
                .then(data => {
                    console.log(data.data);
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
                })
                .catch(err => { console.log(err); });

        }
    };
    return (
        <View>
            <Header />
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={{
                    label: 'Ангиа сонгоно уу', value: null,
                    color: '#9EA0A4',
                }}
                style={pickerSelectStyles}
                items={
                    myclass !== "nodata" ? myclass.length > 0 ?
                        myclass.map((el, index) => (
                            { label: el.name, value: el.id }
                        )
                        ) : [] : []
                }
            />
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={{
                    label: 'Хичээлээ сонгоно уу', value: null,
                    color: '#9EA0A4',
                }}
                style={pickerSelectStyles}
                items={
                    mylesson !== "nodata" ? mylesson.length > 0 ?
                        mylesson.map((el, index) => (
                            { label: el.lessonName, value: el.id }
                        )
                        ) : [] : []
                }
            />
            
            <RNPickerSelect
                onValueChange={(value) => console.log(value)}
                placeholder={{
                    label: 'Цагаа сонгоно уу', value: null,
                    color: '#9EA0A4',
                }}
                style={pickerSelectStyles}
                items={[
                    { label: "1-р цаг", value: "1" },
                    { label: "2-р цаг", value: "2" },
                    { label: "3-р цаг", value: "3" },
                    { label: "4-р цаг", value: "4" },
                    { label: "5-р цаг", value: "5" },
                    { label: "6-р цаг", value: "6" },
                    { label: "7-р цаг", value: "7" },
                    { label: "8-р цаг", value: "8" },
                ]}
            />
            <Button title="ШАЛГАХ" onPress={() => checkIrc()} />
            <MyDatePicker/>
        </View>
    )
}

export default InsertIrc

const styles = StyleSheet.create({
    listBtn: {
        borderWidth: 1,
        color: '#000'
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginTop: 8,
        marginHorizontal: 16,
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        margin: 16,
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});