import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Webservice from '../../lib/api/webService';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default class CategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'first', title: 'Income'},
                {key: 'second', title: 'Expenses'},
            ],
            expenses: [{'category': 'Expenses', 'iconName': 'cookie', 'name': 'Food'}, {
                'category': 'Expenses',
                'iconName': 'taxi',
                'name': 'Transportation',
            }, {'category': 'Expenses', 'iconName': 'ambulance', 'name': 'Health'}, {
                'category': 'Expenses',
                'iconName': 'cash',
                'name': 'Rental and bills',
            }, {'category': 'Expenses', 'iconName': 'book-open', 'name': 'Education'}, {
                'category': 'Expenses',
                'iconName': 'music-circle',
                'name': 'Entertainment',
            }, {'category': 'Expenses', 'iconName': 'cash-multiple', 'name': 'Others'}],
            income: [{'category': 'Income', 'iconName': 'cash', 'name': 'Salary'}, {
                'category': 'Income',
                'iconName': 'trophy-award',
                'name': 'Awards',
            }, {'category': 'Income', 'iconName': 'finance', 'name': 'Investment'}, {
                'category': 'Income',
                'iconName': 'cash-refund',
                'name': 'Refunds',
            }, {'category': 'Income', 'iconName': 'cash-multiple', 'name': 'Others'}],
        };
    }

    goBack = () => {
        this.props.navigation.navigate('Home');
    };


    render() {

        const Income = () => (
            <View style={{flex: 1}}>
                <ScrollView style={{
                    flex: 1,
                }}>
                    {this.state.income.map((item,id)=>(
                        <View style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                paddingLeft: 10,
                            }}>
                                <MaterialCommunityIcons name={item.iconName} size={20}/>
                            </View>
                            <Text style={{
                                marginLeft: 30,
                                fontSize: 18,
                            }}>{item.name}</Text>
                        </View>
                    ))}

                </ScrollView>
            </View>
        );

        const Expenses = () => (
            <View style={{flex: 1}}>
                <ScrollView style={{
                    flex: 1,
                }}>
                    {this.state.expenses.map((item,id)=>(
                        <View style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                paddingLeft: 10,
                            }}>
                                <MaterialCommunityIcons name={item.iconName} size={20}/>
                            </View>
                            <Text style={{
                                marginLeft: 30,
                                fontSize: 18,
                            }}>{item.name}</Text>
                        </View>
                    ))}

                </ScrollView>
            </View>
        );

        console.log(this.state.index);

        return (
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#2cb40e',
                }}>
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
                        Categories
                    </Text>
                </View>

                <View style={{flex: 1}}>
                    <TabView
                        style={{
                            backgroundColor: '#fff',
                        }}
                        navigationState={this.state}
                        renderScene={SceneMap({
                            first: Income,
                            second: Expenses,
                        })}
                        renderTabBar={props =>
                            <TabBar
                                {...props}
                                indicatorStyle={{backgroundColor: '#ff1e20'}}
                                style={{backgroundColor: '#ffffff'}}
                                labelStyle={{color: '#000000'}}


                            />
                        }
                        onIndexChange={index => this.setState({index})}
                        initialLayout={{width: Dimensions.get('window').width}}
                    />
                </View>
            </View>


        );
    }
}


const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});
