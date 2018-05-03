
import * as types from '../constants/HomeTypes';
import { RefreshState } from '../components/RefreshListView';

const initialState = {
  dataSource: [],
  status: '-1',
  refreshing: RefreshState.Idle,
};

export default homeReducer = (state = initialState, action) => {
  switch (action.type) {
	case types.LOAD_DATA_START:
	  return Object.assign({},state,{
		status: action.dic.status,
		refreshing: action.dic.refreshing,
	  });
	case types.LOAD_DATA_SUCCESS:
	  return Object.assign({},state,{
		dataSource: action.dic.data,
		status: action.dic.status,
		refreshing: action.dic.refreshing,
	  });
	case types.LOAD_DATA_FAILURE:
	  return Object.assign({},state,{
		dataSource: action.dic.data,
		status: action.dic.status,
		refreshing: action.dic.refreshing,
	  });
    default:
	  return state;
  }
};
