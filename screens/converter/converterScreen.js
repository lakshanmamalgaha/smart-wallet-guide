import React from 'react';
import {Text, TouchableOpacity, View,TextInput} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';

export default class ConverterScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            amount:'1',
            result:'',
            to:'',
            from:''
        };
    }

    goBack= () => {
        this.props.navigation.goBack();
    };

    convert = (from,to,amount) => {
        fetch('https://free.currconv.com/api/v7/convert?q='+from+'_'+to+'&compact=ultra&apiKey=68397cc2a043e73d53cb')
            .then((response) => response.json().then(responseData => {
                let array = Object.keys(responseData).map(item => responseData[item]);
                this.setState({
                    result:amount*array[0]
                })
            })).catch(error=>{
            console.log(error)
        })
    }

    doOperation = () =>{
        if(this.state.amount !== 0 && this.state.from !== '' && this.state.to !==''){
            this.convert(this.state.from,this.state.to,this.state.amount);
        }
    }

    render() {
        let data = [{
            value: 'LKR',
        }, {
            value: 'USD',
        }, {
            value: 'INR',
        }];

        return (
            <View style={{
                flex:1,
                backgroundColor:"#ddd"
            }}>
                <View style={{
                    flexDirection:'row',
                    zIndex:1000,
                    backgroundColor:'#2cb40e'
                }}>
                    <TouchableOpacity
                        onPress={this.goBack}
                        style={{
                            paddingHorizontal:20,
                            paddingVertical:10
                        }}>
                        <MaterialIcons name={'arrow-back'} color={'#000'} size={30}/>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize:20,
                        paddingVertical:10
                    }}>
                        Currency Converter
                    </Text>
                </View>
                <View style={{
                    paddingHorizontal:10,
                    paddingVertical:10,
                    backgroundColor:"#fff",
                    margin:10,
                    borderRadius:10,
                }}>
                    <View style={{
                        paddingVertical:10,
                    }}>
                        <TextField
                            style={{
                                fontSize:18
                            }}
                            value={this.state.amount}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onChangeText={amount => this.setState({amount})}
                            returnKeyType='next'
                            label='Amount'
                            keyboardType={'number-pad'}
                        />
                    </View>
                    <View style={{
                        paddingVertical:10,
                    }}>
                    <Dropdown
                        label='From'
                        data={data}
                        onChangeText={value=>this.setState({from:value})}
                    />
                    </View>
                    <View style={{
                        paddingVertical:10,
                    }}>
                        <Dropdown
                            label='To'
                            data={data}
                            onChangeText={value=>this.setState({to:value})}
                        />
                    </View>
                    <View style={{
                    }}>
                        <TouchableOpacity
                            onPress={this.doOperation}
                            style={{
                            paddingVertical:10,
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'#a9a9a9',
                                borderRadius:10,
                        }}>
                            <Text>Convert</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        paddingVertical:10,
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        {this.state.result !==''?
                    <Text style={{
                        fontSize:18,
                        paddingTop:10,
                    }}>{this.state.to+' '+this.state.result}</Text>
                            :null}
                    </View>

                </View>
            </View>
        );
    }
}


