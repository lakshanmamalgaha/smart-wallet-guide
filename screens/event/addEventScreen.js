import React from 'react';
import {Alert, Dimensions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextField} from 'react-native-material-textfield';
import IconComponent from '../../lib/component/iconComponent';
import Webservice from "../../lib/api/webService";
import GlobalService from "../../lib/service/globalService";
import DateService from "../../lib/service/dateService";
import moment from "moment";
import Loader from "../../lib/component/loader";
import Snackbar from "../../lib/component/snackbar";
const WIDTH= Dimensions.get('window').width;
export default class AddEventScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            icons:['home','food-apple','beer','coffee','cup-water','food-fork-drink','pizza','subway','train'],
            selectedIcon:'home',
            category1:'',
            category2:'',
            category3:'',
            category4:"",
            category5:'',
            value1:"",
            value2:"",
            value3:"",
            value4:"",
            value5:"",
            loaded:false,
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
        if(parseFloat(this.calulateTotal())>0){
            if(this.state.name !=="") {
                let obj = {
                    name: this.state.name,
                    userId: GlobalService.get("User").id,
                    category1: this.state.category1,
                    category2: this.state.category2,
                    category3: this.state.category3,
                    category4: this.state.category4,
                    category5: this.state.category5,
                    value1: this.state.value1,
                    value2: this.state.value2,
                    value3: this.state.value3,
                    value4: this.state.value4,
                    value5: this.state.value5
                };
                let promises = [];
                promises.push(Webservice.call({
                    name: 'createEvent',
                    method: "POST",
                    data: obj
                }));

                promises.push(Webservice.call({
                    name: 'createTransaction',
                    method: 'POST',
                    data: {
                        name: this.state.name,
                        category: "Expenses",
                        iconName: "calendar",
                        comment: '',
                        date: moment(),
                        yearMonth: DateService.convertDateObjectToStringFormat(moment(), 'YYYY-MM'),
                        userId: GlobalService.get('User').id,
                        amount: parseFloat(this.calulateTotal()),
                    },

                }));

                Promise.all(promises).then(response => {
                    if (response[0].ok && response[1].ok) {
                        this.props.navigation.navigate('Home');
                    }
                }).catch(error => {
                    console.log(error);
                    Alert.alert("Connection Error.")
                    this.refs.ReactNativeCodeSnackBar.ShowErrorMessage("Connection Error");
                });
            }else{
                Alert.alert("Please enter the event name.")
            }
        }else{
            Alert.alert("Please enter a value.")
        }
    };

    calulateTotal = ()=>{

        return parseFloat(this.state.value1===''?0:this.state.value1)
            +parseFloat(this.state.value2===''?0:this.state.value2)
            +parseFloat(this.state.value3===''?0:this.state.value3)
            +parseFloat(this.state.value4===''?0:this.state.value4)
        +parseFloat(this.state.value5===''?0:this.state.value5);
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
                    backgroundColor: '#2cb40e',
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
                <ScrollView style={{flex: 1,backgroundColor: '#fff',margin:10,borderRadius:10,}}>
                    <View style={{
                        marginVertical: 20,
                        marginHorizontal: 10,

                        flex:1,
                        paddingHorizontal:10,
                    }}>
                        <View style={{flexDirection: 'row',
                        }}>

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

                        </View>
                    </View>
                    <Text style={{paddingLeft:20,}}>Add Expenses By Category</Text>
                    <View style={
                        {
                            flexDirection:'row',
                            flex:1,
                            marginHorizontal:20,
                        }
                    }>
                        <View style={{flex:4}}>
                        <TextField
                            value={this.state.category1}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onChangeText={category1 => this.setState({category1})}
                            label='Category Name'
                        />
                    </View>
                        <View style={{marginLeft:50,flex:4}}>
                            <TextField
                                value={this.state.value1}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={value1 => this.setState({value1},()=>{this.calulateTotal()})}
                                label='Value'
                                keyboardType={'number-pad'}
                            />
                        </View>
                    </View>

                    <View style={
                        {
                            flexDirection:'row',
                            flex:1,
                            marginHorizontal:20,
                        }
                    }>
                        <View style={{flex:4}}>
                            <TextField
                                value={this.state.category2}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={category2 => this.setState({category2})}
                                label='Category Name'
                            />
                        </View>
                        <View style={{marginLeft:50,flex:4}}>
                            <TextField
                                value={this.state.value2}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={value2 => this.setState({value2})}
                                label='Value'
                                keyboardType={'number-pad'}
                            />
                        </View>
                    </View>

                    <View style={
                        {
                            flexDirection:'row',
                            flex:1,
                            marginHorizontal:20,
                        }
                    }>
                        <View style={{flex:4}}>
                            <TextField
                                value={this.state.category3}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={category3 => this.setState({category3})}
                                label='Category Name'
                            />
                        </View>
                        <View style={{marginLeft:50,flex:4}}>
                            <TextField
                                value={this.state.value3}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={value3 => this.setState({value3})}
                                label='Value'
                                keyboardType={'number-pad'}
                            />
                        </View>
                    </View>

                    <View style={
                        {
                            flexDirection:'row',
                            flex:1,
                            marginHorizontal:20,
                        }
                    }>
                        <View style={{flex:4}}>
                            <TextField
                                value={this.state.category4}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={category4 => this.setState({category4})}
                                label='Category Name'

                            />
                        </View>
                        <View style={{marginLeft:50,flex:4}}>
                            <TextField
                                value={this.state.value4}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={value4 => this.setState({value4})}
                                label='Value'
                                keyboardType={'number-pad'}
                            />
                        </View>
                    </View>

                    <View style={
                        {
                            flexDirection:'row',
                            flex:1,
                            marginHorizontal:20,
                        }
                    }>
                        <View style={{flex:4}}>
                            <TextField
                                value={this.state.category5}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={category5 => this.setState({category5})}
                                label='Category Name'
                            />
                        </View>
                        <View style={{marginLeft:50,flex:4}}>
                            <TextField
                                value={this.state.value5}
                                autoCorrect={false}
                                enablesReturnKeyAutomatically={true}
                                onChangeText={value5 => this.setState({value5})}
                                label='Value'
                                keyboardType={'number-pad'}
                            />
                        </View>
                    </View>
                    <View style={{
                        flexDirection:'row',
                        marginVertical:10,
                        justifyContent:'flex-end'
                    }}>
                        <Text style={{
                            paddingHorizontal:20,
                        }}>Total: {this.calulateTotal()}</Text>
                    </View>

                </ScrollView>
                <Snackbar ref="ReactNativeCodeSnackBar"/>
            </View>
        );
    }
}
