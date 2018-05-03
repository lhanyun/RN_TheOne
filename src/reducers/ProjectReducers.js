import * as types from '../constants/ProjectTypes';
import * as homeTypes from '../constants/HomeTypes';
import { RefreshState } from "../components/RefreshListView";

const initialState = {
  projectInfo: null,
  dataSource: [],
  status: '-1',
  refreshing: RefreshState.Idle,
};

export default projectReducer = (state = initialState, action) => {
  switch (action.type) {
	case types.SELECT_PROJECT:
	  return Object.assign({},state,{
		projectInfo: action.projectInfo,
	  });
	case homeTypes.LOAD_DATA_START:
	  return Object.assign({},state,{
		status: action.dic.status,
		refreshing: action.dic.refreshing,
	  });
	case homeTypes.LOAD_DATA_SUCCESS:
	  return Object.assign({},state,{
		dataSource: action.dic.data,
		status: action.dic.status,
		refreshing: action.dic.refreshing,
	  });
	case homeTypes.LOAD_DATA_FAILURE:
	  return Object.assign({},state,{
		dataSource: action.dic.data,
		status: action.dic.status,
		refreshing: action.dic.refreshing,
	  });
	default:
	  return state;
  }
};