import React from 'react';
import {View, Text, TouchableOpacity, Alert, ImageBackground,TextInput} from 'react-native';
import {TextField} from 'react-native-material-textfield';
import Webservice from '../../lib/api/webService';
import Loader from "../../lib/component/loader";

export default class RegisterScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            passwordAgain:'',
            occupation:'',
            food:'',
            transportation:'',
            health:'',
            rent:'',
            education:'',
            entertainment:'',
            others:'',
            pressedNext:false,
            loaded:true,
        }
    }



    signUp = () => {
        if(this.requiredValidator(this.state.email) && this.requiredValidator(this.state.password)
        && this.requiredValidator(this.state.passwordAgain)
        ){
            if(this.state.password === this.state.passwordAgain){
                console.log(this.validateValues())
                if(this.validateValues()){
                    let user ={
                        email:this.state.email,
                        password: this.state.password,
                        occupation: this.state.occupation,
                        food:parseFloat(this.state.food),
                        transportation:parseFloat(this.state.transportation),
                        health: parseFloat(this.state.health),
                        rent: parseFloat(this.state.rent),
                        education: parseFloat(this.state.education),
                        entertainment: parseFloat(this.state.entertainment),
                        others: parseFloat(this.state.others),
                    }
                    this.setState({
                        loaded:false,
                    },()=> {
                        Webservice.register(user).then(response => {
                            console.log(response)
                            if (response.ok) {
                                this.props.navigation.navigate('Auth')
                            } else {
                                Alert.alert('Something went wrong')
                            }
                        }).catch(error => {
                            console.log(error)
                        })
                    });
                }else{
                    Alert.alert('Sum of your values must be equal to 100.')
                }
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
    };

    next = () =>{
        this.setState({
            pressedNext:!this.state.pressedNext,
        })
    };

    validateValues=()=>{
        let value = parseFloat(this.state.food)+
            parseFloat(this.state.transportation)+
            parseFloat(this.state.health)+
            parseFloat(this.state.rent)+
            parseFloat(this.state.education)+
            parseFloat(this.state.entertainment)+
            parseFloat(this.state.others);
        if((value)===parseFloat(100)){
            return true
        }else{
            return false;
        }
    };

    goToLogin = () =>{
        this.props.navigation.navigate("Login");
    }

    render(){
        let loader = null;
        if (!this.state.loaded) {
            loader = <Loader/>;
        }
        return(
            <View style={{flex:1}}>
                <ImageBackground source={require('../../assets/Hometest.jpg')}
                                 style={{width: "100%", height: "100%"}}>
                    {!this.state.pressedNext ?
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontSize: 16,
                                fontWeight: 'bold',
                                paddingHorizontal: 10,
                            }}>Sign Up</Text>
                            <View style={{
                                paddingHorizontal: 20,
                            }}>
                                <View style={{
                                    paddingVertical: 10,
                                }}>
                                    <TextField
                                        style={{
                                            fontSize: 18
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
                                    paddingVertical: 10,
                                }}>
                                    <TextField
                                        style={{
                                            fontSize: 18
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
                                    paddingVertical: 10,
                                }}>
                                    <TextField
                                        style={{
                                            fontSize: 18
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
                                    paddingVertical: 10,
                                    justifyContent:'flex-end',
                                    alignItems:'flex-end'
                                }}>
                                    <TouchableOpacity onPress={this.next} style={{
                                        backgroundColor:'#ddd',
                                        width:'45%',
                                        paddingVertical:10,
                                        borderRadius:5
                                    }}>
                                        <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View> :
                        <View style={{
                            flex: 1,
                            justifyContent:'center',
                        }}>
                            <Text style={{
                                textAlign:'center',
                                fontSize:20,
                                fontWeight:'700',
                                paddingBottom:20
                            }}>Make your plan here!</Text>
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingHorizontal:40,
                                    paddingVertical:10,
                                    justifyContent:'space-between'
                                }}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>Food</Text>
                                    <TextInput style={{
                                        borderColor:'#000',
                                        borderWidth:1,
                                        borderRadius:5,
                                        width:'40%',
                                        paddingVertical:0
                                    }}
                                               placeholder={"%"}
                                               value={this.state.food}
                                               onChangeText={food => this.setState({food})}
                                               keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingHorizontal:40,
                                    paddingVertical:10,
                                    justifyContent:'space-between'
                                }}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>Transportation</Text>
                                    <TextInput style={{
                                        borderColor:'#000',
                                        borderWidth:1,
                                        borderRadius:5,
                                        width:'40%',
                                        paddingVertical:0
                                    }}
                                               placeholder={"%"}
                                               value={this.state.transportation}
                                               onChangeText={transportation => this.setState({transportation})}
                                    keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingHorizontal:40,
                                    paddingVertical:10,
                                    justifyContent:'space-between'
                                }}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>Health</Text>
                                    <TextInput style={{
                                        borderColor:'#000',
                                        borderWidth:1,
                                        borderRadius:5,
                                        width:'40%',
                                        paddingVertical:0
                                    }}

                                               placeholder={"%"}
                                               value={this.state.health}
                                               onChangeText={health => this.setState({health})}
                                               keyboardType={'number-pad'} />

                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingHorizontal:40,
                                    paddingVertical:10,
                                    justifyContent:'space-between'
                                }}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>Rent & Bills</Text>
                                    <TextInput style={{
                                        borderColor:'#000',
                                        borderWidth:1,
                                        borderRadius:5,
                                        width:'40%',
                                        paddingVertical:0
                                    }}
                                               placeholder={"%"}
                                               value={this.state.rent}
                                               onChangeText={rent => this.setState({rent})}
                                               keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingHorizontal:40,
                                    paddingVertical:10,
                                    justifyContent:'space-between'
                                }}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>Education</Text>
                                    <TextInput style={{
                                        borderColor:'#000',
                                        borderWidth:1,
                                        borderRadius:5,
                                        width:'40%',
                                        paddingVertical:0
                                    }}
                                               placeholder={"%"}
                                               value={this.state.education}
                                               onChangeText={education => this.setState({education})}
                                               keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingHorizontal:40,
                                    paddingVertical:10,
                                    justifyContent:'space-between'
                                }}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>Entertainment</Text>
                                    <TextInput style={{
                                        borderColor:'#000',
                                        borderWidth:1,
                                        borderRadius:5,
                                        width:'40%',
                                        paddingVertical:0
                                    }}
                                               placeholder={"%"}
                                               value={this.state.entertainment}
                                               onChangeText={ entertainment=> this.setState({entertainment})}
                                               keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingHorizontal:40,
                                    paddingVertical:10,
                                    justifyContent:'space-between'
                                }}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>Others</Text>
                                    <TextInput style={{
                                        borderColor:'#000',
                                        borderWidth:1,
                                        borderRadius:5,
                                        width:'40%',
                                        paddingVertical:0
                                    }}
                                               placeholder={"%"}
                                               value={this.state.others}
                                               onChangeText={others => this.setState({others})}
                                               keyboardType={'number-pad'}
                                    />
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingHorizontal:40,
                                    paddingVertical:10,
                                    justifyContent:'space-between'
                                }}>
                                    <TouchableOpacity onPress={this.next} style={{
                                        backgroundColor:'#ddd',
                                        width:'45%',
                                        paddingVertical:10,
                                        borderRadius:5
                                    }}>
                                    <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center'}}>Back</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={!this.state.loaded} onPress={this.signUp} style={{
                                        backgroundColor:'#ddd',
                                        width:'45%',
                                        paddingVertical:10,
                                        borderRadius:5,
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                        {this.state.loaded?
                                        <Text style={{fontSize:16,fontWeight:'bold',}}>Sign Up</Text>
                                            : loader}

                                    </TouchableOpacity>
                                </View>

                            </View>
                            <TouchableOpacity onPress={this.goToLogin} style={{
                                justifyContent:'center',
                                alignItems:'center',
                                paddingVertical:20,
                            }}>
                                <Text style={{
                                    fontWeight:'bold'
                                }}>Already using Smart Wallet Guide? Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    }

                </ImageBackground>
            </View>
        )
    }
}
