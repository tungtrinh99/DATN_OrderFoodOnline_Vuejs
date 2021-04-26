<template>
  <base-list
   :textTitle="title"
   :entity="entity"
   :isAction = "isAction"
   :isAdd = "isAdd"
  ></base-list> 
</template>

<script>
import BaseList from '../../BasePage/BaseList'
const entity = "customer";
export default {

  data(){
    return{
      title : 'Khách hàng',
      entity,
      isAction :true,
      isAdd :true,
    }
  },
  components:{
    'base-list':BaseList
    
  }
}
</script>

<style>

</style>