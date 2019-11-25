import React from 'react';
import {Dimensions, ScrollView, Text, TouchableOpacity, View, StyleSheet, ImageBackground, Alert} from 'react-native';
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
import GlobalService from '../../lib/service/globalService';
import firebase from 'react-native-firebase';

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
            Months:[0,1,2,3,4,5,6,7,8,9,10,11],
            currentMonth:0,
            currentYear:0,
            tips:[
                "b",
                "Get Paid What You're Worth and Spend Less Than You Earn.",
                "Allocate at Least 20% of Your Income Toward Financial Priorities",
                "Maximize Your Employment Benefits.",
                "Contribute to a Retirement Plan.",
                "Have a Savings Plan."
            ]
        };
        this.init();
        this.fetchExpensesAndIncome("Expenses");
        this.fetchExpensesAndIncome("Income");
        this.num = Math.floor((Math.random() * 5) + 1)
    }

    init = () => {
        Webservice.call({
            name: 'getByUserIdAndYearMonth?userId='+GlobalService.get('User').id+'&yearMonth='+this.state.selectedDate,
            method: "GET",
        }).then(response=>{
            this.categorize(response.data)
        }).catch(error=>{
            console.log(error)
        })
    }

    checkBalacnce= ()=>{
        Alert.alert(
            'Your Balance is low',
            'Use Location To Find near by atms',
            [
                {text: 'Ask me later', onPress: () => {}},
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
                {text: 'Go TO Locations', onPress: () => {this.props.navigation.navigate("Location")}},
            ],
            {cancelable: false},
        )
    }

    fetchExpensesAndIncome = (value) =>{
        Webservice.call({
            name: 'getAllByUserIdAndYearMonthAndCategory?userId='+GlobalService.get('User').id+'&yearMonth='+this.state.selectedDate+'&category='+value,
            method: "GET",
        }).then(response=>{
            if(response.ok){
                if(value==="Expenses") {
                    this.calculateExpense(response.data);
                }else if(value === "Income"){
                    this.calculateIncome(response.data);
                }
            }
        }).catch(error=>{
            console.log(error)
        })
    };

    createNotificationChannel = () => {
        const channel = new firebase.notifications.Android.Channel(
            'reminder',
            'Reminders Channel',
            firebase.notifications.Android.Importance.High
        ).setDescription('Used for getting reminder notification');

        firebase.notifications().android.createChannel(channel);
    };

    checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.notificationListener = firebase.notifications().onNotification(async notification => {
                await firebase.notifications().displayNotification(notification);
            });
        } else {
            try {
                await firebase.messaging().requestPermission();
            } catch (error) {
                Alert.alert(
                    'Unable to access the Notification permission. Please enable the Notification Permission from the settings'
                );
            }
        }
    };

    calculateIncome = (data) =>{
        let income=0;
        for(let i=0; i<data.length;i++) {
            income+=data[i].amount;
        }
        GlobalService.set("Income",income);
    };

    calculateExpense = (data)=>{
        let food=0;
        let transportation=0;
        let health=0;
        let rent =0;
        let education =0;
        let entertainment=0;
        let others=0;

        for(let i=0; i<data.length;i++){
            if(data[i].name ==='Food'){
                food+=data[i].amount;
            }else if(data[i].name === 'Transportation'){
                transportation+=data[i].amount;
            }else if(data[i].name === 'Health'){
                health+=data[i].amount;
            }else if(data[i].name === 'Rental and bills'){
                rent+=data[i].amount;
            }else if(data[i].name === 'Education'){
                education+=data[i].amount;
            }else if(data[i].name === 'Entertainment'){
                entertainment+=data[i].amount;
            }else if(data[i].name === 'Others'){
                others+=data[i].amount;
            }
        }
        let obj={
            food:food,
            transportation:transportation,
            health:health,
            rent:rent,
            education:education,
            entertainment:entertainment,
            others:others
        }
        GlobalService.set('Expenses',obj);
    };

    componentDidMount() {
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                this.init();
                this.fetchExpensesAndIncome("Expenses");
                this.fetchExpensesAndIncome("Income");
            },
        );
        this.createNotificationChannel();
        this.checkPermission();
    }

    componentWillUnmount() {
        this.didFocusListener.remove();
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
        if((income-expenses)<1000 && income !==0 && expenses !==0){
            this.checkBalacnce();
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
                        backgroundColor: '#2cb40e',
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
                <View style={{flex:1}}>
                    <ImageBackground source={require('../../assets/Home.jpg')}
                                     style={{width: "100%", height: "100%"}}>
                <ScrollView style={{}}>

                    <View style={{
                        marginHorizontal:10,
                        marginVertical:10,
                        backgroundColor: '#ddd',
                        padding:10,
                        borderRadius:5
                    }}>
                        <Text style={{
                            paddingBottom:6,
                            fontWeight:"bold"
                        }}>Tip of the day</Text>
                        <Text>{this.state.tips[this.num]}</Text>
                    </View>

                    <View style={{
                        backgroundColor: '#ddd',
                        marginHorizontal: 10,
                        marginVertical: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderRadius:5

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
                    </ImageBackground>
                </View>
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




