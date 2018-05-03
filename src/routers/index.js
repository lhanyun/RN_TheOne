/**
 * Created by Roc on 2017/6/13.
 */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TabBar from './TabBar';
import App from '../../App';
import ProjectList from '../pages/ProjectList';
// import HomePage from '../pages/tab/Home';

// 安卓端需要加上一個headerRight讓title居中
// const headerOptions = {
//   headerStyle: { backgroundColor: '#fff' },
//   headerTitleStyle: { color: '#333', alignSelf: 'center' },
//   headerTintColor: '#999',
//   headerBackTitle: null,
//   headerRight: <View style={{ width: 24 }} />,
// };
//
// const isLogin = AsyncStorage.getItem('isLogin').then((value) => {
//   console.log(value);
//   return value;
// });

// static get(){
//   return AsyncStorage.getItem(key).then((value) => {
//     return value;
//   });
// }

/**
 * 路由配置中心
 */
const MainRouters = StackNavigator({
  TabBar: { screen: TabBar },
  RegisterPage: { screen: RegisterPage },
}, {
  initialRouteName: 'TabBar',
  headerMode: 'screen',
  navigationOptions: ({ screenProps }) => ({
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: screenProps ? screenProps.themeColor : '#2196f3',
      shadowOpacity: 0,

    },
    headerTitleStyle: {
      alignSelf: 'center',
      color: screenProps ? screenProps.headerTitleColor : 'white',
      fontSize: 16,
	  textAlign: 'center',
      flex: 1,
    },
    headerBackTitleStyle: {
      alignSelf: 'center',
      color: screenProps ? screenProps.headerTintColor : 'white',
    },
    headerTintColor: screenProps ? screenProps.headerTintColor : 'white',
    gesturesEnabled: true,
  }),
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
  }),
  onTransitionStart: () => {}, // 导航栏切换开始 回调
  onTransitionEnd: () => {}, // 导航栏切换结束 回调
});

const ProjectRouters = StackNavigator({
  ProjectList: { screen: ProjectList },
}, {
  headerMode: 'screen',
  navigationOptions: ({ screenProps }) => ({
    headerBackTitle: null,
    headerStyle: {
	  backgroundColor: screenProps ? screenProps.themeColor : '#2196f3',
	  shadowOpacity: 0,

    },
    headerTitleStyle: {
	  alignSelf: 'center',
	  flex: 1,
	  color: screenProps ? screenProps.headerTitleColor : 'white',
	  fontSize: 16,
	  textAlign: 'center',

    },
    headerBackTitleStyle: {
	  alignSelf: 'center',
	  color: screenProps ? screenProps.headerTintColor : 'white',
    },
    headerTintColor: screenProps ? screenProps.headerTintColor : 'white',
    gesturesEnabled: true,
  }),
  transitionConfig: () => ({
    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
  }),
  onTransitionStart: () => {}, // 导航栏切换开始 回调
  onTransitionEnd: () => {}, // 导航栏切换结束 回调
});

const Routers = StackNavigator(
  {
    LoginPage: { screen: LoginPage },
    RegisterPage: { screen: RegisterPage },
    MainRouters: { screen: MainRouters },
    App: { screen: App },
    ProjectRouters: { screen: ProjectRouters },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
    },
    transitionConfig: a => ({
      // 只要修改最后的forVertical就可以实现不同的动画了。
      // screenInterpolator: CardStackStyleInterpolator.forInitial,
    }),
  },
);

export default Routers;
