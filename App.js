import React, { Component } from 'react';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';
import Router from './src/Router';

const store = createStore(
    reducers,
    undefined,
    composeWithDevTools(applyMiddleware(ReduxThunk)
    )
);

export default class App extends Component<{}> {
    render() {
        return (
            <Root>
                <Provider store={store} >
                        <Router />
                </Provider>
            </Root>
        );
    }
}
