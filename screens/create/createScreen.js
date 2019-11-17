import React from 'react';
import {Text, TouchableOpacity, View,StyleSheet,ScrollView,TextInput,Keyboard} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ItemComponent from '../../lib/component/itemComponent';
import Webservice from '../../lib/api/webService';
import DateService from '../../lib/service/dateService';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Snackbar from '../../lib/component/snackbar';
export default class CreateScreen extends React.Component {
    constructor(props){
        super(props)
        this.current = this.props.navigation.state.params.next?this.props.navigation.state.params.next: null;
        this.state = {
            resultText: "0",
            showCalculate:true,
            list:[{
                label: "Salary",
                icon:'home'
            },{
                label: 'Awards',
                icon:'trophy-award'
            },{
                label: 'Investment',
                icon:'finance'
            },{
                label: 'Refunds',
                icon:'cash-refund'
            },{
                label: 'Other',
                icon:'cash'
            }],
            selectedItem: "",
            selectedIcon:'',
            selectedDate:moment(),
            comment:'',
            isOnOperation:false,
            isDateTimePickerVisible: false,


        }


    }

    showDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: true});
    };

    hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: false});
    };

    handleDatePicked = date => {
        this.setState({
            selectedDate: date,
        })
        this.hideDateTimePicker();
    };



    goBack= () => {
        this.props.navigation.goBack();
    };

    requiredValidator = (value) => {
        if(value !== ''){
            return true;
        }else{
            return false;
        }
    }

    createTransaction= () => {
        console.log(this.state.selectedItem)
        if(
            this.requiredValidator(this.state.selectedItem) &&
            this.requiredValidator(this.state.selectedIcon) &&
            this.requiredValidator(this.state.resultText) &&
            this.requiredValidator(this.state.selectedDate)
        ){
            Webservice.call({
                name: 'createTransaction',
                method: "POST",
                data: {
                    name:this.state.selectedItem,
                    category: this.current,
                    iconName: this.state.selectedIcon,
                    comment:this.state.comment,
                    date:this.state.selectedDate,
                    yearMonth: DateService.convertDateObjectToStringFormat(this.state.selectedDate,"YYYY-MM"),
                    amount:2000
                }

            }).then(response=>{
                console.log(response)
                if (response.ok) {
                    this.refs.ReactNativeCodeSnackBar.ShowSuccessMessage("Successfully Saved");
                    this.props.navigation.navigate('Home');
                } else {
                    this.refs.ReactNativeCodeSnackBar.ShowErrorMessage("Something went wrong");
                }
            }).catch(error=>{
                console.log(error)
            })
        }

    };


    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = ()=> {
        this.setState({
            showCalculate: false
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            showCalculate: true
        })
    }

    deleteChar = () => {
        this.setState({
            resultText: this.state.resultText.substring(0, (this.state.resultText.length - 1))
        })
    };

    addOperation = () => {
        this.setState({
            isOnOperation: true,
        })
        if(this.state.resultText.substr(this.state.resultText.length-1)!== '+'){
            this.setState({
                resultText: this.state.resultText.toString() + '+'.toString()
            })
        }
    }

    subtractOperation = () => {
        this.setState({
            isOnOperation: true,
        })
        if(this.state.resultText.substr(this.state.resultText.length-1)!=='-'){
            this.setState({
                resultText: this.state.resultText.toString() + '-'.toString()
            })
        }
    }

    operate(operation){
        switch(operation){
            case 'D':
                const text = this.state.resultText.split('')
                text.pop()
                this.setState({
                    resultText: text.join('')
                })
        }

    }

    buttonPressed(text){
        console.log(text)
        if(this.state.resultText ==='0'){
            this.setState({
                resultText: text
            })
        }else {
            this.setState({
                resultText: this.state.resultText.toString() + text.toString()
            })
        }
    }

    handleSelectItem = (item)=> {
        console.log(item)
        this.setState({
            selectedItem: item.label,
            selectedIcon:item.icon
        })
    }

    render() {
        let rows = []
        let symbols = [[1,2,3],[4,5,6],[7,8,9]]
        for(let i =0; i<3; i++){
            let row = []
            for(let j=0; j<3; j++){
                row.push(
                    <TouchableOpacity onPress={() => this.buttonPressed(symbols[i][j])} style={styles.button}>
                        <Text style={styles.btnText}>{symbols[i][j]}</Text>
                    </TouchableOpacity>
                )
            }
            rows.push(<View style={styles.row}>{row}</View>)
        }

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
                        paddingHorizontal:10,
                        paddingVertical:10,
                        fontSize:20
                    }}>
                        {this.current}
                    </Text>

                </View>

                <ScrollView style={{
                    flex:1,
                    padding:10,
                    backgroundColor:'#dddddd'
                }}>

                    <View style={{
                        backgroundColor:'#fff',
                    }}>
                        {this.state.list.map((listItem, id) => (
                            <ItemComponent
                            selectItem={(item) => {
                            this.handleSelectItem(item)
                        }}
                            label={listItem.label}
                            icon={listItem.icon}
                            isActive={this.state.selectedItem === listItem.label}
                            />
                        ))}

                    </View>

                </ScrollView>

                <View style={this.state.showCalculate?styles.container:{}}>
                    <View style={styles.calculation}>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            paddingHorizontal:20,
                        }}>
                            <View style={{
                            flexDirection:'row',
                                justifyContent:'center'
                            }}>
                                {this.state.selectedIcon?
                                    <View style={{
                                    paddingVertical:10,
                                        justifyContent:'center',
                                        paddingRight:10,
                                    }}>
                                <MaterialCommunityIcons name={this.state.selectedIcon} size={22}/>
                                    </View>
                                :null}
                            <TextInput
                                style={{
                                    minWidth:200,
                                    maxWidth:'50%'
                                }}
                                onChangeText={(comment) => this.setState({comment})}
                                value={this.state.comment}
                                onSubmitEditing={Keyboard.dismiss}
                                 placeholder={'Comment'}/>
                            </View>
                        <Text style={{
                            fontSize:20,
                            paddingVertical:10,
                        }}>{this.state.resultText}</Text>
                        </View>
                    </View>
                    {this.state.showCalculate?
                    <View style={styles.buttons}>
                        <View style={styles.numbers}>
                            {rows}
                            <View style={{
                            flexDirection:'row',
                                flex: 1,
                                justifyContent: 'space-around',
                                alignItems: 'stretch'
                            }}>
                            <TouchableOpacity onPress={() => this.buttonPressed(0)} style={styles.button}>
                                <Text style={styles.btnText}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {}} style={styles.button}>
                                <Text style={styles.btnText}>.</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.deleteChar} style={styles.button}>
                                <Ionicons name={'ios-backspace'} size={30} color={'#000'}/>
                            </TouchableOpacity>
                        </View>
                        </View>


                        <View style={styles.operations}>
                            <TouchableOpacity onPress={this.showDateTimePicker}
                                              style={styles.button}>
                                <Text style={[styles.btnText,{
                                    fontSize:16,
                                    paddingHorizontal:20, justifyContent:'center',alignItems:'center',alignContent:'center'
                                }]}>{DateService.convertDateObjectToStringFormat(this.state.selectedDate,'ddd MM-DD')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.addOperation}
                                              style={styles.button}>
                                <Text style={styles.btnText}>+</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.subtractOperation}
                                              style={styles.button}>
                                <Text style={styles.btnText}>-</Text>
                            </TouchableOpacity>
                            {this.state.isOnOperation ? <TouchableOpacity onPress={() => {
                                }} style={{
                                    flex: 1,
                                    backgroundColor: '#ffbd09',
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                    alignItems: 'center'
                                }}>
                                    <Text>=</Text>
                                </TouchableOpacity> :

                                <TouchableOpacity onPress={this.createTransaction}
                                    style={{
                                    flex: 1,
                                    backgroundColor: '#ffbd09',
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                    alignItems: 'center'
                                }}>
                                    <Ionicons name={'ios-checkmark-circle-outline'} size={30} color={'#000'}/>
                                </TouchableOpacity>
                            }
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                        />
                    </View>: null }
                </View>
                <Snackbar ref="ReactNativeCodeSnackBar"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',

    },
    calculationText: {
        fontSize: 20,
        color: '#000',

    },
    resultText: {
        fontSize: 80,
        color: 'white'
    },
    btnText:{
        fontSize: 20,
        color: '#000'
    },
    button:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000'
    },

    calculation: {
        backgroundColor: '#fff',
        borderWidth:0.5,
        borderColor:'#a9a9a9'
    },
    buttons: {
        flex:9,
        flexDirection: 'row'
    },
    numbers: {
        flex: 3,
    },
    operations: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch'

    }
});

