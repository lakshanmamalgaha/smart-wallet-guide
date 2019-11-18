import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native';

export default class WelcomeScreen extends React.Component{
    goToLogin = () => {
        this.props.navigation.navigate('Login')
    }

    goToRegister = () =>{
        this.props.navigation.navigate('Register')
    }

    render(){
        return(
            <View style={{
                flex:1,
                justifyContent:'flex-end',
                backgroundColor:'#a9a9a9'
            }}>
                <TouchableOpacity
                    onPress={this.goToRegister}
                    style={{
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'blue',
                    marginHorizontal:20,
                    marginBottom:20,
                    paddingVertical:10,
                    borderRadius:5
                }}>
                    <Text style={{
                        fontSize:16,
                        fontWeight:'700',
                        color:'#fff',
                    }}>New to Smart Wallet Guide</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this.goToLogin}
                    style={{
                    justifyContent:'center',
                    alignItems:'center',
                    backgroundColor:'#ffffff',
                    marginHorizontal:20,
                    marginBottom:40,
                    paddingVertical:10,
                    borderRadius:5
                }}>
                    <Text style={{
                        fontSize:16,
                        fontWeight:'700',
                        color:'#000000',
                    }}>Already Using Smart Wallet Guide</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
