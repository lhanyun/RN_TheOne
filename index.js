import { AppRegistry } from 'react-native';
import RnNavRedux from './src/index';

if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    error: () => {},
    warn: () => {},
  };
}

// 关闭react-navigation的警告
console.ignoredYellowBox = ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'];

AppRegistry.registerComponent('RN_TheOne', () => RnNavRedux);
