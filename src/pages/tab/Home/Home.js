/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, DeviceEventEmitter, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import { Button } from 'react-native-elements';
import * as HomeAction from '../../../actions/HomeAction';
import RefreshListView, { RefreshState } from '../../../components/RefreshListView';

const resetAction = NavigationActions.replace({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'LoginPage' }),
  ],
});

class Home extends Component {
  static navigationOptions = {
    title: '任务列表',
    headerRight: <Button
      title="退出"
      clear
      titleStyle={{ color: 'white' }}
      onPress={() => {
        DeviceEventEmitter.emit('LOGIN_OUT');
	  }}
    />,
  };

  constructor(props) {
    super(props);
    this.state = {
	  fHeight: 0,
    };
  }

  componentDidMount() {
    // 监听退出登入
    this.listener = DeviceEventEmitter.addListener('LOGIN_OUT', () => {
	  DeviceEventEmitter.emit('REDUX_RESET');
	  const { routes } = this.props;
	  this.props.navigation.goBack(routes[1].key);
    });
    this.props.loadData();
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  onRefresh() {
    this.props.loadData();
  }

  onHeaderRefresh = () => {
    console.log('==========321');
    this.props.loadData(true);
  };

  onFooterRefresh = () => {
    if (this.props.refreshing !== RefreshState.FooterRefreshing) {
	  console.log('==========123');
	  this.props.loadData(false);
    }
  };

  addTask = () => {

  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <RefreshListView
          data={this.props.dataSource}
		  // keyExtractor={this.keyExtractor}
          renderItem={this._renderItem}
          refreshState={this.props.refreshing}
          onHeaderRefresh={this.onHeaderRefresh}
          doSomething={this.addTask}
          onFooterRefresh={this.onFooterRefresh}
          btnTitle="去添加"
        />
      </View>
    );
  }

  _renderItem = (item) => {
    const txt = `第${item.index}个` + ` title=${item.key}`;
    const swipeoutBtns = [
	  {
        text: '删除',
        backgroundColor: 'red',
        onPress: () => {
		  alert(item.index);
        },
	  },
    ];
    return (
      <Swipeout
        right={swipeoutBtns}
        rowID={item.index}
        sectionID={item.index}
      >
        <View style={{ height: 300 }}>
          <Text>{txt}</Text>
        </View>
      </Swipeout>
    );
  };

  refreshData() {
    alert('刷新');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default connect(state => ({
  routes: state.nav.routes,
  dataSource: state.home.dataSource,
  listStatus: state.home.status,
  refreshing: state.home.refreshing,
}), dispatch => ({
  loadData: isHeader => dispatch(HomeAction.loadData(isHeader)),
}))(Home);

