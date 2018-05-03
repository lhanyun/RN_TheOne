/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import * as projectAction from '../actions/ProjectAction';
import RefreshListView, { RefreshState } from '../components/RefreshListView';
import ProjectListCell from '../components/ProjectListCell';

// const navigateAction = NavigationActions.navigate({
//   routeName: 'RegisterPage',
// });
//
// const resetAction = NavigationActions.replace({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'LoginPage' }),
//   ],
// });

class ProjectList extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '项目列表',
    headerRight: <Button
      title="退出"
      clear
      titleStyle={{ color: 'white' }}
      onPress={() => {
        navigation.state.params.navigatePress();
	  }}
    />,
  });

  constructor(props) {
    super(props);
    this.isSelect = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.isSelect) {
	  this.isSelect = false;
	  const { routes } = this.props;
	  this.props.navigation.goBack(routes[1].key);
    }
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  componentDidMount() {
    this.props.navigation.setParams({ navigatePress: () => this.goBack() });
  }

  goBack() {
    this.isSelect = true;
    this.props.selectProject({ projectId: '123' });
  }

  onHeaderRefresh = () => {
    this.props.loadData(true);
  };

  onFooterRefresh = () => {
    if (this.props.refreshing !== RefreshState.FooterRefreshing) {
	  this.props.loadData(false);
    }
  };

  addTask = () => {

  };

  onPressItem = (id) => {
    alert(id);
  };

  render() {
	console.log('重新刷新了');
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <RefreshListView
          data={[{}]}
          keyExtractor={(item, index) => `${index}`}
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

  _renderItem = item => (
    <ProjectListCell
      onPress={() => this.onPressItem(item.index)}
    />
  );

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
  projectInfo: state.project.projectInfo,
  dataSource: state.home.dataSource,
  listStatus: state.home.status,
  refreshing: state.home.refreshing,
}), dispatch => ({
  selectProject: projectInfo => dispatch(projectAction.selectProject(projectInfo)),
  loadData: isHeader => dispatch(projectAction.loadData(isHeader)),
}))(ProjectList);

