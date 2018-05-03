import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressLine from './ProgressLine';

export default class ProjectListCell extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPress()}
      >
        <View style={styles.cell_container}>
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>这是第一个项目asdfasdfasdfasdfasdfadasdfadsf</Text>
          <Text style={styles.description}>项目进度：</Text>
		  <Text style={[styles.description, {paddingBottom: 4}]}>项目人数：</Text>
		  <ProgressLine
			viewHeight={10}
			progressWidth={100}
		  />
		  <View style={styles.cell_time}>
			<Text style={styles.description}>开始时间：</Text>
			<Text style={styles.description}>结束时间：</Text>
		  </View>
		  <View style={styles.detailBtn}>
			<Text style={styles.description}>查看详情 </Text>
			<Icon name="ios-arrow-round-forward-outline" color="#757575" size={25} />
		  </View>
        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },
  description: {
    fontSize: 15,
    marginVertical: 4,
    color: '#757575',

  },
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 3,
    borderWidth: 0.5,
    borderColor: '#dddddd',
    borderRadius: 2,

    // iOS阴影设置
    shadowColor: 'gray',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,

    // Android阴影设置
    elevation: 2,
  },
  cell_time: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailBtn: {
    marginTop: 10,
    flexDirection: 'row',
	alignItems: 'center',
	alignSelf: 'flex-end',
  },
});
