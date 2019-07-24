import React from 'react'

import {createStackNavigator, createAppContainer,createBottomTabNavigator} from 'react-navigation'

// 创建组件类，并引入
import App from "../pages/App"
import Check from "../pages/Check"
import My from "../pages/My"
import Report from "../pages/Report"
import Succeed from "../pages/Succeed"

import { Icon } from '@ant-design/react-native';

const stackNavigator =  createBottomTabNavigator({
    app: {screen: App, navigationOptions:{
    title: '记账',
    tabBarLabel: "记账",
    tabBarIcon: <Icon name="edit" />
    }},
    check:{screen:Check,navigationOptions:{
        title:"查看流水",
        tabBarLabel: "查看流水",
        tabBarIcon: <Icon name="account-book"/>
    }},
    Report:{screen:Report,navigationOptions:{
        title:"分析报告",
        tabBarLabel: "分析报告",
        tabBarIcon: <Icon name="pie-chart" />
    }},
    My:{screen:My,navigationOptions:{
        title:"我",
        tabBarLabel: "我",
        tabBarIcon: <Icon name="user" />
    }}
}
)
const RNRoute=createAppContainer(stackNavigator);

export default RNRoute;