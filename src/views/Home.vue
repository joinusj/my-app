<template>
 <section>
   <div class="container">
      <div class="level_1_menu" @mouseleave="menuLeave">
        <div class="logo">
          <i class="fa fa-cloud"></i>
          <!--<div>私有云</div>-->
        </div>
        <div class="level_1_menu_container">
          <div class="level_1_menu_body">
              <div class="level_1_item"
                   v-for="(item,index) in routes"
                   :key="index"
                   :class="{level_1_item_active:$route.path.indexOf(item.path)!==-1,level_1_item_click:clickNum===index}"
                   @click="menuClick(index,item.name,item.children)"
                   @mouseenter="menuEnter(item)" v-if="userInfo.nav[item.path.split('/')[1]]||purviewStr=='@all@'">
                <div v-if="item.children.length===1">
                  <router-link :to="{path : item.children[0].path,}">
                    <div>
                      <i :class="item.icons"></i>
                      <div>{{item.name}}</div>
                    </div>
                  </router-link>
                </div>
                <div v-if="item.children.length>1">
                  <i :class="item.icons"></i>
                  <div>{{item.name}}</div>
                </div>
              </div>
          </div>

        </div>
        <div class="level_2_menu_container" v-show="isLevel2">
          <div class="level_2_menu_body">
            <div class="level_2_title">
              {{level2Title}}
            </div>
            <ul class="level_2_menu_ul" @click="menuLeave">
              <router-link :to="{path:val.path}" v-for="(val,key) in level2Arr" :key="key" v-if="userInfo.nav[val.path.split('/')[1]]||purviewStr=='@all@'">
                <li class="level_2_menu_li"
                    :class="{level_2_menu_li_active:$route.path===val.path}">
                    {{val.name}}
                </li>
              </router-link>
            </ul>
          </div>


        </div>

      </div>
      <div class="header">
        <el-row>
          <el-col :span="8" style="height: 60px;">
            <!--<img class="icon" :src="iconSrc" alt="">-->
          </el-col>
          <el-col :span="16" style="text-align: right;height: 60px;">
            <el-dropdown>
              <button class="el-dropdown-link user_name">
                用户名
              </button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>



          </el-col>
        </el-row>
      </div>
      <div class="content">
        <!--<el-row>-->
          <!--<el-col :span="24">-->
            <!--<div class="content_title">-->
              <!--{{$route.name}}-->
            <!--</div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <router-view/>
      </div>
   </div>
 </section>
</template>
<script>
  import {
    getUserInfo,//获取用户个人信息
    getAdress,//获取地址资源,
    getZone,//获取区域资源,
    getConf,//获取配置信息
    getSearch,//获取搜索资源
  } from '@/api/api'
  export default{
      data(){
        return{
          clickNum:'',
          isLevel2:false,
          level2Title:'',
          level2Arr:[],
//          location:"",
//          locationArr:[{
//              name:'湖州',
//              code:'huzhou',
//          }, {
//            name:'杭州',
//            code:'hangzhou',
//          }]
          userInfo:{},
          purviewStr:'',
          iconSrc:'',
        }
      },
      methods:{
        menuClick(num,name,child){
            if(child.length===1){
              this.isLevel2=false
              this.clickNum=''
              return
            }else{
              this.isLevel2=true
              this.clickNum=num
              this.level2Title=name
              this.level2Arr=child
            }
        },
        menuEnter(item){
            if(item.children.length===1){
                return
            }
            if(this.$route.path.indexOf(item.path)!==-1){
                this.level2Arr=item.children
                this.level2Title=item.name
                this.isLevel2=true
            }
        },
        menuLeave(){
          setTimeout(function () {
            this.isLevel2=false
          }.bind(this),200)
        },
//        changeLocation(val,name){
//            this.location=name
//        },
        logout(){
          this.$router.push({ path: '/login' });
          sessionStorage.removeItem('addressInfo')
          sessionStorage.removeItem('config')
          sessionStorage.removeItem('search')
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('uid')
          sessionStorage.removeItem('userInfo')
          sessionStorage.removeItem('zoneList')
        },

        getInfo(){
          getUserInfo().then(res=>{
            if(res.status==1){
              sessionStorage.setItem('userInfo',JSON.stringify(res.data))
            }else{
                this.$message({
                  message:res.msg,
                  type:'error'
                })
            }
          }).catch(()=>{

          })
        },
        getAddressInfo(){
          getAdress().then(res=>{
              if(res.status===1){
                sessionStorage.setItem('addressInfo',JSON.stringify(res.data))
              }else{
                this.$message({
                  message:res.msg,
                  type:'error'
                })
              }
          }).catch(()=>{

          })
        },
        getZoneInfo(){
          getZone().then(res=>{
              if(res.status===1){
                sessionStorage.setItem('zoneList',JSON.stringify(res.data))
              }else{
                this.$message({
                  message:res.msg,
                  type:'error'
                })
              }
          }).catch(()=>{

          })
        },

        getConfig(){
          getConf().then(res=>{
            if(res.status===1){
              sessionStorage.setItem('config',JSON.stringify(res.data))
            }else{
              this.$message({
                message:res.msg,
                type:'error'
              })
            }
          }).catch(()=>{

          })
        },
        getSearchInfo(){
          getSearch().then(res=>{
            if(res.status===1){
              sessionStorage.setItem('search',JSON.stringify(res.data))
            }else{
              this.$message({
                message:res.msg,
                type:'error'
              })
            }
          }).catch(()=>{

          })
        }



      },
      computed: {
        // 关于v-for v-if，data里未定义的变量遍历使用计算属性。否则使用v-for v-if配合使用
        routes: function () {
          return this.$router.options.routes.filter(function (item) {
            return !item.hidden
          })
        },

      },
    mounted(){
      this.iconSrc=this.userInfo.union_logo
      if(this.userInfo.purview){
        this.purviewStr=this.userInfo.purview
      }

    },
    created(){
      if(sessionStorage.getItem('userInfo')){
        this.userInfo=JSON.parse(sessionStorage.getItem('userInfo'))
      }else{
        this.getInfo()
      }
      if(!sessionStorage.getItem('addressInfo')){
        this.getAddressInfo()
      }
      if(!JSON.parse(sessionStorage.getItem('zoneList'))){
        this.getZoneInfo()
      }
      if(!JSON.parse(sessionStorage.getItem('config'))){
          this.getConfig()
      }
      if(!JSON.parse(sessionStorage.getItem('search'))){
          this.getSearchInfo()
      }




    }
  }
