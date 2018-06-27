import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    Body,
    Button,
    Container,
    Header, Icon, Left, Right,
    Spinner,
    Title,
    Toast
} from 'native-base';
import { BUTTONS_COLOR, TEXT_COLOR } from '../Config';
import { createGame, gameChoosed, getGames, logout } from '../actions';


class Lobby extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.toast !== '') {
            Toast.show(nextProps.toast);
        }
    }

    renderButton() {
        // if (this.props.loading) {
        //     return <Spinner color='green' />;
        // }
        return (
            <Button
                block
                style={styles.button}
                onPress={() => Actions.CreateGame()}
            >
                <Text
                    style={styles.buttonText}
                >
                    CREATE GAME
                </Text>
            </Button>
        );
    }

    render() {
        if (this.props.loading) {
            return <Spinner color='green' />;
        }
        return (
            <Container contentContainerStyle={styles.container}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left />
                    <Body>
                        <Title style={styles.headerText}>
                            {this.props.user.balance} coins
                        </Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.logout()}>
                            <Icon
                                name="ios-close"
                                style={styles.icon}
                            />
                        </Button>
                    </Right>
                </Header>
                <FlatList
                    keyExtractor={(item, index) => `${index}`}
                    contentContainerStyle={{ backgroundColor: 'white' }}
                    data={this.props.games || []}
                    refreshing={false}
                    onRefresh={() => this.props.getGames()}
                    extraData={{}}
                    renderItem={(item) => {
                        //console.log(item);
                        const { name, limitPlayers, joinPlayers, minLimitStakes, maxLimitStakes } = item.item;
                        return (
                            <View style={styles.listContainer}>
                                <TouchableOpacity
                                    onPress={() => this.props.gameChoosed(item.item)}
                                >
                                        <Text style={{ textAlign: 'center', marginTop: 5 }}>
                                            {name}
                                        </Text>
                                    <View style={styles.listRow}>
                                        <Text>
                                            Stakes: {`${minLimitStakes / 1000}k - ${maxLimitStakes / 1000}k`}
                                        </Text>
                                        <Text>
                                            {`Players: ${joinPlayers.length}/${limitPlayers}`}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
                <View style={{ backgroundColor: 'white' }}>
                    {this.renderButton()}
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
        icon: {
            fontSize: 45,
            color: TEXT_COLOR
        },
        listRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 5,
            marginRight: 5
        },
        listContainer: {
            borderBottomWidth: 1,
            borderBottomColor: TEXT_COLOR,
            borderTopColor: TEXT_COLOR,
            borderTopWidth: 1,
            marginLeft: 20,
            marginRight: 20
        }

    }
);

const mapStateToProps = (state) => {
    const { games, loading } = state.Game;
    const { toast } = state.Service;
    const { user } = state.User;

    return { games, toast, user, loading };
};

export default connect(mapStateToProps, { gameChoosed, createGame, getGames, logout })(Lobby);
