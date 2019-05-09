<template>
  <div id="app">
    <!--<router-link to="/home">Home</router-link>-->
    <!--<router-link to="/hello_world">About</router-link>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  body{
    padding: 0;
    margin: 0;
    /*background-color: #f0f4f9;*/
    min-width: 1280px;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #333;
    /*margin-top: 60px;*/
    box-sizing: border-box;
  }
  .toolbar {
    background: #fff;
    padding: 0px 10px 10px;
    border-bottom:1px solid #dfe6ec;
    margin:0 0 10px 0px;
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .el-table .cell, .el-table th div{
    overflow: visible;
  }
  .el-menu--horizontal>.el-menu-item {
    float: left;
    height: 40px;
    line-height: 41px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #909399;
  }



  .font-gray {
    color: #ababab;
  }
  .font-blue {
    color: #1598db;
  }
  .font-red {
    color: #f00;
  }
  .font-failed {
    color: #ed4014;
  }
  .font-green{
    color: #009f3d;
  }
  .font-org{
    color:#ff9900;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #fff !important;
  }
 .el-input-group__prepend {
    background-color: #fff;
  }

  .pop_title{
    /*overflow: hidden;*/
  }
  .pop_icon,.pop_operation,.pop_tabs{
    float: left;
    cursor: pointer;
  }
  .pop_icon{
    width: 50px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 24px;
  }
  .pop_operation{
    width: 140px;
    height: 48px;
  }
  .pop_tabs{
    width: calc(100% - 190px);
    padding-top: 6px;
  }
  .pop_tab{
    float: left;
    padding: 8px 10px;
    font-size: 12px;
    cursor: pointer;
  }
  .pop_tab_active{
    color: #3c73b9;
    border-bottom: 2px solid #007fdf;
  }
  .checkedLine{
    float: left;
    width: 10px;
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0px;
    z-index: 999;
  }
  .systemImage0{
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('../static/img/server-icon.png') 100% no-repeat;
    background-position: 0 4px;
  }
  .systemImage1{
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('../static/img/server-icon.png') 100% no-repeat;
    background-position: 0 -26px;
  }
  .systemImage2{
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('../static/img/server-icon.png') 100% no-repeat;
    background-position: 0 -56px;
  }
  .systemImage3{
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('../static/img/server-icon.png') 100% no-repeat;
    background-position: 0 -86px;
  }
  .systemImage4{
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('../static/img/server-icon.png') 100% no-repeat;
    background-position: 0 -116px;
  }

  .menu{
    height: 41px;
    overflow: hidden
  }
  .menu_item{
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    float: left;
    border-bottom: 1px solid #fff;
    cursor: pointer;
  }
  .menu_item_active{
    border-bottom: 1px solid #2d8cf0;
  }

</style>
