import React from 'react';
import {View,Text,TouchableOpacity,Alert} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import Webservice from '../../lib/api/webService';

export default class RegisterScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            passwordAgain:''
        }
    }

    signUp = () => {
        if(this.requiredValidator(this.state.email) && this.requiredValidator(this.state.password)
        && this.requiredValidator(this.state.passwordAgain)
        ){
            if(this.state.password === this.state.passwordAgain){
                Webservice.register(this.state.email,this.state.password).then(response=>{
                    console.log(response)
                    if(response.ok){
                        this.props.navigation.navigate('Auth')
                    }else{
                        Alert.alert('Something went wrong')
                    }
                }).catch(error=>{
                    console.log(error)
                })
            }else{
                Alert.alert("Password do not match.")
            }
        }else{
            Alert.alert("You must fill all fields.")
        }
    };

    requiredValidator = (value) => {
        if(value !== ''){
            return true;
        }else{
            return false;
        }
    }

    render(){
        return(
            <View style={{
                flex:1,
                justifyContent:'center',
                backgroundColor:'#ddd'
            }}>
                <Text style={{
                    textAlign:'center',
                    fontSize:16,
                    fontWeight:'bold',
                    paddingHorizontal:10,
                }}>Register</Text>
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
                            label='Email'
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
                        <TextField
                            style={{
                                fontSize:18
                            }}
                            value={this.state.passwordAgain}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onChangeText={passwordAgain => this.setState({passwordAgain})}
                            label='Password Again'
                        secureTextEntry={true}
                        />
                    </View>
                    <View style={{
                        paddingVertical:10,
                    }}>
                        <TouchableOpacity
                            onPress={this.signUp}
                            style={{
                            backgroundColor:'#a9a9a9',
                            justifyContent:'center',
                            alignItems:'center',
                            paddingVertical:10,
                            borderRadius:5,
                        }}>
                            <Text style={{
                                fontSize:16,
                            }}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
