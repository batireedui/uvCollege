import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../components/Header'
import axios from 'react-native-axios'
import { MyContext } from '../context/MyContext'
import { serverUrl } from '../Const'
import MyDatePicker from '../components/MyDatePicker';
const TeacherMyClass = () => {
    const [classList, setClassList] = useState([]);
    const [load, setLoad] = useState(false);
    const [fognoo, setfognoo] = useState(new Date());
    const [lognoo, setlognoo] = useState(new Date());
    const [cag, setcag] = useState(0);
    const [filterVal, setfilterVal] = useState("");
    const state = useContext(MyContext);

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    function toJSONLocal(date) {
        var local = new Date(date);
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }
    useEffect(() => {
        if (Platform.OS === 'ios') {
            setShow(true);
        }
        axios.post(serverUrl + "myClass.php", {
            "tid": state.theUser.id,
            "fognoo": toJSONLocal(fognoo),
            "lognoo": toJSONLocal(lognoo)
        })
            .then(data => {
                setClassList(data.data);
                if (typeof (data.data) === "object")
                    setcag(parseInt(data.data.length) * 2);
                else
                    setcag(0);
            })
            .catch(err => { });
        return () => {

        }
    }, [fognoo, lognoo])
 
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <Text>TeacherMyClass</Text>
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
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{toJSONLocal(fognoo)}</Text>
                            </View>
                            : null
                    }
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={fognoo}
                            mode={mode}
                            onChange={dateChange}
                        />
                    )}
                </View>
            </View>
            <MyDatePicker value={fognoo} onChange={dateChange}/>
        </View>
    )
}

export default TeacherMyClass

const styles = StyleSheet.create({})