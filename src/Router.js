import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import UserLogin from './screens/UserLogin';
import UserSignUp from './screens/UserSignUp';
import Terms from './screens/Terms';
import RegistrationComplete from './screens/RegistrationComplete';
import Lobby from './screens/Lobby';
import CreateGame from './screens/CreateGame';
import JoinGame from './screens/JoinGame';

const RouterComponent = () => {
    return (
        <Router>
            <Scene>
                <Scene
                    //initial
                    hideNavBar
                    key="UserSignUp"
                    component={UserSignUp}
                    //type={ActionConst.RESET}
                />
                <Scene
                    initial
                    hideNavBar
                    key="UserLogin"
                    component={UserLogin}
                    type={ActionConst.RESET}
                />

                <Scene
                    //initial
                    hideNavBar
                    key="Terms"
                    component={Terms}
                    //type={ActionConst.RESET}
                />
                <Scene
                    //initial
                    hideNavBar
                    key="RegistrationComplete"
                    component={RegistrationComplete}
                    type={ActionConst.RESET}
                />
                <Scene
                    //initial
                    hideNavBar
                    key="Lobby"
                    component={Lobby}
                    type={ActionConst.RESET}
                />
                <Scene
                    //initial
                    hideNavBar
                    key="CreateGame"
                    component={CreateGame}
                    //type={ActionConst.RESET}
                />
                <Scene
                    //initial
                    hideNavBar
                    key="JoinGame"
                    component={JoinGame}
                    type={ActionConst.RESET}
                />
            </Scene>
        </Router>
    );
};
export default RouterComponent;
