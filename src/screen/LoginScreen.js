import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { Input, Header, Button, Icon } from "../components/login";
const LoginScreen = ({ navigation }) => {
    const [lval, setLval] = useState(1)
    const options = [
        { label: "Багш", value: "1" },
        { label: "Суралцагч", value: "2" },
        { label: "Эцэг/эх", value: "3" }
    ];
    const LogiNav = (val) => {
        console.log(val);
        if(val == 1)
        {
            navigation.navigate('TeacherScreen')
        }
        else if(val == 2)
        {
            navigation.navigate('MainScreen')
        }
        else if(val == 3)
        {
            navigation.navigate('FaScreen')
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={{ width: "100%" }}>
                    <Header title="СУРГАЛТ, ҮНЭЛГЭЭ МЭДЭЭЛЛИЙН СИСТЕМ" subTitle="Өвөрхангай аймаг дахь Политехник коллеж" />
                </View>
                <View style={{width: "80%", marginBottom: 20}}>
                    <SwitchSelector
                        options={options}
                        initial={0}
                        buttonColor={"#880e4f"}
                        borderColor={"#880e4f"}
                        hasPadding
                        onPress={value => setLval(value)}
                    />
                </View>

                <View>
                    <Input icon="md-person" placeholder="Нэвтрэх нэр" />
                    <Input icon="lock-closed" placeholder="Нууц үг" />
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

