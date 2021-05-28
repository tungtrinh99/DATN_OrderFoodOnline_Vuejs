<template>
  <div class="single-card" :style="{background : overviewCard.background ? overviewCard.background : ''}">
    <!-- <img :src="require('../../../../../public/images/'+overviewCard.icon)" :style="{width : overviewCard.width +'px',height:overviewCard.height+'px'}"> -->
    <a-icon :type="overviewCard.icon" style="color:white;font-size :40px;margin-bottom :12px"/>
    <h4>{{overviewCard.title}}</h4>
    <h3><span class="counter">{{overviewCard.count ? Intl.NumberFormat('vi-VN').format(Number.parseFloat(overviewCard.count).toFixed(0)) : 0 }}</span> {{overviewCard.unit}}</h3>
  </div>
</template>

<script>
export default {
  props:{
    overviewCard : Object
  }
}
</script>

<style scoped>
.single-card {
  background-color: #fff;
  border-radius: 6px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  padding: 16px 24px;
  position: relative;
  background: #3B76EF;
}
.single-card::before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  content: '';
  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  background-size: cover;
}
.single-card > img {
  margin-bottom: 16px;
}
.single-card h4 {
  font-size: 14px;
  margin-bottom: 0;
  font-weight: 700;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  color: #fff;
  margin-bottom: 8px;
}
.single-card h3 {
  font-size: 24px;
  line-height: 40px;
  margin-bottom: 0;
  font-weight: 900;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  color: #fff;
  margin-bottom: 8px;
}
.single-card p {
  -webkit-transition: 0.5s;
  transition: 0.5s;
  font-size: 13px;
  font-weight: 400;
  color: #fff;
}
</style>