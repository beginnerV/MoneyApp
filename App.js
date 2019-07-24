/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Echarts from 'native-echarts'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    const option = {
      title: {
        text: '销量'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {},
      // xAxis: {
      //   data: ['水果', '手机', '家用电器', '大米','服装']
      // },
      // yAxis: {},
      series: [{
        // type: 'bar',
        type: 'pie',
        name: '销售量',
        // data: [200, 100,50, 30, 70]
        data: [
          { value: 200, name: '水果' },
          { value: 100, name: '手机' },
          { value: 50, name: '家用电器' },
          { value: 30, name: '大米' },
          { value: 70, name: '服装' },
        ]
      }],
      textStyle: { fontSize: 16 }
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>

        <Echarts option={option} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
