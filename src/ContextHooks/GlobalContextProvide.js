//---------- imports

// react
import React, { useEffect, useState, createContext } from "react";
import { StyleSheet, ScrollView, View, Text, useColorScheme } from "react-native";

// third party lib
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage, hideMessage } from "react-native-flash-message";

// api call
import { postDataToServer, postFormDataToServer } from '../Utils/Axios'

// constants helper
import { errors } from "../constants/ErrorConstants";

//---------- context

const AppContext = createContext();

//---------- main app / component

const GlobalContextProvide = (props) => {

    //---------- state, veriables and hooks
    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const [theme, setTheme] = useState({
        backgroundColor: '#fff',
        color: '#000'
    })
    const [appStateObject, setAppStateObject] = useState({})
    const [appStateArray, setAppStateArray] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(false);

    //---------- life cycle

    useEffect(() => {
        const setup = async () => {
            const current_theme = await getDataFromAsyncStorage('current_theme');
            // const current_user = await getDataFromAsyncStorage('current_user');

            if (current_theme) {

                setIsDarkTheme(current_theme?.isDarkTheme)
                setTheme({
                    backgroundColor: current_theme?.backgroundColor,
                    color: current_theme?.color
                })
            }


        }
        setup()
        return () => {
            // this now gets called when the component unmounts
        };
    }, []);

    useEffect(() => {

        console.log('---- is dark theme ----', isDarkTheme)
    }, [isDarkTheme])


    //---------------------------------- Axios Api cal ----------------------------------------//
    const postData = ({
        data, key, end_point, params = {}, is_force_request = false
    }) => {

        if (!loading || is_force_request) {

            setLoading(true);
            console.log("(>>>>>>>>>>>>>>>>>>>>>>>)", data);
            postFormDataToServer({
                currentUser, data, key, end_point, call_back: postDataCallBack
            })
        }
    }
    const postDataCallBack = (response) => {
        // veriable
        let key = response.key
        let data

        console.log('-=-=-= call back after server response -----')

        // success
        if (response.status === 'success') {

            if (key === 'login_pocket') {

                // check patron or business owner for success response from server and check from local give by : roleselectionscreen
                if ((currentUser?.user_type === 'business_owner' &&
                    response?.response?.role === '1' ||
                    response?.response?.role === 1) ||

                    (currentUser?.user_type === 'patron' &&
                        response?.response?.role === '0' ||
                        response?.response?.role === 0)) {

                    data = {
                        response: response.response
                    }
                } else {

                    // set global loading 
                    setLoading(false);

                    // show error
                    showMessage({
                        message: "User is not registered",
                        type: 'danger',
                    });
                }
            } else {

                data = {
                    response: response.response
                }

            }
            // error
        } else {

            data = {
                error: response.error
            }

            setLoading(false);

            // show error
            showMessage({
                message: errors[key],
                type: 'danger',
            });

        }

        storeDataInAppState({ key, data })
    }







    //------------------------------------- change theme --------------------------------------//

    //---------- user's action

    // change theme
    const changeTheme = () => {

        if (isDarkTheme) {

            setIsDarkTheme(false)
            setTheme({
                backgroundColor: '#fff',
                color: '#000'
            })
            storeDataInAsyncStorage({
                key: 'current_theme',
                value: {
                    isDarkTheme: false,
                    backgroundColor: '#fff',
                    color: '000'
                }
            })
        } else {

            setIsDarkTheme(true)
            setTheme({
                backgroundColor: '#000',
                color: '#fff'
            })
            storeDataInAsyncStorage({
                key: 'current_theme',
                value: {
                    isDarkTheme: true,
                    backgroundColor: '#000',
                    color: 'fff'
                }
            })
        }
    }


    //----------------------------------- Store data in state---------------------------------//

    // store data in state
    const storeDataInAppState = ({ key, data }) => {
        // console.log("App state Update :::::::", " key ++>", key, " Data>>>", data);
        setAppStateObject({
            ...appStateObject,
            [key]: data,
        })

        // set global loading
        setLoading(false);

        if (data?.response?.TOKEN) {
            if (key === 'signup_pocket' || key === 'login_pocket' || key === "Business_signup_pocket") {

                let user_type = (data.response.role === '0' || data.response.role === 0) ? 'patron' :

                    (data.response.role === '1' || data.response.role === 1) ? 'business_owner' : 'none'

                setCurrentUser({ ...data.response, user_type });
                storeDataInAsyncStorage({ key: 'current_user', value: { ...data.response, user_type } })
            }
        }
    }

    // remove data from app state
    const removeDataFromAppState = ({ key }) => {

        setAppStateObject({
            ...appStateObject,
            [key]: {},
        })

        setLoading(false);
    }


    // remove data from app state
    const removeAllDataFromAppState = () => {

        setAppStateObject({})
    }

    //------------------------------ Async Storage ------------------------------------------//

    //---------- async storage

    // store
    const storeDataInAsyncStorage = async ({ key, value }) => {

        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
            return true
        } catch (e) {
            // saving error
            return false
        }
    }

    // get data
    const getDataFromAsyncStorage = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {

                return JSON.parse(value)
            }

            return false
        } catch (e) {

            // error reading value
            return false
        }
    }

    // remove async storage
    const removeDataFromAsyncStorage = async (key) => {

        await AsyncStorage.removeItem(key)
    }

    //---------- return main view

    return (
        <AppContext.Provider
            value={{
                loading,
                isDarkTheme,
                theme,
                appStateObject,
                appStateArray,
                currentUser,

                setLoading,
                postData,
                changeTheme,
                storeDataInAppState,
                removeDataFromAppState,
                removeAllDataFromAppState,
                storeDataInAsyncStorage,
                getDataFromAsyncStorage,
                removeDataFromAsyncStorage,
                setCurrentUser,
            }}
        >

            {
                props.children
            }
        </AppContext.Provider >

    );
};

//---------- export component

export { GlobalContextProvide, AppContext };
// export default { GlobalContextProvide, AppContext };
