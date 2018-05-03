//
//  Created by Liu Jinyong on 17/4/5.
//  Copyright © 2016年 Liu Jinyong. All rights reserved.
//
//  @flow
//  Github:
//  https://github.com/huanxsd/react-native-refresh-list-view

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, ViewPropTypes } from 'react-native';
import ListEmptyComponent from './ListEmptyComponent';

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5,
};

const DEBUG = false;
const log = (text: string) => { DEBUG && console.log(text); };

type Props = {
    refreshState: number,
    onHeaderRefresh: Function,
    onFooterRefresh?: Function,
    data: Array<any>,

    footerContainerStyle?: ViewPropTypes.style,
    footerTextStyle?: ViewPropTypes.style,

    listRef?: any,

    footerRefreshingText?: string,
    footerFailureText?: string,
    footerNoMoreDataText?: string,
    footerEmptyDataText?: string,

    renderItem: Function,
}

type State = {

}

class RefreshListView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fHeight: 0,
    };
  }

    static defaultProps = {
      //  footerRefreshingText: '数据加载中…',
      //  footerFailureText: '点击重新加载',
      //  footerNoMoreDataText: '已加载全部数据',
      //  footerEmptyDataText: '暂时没有相关数据',
	  footerRefreshingText: '玩命加载中 >.<',
	  footerFailureText: '我擦嘞，居然失败了 =.=!',
	  footerNoMoreDataText: '-我是有底线的-',
	  footerEmptyDataText: '-好像什么东西都没有-',
    };

    componentWillReceiveProps(nextProps: Props) {
      log(`[RefreshListView]  RefreshListView componentWillReceiveProps ${nextProps.refreshState}`);
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
      log(`[RefreshListView]  RefreshListView componentDidUpdate ${prevProps.refreshState}`);
    }

    onHeaderRefresh = () => {
      log('[RefreshListView]  onHeaderRefresh');

      if (this.shouldStartHeaderRefreshing()) {
        log('[RefreshListView]  onHeaderRefresh');
        this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
      }
    }

    onEndReached = (info: {distanceFromEnd: number}) => {
      log(`[RefreshListView]  onEndReached   ${info.distanceFromEnd}`);

      if (this.shouldStartFooterRefreshing()) {
        log('[RefreshListView]  onFooterRefresh');
        this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
      }
    }

    shouldStartHeaderRefreshing = () => {
      log('[RefreshListView]  shouldStartHeaderRefreshing');

      if (this.props.refreshState === RefreshState.HeaderRefreshing ||
            this.props.refreshState === RefreshState.FooterRefreshing) {
        return false;
      }

      return true;
    }

    shouldStartFooterRefreshing = () => {
      log('[RefreshListView]  shouldStartFooterRefreshing');

      const { refreshState, data } = this.props;
      if (data.length === 0) {
        return false;
      }

      return (refreshState === RefreshState.Idle);
    }

    render() {
      log('[RefreshListView]  render');

      const { renderItem, ...rest } = this.props;

      let listStatus = '-1';
      if (this.props.refreshState !== RefreshState.HeaderRefreshing
        && this.props.refreshState !== RefreshState.FooterRefreshing
        && this.props.refreshState !== RefreshState.Idle) {
        listStatus = (this.props.refreshState === RefreshState.EmptyData) ? '0' : '1';
      }
      return (
        <FlatList
          ref={this.props.listRef}
          onEndReached={this.onEndReached}
          onRefresh={this.onHeaderRefresh}
          refreshing={this.props.refreshState === RefreshState.HeaderRefreshing}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0}
          renderItem={renderItem}

          {...rest}

          onLayout={(e) => {
              const height = e.nativeEvent.layout.height;
              if (this.props.data.length === 0 && this.state.fHeight < height) {
                this.setState({ fHeight: height });
              }
          }}
          ListEmptyComponent={<ListEmptyComponent
            status={listStatus}
            height={this.state.fHeight}
            refreshData={this.onHeaderRefresh}
            doSomething={this.props.doSomething}
            btnTitle={this.props.btnTitle}
          />}
        />
      );
    }

    renderFooter = () => {
      let footer = null;

      const footerContainerStyle = [styles.footerContainer, this.props.footerContainerStyle];
      const footerTextStyle = [styles.footerText, this.props.footerTextStyle];
      const {
        footerRefreshingText, footerFailureText, footerNoMoreDataText, footerEmptyDataText,
      } = this.props;

      switch (this.props.refreshState) {
        case RefreshState.Idle:
          footer = (<View style={footerContainerStyle} />);
          break;
        case RefreshState.Failure: {
          footer = (
            <TouchableOpacity
              style={footerContainerStyle}
              onPress={() => {
                this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
              }}
            >
              <Text style={footerTextStyle}>{footerFailureText}</Text>
            </TouchableOpacity>
          );
          break;
        }
        case RefreshState.EmptyData: {
          footer = (
            <TouchableOpacity
              style={footerContainerStyle}
              onPress={() => {
                this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing);
              }}
            >
              <Text style={footerTextStyle}>{footerEmptyDataText}</Text>
            </TouchableOpacity>
          );
          break;
        }
        case RefreshState.FooterRefreshing: {
          footer = (
            <View style={footerContainerStyle} >
              <ActivityIndicator size="small" color="#888888" />
              <Text style={[footerTextStyle, { marginLeft: 7 }]}>{footerRefreshingText}</Text>
            </View>
          );
          break;
        }
        case RefreshState.NoMoreData: {
          footer = (
            <View style={footerContainerStyle} >
              <Text style={footerTextStyle}>{footerNoMoreDataText}</Text>
            </View>
          );
          break;
        }
      }

      return footer;
    }
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555',
  },
});

export default RefreshListView;
