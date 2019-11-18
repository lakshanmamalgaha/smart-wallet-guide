import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import DrawerNavigator from './lib/navigation/drawerNavigator';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './screens/authentication/loginScreen';
import RegisterScreen from './screens/authentication/registerScreen';
import WelcomeScreen from './screens/authentication/welcomeScreen';
import AsyncStorage from '@react-native-community/async-storage';
import GlobalService from './lib/service/globalService';
import Webservice from './lib/api/webService';

class App extends React.Component {
    constructor(props) {
        super(props);
        GlobalService.set('main_navigation', props.navigation);
        AsyncStorage.getItem('userData').then(response => {
            if (response !== null) {
                let userData= JSON.parse(response)
                Webservice.login(userData.email,userData.password).then(response=>{
                    if(response.ok){
                        this.props.navigation.navigate('Auth');
                    }else{
                        this.props.navigation.navigate('Login');
                    }
                })
            } else {
                this.props.navigation.navigate('Welcome');
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                <Text style={{
                    fontSize: 20,
                }}>Smart Wallet Guide</Text>
                <ActivityIndicator size="large" color="red"/>
            </View>
        );
    }
}

const SignInStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    },
});

const Navigation = createAppContainer(createSwitchNavigator(
    {
        App: App,
        SignIn: SignInStack,
        Welcome: WelcomeScreen,
        Auth: DrawerNavigator,
    },
    {
        initialRouteName: 'App',
    },
));

export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Navigation/>
            </View>

        );
    }
}

