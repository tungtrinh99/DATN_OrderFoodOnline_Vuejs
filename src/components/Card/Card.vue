<template>
  <a-card hoverable style="width: 240px">
    <img
      slot="cover"
      alt="example"
      :src="require('../../assets/images/Foods/foody-upload-api-foody-mobile-hmb-200410113701.jpg')"
    />
    <template slot="actions" class="ant-card-actions">
      <div class="content-promotion">
          <a-icon type="tag" />
          <span>Giảm giá 10%</span>
      </div>
      
    </template>
    <a-card-meta title="Quán bún dì Vân" description="445 Nguyễn Khang" style="margin : -16px">
     <a-icon type="safety" />
    </a-card-meta>
  </a-card>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.content-promotion{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding : 0 8px;
}
</style>
