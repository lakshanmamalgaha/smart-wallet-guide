import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateService from '../service/dateService';

export default class DateRowComponent extends React.Component {
    constructor(props){
        super(props)
        this.state={
            dayData:this.props.dayData
        }
        //console.log("hhhhh")
        //console.log(this.props.dayData)
    }

    goToDetailedView = (item) => {
        this.props.props.navigation.navigate('DetailedView',{
            item:item
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                margin: 10,
                backgroundColor: '#fff',
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                }}>
                    <Text style={{
                        fontSize: 10,
                    }}>{DateService.convertDateObjectToStringFormat(this.props.day,'ddd, MMM DD')}</Text>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            fontSize: 10,
                            paddingRight: 20,
                        }}>Income: 23456</Text>
                        <Text style={{
                            fontSize: 10,
                        }}>Expenses: 23456</Text>
                    </View>
                </View>
                <View style={{
                    borderColor:'rgba(169,169,169,0.33)',
                    borderBottomWidth:1
                }}/>
                {this.state.dayData.map((day, id) => (
                    <TouchableOpacity key={id}
                                      onPress={()=>{
                                          this.goToDetailedView(day)
                                      }}
                                      style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    paddingHorizontal:10,
                        paddingVertical:10
                }}>
                    <View style={{
                        flexDirection:'row'
                    }}>
                        <View>
                            <MaterialCommunityIcons name={day.iconName} size={20} />
                        </View>
                        <Text style={{
                            fontSize:16,
                            marginLeft:20,
                        }}>{day.name}</Text>

                    </View>
                    <Text style={{
                        fontSize:20
                    }}>{day.amount}</Text>
                </TouchableOpacity>))}

            </View>
        );
    }
}


