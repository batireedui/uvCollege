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
            <MyDatePicker value={fognoo} onChange={setfognoo}/>
            <MyDatePicker value={lognoo} onChange={setlognoo}/>
        </View>
    )
}

export default TeacherMyClass

const styles = StyleSheet.create({})