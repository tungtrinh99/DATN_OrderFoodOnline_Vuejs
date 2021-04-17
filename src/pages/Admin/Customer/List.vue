<template>
  <base-list
   :textTitle="title"
   :entity="entity"
   :isAction = "isAction"
   :isAdd = "isAdd"
   :id="role"
  ></base-list> 
</template>

<script>
import BaseList from '../../BasePage/BaseList'
const entity = "user";
export default {

  data(){
    return{
      title : 'Khách hàng',
      entity,
      isAction :true,
      isAdd :true,
      role : 2
    }
  },
  components:{
    'base-list':BaseList
    
  }
}
</script>

<style>

</style>