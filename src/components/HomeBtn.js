import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
const HomeBtn = (props) => {
    return (
        <TouchableOpacity style={[props.style, styles.HomeBtn]}>
            <Feather name={props.icon} size={60} color="#f03f35" />
            <Text style={{ textAlign: 'center' }}>{props.txt}</Text>
        </TouchableOpacity>
    )
}

export default HomeBtn

const styles = StyleSheet.create({
    HomeBtn:{
        padding: 20,
        width: 180,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
})
