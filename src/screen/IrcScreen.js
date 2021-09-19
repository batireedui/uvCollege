import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'react-native-axios'
import { serverUrl } from '../Const'
import Spinning from '../components/Spinning'
import NoData from '../components/NoData'
const IrcScreen = props => {
    const [irc, setirc] = useState([]);
    const [loading, setloading] = useState(false);
    const sid = 1;
    useEffect(() => {
        let mount = true;
        if (props.route.params.zo === 1) {
            setloading(true);
            axios.post(serverUrl + 'showirc.php', { "zo": props.route.params.zo, "sid": sid })
                .then(data => {
                    if (mount) {
                        console.log(data.data);
                        if (data.data == "nodata") {
                            setirc(null);
                        }
                        else
                            setirc(data.data);
                        setloading(false);
                    }
                })
                .catch(err => console.log(err));
        }
        return () => {
            mount = false;
        }
    }, []);

    if (props.route.params.zo === 1)
        return (
            <View>
                {loading && <Spinning />}
                {irc === null ? <NoData /> :
                    <View>
                        {
                            irc.map(el => (
                                /*<View key={el.id}>
                                    <Text>{el.name}</Text>
                                    <Text>{el.ognoo}</Text>
                                    <Text>{el.state == 1 ? "И" : "Т"}</Text>
                                </View>*/
                                <View key={el.id} style={styles.list}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontFamily: 'Nunito_700Bold', }}>{el.name}</Text>
                                        <Text style={{ fontFamily: 'Nunito_300Light', fontSize: 10 }}>{el.chn}</Text>
                                    </View>
                                    <Text style={[el.state == "1" ? { backgroundColor: '#008229' } : { backgroundColor: '#ce0b2e', }, styles.listBtn]}>{el.state}</Text>
                                </View>

                            ))}
                    </View>
                }
            </View>
        )
    else if (props.route.params.zo === 2)
        return (
            <View>
                <Text>lknll</Text>
            </View>
        )
}

export default IrcScreen

const styles = StyleSheet.create({
    listBtn: {
        textAlign: 'center',
        width: 110,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
        fontFamily: 'Nunito_700Bold',
        color: '#fff'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    }
})
