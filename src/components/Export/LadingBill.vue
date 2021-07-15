<template>
  <div ref="reportOrder" id="reportOrder">
    <div class="order-title">WEBSITE ĐẶT ĐỒ ĂN ONLINE XUÂN TÙNG</div>
    <div class="order-datetime">Ngày 13/7/2021 , 17:30</div>
    <h2 style="text-align:center">VẬN ĐƠN (#{{ladingBill.code}})</h2>
    <br />
    <div class="order-info">
     
      <span><b>Tài xế</b> : {{ladingBill.name_of_driver_id}}</span
      ><br />
      <span><b>Điện thoại</b> : 0971600489</span
      ><br />
      <span><b>Địa chỉ</b> : 445 Nguyễn Khang, Cầu Giấy, Hà Nội</span
      ><br />
    </div>
    <br />
    <h4>Danh sách đơn hàng</h4>
    <div class="order-goods">
      <table style="width: 100%">
        <tr>
          <th>STT</th>
          <th>Mã đơn hàng</th>
          <th>Nhà hàng</th>
          <th>Khách hàng</th>
          <th>Ngày khởi tạo</th>
          <th>Thành tiền</th>
        </tr>
        <tr v-for="item in orders">
          <td>1</td>
          <td>{{item.order_code}}</td>
          <td>{{item.name_of_restaurant_id}}</td>
          <td>{{item.name_of_customer_id}}</td>
          <td>{{moment(item.create_at).format('DD/MM/YYYY')}}</td>
          <td>{{item.grand_total}} đ</td>
          
        </tr>
        
        
      </table>
    </div>
    <br />
    
  </div>
</template>
<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import EventBus from "../../event-bus";
import moment from "moment";
export default {
  props: {
    orders : Array,
    ladingBill : Object
  },
  data(){
    return {
      moment
    }
  },
  methods: {
    generatePdf() {
      console.log(1);
      window.html2canvas = html2canvas;
      let component = this;
      let canvas = document.querySelector('#reportOrder')
      html2canvas(canvas).then(function (canvas) {
        let imgData = canvas.toDataURL("image/png");
        var doc = new jsPDF("p", "pt", "A4");

        doc.addImage(imgData, "png", 10, 10);
        doc.save(`van_don_${component.ladingBill.code}.pdf`);
      });
      //   doc.html(this.$refs.reportOrder, {
      //     callback: function (pdf) {
      //          let imgData = pdf.toDataURL('image/png')
      //         pdf.addImage(imgData,'png',10,10)
      //       pdf.save(`hoa_don_${component.data.order_code}.pdf`);
      //     },
      //   });
    },
  },
  computed: {
    convertDate() {
      return moment(this.data.create_at).lang('vi').format("dddd, Do MMMM YYYY, HH:mm");
    },
  },
  created() {
    EventBus.$on("exportLadingBill", this.generatePdf);
  },
  destroyed() {
    EventBus.$off("exportLadingBill", this.generatePdf);
  },
};
</script>
<style scoped>
.order-title {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
}
.order-datetime {
  font-style: italic;
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
  width: 7in;
  margin: auto;
}
.report-footer {
  display: flex;
  justify-content: space-between;
}
.order_code {
  font-style: italic;
}
</style>