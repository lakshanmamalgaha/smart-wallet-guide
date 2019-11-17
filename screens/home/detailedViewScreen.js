import React from 'react';
import {Text, TouchableOpacity, View,ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateService from '../../lib/service/dateService';

export default class DetailedViewScreen extends React.Component {
    constructor(props){
        super(props)
        this.item = this.props.navigation.state.params.item;
    }

    goBack= () => {
        this.props.navigation.goBack();
    };

    renderRow(label,value){
        return(
            <View style={{
                flex:1,
                flexDirection:'row',
                padding:10,
            }}>
                <Text style={{
                    flex:2
                }}>{label}</Text>
                <Text style={{
                    flex:2
                }}>{value}</Text>

            </View>
        )
    }

    render() {
        return (
            <View style={{
                flex:1
            }}>
                <View style={{
                    flexDirection:'row',
                    zIndex:1000,
                    backgroundColor:'#fff'
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
                        Details
                    </Text>
                </View>
                <ScrollView style={{
                    backgroundColor:"#dddddd"
                }}>
                    <View style={{
                        margin:10,
                        backgroundColor:'#fff',
                        paddingVertical:20,
                    }}>
                        <View style={{
                            flexDirection:'row',
                            flex:1,
                            paddingHorizontal:10,
                            paddingBottom:10,
                        }}>
                            <View style={{
                                flex:2
                            }}>
                            <MaterialCommunityIcons name={this.item.iconName} color={'#000'} size={30}/>
                            </View>
                            <Text style={{
                                flex:8,
                                fontSize:20,
                            }}>{this.item.name}</Text>
                        </View>
                        <View style={{
                            borderColor:'rgba(169,169,169,0.33)',
                            borderBottomWidth:1
                        }}/>

                        {this.renderRow('Category',this.item.category)}
                        {this.renderRow("Amount",this.item.amount)}
                        {this.renderRow("Date",DateService.convertDateObjectToStringFormat(this.item.date,'ddd, MMM DD YYYY'))}
                        {this.renderRow("Note",this.item.comment)}
                    </View>

                </ScrollView>

            </View>
        );
    }
}


