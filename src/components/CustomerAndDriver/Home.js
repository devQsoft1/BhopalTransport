import React from "react";
import ContextHelper from "../../ContextHooks/ContextHelper";
import CustomerHome from "../Customer/CustomerHome";
import DriverHome from "../Driver/DriverHome";


const Home = () => {

    //---------- state, veriable, context and hooks
    const {
        appStateObject,
        currentUser,

        postData,
        storeDataInAppState,
        removeDataFromAppState,
        storeDataInAsyncStorage,
        getDataFromAsyncStorage,
        setCurrentUser,
    } = ContextHelper()

    return (
        <>
            {
                !currentUser?.user_type === 'customer'
                    ?
                    <CustomerHome />

                    :
                    <DriverHome />
            }


        </>

    )
}

export default Home