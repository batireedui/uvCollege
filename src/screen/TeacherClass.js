import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header'
import axios from 'react-native-axios'
import { MyContext } from '../context/MyContext'
import { serverUrl } from '../Const'
import SwitchSelector from "react-native-switch-selector";
import { ScrollView } from 'react-native'
import Spinning from '../components/Spinning'
const TeacherClass = () => {
    const [classlist, setclasslist] = useState([]);
    const [load, setLoad] = useState(false);
    const [addload, setAddLoad] = useState(false);
    const [myclass, setmyclass] = useState([]);
    const state = useContext(MyContext);
    const switchValue = [
        { label: "Багш", value: "0" },
        { label: "Эцэг/эх", value: "2" }
    ];

    useEffect(() => {
        setLoad(true);
        axios.post(serverUrl + "teacherclass.php", {
            "tid": parseInt(state.theUser.id)
        })
            .then(data => {
                console.log(data.data);
                setmyclass(data.data);
                setLoad(false);
                axios.post(serverUrl + "/classlist.php")
                    .then(d => { setclasslist(d.data); setLoad(false); })
                    .catch(err => { console.log(err); setLoad(false); });
            })
            .catch(err => { console.log(err); setLoad(false); });
        return () => {

        }
    }, []);

    const addclass = (val, classid) => {
        console.log(val)
        if (val > 0) {
            axios.post(serverUrl + "/teacherclassadd.php", {
                "tid": state.theUser.id,
                "classid": classid
            })
                .then(data => {
                    setAddLoad(addload => !addload);
                })
                .catch(err => { console.log(err); setLoad(false); });
        }
        else {
            axios.post(serverUrl + "deleteclass.php", {
                "tid": state.theUser.id,
                "tclassid": classid,
            })
                .then(data => {

                })
                .catch(err => { console.log(err); });
        }
    }
    let aa = 1;
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1, marginHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 25 }}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Д/д</Text></View>
                    <View style={{ width: 100, marginLeft: 10 }}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Хичээл заадаг эсэх</Text></View>
                    <View style={{ flex: 1 }} ><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Анги</Text></View>
                </View>
                {load && <Spinning />}
                <ScrollView>
                    {classlist.map((e, index) =>
                        <View key={index} style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 3, paddingBottom: 3, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#D8D8D8" }}>
                            <View style={{ width: 25 }}><Text>{aa++}</Text></View>
                            <View style={{ width: 100 }}>
                                <SwitchSelector
                                    options={[{ label: "Үгүй", value: 0 }, { label: "Тийм", value: 1 }]}
                                    initial={myclass.filter(el => el.id == e.id).length > 0 ? 1 : 0}
                                    ButtonColor={"#880e4f"}
                                    height={25}
                                    hasPadding
                                    onPress={value => addclass(value, e.id)}
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }} ><Text>{e.name} ({e.hugacaa})</Text></View>
                        </View>)}
                </ScrollView>
            </View>
        </View>
    )
}

export default TeacherClass

const styles = StyleSheet.create({})