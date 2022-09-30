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
    const [userType, setuserType] = useState("");
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

    const loginUser = async (phone, password, teach) => {
        setuserType(teach);
        await AsyncStorage.removeItem('loginToken');
        axios.post(serverUrl + 'login.php', {
            "phone": phone,
            "password": password,
            "userType": userType
        }).then(res => {
            if (res.data.success == 1 && res.data.token) {
                console.log(res.data.token+"////////");
                AsyncStorage.setItem('loginToken', res.data.token);
                if (userType == 0) {
                    isLoggedIn(res.data.token);
                }
                else if (userType == 2) {
                    isLoggedInStudent(res.data.token);
                }
                else isLoggedInSa(res.data.token);
            }
            else {
                setMsg(res.data.message);
            }
            console.log(res.data);
        }).catch(err => console.log(err));
    }

    // Checking user logged in or not
    const isLoggedIn = async () => {
        console.log("TisLogin");
        let loginToken = await AsyncStorage.getItem('loginToken');
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
        console.log("SisLogin");
        let loginToken = await AsyncStorage.getItem('loginToken');
        // If inside the local-storage has the JWT token
        if (loginToken) {
            //Adding JWT token to axios default header
            axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Fetching the user information
            const { data } = await axios.post(serverUrl + 'user-info-sa.php');
            console.log(data);
            // If user information is successfully received
            if (data.success && data.user) {
                setTheUser(data.user);
                setIsAuth(true);
               
            };
        }

    }

    const isLoggedInStudent = async () => {
        console.log("StudentLogin");
        let loginToken = await AsyncStorage.getItem('loginToken');

        if (loginToken) {
            //Adding JWT token to axios default header
            axios.defaults.headers.common['Authorization'] = 'bearer ' + loginToken;

            // Fetching the user information
            const { data } = await axios.post(serverUrl + 'user-info-student.php');
            console.log("dat-----------------a");
            console.log(data);
            // If user information is successfully received
            if (data.success && data.user) {
                setTheUser(data.user);
                setIsAuth(true);
                navigation.navigate('FaScreen')
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