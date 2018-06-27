import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Container, Content, Button, Spinner, Form, Item, Input, Label, Toast } from 'native-base';
import { userLogin, userLoginChanged, userPasswordChanged } from '../actions';
import { BUTTONS_COLOR, TEXT_COLOR } from '../Config';


class UserLogin extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.toast !== '') {
            Toast.show(nextProps.toast);
        }
    }
    onLoginButtonPress() {
        this.props.userLogin();
    }
    onEmailChange(text) {
        this.props.userLoginChanged(text);
    }

    onPasswordChange(text) {
        this.props.userPasswordChanged(text);
    }
    onSignUpPress() {
        Actions.UserSignUp();
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner color='green' />;
        }
        return (
            <Button
                block
                style={styles.button}
                onPress={() => this.onLoginButtonPress()}
            >
                <Text
                    style={[styles.inputField, { fontWeight: 'bold' }]}
                >
                    LOGIN
                </Text>
            </Button>
        );
    }

    render() {
        return (
            <Container>
                <Content
                    contentContainerStyle={styles.container}
                    keyboardShouldPersistTaps='handled' ref={c => { this._content = c; }}>
                    <View style={styles.inputFieldsContainer}>
                        <Text style={styles.signInText}>
                            SIGN IN
                        </Text>
                        <Form>
                            <Item floatingLabel>
                                <Label style={styles.inputField}>Username</Label>
                                <Input
                                    style={styles.inputField}
                                    returnKeyType='next'
                                    //placeholder='Username'
                                    autoCorrect={false}
                                    //keyboardType='email-address'
                                    autoCapitalize='none'
                                    onChangeText={this.onEmailChange.bind(this)}
                                    value={this.props.login}
                                    onSubmitEditing={() => {
                                        this.passwordInput._root.focus();
                                    }}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label style={styles.inputField}>Password</Label>
                                <Input
                                    style={styles.inputField}
                                    secureTextEntry
                                    blurOnSubmit
                                    returnKeyType='done'
                                    getRef={(c) => this.passwordInput = c}
                                    //placeholder='Password'
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    onChangeText={this.onPasswordChange.bind(this)}
                                    value={this.props.password}
                                    onSubmitEditing={() => this.onLoginButtonPress()}
                                />
                            </Item>
                        </Form>
                    </View>
                    <View style={styles.buttonContainer}>
                        {this.renderButton()}
                        <View style={styles.signUpTextContainer}>
                            <Text style={styles.inputField}>
                                Don't have an account?
                            </Text>
                            <Text
                                style={styles.signUpText}
                                onPress={() => this.onSignUpPress()}
                            >
                                SIGN UP
                            </Text>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: 'white'
        },
        inputFieldsContainer: {
            flex: 1,
            justifyContent: 'flex-end',
            marginLeft: 30,
            marginRight: 30
        },
        signInText: {
            fontWeight: 'bold',
            color: TEXT_COLOR
        },
        inputField: {
            color: TEXT_COLOR
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'space-around',
            //alignItems: 'center',
            //backgroundColor: 'green'
        },
        button: {
            backgroundColor: BUTTONS_COLOR,
            marginLeft: 60,
            marginRight: 60
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
        }

    }
);

const mapStateToProps = (state) => {
    const { loading, login, password } = state.UserLogin;
    const { toast } = state.Service;

    return { loading, login, password, toast };
};

export default connect(mapStateToProps, { userLoginChanged, userPasswordChanged, userLogin })(UserLogin);
