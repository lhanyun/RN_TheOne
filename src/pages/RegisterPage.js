/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Sae } from 'react-native-textinput-effects';
import { Button, Text } from 'react-native-elements';
import Toast, { DURATION } from 'react-native-easy-toast';

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.userName = '';
    this.password = '';
    this.email = '';
    this.confirmationPassword = '';
    this.phoneNum = '';
    this.state = {
	  loading: false,
    };
  }
  componentDidMount() {

  }

  componentWillUnmount() {

  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          icon={
            <Icon
              name="ios-arrow-back-outline"
              size={24}
              color="#333333"
            />
          }
          title=""
          onPress={() => this.goback()}
          buttonStyle={{
            width: 50,
            height: 50,
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 0 : -10,
            left: 0,
          }}
          clear
        />
        <Text h1 style={{ alignSelf: 'center', marginBottom: 20 }}>注册</Text>
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
            label="请填写邮箱"
            labelStyle={{ color: '#e7e7e7' }}
            iconClass={Icon}
            iconName="md-create"
            iconColor="#333333"
            inputStyle={{ color: '#333333' }}
            onChangeText={(text) => { this.email = text; }}
          />
          <Sae
            label="请填写手机号码"
            labelStyle={{ color: '#e7e7e7' }}
            iconClass={Icon}
            iconName="md-create"
            iconColor="#333333"
            inputStyle={{ color: '#333333' }}
            onChangeText={(text) => { this.phoneNum = text; }}
          />
          <Sae
            label="请填写密码"
            labelStyle={{ color: '#e7e7e7' }}
            iconClass={Icon}
            iconName="md-create"
            iconColor="#333333"
            inputStyle={{ color: '#333333' }}
            secureTextEntry
            onChangeText={(text) => { this.password = text; }}
          />
          <Sae
            label="请再次填写密码"
            labelStyle={{ color: '#e7e7e7' }}
            iconClass={Icon}
            iconName="md-create"
            iconColor="#333333"
            inputStyle={{ color: '#333333' }}
            secureTextEntry
            onChangeText={(text) => { this.confirmationPassword = text; }}
          />
        </View>
        <View style={{ paddingTop: 40, paddingHorizontal: 40 }}>
          <Button
            loading={this.state.loading}
            title="注册"
            containerStyle={{ flex: -1 }}
            buttonStyle={styles.signUpButton}
            titleStyle={styles.signUpButtonText}
            onPress={() => this.doRegister()}
            disabled={this.state.loading}
          />
        </View>
        <Toast ref="toast" />
      </View>
    );
  }

  doRegister() {
    if (this.validateUsername(this.userName)
      && this.validateEmail(this.email)
      && this.validatePhoneNum(this.phoneNum)
      && this.validatePassword(this.password)
      && this.validateConfirmationPassword(this.password, this.confirmationPassword)) {
      this.setState({
        loading: true,
      });
    }
  }

  goback() {
    this.props.navigation.goBack();
    // this.props.closeModal();
  }

  validateUsername(username) {
    const usernameValid = username.length > 0;
    usernameValid || this.refs.toast.show('账号不能为空');
    return usernameValid;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    emailValid || this.refs.toast.show('输入的邮箱格式不正确');
    return emailValid;
  }

  validatePassword(password) {
    const passwordValid = password.length >= 8;
    passwordValid || this.refs.toast.show('密码必须大于8位');
    return passwordValid;
  }

  validateConfirmationPassword(password, confirmationPassword) {
    const confirmationPasswordValid = password === confirmationPassword;
    confirmationPasswordValid || this.refs.toast.show('两次输入的密码不相同');
    return confirmationPasswordValid;
  }

  validatePhoneNum(phoneNum) {
    const re = /^[1][3,4,5,7,8][0-9]{9}$/;
    const phoneNumValid = re.test(phoneNum);
    phoneNumValid || this.refs.toast.show('手机号码格式不正确');
    return phoneNumValid;
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

// export default connect(state => ({
//   routes: state.nav.routes,
// }), dispatch => ({}))(RegisterPage);

