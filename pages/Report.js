import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Echarts from 'native-echarts'


export default class Report extends Component {
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
        <Echarts option={option} style={styles.option}/>
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
  option:{
  width:150
  }
});
