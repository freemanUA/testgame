import React, { Component } from 'react';
import { Text, View, StyleSheet, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import {
    Container,
    Content,
    Button,
    Spinner,
    Form,
    Item,
    Input,
    Label,
    Header,
    Body,
    Title,
    Left,
    Icon, Right, Toast
} from 'native-base';
import DeviceInfo from 'react-native-device-info';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import { BUTTONS_COLOR, TEXT_COLOR } from '../Config';
import { userSignUp } from '../actions/UserSignUpActions';


class UserSignUp extends Component {
    constructor(props) {
        super(props);
        const userLocaleCountryCode = DeviceInfo.getDeviceCountry();
        //console.log(userLocaleCountryCode);
        const userCountryData = getAllCountries();
        //console.log(userCountryData);

        this.state = {
            cca2: userLocaleCountryCode,
            phoneNumber: `+${userCountryData.find(el => el.cca2 === userLocaleCountryCode).callingCode}`,
            ETHAccount: '',
            username: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            country: userCountryData.find(el => el.cca2 === userLocaleCountryCode).name.common,
            birthday: ''

        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.toast !== '') {
            Toast.show(nextProps.toast);
        }
    }
    onConfirmButtonPress() {
        this.props.userSignUp(this.state);
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner color='green' />;
        }
        return (
            <Button
                block
                style={styles.button}
                onPress={() => this.onConfirmButtonPress()}
            >
                <Text
                    style={[styles.inputField, { fontWeight: 'bold' }]}
                >
                    CONFIRM
                </Text>
            </Button>
        );
    }

    render() {
        return (
            <Container
                contentContainerStyle={styles.container}
            >
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon
                                name="ios-arrow-round-back"
                                style={styles.icon}
                            />
                        </Button>
                    </Left>

                    <Body>
                        <Title
                            style={styles.headerText}
                        >
                            CREATE ACCOUNT
                        </Title>
                    </Body>
                    <Right />
                </Header>
                <Content
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='handled'
                >
                        <Form style={styles.form}>
                            <Item floatingLabel>
                                <Label style={styles.inputField}>ETH Account</Label>
                                <Input
                                    style={styles.inputField}
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.setState({ ETHAccount: text })}
                                    value={this.state.ETHAccount}
                                    onSubmitEditing={() => {
                                        this.SecondInput._root.focus();
                                    }}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label style={styles.inputField}>Username</Label>
                                <Input
                                    style={styles.inputField}
                                    blurOnSubmit={false}
                                    returnKeyType='next'
                                    getRef={(c) => this.SecondInput = c}
                                    //placeholder='Password'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.setState({ username: text })}
                                    value={this.state.username}
                                    onSubmitEditing={() => {
                                        this.ThirdInput._root.focus();
                                    }}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label style={styles.inputField}>Password</Label>
                                <Input
                                    style={styles.inputField}
                                    secureTextEntry
                                    blurOnSubmit={false}
                                    returnKeyType='next'
                                    getRef={(c) => this.ThirdInput = c}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.setState({ password: text })}
                                    value={this.state.password}
                                    onSubmitEditing={() => {
                                        this.ForthInput._root.focus();
                                    }}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label style={styles.inputField}>Confirm Password</Label>
                                <Input
                                    style={styles.inputField}
                                    secureTextEntry
                                    blurOnSubmit={false}
                                    returnKeyType='next'
                                    getRef={(c) => this.ForthInput = c}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                                    value={this.state.confirmPassword}
                                    onSubmitEditing={() => {
                                        this.FifthInput._root.focus();
                                    }}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label style={styles.inputField}>Full Name</Label>
                                <Input
                                    style={styles.inputField}
                                    blurOnSubmit={false}
                                    returnKeyType='next'
                                    getRef={(c) => this.FifthInput = c}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.setState({ fullName: text })}
                                    value={this.state.fullName}
                                    onSubmitEditing={() => {
                                        this.SixthInput._root.focus();
                                    }}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label style={styles.inputField}>E-mail</Label>
                                <Input
                                    style={styles.inputField}
                                    blurOnSubmit
                                    returnKeyType='done'
                                    getRef={(c) => this.SixthInput = c}
                                    keyboardType='email-address'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.setState({ email: text })}
                                    value={this.state.email}
                                />
                            </Item>

                            <Text style={[styles.inputField, { fontSize: 17, marginLeft: 15 }]}>
                                Country
                            </Text>

                            <View style={{ flexDirection: 'row', marginLeft: 15, borderBottomColor: '#D9D5DC', borderBottomWidth: 0.66666 }}>
                                <CountryPicker
                                    onChange={value => {
                                        console.log(value);
                                        this.setState({
                                            cca2: value.cca2,
                                            phoneNumber: `+${value.callingCode}`,
                                            country: value.name
                                        });
                                    }}
                                    cca2={this.state.cca2}
                                    translation="eng"
                                    filterable
                                />
                                <Text style={styles.inputContainer}>press on the flag to change</Text>
                            </View>
                            <View
                                style={{
                                    borderBottomColor: '#D9D5DC',
                                    borderBottomWidth: 0.66666
                            }}
                            >
                                <Text style={[styles.inputField, { fontSize: 17, marginLeft: 15 }]}>
                                    Date of birth
                                </Text>
                                <DatePicker
                                    showIcon={false}
                                    style={{ width: 120, marginRight: 10 }}
                                    date={this.state.birthday}
                                    mode="date"
                                    placeholder="Select date"
                                    format="MM/DD/YYYY"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0
                                        }
                                    }}
                                    onDateChange={(date) => this.setState({ birthday: date })}
                                />
                            </View>
                            <Item floatingLabel>
                                <Label style={styles.inputField}>Phone number</Label>
                                <Input
                                    style={[styles.inputField, { width: 20 }]}
                                    maxLength={13}
                                    blurOnSubmit
                                    keyboardType='number-pad'
                                    returnKeyType='done'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.setState({ phoneNumber: text })}
                                    value={this.state.phoneNumber}
                                />
                            </Item>
                        </Form>
                        {this.renderButton()}
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'white'
        },
        headerText: {
            fontSize: 14,
            color: TEXT_COLOR
        },
        icon: {
            color: TEXT_COLOR
        },
        signInText: {
            fontWeight: 'bold',
            color: TEXT_COLOR
        },
        inputField: {
            color: TEXT_COLOR
        },
        buttonContainer: {
            justifyContent: 'space-around',
        },
        button: {
            backgroundColor: BUTTONS_COLOR,
            marginLeft: 60,
            marginRight: 60,
            marginTop: 30
        },
        signUpTextContainer: {
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-around'
        },
        signUpText: {
            fontWeight: 'bold',
            padding: 3,
            color: TEXT_COLOR
        },
        form: {
            marginLeft: 30,
            marginRight: 30
        },
        data: {
            padding: 15,
            marginLeft: 30,
            backgroundColor: '#ddd',
            borderColor: '#888',
            borderWidth: 1 / PixelRatio.get(),
            color: '#777'
        },
        inputContainer: {
            height: 50,
            paddingTop: 3,
            paddingBottom: 7,
            paddingLeft: 15,
            borderBottomColor: '#888',
            borderBottomWidth: 1 / PixelRatio.get(),
        }
    }
);


const mapStateToProps = (state) => {
    const { toast } = state.Service;
    const { loading } = state.UserSignUp;

    return { toast, loading };
};

export default connect(mapStateToProps, { userSignUp })(UserSignUp);
