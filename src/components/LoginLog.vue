<template>
  <section style="height: 100%">
    <div style="height: 32px;padding: 6px 0">
      <el-date-picker
        size="small"
        style="width: 220px;"
        v-model="search.time"
        type="daterange"
        start-placeholder="开始时间"
        end-placeholder="结束时间">
      </el-date-picker>
      <el-button size="small" type="primary" @click="searching">搜索</el-button>
    </div>
    <div style="height: calc(100% - 110px)">
      <el-table :data="loginLogList" style="height: 100%" max-height="100%">
        <!--<el-table-column label="操作ID" prop="id" width="90">-->
        <!--</el-table-column>-->
        <!--<el-table-column label="用户UID" prop="uid" width="90">-->
        <!--</el-table-column>-->
        <!--<el-table-column label="操作类型" prop="log_type" width="90">-->
        </el-table-column>
        <el-table-column label="操作详情" prop="log_data">
        </el-table-column>
        <el-table-column label="登录IP" prop="log_ip">
        </el-table-column>
        <el-table-column label="浏览器" prop="log_ie" width="90">
        </el-table-column>
        <el-table-column label="系统" prop="log_pc">
        </el-table-column>
        <el-table-column label="操作时间">
          <template slot-scope="scope">
            <span>{{scope.row.dateline | dataFormat('yyyy-MM-dd HH:mm')}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-col v-if="total>pageSize" style="padding: 20px;text-align: center">
      <el-pagination
        small
        layout="sizes,prev, pager, next"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </el-col>

  </section>
</template>
<script>
  import {
    getLoginLog,
  } from '@/api/api'

 export default{
    name:'LoginLog',
    props:{
      userUid:{
        type:String,
        default:'',
      },
      index:{
        type:String,
        default:''
      }
    },
   data(){
     return{
       page:1,
       pageSize:10,
       loginLogList:[],
       total:0,
        search:{
           time:[]
        }
     }
   },
    watch:{
      userUid(val){
        if(val!==""&&this.index=='登录日志'){
          this.page=1
          this. pageSize=10
          this.loginLogListLoad()
        }
      },
      index(val){
        if(val=='登录日志'&&this.userUid!==""){
          this.page=1
          this. pageSize=10
          this.loginLogListLoad()
        }
      },
    },
    methods:{
     loginLogListLoad(){
       let params={
         uid:this.userUid,
         page:this.page,
         pagesize:this.pageSize
       }
       getLoginLog(params).then(res=>{
         if(res.status===1){
             this.loginLogList=res.data.list
             this.total=res.data.total
         }else{
             this.$message({
               message:res.msg,
               type:'error'
             })
         }
       }).catch(()=>{

       })
     },
      handleSizeChange(val){
        this.page=1
        this.pageSize=val
        this.loginLogListLoad()
      },
      handleCurrentChange(val){
        this.page=val
        this.loginLogListLoad()
      },
      searching(){

      }

    },
   mounted(){

   }


 }
</script>
<style>

</style>
