import React from 'react'
import {
    View, StyleSheet, Image, AsyncStorage,Alert,ScrollView, Text
} from 'react-native'

import { InputItem, List, Button, WhiteSpace, WingBlank, Card, Icon } from '@ant-design/react-native'


class My extends React.Component {

    constructor(props) {
        super(props);
        props.navigation.addListener("didBlur",payload=>{
            console.debug("didBlur",payload);
        })
        this.state = {
            Show: true,
            account: "",
            password: "",
            user:{
                name:"",
                pwd:""
            }
        }
    }

    login = () => {
        console.log("pp", this.state.account, this.state.password);
       

        fetch(`http://192.168.0.151:8888/cgi-bin/first.py`,{
            method: 'POST',                          
            body: `account=${this.state.account}&password=${this.state.password}`,
            headers: {
                "Content-Type":"application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*"
            },
        }).then(resp => resp.text()).then(result => {
            console.log(1112,result);
            var user = eval("(" + result + ")");
           
            if(user.code == 2){
                this.setState({ Show: false })
                this.setState({ user: {name:user.data[0]}})
                console.log(user.info,11111,this.state.user.name);
            }else if(user.code == 4){
                console.log(user.info);
                Alert.alert("",user.info,[{text:"我知道了"}]);
            }
        }).catch(err => {
            console.log(222,err)
        })

        //点击登录后把state表单数据清空
        this.setState({ account: "", password: ""})
    }
    //退出
    quit = () => {
        this.setState({ Show: true })
        this.setState({ user: {name:""}})
    }
    account = (val) => {
        console.log("账户", val);
        this.setState({ account: val })
    }
    password = (val) => {
        console.log("密码", val);
        this.setState({ password: val })
    }
    render() {
        return (
            <View>
                {this.state.Show ?
                    (<Card style={style.Card}>
                        <WhiteSpace size="lg" />
                        <InputItem placeholder="请输入用户名"
                            onChangeText={this.account}><Icon name="meh"></Icon></InputItem>
                        <InputItem type="password" placeholder="请输入密码"
                            onChangeText={this.password}><Icon name="star"></Icon></InputItem>
                        <WhiteSpace />

                        <View style={style.stylebtn}>
                            <Button type="primary" style={style.btn} onPress={this.login}>登录</Button>
                        </View>
                        <WhiteSpace size="lg" />
                    </Card>):(<View style={style.login}><Image source={require('./img/tim.jpg')} style={style.user}></Image>
                    <Text>hello, {this.state.user.name}</Text>
                    <Button type="warning" style={style.btn} onPress={this.quit}>退出</Button>
                    </View>)
                }
            </View>
        )
    }
}


const style = StyleSheet.create({
    btn: {
        marginTop: 30,
        width: 250,
    },
    stylebtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    Card: {
        marginTop: 200
    },
    login: {
        marginTop: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    user: {
        borderRadius: 60,
        width: 120,
        height: 120,
        marginBottom: 20
    }
})
export default My

