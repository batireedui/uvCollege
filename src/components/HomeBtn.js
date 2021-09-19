import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { Feather } from '@expo/vector-icons';
const HomeBtn = (props) => {
    console.log(props);

    return (
        <TouchableOpacity style={[props.style, styles.HomeBtn]} onPress={props.onPress}>
            <Image source={props.icon} style={{ width: 40, height: 60 }} />
            <Text style={{ textAlign: 'center' }}>{props.txt}</Text>
        </TouchableOpacity>
    )
}

export default HomeBtn

const styles = StyleSheet.create({
    HomeBtn: {
        padding: 20,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.32,
shadowRadius: 5.46,

elevation: 9,
    },
})
