import React from 'react';
import {View, Text, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import Webservice from '../../lib/api/webService';

export default class LoginScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
        }
    }

    login = () => {
        if(this.requiredValidator(this.state.email) && this.requiredValidator(this.state.password)
        ){
                Webservice.login(this.state.email,this.state.password).then(response=>{
                    if(response.ok){
                        this.props.navigation.navigate('Auth')
                    }else{
                        Alert.alert("Invalid Credentials.")
                    }
                }).catch(error=>{
                    console.log(error)
                })

        }else{
            Alert.alert("You must fill all fields.")
        }
    }

    requiredValidator = (value) => {
        if(value !== ''){
            return true;
        }else{
            return false;
        }
    }

    goToRegister = () =>{
        this.props.navigation.navigate("Register");
    }

    render(){
        return(
            <View style={{
                flex:1,
            }}>
                <ImageBackground source={require('../../assets/Hometest.jpg')}
                                 style={{width: "100%", height: "100%"}}>
                    <View style={{
                    flex:1,
                        justifyContent:'center',
                    }
                    }>
                <Text style={{
                    textAlign:'center',
                    fontSize:16,
                    fontWeight:'bold',
                    paddingHorizontal:10,
                }}>Sign In</Text>
                <View style={{
                    paddingHorizontal:20,
                }}>
                    <View style={{
                        paddingVertical:10,
                    }}>
                        <TextField
                            style={{
                                fontSize:18
                            }}
                            value={this.state.email}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onChangeText={email => this.setState({email})}
                            label='Username'
                            keyboardType={'email-address'}
                        />
                    </View>

                    <View style={{
                        paddingVertical:10,
                    }}>
                        <TextField
                            style={{
                                fontSize:18
                            }}
                            value={this.state.password}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onChangeText={password => this.setState({password})}
                            label='Password'
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={{
                        paddingVertical:10,
                    }}>
                        <TouchableOpacity
                            onPress={this.login}
                            style={{
                                backgroundColor:'#a9a9a9',
                                justifyContent:'center',
                                alignItems:'center',
                                paddingVertical:10,
                                borderRadius:5,
                            }}>
                            <Text style={{
                                fontSize:16,
                            }}>SignIn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                        <TouchableOpacity onPress={this.goToRegister} style={{
                            justifyContent:'center',
                            alignItems:'center',
                            paddingVertical:20,
                        }}>
                            <Text style={{
                                fontWeight:'bold'
                            }}>New to Smart Wallet Guide? Sign In</Text>
                        </TouchableOpacity>
                </View>
                </ImageBackground>
            </View>
        )
    }
}
