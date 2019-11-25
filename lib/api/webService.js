import GlobalService from '../service/globalService';
import AsyncStorage from '@react-native-community/async-storage';

function getResponse(webserviceName, requestData) {

    return fetch('https://smart-wallet-guide.herokuapp.com/' + webserviceName, requestData).then((response) => response.json().then(responseData => {
        if (response.ok) {
            return {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                data: responseData,
            };
        }
    })).catch(error => {
        console.log(error);
        return error;
    });
}

const Webservice = {
        call: function (request) {
            let method = request.method.toLowerCase();
            let contentType;
            let data = request.data;
            if (method === 'post' || method === 'delete' || method === 'patch' || method === 'put') {
                contentType = 'application/json; charset=utf-8';
                data = JSON.stringify(data);
            }
            let requestData = {
                method: method,
                headers: {
                    'Authorization': 'Bearer ' + GlobalService.get('accessToken'),
                    'Content-Type': contentType,
                },
            };

            if (method === 'post' || method === 'delete' || method === 'patch' || method === 'put') {
                requestData.body = data;
            }
            return getResponse(request.name, requestData);
        },
        login: function (email, password) {
            return fetch('https://smart-wallet-guide.herokuapp.com/api/auth/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    'email': email,
                    'password': password,
                }),
            }).then((response) => response.json().then(responseData => {
                if (response.ok) {
                    let accessToken = responseData.token;
                    let User = responseData.user;
                    GlobalService.set('accessToken', accessToken);
                    GlobalService.set('User', User);

                    AsyncStorage.setItem('userData', JSON.stringify({email:email,password:password})).then(response => {
                        AsyncStorage.setItem('User', JSON.stringify(User)).catch(error => {
                            console.log(error);
                        });
                    }).catch(error => {
                        console.log(error);
                    });
                }
                return {
                    status: response.status,
                    ok: response.ok,
                };
            })).catch(error => {
                console.log(error);
            });

        },
        register: function (user) {
            return fetch('https://smart-wallet-guide.herokuapp.com/api/auth/register', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify(user),
            }).then((response) => response.json().then(responseData => {
                if (response.ok) {
                    return this.login(user.email, user.password);
                }
            })).catch(error => {
                console.log(error);
            });

        },
        logOut: function (nextScreen) {
            let navigation = GlobalService.get('main_navigation');
            const keys = ['userData', 'User'];
            AsyncStorage.multiRemove(keys).then(res => {
                GlobalService.set('userData', null);
                GlobalService.set('User', {});
                navigation.navigate(nextScreen);
            }).catch((error) => {
                navigation.navigate(nextScreen);
            });
        },
    }
;

export default Webservice;
