import * as types from '../constants/HomeTypes';
import { RefreshState } from '../components/RefreshListView';
import HttpUtils from '../utils/HttpUtils';

// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export function loadData(isHeaderRe) {

  return (dispatch) => {
	dispatch(loadstart(isHeaderRe));
    const result = HttpUtils.get('https://api.github.com/search/repositories?q=ios&sort=stars')
	  .then((res) => {
        dispatch(loadSuccess({ data: [], status: '-1' }));
	  }).catch((e) => {
        dispatch(loadFailure());
	  });
  };
}

function loadstart(isHeaderRe) {
  let state = isHeaderRe ? RefreshState.HeaderRefreshing : RefreshState.FooterRefreshing;
  return {
    type: types.LOAD_DATA_START,
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
	type: types.LOAD_DATA_SUCCESS,
	dic: { ...dic, refreshing: state },
  };
}

function loadFailure() {
  return {
	type: types.LOAD_DATA_FAILURE,
	dic: { data: [], status: '1', refreshing: RefreshState.Failure },
  };
}
