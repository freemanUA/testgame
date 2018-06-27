import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Body, Button, Container, Content, Header, Icon, Left, Right, Spinner, Title } from 'native-base';
import { BUTTONS_COLOR, TEXT_COLOR } from '../Config';
import { acceptTermsPressed } from '../actions/UserSignUpActions';
import { startPlayingPressed } from '../actions';

class RegistrationComplete extends Component {

    renderButton() {
        if (this.props.loading) {
            return <Spinner color='green' />;
        }
        return (
            <Button
                block
                style={styles.button}
                onPress={() => this.props.startPlayingPressed()}
            >
                <Text
                    style={styles.buttonText}
                >
                    START PLAYING
                </Text>
            </Button>
        );
    }

    render() {
        return (
            <Container
                contentContainerStyle={styles.container}
            >
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
                        <Text style={styles.upperText}>CONGRATULATIONS</Text>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.upperText}>You have successfully created an</Text>
                        <Text style={styles.upperText}>account with 100K of free coins</Text>
                    </View>
                    <View style={styles.upperContainer}>
                        {this.renderButton()}
                    </View>

                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            backgroundColor: 'white',
            flex: 1
        },
        upperContainer: {
            flex: 1,
            justifyContent: 'center'
        },
        upperText: {
            color: TEXT_COLOR,
            fontSize: 20,
            alignSelf: 'center'
        },
        button: {
            backgroundColor: BUTTONS_COLOR,
            marginLeft: 60,
            marginRight: 60,
            marginTop: 30
        },
        buttonText: {
            color: TEXT_COLOR,
            fontWeight: 'bold'
        },
        middleText: {
            color: TEXT_COLOR,
            //fontSize: 20,
            alignSelf: 'center'
        }

    }
);

export default connect(null, { startPlayingPressed })(RegistrationComplete);
