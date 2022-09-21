import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { Input, Header, Button, Icon } from "../components/login";
import { MyContext } from "../context/MyContext";
const LoginScreen = ({ navigation }) => {
    const [lval, setLval] = useState(1);
    const [phone, setPhone] = useState("88992842");
    const [pass, setPass] = useState("123");
    const state = useContext(MyContext);
    const options = [
        { label: "Багш", value: "1" },
        { label: "Суралцагч", value: "2" },
        { label: "Эцэг/эх", value: "3" }
    ];

    const valSet = (val) => {
        console.log(val);
        
        if (val == 1) {
            setPhone("88992842");
        }
        else if (val == 2) {
            setPhone("99323156");
        }
        else if (val == 3) {
            setPhone("88776655");
        }
        setLval(val);
        console.log(phone);
    }
    console.log(phone);
    
    const LogiNav = async () => {
        await state.loginUser(phone, pass, lval);
    }
    const sss = (val) => {
        if (val == 1) {
            navigation.navigate('TeacherScreen')
        }
        else if (val == 2) {
            navigation.navigate('MainScreen')
        }
        else if (val == 3) {
            navigation.navigate('FaScreen')
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={{ width: "100%" }}>
                    <Header title="СУРГАЛТ, ҮНЭЛГЭЭ МЭДЭЭЛЛИЙН СИСТЕМ" subTitle="Өвөрхангай аймаг дахь Политехник коллеж" />
                </View>
                <View style={{ width: "80%", marginBottom: 20 }}>
                    <SwitchSelector
                        options={options}
                        initial={0}
                        buttonColor={"#880e4f"}
                        borderColor={"#880e4f"}
                        hasPadding
                        onPress={value => valSet(value) }
                    />
                </View>

                <View>
                    <Input icon="md-person" placeholder="Нэвтрэх нэр" invalue={phone} />
                    <Input icon="lock-closed" placeholder="Нууц үг" invalue={pass} sec={true} />
                </View>
                <Button title="Нэвтрэх" onPress={() => LogiNav(lval)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ff00",
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});


export default LoginScreen

