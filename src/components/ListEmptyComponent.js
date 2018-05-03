import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';

export default class ListEmptyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fheight: this.props.height,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
	  fheight: nextProps.height,
    });
  }

  render() {
    if (this.props.status === '-1') {
      return null;
	}
    const str = this.props.status === '0' ? '未查询到数据' : '请检测网络';
    const iconName = this.props.status === '0' ? 'user-secret' : 'unlink';
    const btnTitle = this.props.status === '0' ? (this.props.btnTitle || '刷新') : '刷新';
    return (
      <View style={[styles.container, { height: this.state.fheight }]} >
        <Icon name={iconName} color="#2196f3" size={100} />
        <Text style={styles.title}> {str} </Text>
        <Button
          title={btnTitle}
          clear
          titleStyle={{ color: '#2196f3' }}
          onPress={() => this.refreshData()}
        />
      </View>
    );
  }

  refreshData() {
    if (this.props.status === '0') {
	  if (this.props.doSomething instanceof Function) {
		this.props.doSomething();
	  } else {
		if (this.props.refreshData instanceof Function) {
		  this.props.refreshData();
		}
	  }
    } else if (this.props.status === '1') {
	  if (this.props.refreshData instanceof Function) {
		this.props.refreshData();
	  }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
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
