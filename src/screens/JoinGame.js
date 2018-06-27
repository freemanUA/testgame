import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { FlatList, StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import { Body, Button, Container, Header, Icon, Left, Right, Title, Toast } from 'native-base';
import { BUTTONS_COLOR, TEXT_COLOR } from '../Config';
import { getGame, joinGame, leaveGame, sendToast } from '../actions';


class JoinGame extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast !== '') {
            Toast.show(nextProps.toast);
        }
    }

    FlatListData() {
        const { limitPlayers, joinPlayers } = this.props.choosedGame;

        const data = [];
        for (let i = 0; i < limitPlayers; i++) {
            //console.log(joinPlayers[i]);
            data.push({
                userName: joinPlayers[i] !== undefined ? joinPlayers[i].userName : 'Tap to seat'
            });
        }
        return data;
    }
    isUserInGame() {
        const { id } = this.props.user;
        const { joinPlayers } = this.props.choosedGame;
        if (joinPlayers === undefined) return false;
        const index = joinPlayers.findIndex(x => x._id === id);
        console.log(id, joinPlayers, index);
        if (index !== -1) return true;
        return false;
    }
    handleCloseAction() {
        if (this.isUserInGame()) {
            this.props.leaveGame();
        } else {
            Actions.Lobby();
        }
    }
    render() {
        return (
            <Container contentContainerStyle={styles.container}>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left />
                    <Body>
                        <Title
                            style={styles.headerText}
                        >
                            JOIN GAME
                        </Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.handleCloseAction()}>
                            <Icon
                                name="ios-close"
                                style={styles.icon}
                            />
                        </Button>
                    </Right>
                </Header>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <FlatList
                        keyExtractor={(item, index) => `${index}`}
                        contentContainerStyle={{ backgroundColor: 'white' }}
                        ListHeaderComponent={() => {
                            //console.log(this.props.choosedGame);
                            if (Object.keys(this.props.choosedGame).length === 0) return null;
                            const { minLimitStakes, maxLimitStakes, joinPlayers, limitPlayers } = this.props.choosedGame;
                            return (
                                <View>
                                    <Text style={styles.flatlistHeaderText}>
                                        Stakes: {`${minLimitStakes / 1000}k - ${maxLimitStakes / 1000}k`}
                                    </Text>
                                    <Text style={[styles.flatlistHeaderText, { marginLeft: 35 }]}>
                                    {`Players: ${joinPlayers.length}/${limitPlayers}`}
                                    </Text>
                                </View>
                            );
                        }}
                        data={this.FlatListData()}
                        refreshing={false}
                        onRefresh={() => this.props.getGame(this.props.choosedGame._id || this.props.choosedGame.id)}
                        renderItem={(item) => {
                            //console.log(item);
                            const { userName } = item.item;
                            if (userName === 'Tap to seat') {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                        if (!this.isUserInGame()) {
                                            this.props.joinGame(this.props.choosedGame._id);
                                        } else {
                                            this.props.sendToast({
                                                type: 'warning',
                                                text: 'You are already in the game - have fun!',
                                                position: 'bottom',
                                                buttonText: 'Okay',
                                                duration: 5000,
                                                textStyle: { textAlign: 'center' }
                                            });
                                        }
                                    }}
                                    >
                                        <View style={styles.listContainer}>
                                            <View style={styles.emptyAvatar} />
                                            <View style={styles.userNameContainer}>
                                                <Text style={styles.userName}>{userName}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }
                            return (
                                <View style={styles.listContainer}>
                                    <View style={styles.avatar} />
                                    <View style={styles.userNameContainer}>
                                        <Text style={styles.userName}>{userName}</Text>
                                    </View>
                                </View>
                            );
                        }}
                    />
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
        listContainer: {
            flexDirection: 'row',
            margin: 10,
            marginLeft: 30

        },
        avatar: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: TEXT_COLOR
        },
        emptyAvatar: {
            width: 60,
            height: 60,
            borderRadius: 30,
            borderColor: TEXT_COLOR,
            borderWidth: 1
        },
        flatlistHeaderText: {
            marginTop: 30,
            marginLeft: 30
        },
        userName: {

        },
        userNameContainer: {
            justifyContent: 'center',
            marginLeft: 10
        }
    }
);
const mapStateToProps = (state) => {
    const { choosedGame, loading } = state.Game;
    const { toast } = state.Service;
    const { user } = state.User;

    return { choosedGame, toast, user, loading };
};

export default connect(mapStateToProps, { joinGame, sendToast, leaveGame, getGame })(JoinGame);
