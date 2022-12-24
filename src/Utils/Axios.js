import axios from "axios";

const BASE_URL = 'https://techramindra.com/mohit/appservice/process'

export const getDataFromServer = async () => {

    axios.get('/user?ID=12345')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

}


export const getDataFromServerWithGivenParams = async ({ data, end_point }) => {

    let url = `${BASE_URL}/${end_point}`

    axios.get('/user?ID=12345')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}


export const postFormDataToServer = async ({ currentUser, data, key, end_point, call_back }) => {
    console.log("Data :::::::::::::::::", data);
    // create form data 
    var form_data = new FormData();

    form_data.append("control", end_point);
    for (var id in data) {
        form_data.append(id, data[id]);
    }

    // console.log("currentUser?.TOKEN :", currentUser);
    if (currentUser?.TOKEN) {

        var headers = {
            "Content-Type": "multipart/form-data",
            "TOKEN": currentUser?.TOKEN
        }
    } else {

        headers = {
            "Content-Type": "multipart/form-data",
        }
    }

    // api call
    await axios.post(BASE_URL, form_data, {

        headers: headers
    })

        // success
        .then(function (response) {

            console.log('                                     ')
            console.log(`api resposense for  key : ${key}, end point : ${end_point}  `, response.data)
            console.log('                                     ')

            // success
            if (response?.data?.result) {

                call_back({
                    status: 'success',
                    response: response?.data?.data,
                    key
                })

                // error
            } else {


                console.log('                                     ')
                console.log(` error :==> api resposense for  key : ${key}, end point : ${end_point}  `, response.data)
                console.log('                                     ')


                call_back({
                    status: 'error',
                    error: response?.data,
                    key
                })
            }
        })

        // axios error
        .catch(function (error) {

            console.log('catch error axios error =', error)

            call_back({
                status: 'error',
                error,
                key
            })
        });

    // await axios({
    //     method: "post",
    //     url: BASE_URL,
    //     data: form_data?._parts,
    //     headers: { 
    //         "content-type": "application/json",
    //     // "Keep-Alive":"timeout=5, max=1000",
    //     // "Connection":"Keep-Alive"
    //     },
    // })
    //     .then(function (response) {

    //         console.log('api respone', response.data)
    //         console.log('api respone', response.response)

    //         call_back({
    //             status: 'success',
    //             response,
    //             key
    //         })
    //     })
    //     .catch(function (error) {

    //         console.log('catch error=', error)

    //         call_back({
    //             status: 'error',
    //             error,
    //             key
    //         })
    //     });
}

export const postDataToServer = async ({ data, end_point, call_back }) => {

    let url = `${BASE_URL}/${end_point}`

    await axios.post(url, {
        control: end_point,
        ...data
    })
        .then(function (response) {

            call_back({
                status: 'success',

            })
        })
        .catch(function (error) {

            call_back({
                status: 'error',

            })
        });
}