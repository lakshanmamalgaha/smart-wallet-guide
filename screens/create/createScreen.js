import React from 'react';
import {Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ItemComponent from '../../lib/component/itemComponent';
import Webservice from '../../lib/api/webService';
import DateService from '../../lib/service/dateService';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Snackbar from '../../lib/component/snackbar';
import GlobalService from '../../lib/service/globalService';

export default class CreateScreen extends React.Component {
    constructor(props) {
        super(props);
        this.current = this.props.navigation.state.params.next ? this.props.navigation.state.params.next : null;
        this.state = {
            resultText: '0',
            showCalculate: true,
            list: [],
            selectedItem: '',
            selectedIcon: '',
            selectedDate: moment(),
            comment: '',
            isOnOperation: false,
            isDateTimePickerVisible: false,
        };
        this.init();
        this.expenses=GlobalService.get('Expenses');
        this.user= GlobalService.get('User');
        this.income= GlobalService.get('Income');

    }

    init = () => {
        Webservice.call({
            name: 'api/getByCategory?category=' + this.current,
            method: 'GET',
        }).then(response => {
            if (response.ok) {
                this.setState({
                    list: response.data,
                });
            }
        }).catch(error => {
            console.log(error);
            this.refs.ReactNativeCodeSnackBar.ShowErrorMessage('Something went wrong');
        });
    };

    showDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: true});
    };

    hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: false});
    };

    handleDatePicked = date => {
        this.setState({
            selectedDate: date,
        });
        this.hideDateTimePicker();
    };


    goBack = () => {
        this.props.navigation.goBack();
    };

    requiredValidator = (value) => {
        if (value !== '') {
            return true;
        } else {
            return false;
        }
    };

    createTransaction = () => {
        let amount;
        let resultText = this.state.resultText.toString();
        if(resultText.split('').includes('+')){
            amount = resultText.split('+')[0]
        }else if(resultText.split('').includes('-')){
            amount = resultText.split('-')[0]
        }else{
            amount = resultText
        }

        if (
            this.requiredValidator(this.state.selectedItem) &&
            this.requiredValidator(this.state.selectedIcon) &&
            this.requiredValidator(this.state.resultText) &&
            this.requiredValidator(this.state.selectedDate)
        ) {
            let category=this.current;
            if(category==='Savings'){
                category="Expenses"
            }
            Webservice.call({
                name: 'createTransaction',
                method: 'POST',
                data: {
                    name: this.state.selectedItem,
                    category: category,
                    iconName: this.state.selectedIcon,
                    comment: this.state.comment,
                    date: this.state.selectedDate,
                    yearMonth: DateService.convertDateObjectToStringFormat(this.state.selectedDate, 'YYYY-MM'),
                    userId: GlobalService.get('User').id,
                    amount: parseFloat(amount),
                },

            }).then(response => {
                if (response.ok) {
                    this.refs.ReactNativeCodeSnackBar.ShowSuccessMessage('Successfully Saved');
                    this.props.navigation.navigate('Home');
                } else {
                    this.refs.ReactNativeCodeSnackBar.ShowErrorMessage('Something went wrong');
                }
            }).catch(error => {
                console.log(error);
            });
        }else{
            Alert.alert('You must fill all fields.')
        }

    };


    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({
            showCalculate: false,
        });
    };

    _keyboardDidHide = () => {
        this.setState({
            showCalculate: true,
        });
    };

    deleteChar = () => {
        if (this.state.resultText !== '0') {
            let resultText='';
            if(this.state.resultText.length>1) {
                let resultText = this.state.resultText.substring(0, (this.state.resultText.length - 1));
            }else{
                let resultText='';
            }
            if (resultText !== '') {
                this.setState({
                    resultText: resultText,
                });
            } else {
                this.setState({
                    resultText: '0',
                });
            }
        }
    };

    doOperation = (value) => {
        let operation = this.state.resultText;
        if(operation.split("").includes("+")){
            let values= operation.split('+');
            if(values[0].length>0 && values[1].length>0){
                let result=parseFloat(values[0])+parseFloat(values[1]);
                this.setState({
                    resultText: result.toString() + value,
                    isOnOperation:false,
                });
            }else if(values[0].length>0 && values[1].length===0){
                let result=parseFloat(values[0]);
                this.setState({
                    resultText: result.toString() + value,
                });
            }
        }else if(operation.split("").includes("-")){
            let values= operation.split('-');
            if(values[0].length>0 && values[1].length>0){
                let result=parseFloat(values[0])-parseFloat(values[1]);
                this.setState({
                    resultText: result.toString() + value,
                    isOnOperation:false,
                });
            }else if(values[0].length>0 && values[1].length===0){
                let result=parseFloat(values[0]);
                this.setState({
                    resultText: result.toString() + value,
                });
            }

        }else {

            let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
            let last = this.state.resultText.substr(this.state.resultText.length - 1);
            if (!numbers.includes(last)) {
                if (last !== value) {
                    let resultText = this.state.resultText.substring(0, (this.state.resultText.length - 1));
                    this.setState({
                        resultText: resultText + value,
                    });
                }
            } else {
                this.setState({
                    resultText: this.state.resultText + value,
                });
            }
        }


    };


    buttonPressed(text) {
        let operation = this.state.resultText.toString();
        if(operation.split("").includes("+") || operation.split("").includes("-")){
            this.setState({
                isOnOperation: true,
            });
        }
        if (this.state.resultText === '0') {
            this.setState({
                resultText: text,
            });
        } else {
            this.setState({
                resultText: this.state.resultText.toString() + text.toString(),
            });
        }
    }

    handleSelectItem = (item) => {
        console.log(this.user.health)
        if(this.income>0) {
            if (item.label === "Food") {
                console.log(this.expenses.food / this.income)
                if (((this.expenses.food / this.income)*100) > this.user.food - 2) {
                    Alert.alert('Expenses for food is near the limit.');
                }
            } else if (item.label === "Transportation") {
                if (((this.expenses.transportation / this.income)*100) > this.user.transportation - 2) {
                    Alert.alert('Expenses for transportation is near the limit');
                }
            } else if (item.label === "Health") {
                if (((this.expenses.health / this.income)*100) >= this.user.health - 2) {
                    Alert.alert('Expenses for Health is near the limit');
                }
            } else if (item.label === "Rental and bills") {
                if (((this.expenses.rent / this.income)*100) >= this.user.rent - 2) {
                    Alert.alert('Expenses for Rental and bills is near the limit');
                }
            }  else if (item.label === "Education") {
                if (((this.expenses.education / this.income)*100) >= this.user.education - 2) {
                    Alert.alert('Expenses for Education is near the limit');
                }
            } else if (item.label === "Entertainment") {
                if (((this.expenses.entertainment / this.income)*100) >= this.user.entertainment - 2) {
                    Alert.alert('Expenses for Entertainment is near the limit');
                }
            } else if (item.label === "Others") {
                if (((this.expenses.others / this.income) *100)>= this.user.others - 2) {
                    Alert.alert('Expenses for Entertainment is near the limit');
                }
            }
        }
        this.setState({
            selectedItem: item.label,
            selectedIcon: item.icon,
        });
    };

    render() {
        let rows = [];
        let symbols = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(
                    <TouchableOpacity onPress={() => this.buttonPressed(symbols[i][j])} style={styles.button}>
                        <Text style={styles.btnText}>{symbols[i][j]}</Text>
                    </TouchableOpacity>,
                );
            }
            rows.push(<View style={styles.row}>{row}</View>);
        }

        return (
            <View style={{
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    zIndex: 1000,
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
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        fontSize: 20,
                    }}>
                        {this.current}
                    </Text>

                </View>

                <ScrollView style={{
                    flex: 1,
                    padding: 10,
                    backgroundColor: '#dddddd',
                }}>

                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius:10
                    }}>
                        {this.state.list.map((listItem, id) => (
                            <ItemComponent
                                selectItem={(item) => {
                                    this.handleSelectItem(item);
                                }}
                                label={listItem.name}
                                icon={listItem.iconName}
                                isActive={this.state.selectedItem === listItem.name}
                            />
                        ))}

                    </View>

                </ScrollView>

                <View style={this.state.showCalculate ? styles.container : {}}>
                    <View style={styles.calculation}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                {this.state.selectedIcon ?
                                    <View style={{
                                        paddingVertical: 10,
                                        justifyContent: 'center',
                                        paddingRight: 10,
                                    }}>
                                        <MaterialCommunityIcons name={this.state.selectedIcon} size={22}/>
                                    </View>
                                    : null}
                                <TextInput
                                    style={{
                                        minWidth: 200,
                                        maxWidth: '50%',
                                    }}
                                    onChangeText={(comment) => this.setState({comment})}
                                    value={this.state.comment}
                                    onSubmitEditing={Keyboard.dismiss}
                                    placeholder={'Comment'}/>
                            </View>
                            <Text style={{
                                maxWidth: '50%',
                                fontSize: 20,
                                paddingVertical: 10,
                            }}>{this.state.resultText}</Text>
                        </View>
                    </View>
                    {this.state.showCalculate ?
                        <View style={styles.buttons}>
                            <View style={styles.numbers}>
                                {rows}
                                <View style={{
                                    flexDirection: 'row',
                                    flex: 1,
                                    justifyContent: 'space-around',
                                    alignItems: 'stretch',
                                }}>
                                    <TouchableOpacity onPress={() => this.buttonPressed(0)} style={styles.button}>
                                        <Text style={styles.btnText}>0</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                    }} style={styles.button}>
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
                                    <Text style={{
                                        fontWeight: 'bold',
                                    }}>{DateService.convertDateObjectToStringFormat(this.state.selectedDate, 'ddd')}</Text>
                                    <Text style={[styles.btnText, {
                                        fontSize: 16,
                                        paddingHorizontal: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignContent: 'center',
                                    }]}>{DateService.convertDateObjectToStringFormat(this.state.selectedDate, 'MM-DD')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.doOperation('+');
                                }}
                                                  style={styles.button}>
                                    <Text style={styles.btnText}>+</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this.doOperation('-');
                                }}
                                                  style={styles.button}>
                                    <Text style={styles.btnText}>-</Text>
                                </TouchableOpacity>
                                {this.state.isOnOperation ? <TouchableOpacity onPress={() => {
                                    this.doOperation('')}} style={{
                                        flex: 1,
                                        backgroundColor: '#ffbd09',
                                        justifyContent: 'center',
                                        alignSelf: 'stretch',
                                        alignItems: 'center',
                                    }}>
                                        <Text>=</Text>
                                    </TouchableOpacity> :

                                    <TouchableOpacity onPress={this.createTransaction}
                                                      style={{
                                                          flex: 1,
                                                          backgroundColor: '#ffbd09',
                                                          justifyContent: 'center',
                                                          alignSelf: 'stretch',
                                                          alignItems: 'center',
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
                        </View> : null}
                </View>
                <Snackbar ref="ReactNativeCodeSnackBar"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
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
        color: 'white',
    },
    btnText: {
        fontSize: 20,
        color: '#000',
    },
    button: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#000',
    },

    calculation: {
        backgroundColor: '#fff',
        borderWidth: 0.5,
        borderColor: '#a9a9a9',
    },
    buttons: {
        flex: 9,
        flexDirection: 'row',
    },
    numbers: {
        flex: 3,
    },
    operations: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',

    },
});

