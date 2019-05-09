<template>
  <section>
    <el-row>
      <el-col :span="24">
        <div class="top">
          <!--<img src="https://cloud.yoyun.cn/static/images/logo-mini.png" alt="" class="logo">-->
          <i class="fa fa-cloud logo"></i>
          <span>云主机管理平台</span>
        </div>

      </el-col>
    </el-row>
    <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text"
                  v-model="ruleForm.account"
                  auto-complete="off"
                  maxlength="20"
                  placeholder="账号">
          <span slot="prepend" class="fa fa-user-circle"></span>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password"
                  v-model="ruleForm.checkPass"
                  auto-complete="off"
                  maxlength="20"
                  placeholder="密码">
          <span slot="prepend" class="fa fa-lock"></span>
        </el-input>
      </el-form-item>
      <!--<el-checkbox v-model="rember" class="remember">记住密码</el-checkbox>-->
      <!--<a href="https://cloud.yoyun.cn/console/#/register" class="register"><span style="color:#ababab">还没账户?</span> 立即注册</a>-->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import {
      requestLogin,
      getUserInfo,//获取用户个人信息
  } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      var validateFrom = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号！'));
        } else {
//                if (value.length<=3) {
//                    callback(new Error('用户名不能过短！'));
//                }
          callback();
        }
      };
      var validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入主账号！'));
        } else {
          if (value.length<=3) {
            callback(new Error('用户名不能过短！'));
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号！'));
        } else {
          if (value.length<6) {
            callback(new Error('密码不能过短！'));
          }
          callback();
        }
      };
      return {
        logining: false,
        ruleForm: {
          account: '15869136076',
          checkPass: 'jiang1993'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { validator: validateName }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass }
          ]
        },
//        rember: false
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
        var _this = this;
//        let rember=''
//        if(this.rember){
//          rember=1
//        }else{
//          rember=0
//        }
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
//            sessionStorage.setItem('from',this.ruleForm.from)
            //NProgress.start();
            var loginParams = {
              userName: this.ruleForm.account,
              password: this.ruleForm.checkPass,
//              rember:rember
            };
            requestLogin(loginParams).then(res => {
              this.logining = false;
//              console.log(res)
              if(res.status===1){
                this.$message({
                  message:res.msg,
                  type:'success'
                })
                sessionStorage.setItem('token', res.data.token);
                sessionStorage.setItem('uid',res.data.uid)
                this.getInfo();



              }else{
                this.$message({
                  message:data.msg,
                  type:'error'
                })
              }

            }).catch(()=>{

            })
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },

      getInfo(){
        getUserInfo().then(res=>{
          if(res.status==1){
            sessionStorage.setItem('userInfo',JSON.stringify(res.data))
            this.$router.push({ path:'home' });
          }else{
            this.$message({
              message:res.msg,
              type:'error'
            })
          }
        }).catch(()=>{

        })
      },


    },
    mounted(){
//      if(sessionStorage.getItem('from')){
//        this.ruleForm.from=sessionStorage.getItem('from')
//      }
//      if(Object.keys(this.$route.query)[0]){
//        this.from=Object.keys(this.$route.query)[0]
//        this.ruleForm.from=Object.keys(this.$route.query)[0]
//      }
      let that=this
      document.onkeydown=function(e){
        if(e && e.keyCode==13){ // enter 键
          that.handleSubmit()
        }
      }



    }
  }

</script>

<style lang="scss" scoped>
  .top{
    background-color: #2d303b;
    height: 65px;
    line-height: 65px;
    text-indent: 30px;
    color:#fff;
  .logo{
    vertical-align: middle;
    margin-right: 20px;
    color:#fff;
    font-size: 30px;
  }
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 120px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 10px #e6e4e4;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  }
  .register{
    color: #2d8cf0;
    text-decoration: none;
    float: right;
  }
</style>
