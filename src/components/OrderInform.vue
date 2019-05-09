<template>
  <section>

  </section>
</template>
<script>
  export default{
      name:'OrderInform',
      props:{
        id:{
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

          }
      },
      watch:{
        id(val){
          if(val!==""&&this.index=='订单信息'){
            console.log(1)
          }
        },
        index(val){
//             console.log(val)
          if(val=='订单信息'&&this.id!==""){
            console.log(1)
          }

        },
      },
      methods:{

      }
  }
</script>
<style>

</style>