</script>
<style scoped lang="scss">
  .container{
    width: 100%;
    height:100vh;
    background-color: #f0f4f9;
  }
  .level_1_menu{
    width: 90px;
    height: 100vh;
    float: left;
    background-color: #31354b;
    position: relative;
  }
  .logo{
    padding-top: 18px;
    height: 42px;
    background-color: #2d303b;
    text-align: center;
    color:#cbedff;
    cursor: pointer;
    font-size: 12px;
    margin-bottom: 12px;
      i{
        font-size: 24px;
        margin-bottom: 4px;
      }
  }
  .logo:hover{
      color: #fff;
  }
  .level_1_menu_container{
    width: 100%;
    height:calc(100% - 72px);
    overflow: hidden;
      .level_1_menu_body{
        width: 100%;
        height:100%;
        .level_1_item{
          width: 70px;
          height: 64px;
          color:#cbedff;
          text-align: center;
          margin: 5px 10px;
          border-radius:3px;
          cursor:pointer;
          font-size:14px;
          i{
            font-size: 20px;
            margin:10px 0 6px;
          }
          a{
            color:#cbedff;
          }
        }
        .level_1_item_click{
          background-color: #00599c;
          color:#fff;
        }
        .level_1_item_active{
          background-color: #007fdf;
          color:#fff;
        }
      }
  }
  .level_1_menu_body{
    overflow-y: auto;
  }
  .level_1_item:hover{
    color: #fff!important;
    a{
      color: #fff!important;
    }
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  .level_1_menu_body::-webkit-scrollbar {
    width: 6px;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  .level_1_menu_body::-webkit-scrollbar-thumb {
    /*滚动条的背景区域的圆角*/
    border-radius: 10px;
    /*滚动条的背景区域的内阴影*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    /*滚动条的背景颜色*/
    background: #005391;
  }
  /*定义滑块 内阴影+圆角*/
  .level_1_menu_body::-webkit-scrollbar-track {
    /*滚动条的内阴影*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    /*滚动条的圆角*/
    border-radius: 0;
    /*滚动条的背景颜色*/
    background: rgba(0,0,0,0);
  }

  .level_2_menu_container{
    width: 176px;
    height: calc(100% - 60px);
    background-color: #fff;
    position: absolute;
    top: 60px;
    left: 90px;
    background: #fafdff;
    box-shadow: 1px 0 6px 0 rgba(165,192,207,.3);
    overflow: hidden;
    z-index:99;
  }
  .level_2_menu_body{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  .level_2_menu_body::-webkit-scrollbar {
    width: 4px;
  }
  /*定义滚动条轨道 内阴影+圆角*/
  .level_2_menu_body::-webkit-scrollbar-thumb {
    /*滚动条的背景区域的圆角*/
    border-radius: 10px;
    /*滚动条的背景区域的内阴影*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    /*滚动条的背景颜色*/
    background: #e5e5e5;
  }
  /*定义滑块 内阴影+圆角*/
  .level_2_menu_body::-webkit-scrollbar-track {
    /*滚动条的内阴影*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    /*滚动条的圆角*/
    border-radius: 0;
    /*滚动条的背景颜色*/
    background: rgba(0, 0, 0, 0);
  }

  .level_2_title{
    font-size: 18px;
    padding: 40px 0 30px 20px;
  }
  .level_2_menu_ul{

  }
  .level_2_menu_li{
    height: 42px;
    line-height: 42px;
    background-color: #f0f4f9;
    text-indent: 20px;
    cursor: pointer;
    color:#003359;
  }
  .level_2_menu_li:hover{
    background-color: #cbedff;
  }
  .level_2_menu_li_active{
    color:#007fdf;
  }

  .header{
    float: left;
    width: calc(100% - 90px);
    height: 60px;
    background-color: #31354b;
    color:#fff;
  }
  .icon{
    margin: 14px 0 0 30px;
  }

  .content{
    width: calc(100% - 90px);
    height: calc(100% - 60px);
    float: left;
    z-index: 9;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
  }
  /*.location{*/
    /*height: 60px;*/
    /*width: 150px;*/
    /*border: none;*/
    /*background-color: #fff;*/
    /*border-left: 1px solid #eef3f7;*/
    /*border-right: 1px solid #eef3f7*/
  /*}*/
  .user_name{
    border: none;
    color:#fff;
    background-color: #31354b;
    width: 80px;
    height: 60px;
  }
  .content_title{
    padding: 10px;
    /*border-left: 2px solid #2d8cf0;*/
    /*margin:8px 0 8px 10px;*/
    background-color: #fff;

  }
</style>

