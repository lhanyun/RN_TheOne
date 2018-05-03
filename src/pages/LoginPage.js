/**
 * Sample React Native LoginPage
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Platform, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Sae } from 'react-native-textinput-effects';
import { Button, Text } from 'react-native-elements';
import Toast, { DURATION } from 'react-native-easy-toast';
import * as loginAction from '../actions/loginAction';
import RegisterPage from './RegisterPage';
import ProjectList from './ProjectList';

const modalAction = NavigationActions.navigate({ routeName: 'MainRouters' });
const projectAction = NavigationActions.navigate({ routeName: 'ProjectRouters' });
const registerPage = NavigationActions.navigate({ routeName: 'RegisterPage' });

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.userName = '';
    this.password = '';
    this.state = {
	  loading: false,
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    if (this.props.status === '登陆成功' && this.props.isSuccess && this.props.projectInfo !== null) {
      this.props.navigation.dispatch(modalAction);
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.routes.length === 1) { // 先判断LoginPage是否是根页面
	//   if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
  //       if (this.state.loading) { // 判断是否点击了登入按钮，已跳转项目列表页面
	// 	  this.setState({
  //           loading: false,
	// 	  });
	// 	  this.props.navigation.dispatch(projectAction);
  //       } else if (nextProps.projectInfo !== null) { // 判断是否跳转到主页
	// 	  this.props.navigation.dispatch(modalAction);
  //       }
	//   }
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
	if (this.props.routes.length === 1) { // 先判断LoginPage是否是根页面
	  if (nextProps.status === '登陆成功' && nextProps.isSuccess) {
		if (this.state.loading) { // 判断是否点击了登入按钮，已跳转项目列表页面
		  this.setState({
			loading: false,
		  });
		  this.props.navigation.dispatch(projectAction);
		  return false;
		} else if (nextProps.projectInfo !== null) { // 判断是否跳转到主页
		  this.props.navigation.dispatch(modalAction);
		  return false;
		}
		return true;
	  }
	  return true;
	}
	return true;
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  onBackAndroid = () => {
    const { routes } = this.props;
    if (routes.length > 1) {
      this.props.navigation.dispatch(NavigationActions.back());
      return true;
    }
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    this.refs.toast.show('再按一次退出应用');
    return true;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text h1 style={{ alignSelf: 'center', marginBottom: 40 }}>Welcome</Text>
        <View style={{ paddingHorizontal: 50 }}>
          <Sae
            label="请填写账号"
            labelStyle={{ color: '#e7e7e7' }}
            iconClass={Icon}
            iconName="md-create"
            iconColor="#333333"
            inputStyle={{ color: '#333333' }}
            onChangeText={(text) => { this.userName = text; }}
          />
          <Sae
            label="请填写密码"
            labelStyle={{ color: '#e7e7e7' }}
            iconClass={Icon}
            iconName="md-create"
            iconColor="#333333"
            inputStyle={{ color: '#333333' }}
            onChangeText={(text) => { this.password = text; }}
            secureTextEntry
          />
        </View>
        <View style={{ paddingTop: 60, paddingHorizontal: 40 }}>
          <Button
            loading={this.state.loading}
            title="登入"
            containerStyle={{ flex: -1 }}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={() => this.doLogin()}
            disabled={this.state.loading}
          />
          <Button
            title="创建账号"
            clear
            titleStyle={{ color: '#2196f3' }}
            containerStyle={{ marginTop: 20 }}
            onPress={() => this.toRegister()}
          />
        </View>
        <Toast ref="toast" />
      </View>
    );
  }

  doLogin() {
    if (this.validateUsername(this.userName) && this.validatePassword(this.password)) {
	  this.setState({
        loading: true,
      });
	  const { login } = this.props;
	  login();
    }
  }

  toRegister() {
    this.props.navigation.navigate('RegisterPage');
  }

  validateUsername(username) {
    const usernameValid = username.length > 0;
    usernameValid || this.refs.toast.show('账号不能为空');
    return usernameValid;
  }

  validatePassword(password) {
    const passwordValid = password.length >= 8;
    passwordValid || this.refs.toast.show('密码必须大于8位');
    return passwordValid;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  signUpButton: {
    borderRadius: 50,
    height: 45,
    marginHorizontal: 10,
  },
  signUpButtonText: {
    fontSize: 15,
  },
});

export default connect(
  state => ({
    status: state.loginIn.status,
    isSuccess: state.loginIn.isSuccess,
    user: state.loginIn.user,
    routes: state.nav.routes,
    projectInfo: state.project.projectInfo,
  }),
  dispatch => ({
    login: () => dispatch(loginAction.login()),
  }),
)(LoginPage);

