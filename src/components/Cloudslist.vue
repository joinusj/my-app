<template>
  <section style="height: 100%;">
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
      <el-table :data="cloudsList" style="font-size: 12px;height: 100%;" max-height="100%">
        <el-table-column label="名称" max-width="140">
          <template slot-scope="scope" >
            <div class="font-blue clouds_name"
                 @click="openClouds(scope.row.id)"
                 :title="scope.row.name">{{scope.row.name}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="IP" prop="ip">
          <template slot-scope="scope">
            <span v-if="!scope.row.ip">-</span>{{scope.row.ip}}
          </template>
        </el-table-column>
        <el-table-column label="规格">
          <template slot-scope="scope">
            <div class="font-gray">
              <div>
                <span v-if="!scope.row.cpuNum">-</span><span>{{scope.row.cpuNum}}</span>核
                <span v-if="!scope.row.memorySize">-</span><span>{{scope.row.memorySize}}</span>G
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="地区">
          <template slot-scope="scope">
            <div>
              {{scope.row.zone_code | territory}}{{scope.row.cluster_code | cluster(scope.row.zone_code)}}
            </div>
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
        <!--<el-table-column label="到期时间">-->
          <!--<template slot-scope="scope">-->
          <!--<span :class="{'font-red':nowDate>(scope.row.end_dateline*1000-30*24*60*60*1000)}" >-->
            <!--{{scope.row.end_dateline | dataFormat('yyyy-MM-dd HH:mm')}}-->
          <!--</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="到期时间">
          <template slot-scope="scope">
          <span :class="{'font-red':nowDate>(scope.row.end_dateline*1000-30*24*60*60*1000)}" >
            {{scope.row.end_dateline | dataFormat('yyyy-MM-dd HH:mm')}}
          </span>
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
    getCloudslist,
  } from "@/api/api"
  export default{
      name:'CloudsList',
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
            nowDate: '',
            page:1,
            pageSize:10,
            total:0,
            cloudsList:[],
            search:{
                time:[]
            }
          }
      },
      watch:{
        userUid(val){
//          console.log(this.index)
          if(val!==""&&this.index=='云主机列表'){
              this.coludsListLoad()
          }
        },
        index(val){
//           console.log(val)
          if(val=='云主机列表'&&this.userUid!==""){
            this.coludsListLoad()
          }

        },

      },
      methods:{
        coludsListLoad(){
            let params={
                uid:this.userUid,
                page:this.page,
                pagesize:this.pageSize
            }
          getCloudslist(params).then(res=>{
//              console.log(res.data)
            if(res.status===1){
                this.cloudsList=res.data.list
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
        openClouds(id){
            this.$emit('titleChange',{
              title:'clouds',
              id:id
            })
        },
        handleSizeChange(val){
          this.page=1
          this.pageSize=val
          this.coludsListLoad()
        },
        handleCurrentChange(val){
          this.page=val
          this.coludsListLoad()
        },
        searching(){

        }


      },
    mounted(){
      this.nowDate=new Date().getTime()
    }
  }
</script>
<style lang="scss" scoped>
  .clouds_name{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    max-width: 140px;
    cursor: pointer;
  }
  .clouds_name:hover{
    text-decoration: underline;
  }
</style>
