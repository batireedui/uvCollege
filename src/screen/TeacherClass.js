import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header'
import axios from 'react-native-axios'
import { MyContext } from '../context/MyContext'
import { serverUrl } from '../Const'
const TeacherClass = () => {
    const [classlist, setclasslist] = useState([]);
    const [load, setLoad] = useState(false);
    const state = useContext(MyContext);

    useEffect(() => {
        setLoad(true);
        axios.post(serverUrl + "/classlist.php")
            .then(data => { setclasslist(data.data); setLoad(false); })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, []);
    let aa = 1;
    return (
        <View>
            <Header />
            {classlist.map((e, index) => <View key={index}>
                <Text>{aa++}</Text>
                <Text>{e.name}</Text>
                <Text>{e.hugacaa}</Text>
                <TouchableOpacity onClick={() => { addclass(e.id) }}><Text>Нэмэх</Text></TouchableOpacity>
            </View>)}
        </View>
    )
}

export default TeacherClass

const styles = StyleSheet.create({})