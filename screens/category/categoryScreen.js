import React from 'react';
import {Text, View, TouchableOpacity, Dimensions,StyleSheet,ScrollView} from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Modal from "react-native-modal";
const WIDTH= Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default class CategoryScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            index: 0,
            routes: [
                { key: 'first', title: 'Income' },
                { key: 'second', title: 'Expenses' },
            ],
        }
    }

    goBack= () => {
        this.props.navigation.goBack();
    };
    render() {

        const Income = () => (
            <View style={{flex:1}} >
                <ScrollView style={{
                    flex:1
                }}>
                <View style={{
                    flexDirection:'row',
                    paddingVertical:10,
                    paddingHorizontal:20,
                }}>
                    <MaterialCommunityIcons name={'minus-circle'} size={20} color={'red'}/>
                    <View style={{
                        paddingLeft:30,
                    }}>
                        <MaterialCommunityIcons name={'food'} size={20}/>
                    </View>
                    <Text style={{
                        marginLeft:10,
                        fontSize:18
                    }}>Item</Text>
                </View>
                </ScrollView>

                <TouchableOpacity style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    backgroundColor: '#ddd',
                    bottom:0,
                    overflow: 'hidden',
                    flexDirection:'row'
                }}>
                    <MaterialCommunityIcons name={'plus-circle'} size={20} color={'red'}/>
                    <Text style={{paddingLeft:10}}>Add new category</Text>
                </TouchableOpacity>

            </View>
        );

        const Expenses = () => (
            <View style={[styles.scene, { backgroundColor: '#f9f9f9' }]} />
        );

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
                        Categories
                    </Text>
                </View>

                <View style={{flex:1}}>
                <TabView
                    style={{
                        backgroundColor:'#fff'
                    }}
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: Income,
                        second: Expenses,
                    })}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            indicatorStyle={{ backgroundColor: '#ff1e20'}}
                            style={{ backgroundColor: '#ffffff' }}
                            labelStyle={{color:'#000000' }}


                        />
                    }
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
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
