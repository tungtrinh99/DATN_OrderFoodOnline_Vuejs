<template>
  <div ref="reportOrder" id="reportOrder">
    <div class="order-title">Báo cáo doanh thu</div>
    <div class="order-datetime">Từ ngày {{moment(this.startDate).format('DD/MM/YYYY')}} đến ngày {{moment(this.endDate).format('DD/MM/YYYY')}}</div>
    <br />
    <div class="order-info">
      <span><b>Nhà hàng </b> : {{restaurant.title}}</span
      ><br />
      <span><b>Địa chỉ</b> : {{restaurant.full_address}}</span
      ><br />
      <span><b>Điện thoại</b> : {{restaurant.phone_number}}</span
      ><br />
    </div>
    <br />
    <div class="order-goods">
      <table style="width: 100%">
        <tr>
          <th>STT</th>
          <th>Nhà hàng</th>
          <th>Tên khách hàng</th>
          <th>Mã đơn hàng</th>
          <th>Thành tiền</th>

        </tr>
        <tr v-for="(item,index) in orders">
          <td>{{index + 1}}</td>
          <td>{{item.name_of_restaurant_id}}</td>
          <td>{{item.name_of_customer_id}}</td>
          <td>{{item.order_code}}</td>
          <td>{{Intl.NumberFormat('vi-VN').format(Number.parseFloat(item.grand_total).toFixed(0))}}</td>
         
        </tr>
        
      </table>
    </div>
    <div class="report-footer">
      <span class="report-footer__title">Tổng số đơn hàng : </span><span >{{data[0].order_quantity}} đơn</span>
      <br/>
      <span class="report-footer__title">Tổng doanh thu : </span><span style="color :red">{{Intl.NumberFormat('vi-VN').format(Number.parseFloat(data[0].revenue).toFixed(0))}} đ</span>

    </div>
  </div>
</template>
<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import EventBus from "../../event-bus";
import moment from "moment";
import http from "./../../http-common";
export default {
  props: {
    data: Array,
    startDate : String,
    endDate : String,
    orders : Array
  },
  data(){
    return {
      moment,
      restaurant : {}
    }
  },
  methods: {
    generatePdf() {
      window.html2canvas = html2canvas;
      let component = this;
      let canvas = document.querySelector('#reportOrder')
      html2canvas(canvas).then(function (canvas) {
        let imgData = canvas.toDataURL("image/png");
        var doc = new jsPDF("p", "pt", "A4");

        doc.addImage(imgData, "png", 10, 10);
        doc.save(`bao_cao_doanh_thu.pdf`);
      });

    },
    getRestaurant(){
      let restaurantId = JSON.parse(localStorage.getItem('merchant_restaurant_id'))
      http.get('/restaurant/detail',{params : {id : restaurantId }})
      .then((response)=>{
        this.restaurant = response.data.data.items[0];
      })
      .catch((error)=>{})
    }
  },
  computed: {
  
  },
  created() {
    EventBus.$on("export", this.generatePdf);
    this.getRestaurant();
  },
  destroyed() {
    EventBus.$off("export", this.generatePdf);
  },
};
</script>
<style scoped>
.report-footer{
  text-align: right;
  margin-top:16px
}
.report-footer__title{
  text-transform: uppercase;
  font-weight: 700;
}
.order-title {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}
.order-datetime {
  text-align: center;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
}
#reportOrder {
  width: 8in;
  margin: auto;
}

.order_code {
  font-style: italic;
}
</style>