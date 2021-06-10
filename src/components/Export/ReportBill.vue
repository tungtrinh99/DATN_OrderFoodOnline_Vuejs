<template>
  <div ref="reportOrder" id="reportOrder">
    <div class="order-title">Hóa đơn bán hàng</div>
    <div class="order-datetime">{{ convertDate }}</div>
    <br />
    <div class="order-info">
      <span><b>Nhà hàng</b> : {{ data.name_of_restaurant }}</span
      ><br />
      <span><b>Địa chỉ</b> : {{ data.location_destination }}</span
      ><br />
      <span><b>Họ tên khách hàng</b> : {{ data.name_of_customer }}</span
      ><br />
      <span><b>Điện thoại</b> : {{ data.customer_phone }}</span
      ><br />
      <span><b>Địa chỉ</b> : {{ data.location_arrival }}</span
      ><br />
    </div>
    <br />
    <div class="order-goods">
      <table style="width: 100%">
        <tr>
          <th>STT</th>
          <th>Tên món ăn</th>
          <th>Đơn giá</th>
          <th>Giảm giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
        </tr>
        <tr v-for="(goods, index) in item">
          <td>{{ index }}</td>
          <td>{{ goods.name_of_food }}</td>
          <td>{{ goods.price }}</td>
          <td>{{ goods.discount }}%</td>
          <td>{{ goods.quantity }}</td>
          <td>
            {{
              (goods.price - (goods.price * goods.discount) / 100) *
              goods.quantity
            }}
          </td>
        </tr>
      </table>
    </div>
    <br />
    <div class="report-footer">
      <div class="order_code">Mã đơn hàng : #{{ data.order_code }}</div>
      <div>
        <b>Tổng hóa đơn : </b
        ><span
          >{{
            Intl.NumberFormat("vi-VN").format(
              Number.parseFloat(data.grand_total).toFixed(0)
            )
          }}đ</span
        >
      </div>
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
        doc.save(`hoa_don_${component.data.order_code}.pdf`);
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