import React from 'react';
import {Dimensions, ScrollView, Text, TouchableOpacity, View,StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import DateComponent from '../../lib/component/dateComponent';
import TypeComponent from '../../lib/component/typeComponent';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Webservice from '../../lib/api/webService';
import DateService from '../../lib/service/dateService';
import DateRowComponent from '../../lib/component/dateRowComponet';
import moment from 'moment';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalShown: false,
            days:[],
            listData:{},
            income:0,
            expenses:0,
            selectedDate:DateService.convertDateObjectToStringFormat(moment(),"YYYY-MM"),
            //Months:['Jan',"Feb",'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            Months:[0,1,2,3,4,5,6,7,8,9,10,11],
            currentMonth:0,
            currentYear:0
        };
        this.init();
    }

    init = () => {
        Webservice.call({
            name: 'getAllByMonthYear?filter='+this.state.selectedDate,
            method: "GET",
        }).then(response=>{
            this.categorize(response.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    goLeft = () => {
        let currentYear=this.state.currentYear +1;
        this.setState({
            currentYear:currentYear,
            selectedDate:DateService.convertDateObjectToStringFormat(moment().subtract(currentYear, 'years'),"YYYY-MM")
        })
    }

    goRight = () =>{
        let currentYear=this.state.currentYear -1;
        this.setState({
            currentYear:currentYear,
            selectedDate:DateService.convertDateObjectToStringFormat(moment().subtract(currentYear, 'years'),"YYYY-MM")
        })
    }

    calculateMoths = (month) => {
        this.setState({
            selectedDate: DateService.convertDateObjectToStringFormat(moment().subtract(this.state.currentYear, 'years').month(month),"YYYY-MM"),
            days:[],
            listData:{},
            },()=>{
            this.init();
            this.hideModal();
            }
        )
    }

    categorize = (data) => {
        let listData={};
        let income=0;
        let expenses=0;
        let days=[];
        if(data.length>0){
            for(let i=0; i<data.length;i++){
                if(!days.includes(DateService.convertDateObjectToStringFormat(data[i].date,'YYYY-MM-DD'))){
                    days.push(DateService.convertDateObjectToStringFormat(data[i].date,'YYYY-MM-DD'))
                }
            }

            for(let j=0; j<days.length;j++){
                let day = days[j];
                let dayData=[];
                let incomeOfDay=0;
                let expensesOfDay=0;
                for(let k=0; k<data.length; k++){
                    if(DateService.convertDateObjectToStringFormat(data[k].date,'YYYY-MM-DD') === day){
                        dayData.push(data[k])
                        if(data[k].category === 'Income'){
                            incomeOfDay+=data[k].amount;
                        }else if(data[k].category === 'Expenses'){
                            expensesOfDay+=data[k].amount;
                        }
                    }
                }
                income+=incomeOfDay;
                expenses+=expensesOfDay;
                listData[day]=dayData;
            }

        }
        this.setState({
            days:days,
            listData:listData,
            income: income,
            expenses: expenses
        })
    }

    toggleModal = () => {
        this.setState({
            isModalShown: !this.state.isModalShown,
        });
    };

    hideModal = () => {
        this.setState({
            isModalShown: false,
        });
    };

    showAddOption = (next) => {
        this.props.navigation.navigate('Create',{
            next:next
        });
    }

    openNavigator = () => {
        this.props.navigation.toggleDrawer();

    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#dddddd',
            }}>
                <View
                    style={{
                        flexDirection: 'row',
                        zIndex: 10,
                        backgroundColor: '#fff',
                    }}>
                    <TouchableOpacity
                        style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}
                        onPress={this.openNavigator}>
                        <Ionicons name={'md-menu'} color={'#000'} size={35}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.toggleModal}
                                      style={{
                                          marginVertical: 10,
                                          paddingLeft: 20,
                                      }}
                    >
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontSize: 18,
                            }}>{DateService.convertDateObjectToStringFormat(this.state.selectedDate,'MMM')}</Text>
                            <View style={{
                                paddingVertical: 4,
                            }}>
                                {!this.state.isModalShown ?
                                    <MaterialIcons name={'arrow-drop-down'} size={20}/> :
                                    <MaterialIcons name={'arrow-drop-up'} size={20}/>}
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{}}>

                    <View style={{
                        backgroundColor: '#fff',
                        marginHorizontal: 10,
                        marginVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                    }}>
                        <TypeComponent label={'Income'} value={this.state.income} showDivider={true}/>

                        <TypeComponent label={'Expenses'} value={this.state.expenses} showDivider={true}/>
                        <TypeComponent label={'Balance'} value={this.state.income-this.state.expenses} disabled={true}/>


                    </View>
                    <View>
                        {this.state.days.map((day, id) => (
                            <DateRowComponent day={day} dayData={this.state.listData[day]} props={this.props}/>
                        ))}
                    </View>

                </ScrollView>

                <View keyboardShouldPersistTaps={'handled'} style={{

                }}>
                    <Modal isVisible={this.state.isModalShown}
                           onBackdropPress={this.hideModal}
                           useNativeDriver={true}
                           keyboardShouldPersistTaps={'handled'}
                    >
                        <View style={{
                            backgroundColor: '#ffffff',
                            height: HEIGHT / 4,
                            flex: 1,
                            bottom: -20,
                            left: -20,
                            position: 'absolute',
                            width: WIDTH,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                flex: 1,
                            }}>
                                <TouchableOpacity
                                    keyboardShouldPersistTaps={'handled'}
                                    onPress={this.goLeft}
                                    style={{
                                    paddingVertical: 10,
                                    paddingHorizontal:30
                                }}>
                                <MaterialIcons name={'chevron-left'} size={30}/>
                                </TouchableOpacity>
                                <Text style={{
                                    paddingVertical: 10,
                                    fontSize:20,
                                }}>{DateService.convertDateObjectToStringFormat(this.state.selectedDate,'YYYY')}</Text>
                                <TouchableOpacity
                                    onPress={this.goRight}
                                    style={{
                                    paddingVertical: 10,
                                    paddingHorizontal:30
                                }}>
                                <MaterialIcons name={'chevron-right'} size={30}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                flex:3,
                                flexWrap:"wrap",
                                justifyContent: 'space-between',
                            }}>
                                {this.state.Months.map((month, id) => (
                                    <DateComponent label={DateService.convertDateObjectToStringFormat(moment().month(month),'MMM')}
                                                   isActive={DateService.convertDateObjectToStringFormat(this.state.selectedDate,'MMM') === DateService.convertDateObjectToStringFormat(moment().month(month),'MMM')}
                                                   onPress={()=>{this.calculateMoths(month)}} width={WIDTH}/>
                                ))}
                            </View>

                        </View>
                    </Modal>
                </View>
                <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item
                        buttonColor="#9b59b6"
                        title="Income"
                        onPress={()=>{this.showAddOption('Income')}}>
                        <MaterialIcons name="account-balance" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#3498db"
                        title="Expenses"
                        onPress={()=>{this.showAddOption('Expenses')}}>
                        <MaterialIcons
                            name="shopping-cart"
                            style={styles.actionButtonIcon}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#1abc9c"
                        title="Savings"
                        onPress={()=>{this.showAddOption('Savings')}}>
                        <MaterialIcons name="account-balance-wallet" style={styles.actionButtonIcon} />
                    </ActionButton.Item>

                </ActionButton>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
    },
    actionButtonIcon: {
    },
});




