/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import { Button, Tabs, Icon, Felx, List, InputItem, TextareaItem, Picker, Provider } from '@ant-design/react-native';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'redTab',
      income: {
        data: [
        ],
        InMoney: "",
        InRemark:""
      },
      expend: {
        data: [
          { label: "sd", value: "sd" },
          { label: "sd", value: "sd" },
          { label: "sd", value: "sd" },
        ],
      },
      InValue: [],
      ExValue: []
    }

//页面获取焦点时,加载类别选项
  //   props.navigation.addListener("didFocus", () => {
  //     console.log(123456);
  //     fetch(`http://192.168.249.199:8888/cgi-bin/InClass.py`, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //         "Access-Control-Allow-Origin": "*"
  //       },
  //     }).then(resp => resp.text()).then(result => {
  //       var MoneyClass = eval("(" + result + ")");

  //       if (MoneyClass.code == 2) {
  //         //把获取的值转化成数组对象，传给下拉框
  //         let i = [];
  //         console.log(MoneyClass.data);
  //         MoneyClass.data.map(
  //           val => {
  //             i.push({ label: val, value: val });
  //           }
  //         )
  //         this.setState({ income: { data: i } })
  //       } else if (MoneyClass.code == 4) {
  //         Alert.alert("", MoneyClass.info, [{ text: "我知道了" }]);
  //       }
  //     }).catch(err => {
  //       console.log(222, err)
  //     })
  //   });
  }
  componentWillMount(){
    console.log(123456);
    fetch(`http://192.168.249.199:8888/cgi-bin/InClass.py`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      },
    }).then(resp => resp.text()).then(result => {
      var MoneyClass = eval("(" + result + ")");

      if (MoneyClass.code == 2) {
        //把获取的值转化成数组对象，传给下拉框
        let i = [];
        console.log(MoneyClass.data);
        MoneyClass.data.map(
          val => {
            i.push({ label: val, value: val });
          }
        )
        this.setState({ income: { data: i } })
      } else if (MoneyClass.code == 4) {
        Alert.alert("", MoneyClass.info, [{ text: "我知道了" }]);
      }
    }).catch(err => {
      console.log(222, err)
    })

  }
  income = () => {

  }
  //收入的金额
  InMoney = (val) => {
    this.setState({
      income: { InMoney: val }
    })
  }
  //收入的类别
  incate = (value) => {
    this.setState({
      InValue: value
    });
  }
  //收入的时间
  indate = () => {
    let strtime = this.state.income.date;
    let date = new Date(strtime);
    let time = date.valueOf();
    console.log(this.state.income.date);//这里得到的时间格式是组件中定义的样式
    console.log('转换后的时间戳是：' + time);
  }
  //收入的说明
  InRemark = (val) =>{
  this.setState({income:{InRemark:val}})
  }
  //收入的确认事件
  inconfirm = () => {
   let name = this.state.income
    console.log(name.InMoney,this.state.InValue,name.data,name.InRemark);
    fetch(`http://192.168.249.199:8888/cgi-bin/InCome.py`, {
      method: 'POST',
      body: `InMoney=${this.state.income}&InClass=敲代码&InTime=1998-12-13&InRemark=在家`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
      },
    }).then(resp => resp.text()).then(result => {
      var MoneyClass = eval("(" + result + ")");


      if (MoneyClass.code == 2) {
        //把获取的值转化成数组对象，传给下拉框
        let i = [];
        console.log(MoneyClass.data);
        MoneyClass.data.map(
          val => {
            i.push({ label: val, value: val });
          }
        )
        this.setState({ income: { data: i } })
      } else if (MoneyClass.code == 4) {
        Alert.alert("", MoneyClass.info, [{ text: "我知道了" }]);
      }
    }).catch(err => {
      console.log(222, err)
    })

  }

  render() {

    return (

      <View style={{ flex: 1 }}>
        <Tabs tabs={tabs}>
          {/* 收入 */}
          <Provider>
            <View>
              <List style={{ marginTop: 30 }}>
                <Item>
                  <InputItem placeholder="金额"
                    onChangeText={this.InMoney}>
                    <Icon name="pay-circle" />
                  </InputItem>
                </Item>

                <Item extra={<Button type="primary" size="small">管理类别</Button>}>
                  <View>
                    <Picker
                      data={this.state.income.data}
                      cols={1}
                      value={this.state.InValue}
                      onChange={this.incate}
                    >
                      <List.Item arrow="horizontal">
                        类别
              </List.Item>
                    </Picker>
                  </View>
                </Item>

                <Item>
                  <DatePicker
                    style={{ width: 200 }}
                    date={this.state.income.date}
                    mode='datetime'
                    placeholder='请选择时间'
                    format='YYYY-MM-DD HH:mm'      //这里定义时间的样式
                    // format='YYYY-MM-DD HH:mm'      //如果想使用24小时的时间制度这里的hh要使用大写的HH....
                    confirmBtnText='确定'
                    cancelBtnText='取消'
                    customStyles={{//
                      dateIcon: { //设置图标的位置
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {//
                        marginLeft: 36,
                        borderWidth: 0 //设置日期选择器的样式，这里可以去掉边框
                      }
                    }}
                    onDateChange={(date) => { this.setState({ income: { date: date } }); }}
                  />
                </Item>

                <Item>
                  <TextareaItem rows={4} placeholder="说明" count={100} onChange={this.InRemark}>
                  </TextareaItem>
                </Item>
              </List>
              <View style={styles.submit}>
                <Button type="primary" style={styles.btn} onpress={this.inconfirm}>确定</Button>
                <Button type="warning" style={styles.btn}>取消</Button>
              </View>
            </View>
          </Provider>

          {/* 支出 */}
          <Provider>
            <View>
              <List style={{ marginTop: 30 }}>
                <Item>
                  <InputItem placeholder="金额"
                    onChangeText={this.account}>
                    <Icon name="pay-circle" />
                  </InputItem>
                </Item>

                <Item extra={<Button type="primary" size="small">管理类别</Button>}>
                  <View>
                    <Picker
                      data={this.state.expend.data}
                      cols={1}
                      value={this.state.ExValue}
                      onChange={this.expend}
                    >
                      <List.Item arrow="horizontal">
                        类别
              </List.Item>
                    </Picker>
                  </View>
                </Item>

                <Item>
                  <DatePicker
                    style={{ width: 200 }}
                    date={this.state.income.date}
                    mode='datetime'
                    placeholder='请选择时间'
                    format='YYYY-MM-DD HH:mm'      //这里定义时间的样式
                    // format='YYYY-MM-DD HH:mm'      //⚠️⚠️⚠️如果想使用24小时的时间制度这里的hh要使用大写的HH....哈哈哈
                    confirmBtnText='确定'
                    cancelBtnText='取消'
                    customStyles={{//
                      dateIcon: { //设置图标的位置
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {//
                        marginLeft: 36,
                        borderWidth: 0 //设置日期选择器的样式，这里可以去掉边框，这样看起来是不是更漂亮呢😊😯
                      }
                    }}
                    onDateChange={(date) => { this.setState({ income: { date: date } }); }}
                  />
                </Item>

                <Item>
                  <TextareaItem rows={4} placeholder="说明" count={100} >
                    <Icon name="edit" />
                  </TextareaItem>
                </Item>
              </List>
              <View style={styles.submit}>
                <Button type="primary" style={styles.btn}>确定</Button>
                <Button type="warning" style={styles.btn}>取消</Button>
              </View>
            </View>
          </Provider>

        </Tabs>
      </View>

    )
  }

}

const Item = List.Item;
const tabs = [
  { title: "收入" },
  { title: "支出" }
]
const styles = StyleSheet.create({
  btn: {
    width: 200
  },
  submit: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 50
  }
});

export default App;
