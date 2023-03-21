import React from "react";
import ContextHelper from "../../ContextHooks/ContextHelper";
import { api_end_point_constants } from "../../Utils/ApiConstants";
import CustomerHome from "../Customer/CustomerHome";
import DriverHome from "../Driver/DriverHome";


const Home = ({ navigation }) => {

    //---------- state, veriable, context and hooks
    const [homeData, setHomeData] = React.useState([])

    const {
        setLoading,
        appStateObject,
        currentUser,

        postData,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        setCurrentUser,
    } = ContextHelper()

    //---------- life cycles
    React.useEffect(() => {

        getHomeDataFromServer()
    }, [])

    React.useEffect(() => {

        // success
        if (appStateObject?.home_data_pocket?.response) {

            setLoading(false)
            setHomeData(appStateObject?.home_data_pocket?.response)
        }
    }, [appStateObject?.home_data_pocket])


    //--------- user Login

    const getHomeDataFromServer = () => {

        postData({
            key: 'home_data_pocket',
            end_point: api_end_point_constants.show_vehicle,
            data: {
                userID: currentUser.userID,
            }
        })
    }
    return (
        <>
            {
                currentUser?.user_type === 'customer'
                    ?
                    <CustomerHome
                        navigation={navigation}
                        data={homeData}
                    />
                    :
                    <DriverHome
                        navigation={navigation}
                    />
            }


        </>

    )
}

export default Home;