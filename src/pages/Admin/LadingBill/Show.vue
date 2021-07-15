<template>
  <div>
    <a-modal
      :title="title"
      v-model="show"
      :bodyStyle="{
        padding: '16px',
        overflowY: 'auto',
        overflowX: 'auto'
      }"
      :dialog-style="{ top: '100px' }"
    >
      <div slot="footer" v-if="formData.status != 3">
        <a-button type="danger" @click="openExport">Xuất vận đơn</a-button>
        <a-button type="primary" @click="openOrders">Gán đơn hàng</a-button>
        <a-button @click="closeLadingBill">Đóng vận đơn</a-button>
      </div>
      <div slot="footer" v-if="formData.status == 3">
        <a-button type="danger" @click="openExport">Xuất vận đơn</a-button>
        <a-button @click="close">Thoát</a-button>
      </div>
      <div class="title">Thông tin</div>
      <a-descriptions>
        <a-descriptions-item label="Mã vận đơn" span="3">
          {{ formData.code }}
        </a-descriptions-item>

        <a-descriptions-item label="Tài xế" span="3">
          {{ formData.name_of_driver_id }}
        </a-descriptions-item>
        <a-descriptions-item label="Trạng thái" span="3">{{
          formData.status == 1
            ? "Khởi tạo"
            : formData.status == 2
            ? "Đang vận chuyển"
            : "Hoàn thành"
        }}</a-descriptions-item>
      </a-descriptions>

      <div class="title">Danh sách đơn hàng</div>
      <a-list
        style="height : 400px;over-flow : auto"
        class="demo-loadmore-list"
        item-layout="horizontal"
        :data-source="orderCodes"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta description="">
            <a slot="title" href="" style="text-transform : uppercase">
              <a-tag color="blue">{{ item }}</a-tag>
            </a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-modal>
    <a-modal
      :title="'Danh sách đơn hàng trống'"
      v-model="visibleOrders"
      width="50%"
      :bodyStyle="{
        padding: '16px',
        overflowY: 'auto',
        overflowX: 'auto'
      }"
      :dialog-style="{ top: '100px' }"
    >
      <div slot="footer">
        <a-button @click="closeOrders">Thoát</a-button>
      </div>
      <a-list
        style="max-height : 400px;over-flow : auto"
        class="demo-loadmore-list"
        item-layout="horizontal"
        :data-source="ordersNotHaveLadingBill"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a slot="actions">
            <a-button type="primary" @click="addOrder(index)">
              Gán đơn
            </a-button>
          </a>
          <a-list-item-meta
            :description="
              'Nhà hàng : ' +
                item.name_of_restaurant_id +
                '. Khoảng cách : ' +
                item.distant +
                ' km'
            "
          >
            <a slot="title" href="" style="text-transform : uppercase">
              <a-tag color="blue">{{ item.order_code }}</a-tag>
            </a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-modal>
    <a-modal
      :title="'Vận đơn'"
      v-model="showLadingBill"
      width="50%"
      :bodyStyle="{
        padding: '16px',
        height: '60vh',
        overflowY: 'auto',
        overflowX: 'auto',
      }"
      :dialog-style="{ top: '100px' }"
    >
     <div slot="footer">
        <a-button type="primary" @click="exportLadingBill">Xuất vận đơn</a-button>
      </div>
      <lading-bill :ladingBill = "formData" :orders = "orders"></lading-bill>
    </a-modal>
  </div>
</template>
<script>
import http from "../../../http-common";
import EventBus from "../../../event-bus";
import LadingBill from "../../../components/Export/LadingBill.vue";
import moment from 'moment';
export default {
  props: {
    show: Boolean,
    formData: Object,
    title: String,
    orderCodes: Array,
    orders : Array
  },
  components:{
    LadingBill
  },
  data() {
    return {
      key: 0,
      ordersNotHaveLadingBill: [],
      visibleOrders: false,
      showLadingBill : false
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    closeOrders() {
      this.visibleOrders = false;
    },
    
    updateLadingBill() {
      http.post(
        "/lading-bill/update",
        { status: 2 },
        {
          params: {
            id: this.formData.id
          }
        }
      );
    },
    updateOrder(value) {
      http.post(
        "/orders/update",
        {
          delivery_order_id: this.formData.id
        },
        {
          params: {
            id: this.ordersNotHaveLadingBill[value].id
          }
        }
      );
    },
    openOrders() {
      http
        .post("/orders/list", {
          from_date : moment().format('YYYY-MM-DD'),
          to_date : moment().add(1,'days').format('YYYY-MM-DD'),
          not_delivery_order: true,
          driver_id: this.formData.driver_id,
          not_status: [4, 5]
        })
        .then(res => {
          this.ordersNotHaveLadingBill = res.data.data.items;
          this.visibleOrders = true;
        })
        .catch(err => {});
    },
    addOrder(value) {
      Promise.all([this.updateOrder(value), this.updateLadingBill()])
        .then(([order, ladingBill]) => {
          this.$message.success("Gán đơn thành công");
          this.visibleOrders = false;
          this.$emit("close");
          EventBus.$emit("reload");
        })
        .catch(err => {});
    },
    closeLadingBill() {
      http
        .post(
          "/lading-bill/update",
          {
            status: 3
          },
          {
            params: {
              id: this.formData.id
            }
          }
        )
        .then(res => {
          this.$message.success("Đóng vận đơn thành công");
          this.$emit("close");
          EventBus.$emit("reload");

        })
        .catch(err => {});
    },
    openExport(){
      this.showLadingBill = true;
    },
    exportLadingBill(){
      EventBus.$emit('exportLadingBill')
    }
  }
};
</script>
<style scoped>
.title {
  text-transform: uppercase;
  color: #6d6f71;
  padding: 5px 0 0;
  margin: 10px 0 20px 0px;
  text-align: left;
  font-weight: 700;
}
.demo-loadmore-list {
  overflow: auto;
}
</style>
