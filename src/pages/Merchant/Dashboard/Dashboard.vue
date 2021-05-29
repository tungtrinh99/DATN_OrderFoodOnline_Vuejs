<template>
  <div class="overview-card">
    <div class="overview-title">
      <h4>Thống kê</h4>
    </div>
    <a-row :gutter="16">
      <a-col :span="8" v-for="(item, index) in overviewCard" :key="index">
        <overview-card :overviewCard="item"></overview-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import OverviewCard from "../../../components/Cards/OverviewCard";
import http from "../../../http-common";
export default {
  components: {
    OverviewCard,
  },
  methods: {
    
    getOverviewData() {
      http
        .post("/orders/list", {
          id: this.idRestaurant,
        })
        .then((res) => {
          this.overviewCard[2].count = res.data.total_order;
          this.overviewCard[0].count = res.data.data.items.reduce(function (
            accumulator,
            currentValue
          ) {
            return accumulator + currentValue.grand_total;
          },
          0);
          this.overviewCard[1].count = res.data.data.items.reduce(function (
            accumulator,
            currentValue
          ) {
            return accumulator + currentValue.shipping;
          },
          0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getOverviewData();
  },
  data() {
    let overviewCard = [
      {
        title: "Doanh số bán hàng",
        count: null,
        unit: "VND",
        icon: "dollar",
        width: 40,
        height: 40,
        background: "linear-gradient(180deg, #F3A93F 0%, #CD851F 100%)",
      },
      {
        title: "Chi phí vận chuyển",
        count: null,
        unit: "VND",
        icon: "car",
        width: 70,
        height: 40,
        background: "linear-gradient(180deg, #6A88E9 0%, #153391 100%)",
      },
      {
        title: "Số lượng đơn",
        count: null,
        unit: "Đơn",
        icon: "solution",
        width: 40,
        height: 40,
        background: "linear-gradient(180deg, #E66969 0%, #A63737 100%)",
      },
    ];
    return {
      overviewCard,
      idRestaurant : null
    };
  },
  created(){
    this.idRestaurant = JSON.parse(localStorage.getItem("merchant_restaurant_id"));
  }
};
</script>
<style scoped>
.overview-card,
.agency-chart,
.sale-chart {
  padding: 20px;
}
.overview-title,
.chart-title {
  margin-bottom: 24px;
}
.overview-title > h4,
.chart-title > h4 {
  font-weight: bold;
  font-size: 20px;
  color: #252422;
}
</style>
