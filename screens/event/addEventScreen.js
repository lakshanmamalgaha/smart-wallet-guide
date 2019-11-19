import React from 'react';
import {Dimensions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextField} from 'react-native-material-textfield';
import IconComponent from '../../lib/component/iconComponent';
const WIDTH= Dimensions.get('window').width;
export default class AddEventScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            icons:['home','food-apple','beer','coffee','cup-water','food-fork-drink','pizza','subway','train'],
            selectedIcon:'home'
        };

    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    selectIcon = (icon)=>{
        this.setState({
            selectedIcon:icon
        })
    };

    addCategory = () =>{

    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ddd',
            }}>
                <View style={{
                    flexDirection: 'row',
                    zIndex: 1000,
                    backgroundColor: '#fff',
                    justifyContent:'space-between'
                }}>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                        onPress={this.goBack}
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}>
                        <MaterialIcons name={'arrow-back'} color={'#000'} size={30}/>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        paddingVertical: 10,
                    }}>
                        Add Special Event
                    </Text>
                    </View>

                    <TouchableOpacity
                        onPress={this.addCategory}
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}>
                        <MaterialIcons name={'check'} color={'#000'} size={30}/>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex: 1}}>
                    <View style={{
                        marginVertical: 20,
                        marginHorizontal: 10,
                        backgroundColor: '#fff',
                        flex:1,
                        paddingHorizontal:10,
                    }}>
                        <View style={{flexDirection: 'row',
                        }}>
                        <View style={{flex:1,paddingVertical:20,paddingLeft:10,}}>
                            <MaterialCommunityIcons name={this.state.selectedIcon} size={50}/>
                        </View>
                        <View style={{
                            flex:4
                        }}>
                            <TextField
                                value={this.state.name}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={name => this.setState({name})}
                                label='Event Name'
                            />
                        </View>
                        </View>

                        <View style={{
                            paddingVertical:10,
                        }}>
                            <Text style={{
                                justifyContent:'center',
                                textAlign:'center',
                                fontSize:20
                            }}>Icons</Text>
                            <View style={{
                                paddingVertical:10,
                                flexDirection:'row',
                                flexWrap:'wrap'
                            }}>
                                {this.state.icons.map((icon,id)=>(
                                    <IconComponent
                                        onPress={()=>{this.selectIcon(icon)}}
                                        key={id}
                                        isActive={this.state.selectedIcon === icon}
                                        iconName={icon}
                                        width={WIDTH}/>
                                ))}
                            </View>
                        </View>
                    </View>


                </ScrollView>
            </View>
        );
    }
}
