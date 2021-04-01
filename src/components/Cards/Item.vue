<template>
  <div class="item-restaurant">
    <a
      target="_blank"
      class="item-content"
      href="/ha-noi/thuy-beo-chan-ga-online"
      ><div class="img-restaurant">
        <img
          :src="require(`../../../public/images/${data.avatar_id}`)"
          style="visibility: visible,width:100%"
        />
      </div>
      <div class="info-restaurant">
        <div class="info-basic-res">
          <h4 class="name-res" title="Thủy Béo - Chân Gà Online">
            {{data.title}}
          </h4>
          <div class="address-res" >
            {{data.address}}
          </div>
        </div>
        <p class="content-promotion"><a-icon type="tag" style="color:red" />Giảm món</p>
        <div class="opentime-status">
          <span
            class="stt online"
            title="Mở cửa"
            style="color: rgb(35, 152, 57); background-color: rgb(35, 152, 57)"
          ></span>
        </div></div
    ></a>
  </div>
</template>
<script>
export default {
  props:{
    data : Object
  }
}
</script>
<style scoped>
.item-restaurant {
  padding: 8px;
  width: 33.33333%;
  float: left;
}
 .item-content {
    cursor: pointer;
    border-radius: 6px;
    background-color: #fff;
    position: relative;
    display: block;
}
 .img-restaurant {
    position: relative;
    border-radius: 6px 6px 0 0;
    overflow: hidden;
    height: 137px;
    background: #eaeaea;
}
 .img-restaurant img {
    width: auto;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.info-restaurant {
    border: 1px solid #d7d7d7;
    border-radius: 0 0 6px 6px;
    height: 84px;
}
.now-list-restaurant .info-basic-res {
    padding: 5px 8px;
    border-bottom: 1px solid #ebebeb;
}
.now-list-restaurant .info-restaurant .name-res {
    font-size: 14px;
    font-weight: 700;
    color: #252525;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 1px;
    padding-top: 5px;
}
.now-list-restaurant .info-restaurant .address-res {
    font-size: 12px;
    color: #959595;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.content-promotion {
    font-size: 13px;
    color: #187caa;
    font-weight: 700;
    padding: 8px 8px 5px;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.opentime-status {
    position: absolute;
    top: -2px;
    left: -2px;
    z-index: 1;
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
</style>