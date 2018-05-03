/**
 * Created by Roc on 2017/6/13.
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../pages/tab/Home/Home';
import Chat from '../pages/tab/Chat/Chat';
import Mine from '../pages/tab/Mine/Mine';
// import LoginPage from '../pages/LoginPage';
// import RegisterPage from '../pages/RegisterPage';


const tabOpts = (tabLabel, defaultIcon, activeIcon) => {
  const opt = {
    tabBarLabel: tabLabel,
    // headerTitle: tabLabel,
    headerBackTitle: null,
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerStyle: { backgroundColor: '#000' },
    tabBarIcon: ({ tintColor, focused }) => (
      focused ? <Icon name={activeIcon} color="#2196f3" size={25} /> : <Icon name={defaultIcon} color="#999999" size={25} />
    ),
  };
  return opt;
};

const TabBar = TabNavigator({
  Home: {
    screen: Home, navigationOptions: tabOpts('首页', 'ios-home-outline', 'ios-home'),
  },
  Discover: {
    screen: Chat, navigationOptions: tabOpts('聊天', 'ios-people-outline', 'ios-people'),
  },
  Profile: {
    screen: Mine, navigationOptions: tabOpts('我的', 'ios-options', 'ios-options-outline'),
  },
}, {
  animationEnabled: false, // 切换页面时不显示动画
  tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
  swipeEnabled: false, // 禁止左右滑动
  backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
  tabBarOptions: {
    activeTintColor: '#2196f3',
    inactiveTintColor: '#999999',
    upperCaseLabel: false,
    showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
    indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    style: {
      backgroundColor: '#f5f5f5',
      height: 49,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#e6e6e6',
    },
    labelStyle: {
      fontSize: 14,
      margin: 0,
      padding: 0,
    },
    tabStyle: {
      paddingTop: 4,
    },
  },
});

export default TabBar;

