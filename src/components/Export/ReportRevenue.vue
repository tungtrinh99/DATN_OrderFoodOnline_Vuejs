<template>
  <div ref="reportOrder" id="reportOrder">
    <div class="order-title">Báo cáo doanh thu hằng tháng</div>
    <div class="order-datetime">Tháng 5/2021</div>
    <br />
    <div class="order-info">
      <span><b>Tên doanh nghiệp </b> : Phần mềm đặt đồ ăn online XUÂN TÙNG</span
      ><br />
      <span><b>Địa chỉ</b> : 445 Nguyễn Khang, Yên Hòa, Cầu Giấy, Hà Nội</span
      ><br />
     
    </div>
    <br />
    <div class="order-goods">
      <table style="width: 100%">
        <tr>
          <th>STT</th>
          <th>Tên nhà hàng</th>
          <th>Doanh thu</th>
          <th>Số đơn</th>
          <th>Chi phí vận chuyển</th>
        </tr>
        <tr >
          <td>1</td>
          <td>Trà Sữa Tocotoco - Nguyễn Khang</td>
          <td>1.395.100 đ</td>
          <td>10</td>
          <td>200.000 đ</td>
        </tr>
        <tr >
          <td>2</td>
          <td>Trà Sữa Tocotoco - Đường Láng</td>
          <td>1.395.100 đ</td>
          <td>10</td>
          <td>200.000 đ</td>
        </tr>
        <tr >
          <td>3</td>
          <td>Trà Sữa Tocotoco - Nguyễn Xiển</td>
          <td>1.395.100 đ</td>
          <td>10</td>
          <td>200.000 đ</td>
        </tr>
        <tr >
          <td>4</td>
          <td>Trà Sữa Tocotoco - Trần Duy Hưng</td>
          <td>1.395.100 đ</td>
          <td>10</td>
          <td>200.000 đ</td>
        </tr>
        <tr>
          <td>5</td>
          <td>Bánh Mì Bami Bread - Chùa Láng</td>
          <td>1.395.100 đ</td>
          <td>10</td>
          <td>200.000 đ</td>
        </tr>
      </table>
    </div>
   
  </div>
</template>
<script>
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import EventBus from "../../event-bus";
import moment from "moment";
export default {
  props: {
    data: Object,
    item: Array,
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
  },
  computed: {
    convertDate() {
      return moment(this.data.create_at).lang('vi').format("dddd, Do MMMM YYYY, HH:mm");
    },
  },
  created() {
    EventBus.$on("export", this.generatePdf);
  },
  destroyed() {
    EventBus.$off("export", this.generatePdf);
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
}
#reportOrder {
  width: 8in;
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