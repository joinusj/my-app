<template>
  <section>
      <el-row style="padding: 20px 0" :gutter="40">
        <el-col :span="24">

          <i class="fa fa-address-card"></i> &nbsp;概览
          <hr>
          <el-col :span="12">
            <div class="user_overview user_overview_border">
              <div class="user_box">
                <span class="user_label">姓名:</span>
                {{userObj.realname}}
              </div>
              <div class="user_box">
                <span class="user_label">销售UID:</span>
                {{userObj.uid}}
              </div>
              <div class="user_box">
                <span class="user_label">手机:</span>
                {{userObj.mobile}}
              </div>
              <div class="user_box">
                <span class="user_label">注册时间:</span>
                {{userObj.regdateline | dataFormat('yyyy-MM-dd HH:mm')}}
              </div>
              <div class="user_box">
                <span class="user_label">登录时间:</span>
                {{userObj.logdateline | dataFormat('yyyy-MM-dd HH:mm')}}
              </div>
              <div class="user_box">
                <span class="user_label">绑定名称:</span>
                {{userObj.uname}}
              </div>
              <div class="user_box">
                <span class="user_label">地区:</span>
                {{userObj.area}}
              </div>
              <div class="user_box">
                <span class="user_label">地址:</span>
                {{userObj.city | address}}
              </div>
              <div class="user_box">
                <span class="user_label">地址详情:</span>
                {{userObj.address}}
              </div>
              <div class="user_box">
                <span class="user_label">QQ号:</span>
                {{userObj.qq}}
              </div>
              <div class="user_box">
                <span class="user_label">权限ID:</span>
                {{userObj.uurole}}
              </div>
              <div class="user_box">
                <span class="user_label">性别:</span>
                <el-radio v-model="userObj.sex" label="1" disabled>男</el-radio>
                <el-radio v-model="userObj.sex" label="2" disabled>女</el-radio>
              </div>
              <div class="user_box">
                <span class="user_label">用户分类:</span>
                <el-radio v-model="userObj.utype" label="1" disabled>个人</el-radio>
                <el-radio v-model="userObj.utype" label="2" disabled>企业</el-radio>
              </div>

            </div>
          </el-col>
          <el-col :span="12">
            <div class="user_overview">
              <div class="user_box">
                <span class="user_label">	邮箱:</span>
                {{userObj.mobile}}
              </div>
              <div class="user_box">
                <span class="user_label">账户余额:</span>
                {{userObj.balance}}
              </div>
              <div class="user_box">
                <span class="user_label">云主机数量:</span>
                {{userObj.vms}}
              </div>
              <!--<div class="user_box">-->
                <!--<span class="user_label">联盟ID:</span>-->
                <!--{{userObj.union_id}}-->
              <!--</div>-->
              <div class="user_box">
                <span class="user_label">归属销售UID:</span>
                {{userObj.from_uid}}
              </div>
              <div class="user_box">
                <span class="user_label">归属销售姓名:</span>
                {{userObj.from_name}}
              </div>
              <div class="user_box">
                <span class="user_label">身份证号:</span>
                {{userObj.idcard}}
              </div>
              <div class="user_box">
                <span class="user_label">邮箱认证:</span>
                <!--{{userObj.emailrz}}-->
                <el-switch v-model="userObj.emailrz" disabled>
                </el-switch>
              </div>
              <div class="user_box">
                <span class="user_label">手机认证:</span>
                <!--{{userObj.emailrz}}-->
                <el-switch v-model="userObj.mobilerz" disabled>
                </el-switch>
              </div>
              <div class="user_box">
                <span class="user_label">企业认证:</span>
                <!--{{userObj.emailrz}}-->
                <el-switch v-model="userObj.companyrz" disabled>
                </el-switch>
              </div>
              <div class="user_box">
                <span class="user_label">实名认证:</span>
                <!--{{userObj.emailrz}}-->
                <el-switch v-model="userObj.idcardrz" disabled>
                </el-switch>
              </div>
              <div class="user_box">
                <span class="user_label">锁定:</span>
                <!--{{userObj.emailrz}}-->
                <el-switch v-model="userObj.inlock" disabled>
                </el-switch>
              </div>


            </div>
          </el-col>


        </el-col>
      </el-row>
  </section>
</template>
<script>
  import {
    getUserDetail,//获取用户详情
  } from "@/api/api"
  export default{
      name:'basicInform',
      props:{
        userUid:{
            type:String,
            default:''
          },
        index:{
          type:String,
          default:''
        }
      },
      data(){
          return{
            userObj:{}
          }
      },
    watch:{
      userUid(val){
//        this.popVisible=val
        if(val!==""&&this.index=='基本信息'){
          this.userDetailLoad()
        }

      },
      index(val){
          if(val=='基本信息'&&this.userUid!==""){
            this.userDetailLoad()
          }
      }
    },
    methods:{
      userDetailLoad(){
          let params={
            uid:this.userUid
          }
        getUserDetail(params).then(res=>{
//          console.log(res)
          if(res.status===1){
              this.userObj=res.data
          }else{
            this.$message({
              message:res.msg,
              type:'error'
            })
          }
        }).catch(()=>{

        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .user_box{
    margin-bottom: 14px;
  }
  .user_label{
    width: 140px;
    display: inline-block;
    /*margin-right: 60px;*/
  }
  .user_overview{
    font-size: 12px;
    margin-top: 20px;

  }
  .user_overview_border{
    border-right: 1px solid #dae0e6;
  }
</style>
