import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, Modal } from 'react-native'
import React, { useEffect, useState, useContext } from "react";
import axios from 'react-native-axios'
import Spinning from '../components/Spinning'
import { serverUrl } from '../Const'
import SwitchSelector from "react-native-switch-selector";
import { MyContext } from '../context/MyContext'
import Header from '../components/Header';
import { MyButton } from "../components/login";

const TeacherLesson = () => {
  const [irc, setirc] = useState([]);
  const [load, setLoad] = useState(false);
  const state = useContext(MyContext);
  const [addner, setaddner] = useState("");
  const [addcag, setaddcag] = useState(0);

  const [ener, setener] = useState("");
  const [ecag, setecag] = useState(0);
  const [eid, seteid] = useState(0);

  const [addload, setAddLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    refdata();
    return () => {

    }
  }, [addload]);

  const refdata = () => {
    setLoad(true);
    axios.post(serverUrl + "teacherlesson.php", {
      "tid": parseInt(state.theUser.id),
    })
      .then(data => { setirc(data.data); setLoad(false); })
      .catch(err => { console.log(err); setLoad(false); });
  }

  const sendlesson = () => {
    if (addner.trim().length < 1)
      Alert.alert("Хичээлийн нэрийг оруулна уу");
    else {
      console.log(addner + addcag);
      axios.post(serverUrl + "teacherlessonadd.php", {
        "tid": parseInt(state.theUser.id),
        "lname": addner,
        "cag": addcag
      })
        .then(data => {
          setAddLoad(addload => !addload);
          console.log(data.data);
          setaddcag(0);
          setaddner("");
        })
        .catch(err => { console.log(err); setLoad(false); });
    }
  }

  const changetuluv = (value, id) => {
    console.log(value + "-" + id);
    axios.post(serverUrl + "deletetlesson.php", {
      "lid": id,
      "tuluv": value
  })
      .then(data => {
          console.log(data.data);
          setAddLoad(addload => !addload);
      })
      .catch(err => { console.log(err); });
  }

  const editlesson = () => {
    console.log(eid + ener);
    if (ener.trim().length < 1)
      Alert.alert("Хичээлийн нэрийг оруулна уу");
    else {
      axios.post(serverUrl + "teacherlessonedit.php", {
        "lid": eid,
        "lname": ener,
        "lcag": ecag
      })
        .then(data => {
        })
        .catch((error) => { console.log(error.message); });
      setModalVisible(false);
      refdata();
    }
  }

  let aa = 1;
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.input}>
        <TextInput style={{ fontSize: 14 }}
          value={addner}
          onChangeText={(v) => { setaddner(v) }}
          placeholder={"Хичээлийн нэрээ оруулна уу"}
          placeholderTextColor="#555" />
      </View>
      <View style={styles.input}>
        <TextInput style={{ fontSize: 14 }}
          value={addcag}
          onChangeText={(v) => { setaddcag(v) }}
          keyboardType={'numeric'}
          placeholder={"Хичээлийн цагаа оруулна уу"}
          placeholderTextColor="#555" />
      </View>
      <View style={{ marginVertical: 10 }}>
        <MyButton title={"БҮРТГЭХ"} onPress={() => { sendlesson() }} background={""} />
      </View>
      <ScrollView style={{ marginHorizontal: 14, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: 25 }}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Д/д</Text></View>
          <View style={{ flex: 1, marginLeft: 10 }}><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Хичээлийн нэр</Text></View>
          <View style={{ width: 50 }} ><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Цаг</Text></View>
          <View style={{ width: 100 }} ><Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Төлөв</Text></View>
          <View style={{ width: 45 }} ><Text style={{ textAlign: 'center', fontWeight: 'bold' }}></Text></View>
        </View>
        {irc !== "nodata" ?
          irc.map((e, index) =>
            <View key={index} style={{ marginTop: 10, flexDirection: 'row' }}>
              <View style={{ width: 25 }}><Text style={{ textAlign: 'center' }}>{aa++}</Text></View>
              <View style={{ flex: 1, marginLeft: 10 }}><Text>{e.lessonName}</Text></View>
              <View style={{ width: 50 }} ><Text style={{ textAlign: 'center' }}>{e.cag}</Text></View>
              <View style={{ width: 100 }}>
                <SwitchSelector
                  options={[{ label: "Үгүй", value: 0 }, { label: "Тийм", value: 1 }]}
                  initial={parseInt(e.tuluv)}
                  ButtonColor={"#880e4f"}
                  height={25}
                  hasPadding
                  onPress={value => changetuluv(value, e.id)}
                />
              </View>
              <View style={{ width: 45 }}><TouchableOpacity onPress={() => { setener(e.lessonName); setecag(e.cag); seteid(e.id); setModalVisible(true) }}><Text style={{ textAlign: 'center' }}>Засах</Text></TouchableOpacity></View>
            </View>)
          : null
        }
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Хичээлийн мэдээлэл засах</Text>
            <View style={[styles.input, { width: 200 }]}>
              <TextInput style={{ fontSize: 14 }}
                value={ener}
                onChangeText={(v) => { setener(v) }}
                placeholder={"Хичээлийн нэрээ оруулна уу"}
                placeholderTextColor="#555" />
            </View>
            <View style={[styles.input, { width: 200 }]}>
              <TextInput style={{ fontSize: 14 }}
                value={ecag}
                onChangeText={(v) => { setecag(v) }}
                keyboardType={'numeric'}
                placeholder={"Хичээлийн цагаа оруулна уу"}
                placeholderTextColor="#555" />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose, { marginTop: 15, backgroundColor: "#c6c6c6" }]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Хаах</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose, { marginTop: 15, marginLeft: 20 }]}
                onPress={editlesson}>
                <Text style={styles.textStyle}>ХАДГАЛАХ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default TeacherLesson

const styles = StyleSheet.create({
  input: {
    padding: 9,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 12,
    marginTop: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
})