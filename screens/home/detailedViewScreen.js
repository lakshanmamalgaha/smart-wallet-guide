import React from 'react';
import {Text, TouchableOpacity, View,ScrollView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateService from '../../lib/service/dateService';
import Webservice from "../../lib/api/webService";
import GlobalService from "../../lib/service/globalService";

export default class DetailedViewScreen extends React.Component {
    constructor(props){
        super(props)
        this.item = this.props.navigation.state.params.item;
        console.log(this.item.iconName)
        this.init();
    }

    init=()=>{
        if(this.item.iconName==="calendar"){
            Webservice.call({
                name:"getEvents?userId="+GlobalService.get('User').id,
                method:"GET"
            }).then(response=>{
                console.log(response)
            })

        }
    }

    goBack= () => {
        this.props.navigation.goBack();
    };

    delete = () =>{
        Webservice.call({
            name:"deleteAll?id="+this.item.id+"&userId="+this.item.userId,
            method:"GET"
        }).then(response=>{
            console.log(response)
            this.props.navigation.navigate("Home")
        }).catch(error=>{
            console.log(error)
            this.props.navigation.navigate("Home")
        })
    }

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
                    justifyContent:'space-between',
                    zIndex:1000,
                    backgroundColor:'#2cb40e'
                }}>
                    <View style={{
                    flexDirection:"row"
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
                    <TouchableOpacity onPress={this.delete} style={{
                        marginVertical:6,
                        marginHorizontal:10,
                    }}>
                    <MaterialIcons name={'delete'} color={'#000'} size={30}/>
                </TouchableOpacity>
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
                        {this.item.iconName !== 'calendar'? this.renderRow("Note",this.item.comment):
                            <View style={{
                                paddingTop:20,
                            }}
                            >
                                <Text style={{
                                    textAlign:'center',
                                    fontWeight:'bold'
                                }}>Event Details</Text>
                            </View>
                        }
                    </View>

                </ScrollView>

            </View>
        );
    }
}


