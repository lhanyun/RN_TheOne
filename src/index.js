/**
 * Created by Roc on 2017/6/30.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Linking, DeviceEventEmitter } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from './store/createStore';
import AppWithNavigationState from './AppWithNavigationState';
import LinkRoutes from './LinkRoutes';

const { store, persistor } = createStore();
// const store = createStore();
export default class RnNavRedux extends Component {
  componentDidMount() {
    Linking.addEventListener('url', event => this.handleOpenURL(event.url));
    Linking.getInitialURL().then(url => url && this.handleOpenURL(url));

	this.listener = DeviceEventEmitter.addListener('REDUX_RESET', () => {
	  persistor.purge();
	  store.dispatch({
		type: 'RESET',
	  });
	});
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
	this.listener && this.listener.remove();
  }

  // deep linking
  handleOpenURL(url) {
    // const path = url.split('://')[1];
    // const action = Routers.router.getActionForPathAndParams(path, { id: 123 });
    // store.dispatch(action);
    const path = url.split(':/')[1];
    LinkRoutes(path, store);
  }

  render() {
    return (
      <Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
          <AppWithNavigationState />
		</PersistGate>
      </Provider>
    );
  }
}
