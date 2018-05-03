/**
 * Created by Roc on 2017/7/4.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import Routers from './routers';

createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');
class AppWithNavigationState extends Component {
  render() {
    const { dispatch, nav } = this.props;
    return (
      <Routers
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
        screenProps={{ themeColor: '#2196f3', headerTitleColor: 'white', headerTintColor: 'white' }}
      />
    );
  }
}

export default connect(state => ({ nav: state.nav }))(AppWithNavigationState);
