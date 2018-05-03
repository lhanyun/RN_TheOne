
import * as types from '../constants/loginTypes';

const initialState = {
  status: '点击登录',
  isSuccess: false,
  user: null,
};

export default loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_IN_DOING:
	  return Object.assign({},state,{
		status: '正在登陆',
		isSuccess: false,
		user: null,
	  });
    case types.LOGIN_IN_DONE:
	  return Object.assign({},state,{
		status: '登陆成功',
		isSuccess: true,
		user: action.user,
	  });
    case types.LOGIN_IN_ERROR:
	  return Object.assign({},state,{
		status: '登录出错',
		isSuccess: true,
		user: null,
	  });
	case types.LOGIN_OUT:
	  return Object.assign({},state,{
		status: '点击登录',
		isSuccess: false,
		user: null,
		projectInfo: null,
	  });
    default:
      console.log(state);
      return state;
  }
};

