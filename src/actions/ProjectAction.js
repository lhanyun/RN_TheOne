import * as types from '../constants/ProjectTypes';
import * as homeTypes from '../constants/HomeTypes';
import { RefreshState } from '../components/RefreshListView';

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export function loadData(isHeaderRe) {
  return (dispatch) => {
	dispatch(loadstart(isHeaderRe));
	const result = fetch('https://www.baidu.com')
	  .then((res) => {
		dispatch(loadSuccess({ data: [], status: '-1' }));
	  }).catch((e) => {
		dispatch(loadFailure());
	  });
  };
}

export function selectProject(projectInfo) {
  return {
	type: types.SELECT_PROJECT,
	projectInfo,
  };
}

function loadstart(isHeaderRe) {
  let state = isHeaderRe ? RefreshState.HeaderRefreshing : RefreshState.FooterRefreshing;
  return {
	type: homeTypes.LOAD_DATA_START,
	dic: { status: '-1', refreshing: state, },
  };
}

function loadSuccess(dic) {
  let state;
  if (dic.data.length === 0) {
	state = RefreshState.EmptyData;
  } else if (dic.data.length < 3) {
	state = RefreshState.NoMoreData;
  } else {
	state = RefreshState.Idle;
  }
  return {
	type: homeTypes.LOAD_DATA_SUCCESS,
	dic: { ...dic, refreshing: state },
  };
}

function loadFailure() {
  return {
	type: homeTypes.LOAD_DATA_FAILURE,
	dic: { data: [], status: '1', refreshing: RefreshState.Failure },
  };
}