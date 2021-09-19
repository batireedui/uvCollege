import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'react-native-axios'
import { serverUrl } from '../Const'
import Spinning from '../components/Spinning'
const IrcScreen = () => {
    const [irc, setirc] = useState([]);
    const [loading, setloading] = useState(false);
    useEffect(() => {
        setloading(true);
        let mount = true;
        console.log("data");
        axios.post(serverUrl + 'showirc.php')
            .then(data => {
                if (mount) {
                    console.log(data);
                    setirc(data.data);
                    setloading(false);
                }
            })
            .catch(err => console.log(err));
        return () => {
            mount = false;
        }
    }, []);

    return (
        <View>
            {loading && <Spinning />}
            {
                irc.map(el => (
                    <View  key={el.id}>
                        <Text>{el.lname}</Text>
                        <Text>{el.fname}</Text>
                        <Text>{el.name}</Text>
                        <Text>{el.ognoo}</Text>
                        <Text>{el.state == 1 ? "И" : "Т"}</Text>
                    </View>

                ))
            }

        </View>
    )
}

export default IrcScreen

const styles = StyleSheet.create({})
