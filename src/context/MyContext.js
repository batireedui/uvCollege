import React, { createContext, useEffect, useState, useContext } from "react";
import axios from 'react-native-axios'
import { serverUrl } from '../Const'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const MyContext = React.createContext();

const MyContextProvider = props => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();
    const [isAuth, setIsAuth] = useState(false);
    const [theUser, setTheUser] = useState([]);
    const [msg, setMsg] = useState("");
    const [userType, setuserType] = useState(false);
    const logoutUser = async () => {
        await AsyncStorage.removeItem('loginToken');
        setTheUser([]);
        setIsAuth(false);
        
    }
    /*useEffect(() => {
        AsyncStorage.getItem('loginToken') ? isLoggedIn() : setIsAuth(false);
        return () => {
            
        }
    }, [])*/
    
    const loginUser = (phone, password, teach) => {
        setuserType(teach);
        console.log(serverUrl + 'login.php')
        axios.post(serverUrl + 'login.php', {
            "phone": phone,
            "password": password,
            "userType": teach
        }).then(res => {
            if (res.data.success && res.data.token) {
                AsyncStorage.setItem('loginToken', res.data.token);
                if(teach === 0){
                    isLoggedIn();
                } 
                else isLoggedInSa();  
            }
            else
                setMsg(res.data.message);
                console.log(res.data);
        }).catch(err => console.log(err));
    }

    // Checking user logged in or not
    const isLoggedIn = async () => {
        console.log("TisLogin");
        const loginToken = await AsyncStorage.getItem('loginToken');
        // If inside the local-storage has the JWT token
        if (loginToken) {
            //Adding JWT token to axios default header
            axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Fetching the user information
            const { data } = await axios.post(serverUrl + 'user-info.php');
            console.log(data);
            // If user information is successfully received
            if (data.success && data.user) {
                setTheUser(data.user);
                setIsAuth(true);
                navigation.navigate('TeacherScreen')
            };
        }

    }

    const isLoggedInSa = async () => {
        const loginToken = AsyncStorage.getItem('loginToken');
        // If inside the local-storage has the JWT token
        if (loginToken) {
            //Adding JWT token to axios default header
            axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Fetching the user information
            const { data } = await axios.post('user-info-sa.php');
            console.log(data);
            // If user information is successfully received
            if (data.success && data.user) {
                setTheUser(data.user);
                setIsAuth(true);
            };
        }

    }

    return (
        <MyContext.Provider value={{ isAuth, setIsAuth, theUser, setTheUser, loginUser, logoutUser, msg, setMsg, userType }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyContextProvider;