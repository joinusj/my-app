<template>
  <section class="container">
    <el-row>
      <el-col>
        <global-header>
          <template slot-scope="scope" slot="menu">
            <ul class="menu">
              <li class="menu_item"
              v-for="(item,index) in menu"
              :class="{'menu_item_active':activeMenu==index}"
              :key="index"
              @click.narive="chooseMenu(index)">
              {{item}}
              </li>
            </ul>
          </template>
        </global-header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"  class="toolbar">
        <el-form :model="search" :inline="true">
          <el-form-item>
            <el-button type="primary" size="mini" icon="el-icon-refresh" @click="loadUserList">
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="search.keyword" placeholder="关键字" size="mini" style="width: 280px;" v-show="searchOpen">
              <el-select v-model="search.searchType" size="small" slot="prepend" style="width: 100px;" placeholder="搜索类型 ">
                <el-option :value="1" label="姓名"></el-option>
                <el-option :value="2" label="电话"></el-option>
                <el-option :value="3" label="用户UID"></el-option>
              </el-select>
              <el-button icon="el-icon-search" slot="append" size="small" @click="loadUserList">
              </el-button>
            </el-input>
            <el-button :icon="searchOpen?'el-icon-close':'el-icon-search'"  @click="searchOpen=!searchOpen" size="mini" round></el-button>
            <!--<el-form-item>-->
              <!--<el-button size="small" type="primary">-->
                <!--搜索-->
              <!--</el-button>-->
            <!--</el-form-item>-->
          </el-form-item>
          <el-form-item style="float: right;">
            <pagination @pageSize="pageSizeChange"
                        @pageChange="pageChange"
                        :totalPage="totalPage"
                        :page="page">

            </pagination>
          </el-form-item>
          <!--<el-pagination-->
            <!--small-->
            <!--style="float: right;"-->
            <!--layout="sizes,prev, pager, next"-->
            <!--@current-change="changePage"-->
            <!--@size-change="handleSizeChange"-->
            <!--:page-sizes="[10, 20, 50, 100]"-->
            <!--:total="total">-->
          <!--</el-pagination>-->
        </el-form>
          <!--<el-button size="small">批量发邮件</el-button>-->
          <!--<el-button size="small">新增用户</el-button>-->



      </el-col>

    </el-row>
    <el-row  style="padding-bottom: 40px;height: calc(100vh - 182px);">
      <el-table :data="userListData"
                ref="table"
                style="cursor: pointer;height: 100%;"
                @row-click="rowClick"
                max-height="100%"
                @sort-change="sortChange"
                @selection-change="selectionChange">
        <!--红色 超管 蓝色 在线 灰色不在线 黑色 会员-->
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column label="用户名" width="128" style="position: relative" sortable="custom" prop="uid">
          <template slot-scope="scope">
            <div class="user_name"
                 style="width: 100%;padding: 0;"
                 @click="openDetail($event,scope.row)">
              <i class="fa fa-user"
                 :title="scope.row.online?'在线':'离线'"
                :class="{'online':scope.row.online,'outline':!scope.row.online}">
              </i>
              <span v-if="scope.row.realname" :class="{'font-red':scope.row.uurole>0,'outline':scope.row.uurole<0}">{{scope.row.realname}}</span>
              <span v-if="!scope.row.realname">{{scope.row.mobile}}</span>

            </div>
            <div class="checkedLine" v-if="userUid===scope.row.uid">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="推荐人">
          <template slot-scope="scope">
            <div v-if="scope.row.from_name">
              <span>{{scope.row.from_name}}</span>
              <span v-if="scope.row.inlock>0" class="fa fa-lock" style="font-size: 12px;color:gold"></span>
            </div>
            <div v-else>
              -
              <span v-if="scope.row.inlock>0" class="fa fa-lock" style="font-size: 12px;color:gold"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实名认证">
          <template slot-scope="scope">
            <span v-if="scope.row.idcardrz==0" class="font-gray">未认证</span>
            <span v-if="scope.row.idcardrz==1" class="font-green">已认证</span>
          </template>
        </el-table-column>
        <el-table-column label="企业认证">
          <template slot-scope="scope">
            <span v-if="scope.row.companyrz==0" class="font-gray">未认证</span>
            <span v-if="scope.row.companyrz==1" class="font-green">已通过</span>
            <span v-if="scope.row.companyrz==2" class="font-blue">已提交</span>
            <span v-if="scope.row.companyrz==3" class="font-red">未通过</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="用户类型">-->
          <!--<template slot-scope="scope">-->
            <!--<span v-if="scope.row.utype==1">个人</span>-->
            <!--<span v-if="scope.row.utype==2">企业</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="所属部门">-->
          <!--<template slot-scope="scope">-->
            <!--{{scope.row.depart | user_depart}}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="账户余额" sortable="custom" prop="balance">
          <template slot-scope="scope">
            <div class="font-org">
              <span v-if="!scope.row.balance">￥ 0.00</span>
              <span v-if="scope.row.balance">￥ {{scope.row.balance}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="云主机数量" sortable="custom" prop="vms">
          <template slot-scope="scope" >
            <div class="font-org">
              <span v-if="!scope.row.vms">0</span>
              <span v-if="scope.row.vms" >{{scope.row.vms}} </span>台
            </div>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" sortable="custom" prop="regdateline">
          <template slot-scope="scope">
            {{scope.row.regdateline | dataFormat('yyyy-MM-dd HH:mm')}}
          </template>
        </el-table-column>
        <el-table-column label="登录时间" sortable="custom" prop="logdateline">
          <template slot-scope="scope">
            {{scope.row.logdateline | dataFormat('yyyy-MM-dd HH:mm')}}
          </template>
        </el-table-column>

      </el-table>




    </el-row>
    <popup :visible="popupModal">
      <!--头部-->
      <template slot-scope="scope" slot="title">
        <div class="pop_title">
          <div class="pop_icon">
            <i class="el-icon-arrow-left" v-if="tabs.length>1" @click="comeBack"></i>
            <i class="el-icon-close" v-if="tabs.length===1" @click="closePopup"></i>
          </div>
          <div class="pop_operation">
            <el-dropdown trigger="click">
              <!--<span class="el-dropdown-link">-->
                <!--云主机操作<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
              <!--</span>-->
              <el-button plain class="el-dropdown-link" style="margin-top: 4px;">
                用户操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">批量操作</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="pop_tabs">
            <div class="pop_tab"
                 v-for="(item,index) in userTabArr"
                 :key="index"
                 v-if="tabs[tabs.length-1]==='user'"
                 @click="changeUserTab(index,item)"
                 :class="{pop_tab_active:index===userTabIndex}">
              {{item}}
            </div>
            <div class="pop_tab"
                 v-for="(item,index) in cloudsTabArr"
                 @click="changeCloudsTab(index,item)"
                 v-if="tabs[tabs.length-1]==='clouds'"
                 :class="{pop_tab_active:index===cloudsTabIndex}">
              {{item}}
            </div>

          </div>
        </div>
      </template>
      <!--内容部分-->
      <basic-inform :userUid="userUid" :index="userVisible" v-show="userVisible=='基本信息'&&tabs[tabs.length-1]==='user'"></basic-inform>
      <clouds-list :userUid="userUid"
                   :index="userVisible"
                   @titleChange="changeTitle"
                   v-show="userVisible=='云主机列表'&&tabs[tabs.length-1]==='user'">
      </clouds-list>
      <clouds-order :userUid="userUid"
                    :index="userVisible"
                    v-show="userVisible=='云主机订单'&&tabs[tabs.length-1]==='user'">
      </clouds-order>
      <recharge-order :userUid="userUid"
                      :index="userVisible"
                      v-show="userVisible=='充值订单'&&tabs[tabs.length-1]==='user'">
      </recharge-order>
      <login-log :userUid="userUid"
                  :index="userVisible"
                  v-show="userVisible=='登录日志'&&tabs[tabs.length-1]==='user'">
      </login-log>
      <operation-log :userUid="userUid"
                     :index="userVisible"
                     v-show="userVisible=='操作日志'&&tabs[tabs.length-1]==='user'">
      </operation-log>



      <basic-config :id="cloudsUid"
                     :index="cloudsVisible"
                     v-show="cloudsVisible=='基本属性'&&tabs[tabs.length-1]==='clouds'">
      </basic-config>
      <config-inform :id="cloudsUid"
                     :index="cloudsVisible"
                     v-show="cloudsVisible=='配置信息'&&tabs[tabs.length-1]==='clouds'">
      </config-inform>
      <order-inform :id="cloudsUid"
                    :index="cloudsVisible"
                    v-show="cloudsVisible=='订单信息'&&tabs[tabs.length-1]==='clouds'">
      </order-inform>



    </popup>
  </section>
</template>
<script>
  import {
    getUserList,//获取用户列表
  } from '@/api/api'

  import Popup from "@/components/Popup"//弹出层
  import GlobalHeader from "@/components/GlobalHeader"
  import Pagination from "@/components/Pagination"

  import BasicInform from "@/components/BasicInform"//基本信息
  import CloudsList from "@/components/CloudsList"//云主机列表
  import CloudsOrder from "@/components/CloudsOrder"//云主机订单
  import RechargeOrder from "@/components/RechargeOrder"//充值订单

  import LoginLog from "@/components/LoginLog"//登录日志
  import OperationLog from "@/components/OperationLog"//用户操作日志

  import BasicConfig from "@/components/BasicConfig"//云主机基本属性
  import ConfigInform from "@/components/ConfigInform"//云主机配置信息
  import OrderInform from "@/components/OrderInform"//订单信息


  export default{
    name:'memberlist',
    components:{
      Popup,
      GlobalHeader,
      Pagination,

      BasicInform,
      CloudsList,
      CloudsOrder,
      RechargeOrder,
      LoginLog,
      OperationLog,


      BasicConfig,
      ConfigInform,
      OrderInform
    },
    data(){
      return{
        searchOpen:false,
        activeName:'',
        page:1,
        pageSize:10,
        totalPage:0,
        total:0,
        search:{
          utype:'',
          searchType: 1,
          keyword:'',
          field_name:null,//排序项目 {uid,regdateline,logdateline,balance,vms}
          field_type:null,
        },
        userListData:[],
        popupModal:false,
        operation:"",
        tabs:[],
        userTabArr:['基本信息','云主机列表','云主机订单','充值订单','资金流水','登录日志','操作日志','推广客户','推广客户订单'],
        cloudsTabArr:['基本属性','配置信息','订单信息'],
        userTabIndex:0,
        cloudsTabIndex:0,
        userUid:'',
        userVisible:'',

        cloudsUid:'',
        cloudsVisible:'',
        menu:['个人','企业'],
        activeMenu:0

      }
    },
    methods:{
      chooseMenu(index){
        this.activeMenu=index
        this.search.utype=index+1
        this.page=1
        this.pageSize=10
        this.loadUserList()
      },
      pageSizeChange(val){
          this.page=1
          this.pageSize=val.value
          this.loadUserList()
      },
      pageChange(val){
        this.page=val.page
        this.loadUserList()
      },
//      changePage(val){
//        this.page=val
//        this.loadUserList()
//      },
//      handleSizeChange(val){
//        this.page=1
//        this.pageSize=val
//        this.loadUserList()
//      },
      sortChange(val){
//          console.log(val)
          this.search.field_name=val.prop
          if(val.order=='ascending'){
            this.search.field_type='ASC'
          }else if(val.order=='descending'){
            this.search.field_type='DESC'
          }else{
            this.search.field_type=val.order
          }
          this.loadUserList()
      },

      loadUserList(){
        this.popupModal=false
        this.userUid=''
        const listParams={
          page:this.page,
          pagesize:this.pageSize,
          utype:this.search.utype,
          search_type:this.search.searchType,
          keyword:this.search.keyword,
          field_name:this.search.field_name,
          field_type:this.search.field_type
        }
        getUserList(listParams).then(res=>{
//            console.log(res)
          if(res.status===1){
              this.userListData=res.data.list
              this.total=res.data.total
              this.totalPage=res.data.totalpage
          }else{
              this.$message({
                message:res.msg,
                type:'error'
              })
          }
        }).catch(()=>{

        })
      },
      rowClick(row){
//          console.log(row)
        this.popupModal=false
        this.userUid='',
        this.$refs.table.toggleRowSelection(row);
      },
      selectionChange(row){
//          console.log(row)
      },
      openDetail(e,row){
//          console.log(e)
//        console.log(row)
//        this.userObj=row
        if (e && e.stopPropagation){
          //因此它支持W3C的stopPropagation()方法
          e.stopPropagation();
        }else{
          window.event.cancelBubble = true;
        }
        this.userUid=row.uid
        this.popupModal=true
        this.tabs=['user']
//        this.tabIndex=0
//        this.visible=this.tabArr[0]
//        return false;
      },
      changeUserTab(val,item){
//        console.log(val)
        this.userVisible=item
        this.userTabIndex=val
      },
      changeCloudsTab(val,item){
//        console.log(val)
        this.cloudsVisible=item
        this.cloudsTabIndex=val
      },
      changeTitle(val){
//          console.log(val)
        this.tabs.push(val.title)
        this.cloudsUid=val.id



      },
      closePopup(){
        this.popupModal=false
        this.userUid=''
      },
      comeBack(){
          this.tabs.pop()
      },




    },
    mounted(){
      this.loadUserList()
      this.userVisible=this.userTabArr[0]
      this.cloudsVisible=this.cloudsTabArr[0]
    }
  }
</script>
<style lang="scss" scoped>
  .container{
    width: 100%;
    height: 100%;
    /*overflow: auto;*/
    position: relative;
  }
  .user_name:hover{
    text-decoration:underline
  }
  .user_name{
    position: relative;
  }

  .online{
    color:#009f3d;
  }
  .outline{
    color:#7d8c91;
  }


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
