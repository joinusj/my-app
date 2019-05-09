<template>
  <section style="position: relative;">
    <el-row>
      <el-col :span="24" class="toolbar">
        <el-form :model="search" :inline="true">
          <el-form-item>
            <el-select v-model="search.timeType" size="small" style="width: 110px;" placeholder="到期时间">
              <el-option v-for="(item,key) in timeType" :key="key" :label="item" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.zone" size="small" style="width: 90px;" placeholder="地区">
              <el-option v-for="(item,key) in zoneList" :key="key" :label="item.zone_name" :value="item.zone_code"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="position: relative;">
            <el-button size="small"  icon="fa fa-user" v-popover:popover> 选择用户</el-button>
            <!--<el-col style="width: 500px;height:300px;background-color: #fff;position: absolute;top:38px;left: 0;">-->
              <!--<el-col :span="24" style="padding: 4px 10px;background-color: #f0f0f0;">-->
                <!--<el-input placeholder="清输入邮箱关键词" size="small" style="width: 180px;"></el-input>-->
                <!--<el-button size="small">搜索</el-button>-->
                <!--&lt;!&ndash;<el-pagination&ndash;&gt;-->
                  <!--&lt;!&ndash;small&ndash;&gt;-->
                  <!--&lt;!&ndash;layout="prev, pager, next"&ndash;&gt;-->
                  <!--&lt;!&ndash;:total="">&ndash;&gt;-->
                <!--&lt;!&ndash;</el-pagination>&ndash;&gt;-->
              <!--</el-col>-->
            <!--</el-col>-->
            <el-popover
              ref="popover"
              placement="bottom"
              width="200"
              trigger="click">
              dfdsf
              <br>
              sdfdsd<br>
              fdsfd<br>
              dsf
            </el-popover>
          </el-form-item>


          <el-form-item>
            <el-select placeholder="CPU" size="small" v-model="search.cpu" @change="cpuChange" style="width: 80px;">
              <el-option v-for="(item,index) in cpu_memory" :label="index+'核'" :value="index" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select placeholder="内存" size="small" v-model="search.memory" style="width: 80px;">
              <el-option v-for="(item,index) in memory" :label="item+'G'" :value="item" :key="index"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item>
            <el-date-picker
              size="small"
              style="width: 220px;"
              v-model="search.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="search.searchType" size="small" style="width: 100px;" placeholder="搜索类型 ">
              <el-option value="1" label="姓名"></el-option>
              <el-option value="2" label="电话"></el-option>
              <el-option value="3" label="邮箱"></el-option>
              <el-option value="4" label="用户UID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="search.keyword" placeholder="关键字" size="small" style="width: 120px;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button size="small" type="success" @click="searchs">
              搜索
            </el-button>
          </el-form-item>
        </el-form>
        <div style="overflow: hidden;height: 32px;">
          <!--<el-button size="small">锁定</el-button>-->
          <!--<el-button size="small">开启</el-button>-->
          <el-pagination
            small
            style="float: right;"
            layout="sizes,prev, pager, next"
            @current-change="changePage"
            @size-change="handleSizeChange"
            :page-sizes="[10, 20, 50, 100]"
            :total="total">
          </el-pagination>
        </div>

      </el-col>
    </el-row>

    <el-row  style="padding-bottom: 40px;height: calc(100vh - 182px);">
      <el-table :data="escList"
                ref="table"
                style="cursor: pointer;height: 100%;"
                max-height="100%"
                @row-click="rowClick"
                @selection-change="selectionChange">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column label="服务器名" width="128" style="position: relative;">
          <template slot-scope="scope">
            <div class="clouds_name font-blue" :title="scope.row.name" @click="openModal(scope.row.id,$event)">
              {{scope.row.name }}
            </div>
            <!--<div class="font-gray" style="font-size: 12px;">[{{scope.row.uuid}}-{{scope.row.id}}]</div>-->
            <div class="checkedLine" v-if="openId===scope.row.id">
            </div>
          </template>
        </el-table-column>
        <!--<el-table-column label="手机">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.mobile}}</span>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column label="用户名称">
          <template slot-scope="scope">
            <span>{{scope.row.realname}}</span>
            <span class="font-gray" style="font-size: 12px;">[ID:{{scope.row.id}}]</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="uuid">-->
          <!--<template slot-scope="scope">-->
            <!--<span style="font-size: 12px;">{{scope.row.uuid}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="系统">
          <template slot-scope="scope">
            <!--ostype-->
            <span :class="{
                              systemImage0: scope.row.ostype==='win',
                              systemImage1: scope.row.ostype==='ubuntu',
                              systemImage2: scope.row.ostype==='freebsd',
                              systemImage3: scope.row.ostype==='debian',
                              systemImage4: scope.row.ostype==='centos'
                                }"
                  :title="scope.row.ostype"></span>
            <span class="fa fa-unlock font-gray" v-if="scope.row.inlock==0" style="vertical-align: top;padding-top: 9px;"></span>
            <span class="fa fa-lock font-gray" v-if="scope.row.inlock==1" style="vertical-align: top;padding-top: 9px;"></span>
            <!--inlock-->
          </template>
        </el-table-column>
        <el-table-column label="IP" prop="ip">
        </el-table-column>
        <el-table-column label="规格">
          <template slot-scope="scope">
            <span v-if="!scope.row.cpuNum">-</span><span class="font-red">{{scope.row.cpuNum}}</span>核
            <span v-if="!scope.row.memorySize">-</span><span class="font-red">{{scope.row.memorySize}}</span>G
          </template>
        </el-table-column>
        <el-table-column label="地区">
          <template slot-scope="scope">
            {{scope.row.zone_code | territory}}{{scope.row.cluster_code | cluster(scope.row.zone_code)}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
          <span v-if="scope.row.status>0">
            <i v-if="scope.row.state=='Running'" class="fa fa-circle font-green"></i>
            <i v-if="scope.row.state==='Stopped'" class="fa fa-circle font-red"></i>
            <i v-if="scope.row.state==='Paused'" class="fa fa-circle font-failed"></i>
            <i v-if="scope.row.state==='Destroyed'" class="fa fa-circle font-gray"></i>
            <i v-else class="font-failed'"></i>
            {{scope.row.state | status}}
          </span>
            <span v-if="scope.row.status==0">
            <i class="fa fa-circle font-failed"></i>
            创建中
          </span>
            <span v-if="scope.row.status<0">
            <i class="fa fa-circle font-red"></i>
            创建失败
          </span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
          <span >
            {{scope.row.dateline | dataFormat('yyyy-MM-dd')}}
          </span>
          </template>
        </el-table-column>
        <el-table-column label="到期时间">
          <template slot-scope="scope">
          <span :class="{'font-red':nowDate>(scope.row.end_dateline*1000-30*24*60*60*1000)}" >
            {{scope.row.end_dateline | dataFormat('yyyy-MM-dd')}}
          </span>
          </template>
        </el-table-column>
      </el-table>



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
      <basic-config :id="cloudsUid"
                     :index="cloudsVisible"
                     v-show="cloudsVisible=='基本属性'&&tabs[tabs.length-1]==='clouds'">
      </basic-config>
      <config-inform :id="cloudsUid"
                     :index="cloudsVisible"
                     v-show="cloudsVisible=='配置信息'&&tabs[tabs.length-1]==='clouds'">
      </config-inform>


    </popup>


  </section>
</template>
<script>

  import {
    getEcsList,//获取云主机列表
  } from "@/api/api"

  import Popup from "@/components/Popup"
  import BasicConfig from "@/components/BasicConfig"//云主机基本属性
  import ConfigInform from "@/components/ConfigInform"//云主机配置信息

  export default{
      components:{
        Popup,
        BasicConfig,
        ConfigInform
      },
      data(){
          return{
            search:{
              nowDate: '',
              uid:'',
              searchType:'',
              keyword:'',
              timeType:'',
              zone:'',
              cpu:'',
              memory:'',
              time:[]
            },
//            keyword:'',
//            searchType:'',
            timeType:{},
            zoneList:[],
            cpu_memory:{},
            memory:[],
//            escParams:{
//              page:1,
//              pagesize:10,
//              uid:'',       //int
//              zone:'',      //区域str
//              type:"",      //时间类型int
//              searchType:"",//搜索类型 1-ip 2-uuid 3-姓名 4-云主机名称 int
//              keyword:'',   //关键字str
//              timeType:'',  //搜索时间类型1-创建时间 2-到期时间
//              date:[],      //起止时间
//              cpu:'',       //int
//              momory:''     //int
//            },
            escList:[],
            page:1,
            pageSize:10,
            total:0,
            popupModal:false,
            openId:'',
            tabs:[],
            userTabArr:['基本信息','云主机列表','云主机订单','充值订单','资金流水','登录日志','操作日志','推广客户','推广客户订单'],
            cloudsTabArr:['基本属性','配置信息','订单信息','操作日志'],
            userTabIndex:0,
            cloudsTabIndex:0,
            cloudsUid:'',
            cloudsVisible:''


          }
      },
      methods:{
        searchs(){
//            console.log(this.search)
            this.ecsListload()
        },
        cpuChange(val){
            this.memory=this.cpu_memory[val]
            this.search.memory=""
        },
        ecsListload(){
          const escParams={
              page:this.page,
              pagesize:this.pageSize,
              uid:this.search.uid,       //int
              zone:this.search.zone,      //区域str
//              type:"",      //时间类型int
              searchType:this.search.searchType,//搜索类型 1-ip 2-uuid 3-姓名 4-云主机名称 int
              keyword:this.search.keyword,   //关键字str
              timeType:this.search.timeType,  //搜索时间类型1-创建时间 2-到期时间
              date:this.search.time,      //起止时间
              cpu:this.search.cpu,       //int
              momory:this.search.memory     //int
          }
//          this.escParams.zone=this.search.zone
          getEcsList(escParams).then(res=>{
            if(res.status===1){
                this.escList=res.data.list
                this.total=res.data.total
            }else{
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          }).catch(()=>{

          })
        },
        rowClick(row){
          this.$refs.table.toggleRowSelection(row);
        },
        selectionChange(row){
//          console.log(row)
        },
        openModal(id,e){
          if (e && e.stopPropagation){
            //因此它支持W3C的stopPropagation()方法
            e.stopPropagation();
          }else{
            window.event.cancelBubble = true;
          }
//            console.log(id)
          this.cloudsUid=id
          this.openId=id
          this.popupModal=true
          this.tabs=['clouds']
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
        comeBack(){

        },
        closePopup(){
          this.popupModal=false
        },

        changePage(val){
          this.page=val
          this.ecsListload()
        },
        handleSizeChange(val){
          this.page=1
          this.pagesize=val
          this.ecsListload()
        }


      },
      mounted(){
        this.nowDate=new Date().getTime()
        this.timeType=JSON.parse(sessionStorage.getItem('search')).type
        this.zoneList=JSON.parse(sessionStorage.getItem('zoneList'))
        this.search.zone=this.zoneList[0].zone_code
        this.cpu_memory=JSON.parse(sessionStorage.getItem('search')).cpu_memory

        this.ecsListload()
        this.cloudsVisible=this.cloudsTabArr[0]

      }
  }
</script>
<style lang="scss" scoped>
  .clouds_name{
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .clouds_name:hover{
    text-decoration: underline;
  }
</style>
