import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View,Alert} from 'react-native';
import { List,Tabs,Provider} from '@ant-design/react-native';
import Echarts from 'native-echarts'
import DatePicker from 'react-native-datepicker';
import Item from '@ant-design/react-native/lib/list/ListItem';

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startdatetime: "",
      enddatetime: "",
      exdata:"",
      InQuire:"",
      option:[],
      Exoption:[]
    }
    
  }

  InQuire = (date)=>{
    this.setState({ enddatetime: date }); 


    //查询收入信息
    fetch(`http://192.168.0.106:8888/cgi-bin/inquire.py`,{
      method: 'POST',                          
      body: `StartTime=${this.state.startdatetime}&EndTime=${this.state.enddatetime}`,
      headers: {
          "Content-Type":"application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*"
      },
  }).then(resp => resp.text()).then(result => {
      console.log(1112,result);
      var InQuire = eval("(" + result + ")");
      console.log(1113,InQuire);

      let arr = [];
      InQuire.data.map(
        (item)=>{
          return arr.push(item[1])  //把类别单独从数组提取出来
        })
      let Classarr= Array.from(new Set(arr));//类别数组去重
      console.log("数组去重",Classarr);

      let obj ={
        value:"",
        name:""
      }
      let dataval = [];
      for(var n=0;n<Classarr.length;n++){
        let num = 0
        InQuire.data.map(item=>{
          if(item[1] == Classarr[n]){
            num += Number(item[0])
          }
        })
        console.log("num",num);
        obj.value = num
        obj.name = Classarr[n]
        dataval.push(obj)
        obj ={
          value:"",
          name:""
        }
      }
     
 
      this.setState({option:dataval})
        console.log("获取的",this.state.option,dataval);
    
      if(InQuire.code == 4){
        Alert.alert("", InQuire.info, [{ text: "我知道了" }]);
      }
      console.log(1114,InQuire.data);
     
  }).catch(err => {
      console.log(222,err)
  })


        //查询支出信息
        fetch(`http://192.168.0.106:8888/cgi-bin/Exquire.py`,{
          method: 'POST',                          
          body: `StartTime=${this.state.startdatetime}&EndTime=${this.state.enddatetime}`,
          headers: {
              "Content-Type":"application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*"
          },
      }).then(resp => resp.text()).then(result => {
          console.log(1112,result);
          var InQuire = eval("(" + result + ")");
          console.log(1113,InQuire);
    
          let arr = [];
          InQuire.data.map(
            (item)=>{
              return arr.push(item[1])  //把类别单独从数组提取出来
            })
          let Classarr= Array.from(new Set(arr));//类别数组去重
          console.log("数组去重",Classarr);
    
          let obj ={
            value:"",
            name:""
          }
          let dataval = [];
          for(var n=0;n<Classarr.length;n++){
            let num = 0
            InQuire.data.map(item=>{
              if(item[1] == Classarr[n]){
                num += Number(item[0])
              }
            })
            console.log("num",num);
            obj.value = num
            obj.name = Classarr[n]
            dataval.push(obj)
            obj ={
              value:"",
              name:""
            }
          }
         
          this.setState({Exoption:dataval})
            console.log("获取的",this.state.option,dataval);
        
          if(InQuire.code == 4){
            Alert.alert("", InQuire.info, [{ text: "我知道了" }]);
          }
          console.log(1114,InQuire.data);
         
      }).catch(err => {
          console.log(222,err)
      })

  }

  render() {

    const option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {},
      series: [{
        // type: 'bar',
        type: 'pie',
        name: '收入',
        radius:"54%",
        data: this.state.option
        // data: [
        //   // { value: 200, name: '水果' },
        //   // { value: 100, name: '手机' },
        //   // { value: 50, name: '家用电器' },
        //   // { value: 30, name: '大米' },
        //   // { value: 70, name: '服装' },
        // ]
      }],
      textStyle: { fontSize: 16 }
    }

    const Exoption = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {},
      series: [{
        // type: 'bar',
        type: 'pie',
        name: '收入',
        radius:"56%",
        data: this.state.Exoption
        // data: [
        //   // { value: 200, name: '水果' },
        //   // { value: 100, name: '手机' },
        //   // { value: 50, name: '家用电器' },
        //   // { value: 30, name: '大米' },
        //   // { value: 70, name: '服装' },
        // ]
      }],
      textStyle: { fontSize: 16 }
    }

    return (
      <View style={{flex:1}}>
     
      <List>
        <View style={{flexDirection: "row",alignItems: 'center',justifyContent: 'center',marginTop:8,marginBottom:8}}>
        <DatePicker
          style={{ width: 100 }}
          date={this.state.startdatetime}
          mode="date"
          placeholder='起始时间'
          format="YYYY-MM-DD"
          minDate="1990-01-01"
          maxDate="2020-01-01"
          confirmBtnText="确定"
          cancelBtnText="取消"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              width: 0
            },
            dateInput: {
              borderWidth: 0,
              borderWidth: 1, borderColor: "#f2f2f2", borderRadius: 20, height: 30, backgroundColor: "#f2f2f2"
            }
          }}
          onDateChange={(date) => { this.setState({ startdatetime: date }); }}
        /><Text>至</Text>
          <DatePicker
          style={{ width: 100 }}
          date={this.state.enddatetime}
          mode="date"
          placeholder='结束时间'
          format="YYYY-MM-DD"
          minDate="1990-01-01"
          maxDate="2020-01-01"
          confirmBtnText="确定"
          cancelBtnText="取消"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              width: 0
            },
            dateInput: {
              borderWidth: 0,
              borderWidth: 1, borderColor: "#f2f2f2", borderRadius: 20, height: 30, backgroundColor: "#f2f2f2"
            }
          }}
          onDateChange={this.InQuire}
        />
      </View>
      </List>
  
      <Tabs tabs={tabs}>
         <Provider>
         <View style={styles.container}>
        <Echarts option={option} style={styles.option}/>
       </View>
         </Provider>
         <Provider>
         <View style={styles.container}>
        <Echarts option={Exoption} style={styles.option}/>
       </View>
         </Provider>
      </Tabs>
      
  
   
      </View>
    );
  }
}


const tabs = [
  { title: "收入" },
  { title: "支出" }
]

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
