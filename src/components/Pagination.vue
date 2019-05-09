<template>
  <section>
      <el-row>
        <el-col>
          <el-select v-model="pageSizes" size="mini" style="width: 70px;" @change="pageSizeChange">
            <el-option v-for="(item,index) in pageSizeArr" :value="item" :label="item" :key="index"></el-option>
          </el-select>
          <el-button style="width: 30px;padding: 7px" icon="el-icon-arrow-left" size="mini" @click="pageChange('-')" :disabled="page==1"></el-button>
          <span @click="openPageControl"  v-if="!pageControl">{{page}}</span>
          <!--/<span>{{totalPage}}</span>-->
          <!--<el-input-number v-model="pageNum"-->
                           <!--v-if="pageControl"-->
                           <!--controls-position="right"-->
                           <!--@change="pageChange"-->
                           <!--size="mini"-->
                           <!--style="width: 90px;"-->
                           <!--:min="1"-->
                           <!--:max="totalPage">-->
          <!--</el-input-number>-->
          <el-input
              v-show="pageControl"
              size="mini"
              @change="pageNumChange"
              @blur="pageNumBlur"
              style="width: 50px;"
              v-model="pageNum"></el-input>
          /
          <span>{{totalPage}}</span>
          <el-button style="width: 30px;padding: 7px" icon="el-icon-arrow-right" size="mini" @click="pageChange('+')" :disabled="page==totalPage"></el-button>
        </el-col>
      </el-row>
  </section>
</template>
<script>
  export default{
      name:'Pagination',
      props:{
        totalPage:{
            type:Number,
            default:0
        },
        page:{
          type:Number,
          default:1
        },
        pageSize:{
          type:Number,
          default:10
        }
      },
      data(){
          return{
            pageSizeArr:[10,20,50,100],
            pageSizes:10,
            pageNum:'',
            pageControl:false
          }
      },
      watch:{
        page(val){
            this.pageNum=val
        },
        totalPage(val){

        }
      },
      methods:{
        pageSizeChange(val){
            this.pageSizes=val
            this.$emit('pageSize',{
                value:val
            })
        },
        pageChange(val){
//            this.pageControl=false
            let page=this.page
            if(val=='-'){
              page--
            }else if(val=='+'){
              page++
            }else{
              page=val
            }
//            this.page=page
            this.$emit('pageChange',{
                page:page
            })
        },
        openPageControl(){
            this.pageControl=true
            this.pageNum=this.page
        },
        pageNumChange(val){
          this.pageNum=Number(val.replace(/[^\d]/g,''))
          console.log(this.pageNum)
          if(this.pageNum==this.page){
            this.pageChange(Number(this.pageNum))
          }else{
              if(Number(this.pageNum)>Number(this.totalPage)){
                this.pageNum=this.totalPage
                this.pageChange(Number(this.pageNum))
              }else{
                this.pageNum=Number(val)
                this.pageChange(Number(val))
              }

          }
        },
        pageNumBlur(){
            this.pageControl=false
        }

      },
    mounted(){
      this.pageNum=this.page
    },

  }
</script>
<style>

</style>
