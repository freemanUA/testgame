import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, Picker } from 'react-native';
import {
    Body,
    Button,
    Container,
    Header,
    Icon,
    Item,
    Label,
    Left,
    Right,
    Spinner,
    Title, Toast
} from 'native-base';
import { BUTTONS_COLOR, TEXT_COLOR } from '../Config';
import { createGame } from '../actions';

const stakesData = [
    { name: '1k - 2k', minLimitStakes: 1000, maxLimitStakes: 2000 },
    { name: '2k - 4k', minLimitStakes: 2000, maxLimitStakes: 4000 },
    { name: '5k - 10k', minLimitStakes: 5000, maxLimitStakes: 10000 },
    { name: '10k - 20k', minLimitStakes: 10000, maxLimitStakes: 20000 },

];
const playersQuantity = [{
    value: 1, key: '1' }, { value: 2, key: '2' }, { value: 3, key: '3' }, { value: 4, key: '4' }, { value: 5, key: '5' },
    { value: 6, key: '6' }, { value: 7, key: '7' }, { value: 8, key: '8' }, { value: 9, key: '9' }
    ];

class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stakes: stakesData[0],
            playersNum: 1
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast !== '') {
            Toast.show(nextProps.toast);
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner color='green' />;
        }
        return (
            <Button
                block
                style={styles.button}
                onPress={() => this.props.createGame(this.state)}
            >
                <Text
                    style={styles.buttonText}
                >
                    CREATE
                </Text>
            </Button>
        );
    }


    render() {
        const stakesItems = stakesData.map((item) => {
            return (
                <Picker.Item key={item.name} label={item.name} value={item} />
            );
        });
        const playersItems = playersQuantity.map((item) => {
            return (
                <Picker.Item key={item.key} label={item.key} value={item.value} />
            );
        });
        return (
            <Container
                contentContainerStyle={styles.container}
            >
                <Header style={{ backgroundColor: 'white' }}>
                    <Left />
                    <Body>
                        <Title
                            style={styles.headerText}
                        >
                            CREATE GAME
                        </Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => Actions.Lobby()}>
                            <Icon
                                name="ios-close"
                                style={styles.icon}
                            />
                        </Button>
                    </Right>
                </Header>
                <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'space-between' }}>
                    <View>
                        <Item
                            style={{ paddingTop: 8, paddingBottom: 8 }}
                        >
                            <Label style={{ marginLeft: 10, width: 100 }}>
                                Stakes
                            </Label>
                            <Body>
                                <Picker
                                    iosHeader="Select"
                                    headerBackButtonText='Back'
                                    style={{ width: 100, height: 40 }}
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    mode="dropdown"
                                    placeholder="Stakes"
                                    selectedValue={this.state.stakes}
                                    onValueChange={(value) => this.setState({ stakes: value })}
                                >
                                    {stakesItems}
                                </Picker>
                            </Body>
                        </Item>
                        <Item
                            style={{ paddingTop: 8, paddingBottom: 8 }}
                        >
                            <Label style={{ marginLeft: 10, width: 100 }}>
                                Max Players
                            </Label>
                            <Body>
                                <Picker
                                    iosHeader="Select"
                                    headerBackButtonText='Back'
                                    style={{ width: 100, height: 40 }}
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    mode="dropdown"
                                    placeholder="Quantity"
                                    selectedValue={this.state.playersNum}
                                    onValueChange={(value) => this.setState({ playersNum: value })}
                                >
                                    {playersItems}
                                </Picker>
                            </Body>
                        </Item>
                    </View>
                    <View>
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
        },
        icon: {
            fontSize: 45,
            color: TEXT_COLOR
        },
        headerText: {
            color: TEXT_COLOR,

        },
        button: {
            backgroundColor: BUTTONS_COLOR,
            marginLeft: 60,
            marginRight: 60,
            marginTop: 30,
            marginBottom: 30
        },
        buttonText: {
            color: TEXT_COLOR,
            fontWeight: 'bold'
        },
    }
);

const mapStateToProps = (state) => {
    const { toast } = state.Service;
    const { loading } = state.Game;

    return { toast, loading };
};

export default connect(mapStateToProps, { createGame })(CreateGame);
