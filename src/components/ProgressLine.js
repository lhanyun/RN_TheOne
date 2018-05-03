import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class ProgressLine extends PureComponent {
  render() {
    let viewHeight = this.props.viewHeight ? this.props.viewHeight : 0;
	let progressWidth = this.props.progressWidth ? this.props.progressWidth : 0;
    return (
	  <LinearGradient
		colors={['#4c669f', '#3b5998', '#192f6a']}
		style={[styles.container, { height: viewHeight, borderRadius: viewHeight/2, }]}>
		<View style={[styles.viewStyle, { width: progressWidth, height: viewHeight, }]} />
	  </LinearGradient>
	);
  }
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
  },
  viewStyle: {
	borderBottomLeftRadius: 5,
	borderTopLeftRadius: 5,
	backgroundColor: '#e2e2e2'
  },
});