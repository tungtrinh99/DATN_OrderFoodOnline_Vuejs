<template>
  <div>
    <a-modal
      :title="title"
      v-model="show"
      width="60%"
      :bodyStyle="{
        padding: '16px',
        height: '60vh',
        overflowY: 'auto',
        overflowX: 'auto',
      }"
      :dialog-style="{ top: '100px' }"
    >
      <div slot="footer">
        <a-button type="primary" @click="showExportPDF">In hóa đơn</a-button>
        <a-button @click="close">Thoát</a-button>
      </div>
      <template>
        <div>
          <div class="detail-order-header">
            <div class="doh--content">
              <div class="doh-order-code">
                <a-icon type="profile" />
                <span>#{{ formData.order_code }}</span>
              </div>
              <div class="doh-order-time">
                <a-icon type="clock-circle" />
                <span>{{ this.convertTime }}</span>
              </div>
              <div class="doh-customer">
                <a-icon type="user" />
                <span>{{ formData.name_of_customer }}</span>
              </div>
              <div class="doh-status">
                <div
                  class="doh-stt-icon"
                  :style="{
                    background: orderStatusColor,
                    boxShadow: `0px 0px 10px ${orderStatusColor}`,
                  }"
                ></div>
                <span>{{ orderStatusText }}</span>
              </div>
              <div class="doh-button-wrapper" v-if="formData.status == 1">
                <a-button-group :size="size">
                  <a-button type="primary" @click="applyOrder">
                    <a-icon type="check" />Xác nhận
                  </a-button>
                  <a-button type="danger" @click="cancelOrder">
                    Hủy bỏ<a-icon type="close" />
                  </a-button>
                </a-button-group>
              </div>
            </div>
          </div>
          <a-row>
            <a-col :span="8">
              <div class="order-detail-user-info">
                <div class="odu-avatar">
                  <img
                    :src="
                      require(`../../../../public/images/${
                        formData.customer_avatar
                          ? formData.customer_avatar
                          : 'avatar_default.jpg'
                      }`)
                    "
                    alt=""
                  />
                  <span>{{ formData.name_of_customer }}</span>
                </div>
                <a-descriptions
                  size="small"
                  :column="1"
                  style="margin-top: 12px"
                >
                  <a-descriptions-item label="Mã khách hàng">
                    {{ formData.user_code }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Số điện thoại">
                    {{ formData.customer_phone }}
                  </a-descriptions-item>

                  <a-descriptions-item label="Địa chỉ">
                    {{ formData.location_destination }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Địa điểm trả hàng">
                    {{ formData.location_arrival }}
                  </a-descriptions-item>
                </a-descriptions>
              </div>
            </a-col>
            <a-col :span="1"> </a-col>
            <a-col :span="15">
              <div class="order-detail-content">
                <strong>Thông tin vận chuyển</strong>
                <a-descriptions
                  size="small"
                  :column="1"
                  style="margin-top: 12px"
                >
                  <a-descriptions-item label="Địa điểm nhận hàng">
                    {{ formData.location_destination }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Địa điểm trả hàng">
                    {{ formData.location_arrival }}
                  </a-descriptions-item>
                  <a-descriptions-item label="Quãng đường">
                    {{ formData.distant }} km
                  </a-descriptions-item>
                </a-descriptions>
                <strong>Trạng thái đơn hàng</strong>
                <div style="margin-top: 20px">
                  <a-steps :current="formData.status - 1" size="small">
                    <a-popover
                      slot="progressDot"
                      slot-scope="{ index, status, prefixCls }"
                    >
                      <template slot="content">
                        <span>Trạng thái đơn hàng</span>
                      </template>
                      <span :class="`${prefixCls}-icon-dot`" />
                    </a-popover>

                    <a-step title="Chờ xác nhận" />
                    <a-step title="Đang vận chuyển" />
                    <a-step title="Hoàn thành" />
                    <a-step title="Hủy" />
                  </a-steps>
                </div>
              </div>
            </a-col>
          </a-row>
          <div class="order-detail-good">
            <a-row>
              <a-col
                :span="14"
                style="border-right: 1px solid #e0e0e0; min-height: 130px"
              >
                <a-list
                  class="menu-restaurant-list"
                  item-layout="horizontal"
                  :data-source="listItemOfOrder"
                >
                  <a-list-item slot="renderItem" slot-scope="item">
                    <a-list-item-meta :description="'Món #' + item.food_id">
                      <a slot="title">{{ item.name_of_food }}</a>
                      <a-avatar
                        style="margin-top: 8px; border: 1px solid #e0e0e0"
                        slot="avatar"
                        :src="
                          require('../../../../public/images/' + item.avatar_id)
                        "
                      />
                    </a-list-item-meta>
                    <div class="quantity">
                      <span>Số lượng</span>
                      <b>{{ item.quantity }}</b>
                    </div>
                    <div class="cost">
                      <span>Giá món</span>
                      <b
                        >{{
                          Intl.NumberFormat("vi-VN").format(
                            Number.parseFloat(
                              item.price - (item.price * item.discount) / 100
                            ).toFixed(0)
                          )
                        }}đ</b
                      >
                    </div>
                    <div class="cost">
                      <span>Tổng cộng</span>
                      <b
                        >{{
                          Intl.NumberFormat("vi-VN").format(
                            Number.parseFloat(
                              (item.price -
                                (item.price * item.discount) / 100) *
                                item.quantity
                            ).toFixed(0)
                          )
                        }}đ</b
                      >
                    </div>
                  </a-list-item>
                </a-list>
              </a-col>
              <a-col :span="10">
                <div style="padding: 10px 12px">
                  <div class="right-order-info">
                    <span><a-icon type="percentage" /> Giảm giá : </span>
                    <b
                      >{{
                        Intl.NumberFormat("vi-VN").format(
                          Number.parseFloat(
                            formData.discount ? formData.discount : 0
                          ).toFixed(0)
                        )
                      }}đ
                    </b>
                  </div>
                  <div class="right-order-info">
                    <span><a-icon type="car" /> Phí ship : </span>
                    <b
                      >{{
                        Intl.NumberFormat("vi-VN").format(
                          Number.parseFloat(formData.shipping).toFixed(0)
                        )
                      }}đ
                    </b>
                  </div>
                  <div class="right-order-info">
                    <span><a-icon type="dollar" /> Tổng tiền : </span>
                    <b
                      >{{
                        Intl.NumberFormat("vi-VN").format(
                          Number.parseFloat(formData.grand_total).toFixed(0)
                        )
                      }}đ
                    </b>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </div>
      </template></a-modal
    >
    <a-modal
      :title="'Hóa đơn'"
      v-model="showPDF"
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
        <a-button type="primary" @click="exportOrder">Xuất hóa đơn</a-button>
      </div>
      <report :data="formData" :item="listItemOfOrder"></report>
    </a-modal>
  </div>
</template>

<script>
import Constant from "../../../constant";
import http from "../../../http-common";
import moment from "moment";
import EventBus from "../../../event-bus";
import Report from "../../../components/Export/ReportBill.vue";
export default {
  props: {
    show: Boolean,
    title: String,
    formData: Object,
    listItemOfOrder: Array,
  },
  components: {
    Report,
  },
  data() {
    let orderStatus = Constant.orderCustomerStatus;
    return {
      orderStatus,
      showPDF: false,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    showExportPDF() {
      this.showPDF = true;
    },
    applyOrder() {
      http
        .post(
          "/orders/update",
          {
            status: 2,
          },
          {
            params: {
              id: this.formData.id,
            },
          }
        )
        .then((res) => {
          this.$notification["success"]({
            message: "Thông báo",
            description: "Xác nhận đơn hàng thành công",
          });
          this.close();
          EventBus.$emit("reload");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancelOrder() {
      let component = this;
      this.$confirm({
        title: `Bạn có huỷ đơn hàng ${component.formData.order_code} không?`,
        okText: "Xác nhận",
        okType: "danger",
        cancelText: "Hủy",

        onOk() {
          http
            .post(
              "/orders/update",
              {
                status: 4,
              },
              {
                params: {
                  id: component.formData.id,
                },
              }
            )
            .then((response) => {
              component.$notification["success"]({
                message: "Thông báo",
                description: "Hủy đơn hàng thành công",
              });
              component.close();
              EventBus.$emit("reload");
            })
            .catch((error) => {
              component.$message.error(error.message);
            });
        },
      });
    },
    exportOrder() {
      EventBus.$emit("export");
    },
  },
  computed: {
    orderStatusText() {
      return this.orderStatus.find((p) => p.value == this.formData.status)
        ? this.orderStatus.find((p) => p.value == this.formData.status).text
        : "";
    },
    convertTime() {
      return moment(this.formData.create_at).format("HH:mm DD/MM/YYYY");
    },
    orderStatusColor() {
      return this.orderStatus.find((p) => p.value == this.formData.status)
        ? this.orderStatus.find((p) => p.value == this.formData.status).color
        : "#000";
    },
  },
};
</script>
<style scoped>
tr:last-child td {
  padding-bottom: 0;
}
.quantity,
.cost {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 10px;
  align-items: flex-end;
}
.right-order-info {
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
}
.detail-order-header,
.order-detail-user-info,
.order-detail-content {
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}
.order-detail-good {
  border: 1px solid #e0e0e0;
  padding: 0px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
}
.order-detail-user-info,
.order-detail-content {
  min-height: 240px;
}
.doh--content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.doh-order-code,
.doh-status,
.doh-customer,
.doh-address-arrival > span {
  font-weight: 700;
}
.doh-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.doh-stt-icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}

.odu-avatar > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
}
.odu-avatar > span {
  font-weight: 700;
  margin-left: 8px;
  font-size: 14px;
  color: #888888;
}
</style>