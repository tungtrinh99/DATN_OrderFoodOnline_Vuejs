<template>
  <div class="content">
    <div class="now-detail-restaurant clearfix"> 
      <div class="menu-restaurant container">
        <a-row>
          <a-col :span="5">

          </a-col>
          <a-col :span="12">
            <list-food :id="1"></list-food>
          </a-col>
          <a-col :span="1"></a-col>
          <a-col :span="6">
            <cart></cart>
          </a-col>
        </a-row>
        
      </div>
    </div>
  </div>
</template>
<script>
import ListFood from "../Goods/List";
import Cart from "../../../components/Cart/List"
export default {
  components: {
    "list-food": ListFood,
    Cart
  },
};
</script>
<style scoped>
.now-detail-restaurant {
  background-color: #f2f2f2;
  padding-top: 100px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.now-detail-restaurant .detail-restaurant-img {
  width: 480px;
  height: 300px;
  position: relative;
  float: left;
}
.now-detail-restaurant .detail-restaurant-img img {
  width: 100%;
  height: 100%;
}

.now-detail-restaurant .detail-restaurant-info {
  color: #252525;
  float: right;
  width: 645px;
  padding-bottom: 15px;
  text-align: left;
}
.detail-restaurant-info > .breadcrumb {
  padding-left: 0;
  margin-bottom: 18px;
  list-style: none;
  overflow: hidden;
  margin-top: -2px;
}
.now-detail-restaurant .name-restaurant {
  font-size: 22px;
  color: #464646;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 4px;
  line-height: 33px;
}
.now-detail-restaurant .address-restaurant {
  font-size: 13px;
  margin-bottom: 2px;
}
.now-detail-restaurant .rating {
  margin-bottom: 4px;
  font-size: 14px;
}
.rating {
  font-size: 18px;
  vertical-align: middle;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.rating .stars {
  font-size: 14px;
  color: #ffc107;
  display: inline-block;
}
.rating .stars > span {
  padding-right: 2px;
}
.now-detail-restaurant .kind-restaurant {
  font-size: 11px;
  color: #959595;
  text-transform: uppercase;
  display: -ms-flexbox;
  display: flex;
}
.full {
  width: 100%;
}
.now-detail-restaurant .rating .number-rating {
  background-color: #ffc107;
  padding: 0 5px;
  border-radius: 4px;
  color: #fff;
  margin: 0 5px;
}
.now-detail-restaurant .view-more-rating {
  margin-bottom: 4px;
}
.now-detail-restaurant .number-review {
  font-size: 14px;
}
.now-detail-restaurant .status-restaurant {
  margin-bottom: 6px;
}
.now-detail-restaurant .opentime-status {
  position: relative;
  top: 0;
  left: 0;
  display: inline-block;
}
.now-detail-restaurant .opentime-status .stt {
  width: inherit;
  height: inherit;
  vertical-align: middle;
  display: inline-block;
  background-color: transparent;
}

.opentime-status .online {
  background-color: #6cc942;
  color: #329900;
}
.opentime-status .stt {
  border-radius: 50%;
  cursor: pointer;
  width: 15px;
  height: 15px;
  display: block;
  position: relative;
  z-index: 2;
}
.now-detail-restaurant .opentime-status .online:before {
  background-color: #6cc942;
}

.now-detail-restaurant .opentime-status .stt:before {
  content: "";
  border-radius: 50%;
  cursor: pointer;
  width: 8px;
  height: 8px;
  display: inline-block;
  position: relative;
  top: -1px;
  z-index: 2;
}
.now-detail-restaurant .opentime-status .stt:after {
  content: attr(title);
  font-size: 15px;
  display: inline-block;
  white-space: nowrap;
  color: inherit;
  padding-left: 5px;
}
.opentime-status:after {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background-color: #fff;
  border-radius: 50%;
  z-index: 1;
}
.now-detail-restaurant .status-restaurant .time {
  font-size: 15px;
  display: inline-block;
  padding-left: 10px;
  vertical-align: middle;
}
.now-detail-restaurant .cost-restaurant {
  color: #959595;
  font-size: 15px;
}
.now-detail-restaurant .share-social {
  width: 100%;
  height: auto;
  margin-top: 10px;
}
.now-detail-restaurant .link-merchant {
  margin-bottom: 8px;
}
.now-detail-restaurant .link-merchant {
  color: #fff;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #525252;
  border-radius: 3px;
  padding: 9px 10px 9px 10px;
  position: relative;
  float: right;
}
.now-detail-restaurant .utility-restaurant {
  border-top: 1px solid #ebebeb;
}
.now-detail-restaurant .utility-restaurant .utility-item:first-child {
  padding-left: 0;
}

.now-detail-restaurant .utility-restaurant .utility-item {
  float: left;
  width: 140px;
  position: relative;
  padding: 10px;
  margin-bottom: 30px;
}
.now-detail-restaurant .utility-restaurant .utility-title {
  color: #959595;
  font-size: 13px;
  text-transform: uppercase;
}
.now-detail-restaurant .utility-restaurant .utility-content {
  font-size: 14px;
}
.txt-red,
.txt-red-dark {
  color: #cf2127 !important;
}

.txt-bold {
  font-weight: 700 !important;
}
.icon-partner-vi {
  background-image: url(/app/assets/img/partner-vi.png?dec00ea…);
  position: absolute;
  top: 20px;
  left: 15px;
  cursor: pointer;
  width: 116px;
  height: 44px;
}

.icon {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
}
.now-detail-restaurant .utility-restaurant .utility-item:first-child:after {
  width: 0;
  height: 0;
}

.now-detail-restaurant .utility-restaurant .utility-item:after {
  content: "";
  width: 1px;
  height: 20px;
  position: absolute;
  top: 22px;
  left: 0;
  background-color: #ebebeb;
}
</style>