<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Báo cáo doanh thu"
    >
      <template slot="extra">
        <a-button type="primary" @click="showReport">
          <a-icon type="vertical-align-bottom"  />
          Tải báo cáo
        </a-button>
      </template>
    </a-page-header>
    <div class="content">
      <a-row>
        <a-col :span="6">
          <div class="form">
            <a-form-model-item label="Chọn nhà hàng : ">
              <a-select
                show-search
                :value="restaurantId"
                placeholder="Vui lòng chọn địa chỉ quán"
                style="width: 100%; border-left: none"
                :default-active-first-option="false"
                :show-arrow="true"
                :filter-option="false"
                :not-found-content="null"
                :allowClear="true"
                @change="handleChange"
              >
                <a-select-option v-for="d in listRestaurant" :key="d.id">
                  {{ d.title }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="Từ ngày : ">
              <a-date-picker
                :locale="locale"
                @change="startChange"
                format="DD-MM-YYYY"
                placeholder="Bắt đầu"
              />
            </a-form-model-item>
            <a-form-model-item label="Đến ngày : ">
              <a-date-picker
                :locale="locale"
                @change="endChange"
                format="DD-MM-YYYY"
                placeholder="Kết thúc"
              />
            </a-form-model-item>

            <a-button type="primary" @click="apply">
              Áp dụng
            </a-button>
          </div>
        </a-col>
        <a-col :span="18">
          <div class="list">
            <a-table
              :columns="columns"
              :data-source="data"
              :row-key="record => record.id"
              bordered
            >
              <span slot="money" slot-scope="number"
                >{{
                  Intl.NumberFormat("vi-VN").format(
                    Number.parseFloat(number).toFixed(0)
                  )
                }}
                đ</span
              >
            </a-table>
          </div>
        </a-col>
      </a-row>
    </div>
    <a-modal
      :title="'Báo cáo doanh thu'"
      v-model="show"
      width="50%"
      :bodyStyle="{
        padding: '16px',
        height: '60vh',
        overflowY: 'auto',
        overflowX: 'auto'
      }"
      :dialog-style="{ top: '100px' }"
    >
      <div slot="footer">
        <a-button type="primary" @click="exportOrder">Xuất báo cáo</a-button>
      </div>
      <report></report>
    </a-modal>
  </div>
</template>
<script>
import locale from "ant-design-vue/es/date-picker/locale/vi_VN";
import moment from "moment";
import ColumnConfig from "../../../common/ColumnConfig";
import http from "../../../http-common";
import report from "../../../components/Export/ReportRevenue.vue";
import EventBus from "../../../event-bus"
export default {
  data() {
    let columns = ColumnConfig["report"];
    return {
      locale,
      startValue: "",
      endValue: "",
      columns,
      data: [],
      listRestaurant: [],
      restaurantId: null,
      show: false
    };
  },
  components: {
    report
  },
  methods: {
    showReport() {
      this.show = true;
    },
    startChange(date, dateString) {
      this.startValue = moment(date).format("YYYY-MM-DD");
    },
    endChange(date, dateString) {
      this.endValue = moment(date).format("YYYY-MM-DD");
    },
    apply() {
      http
        .post("/report-revenue/report", {
          restaurantId: this.restaurantId,
          startDate: this.startValue,
          endDate: this.endValue
        })
        .then(res => {
          this.data = res.data.data.items;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getListRestaurant() {
      http
        .post("/restaurant/list", {
          textSearch: ""
        })
        .then(res => {
          this.listRestaurant = res.data.data.items;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleChange(value) {
      this.restaurantId = value;
    },
    exportOrder() {
      EventBus.$emit("export");
    },
  },
  created() {
    this.getListRestaurant();
  }
};
</script>
<style scoped>
.form {
  padding: 10px 12px;
}
.list {
  padding: 10px 12px;
}
</style>
