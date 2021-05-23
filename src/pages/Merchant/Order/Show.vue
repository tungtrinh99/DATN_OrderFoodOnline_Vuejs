<template>
  <div>
    <a-modal
      :title="title"
      v-model="show"
      width="60%"
      :bodyStyle="{
        padding: '16px',
        height: 'auto',
        overflowY: 'auto',
        overflowX: 'auto',
      }"
      :dialog-style="{ top: '100px' }"
    >
      <div slot="footer">
        <a-button @click="close">Thoát</a-button>
      </div>
      <template>
        <div>
          <a-page-header
            :title="'#' + formData.order_code"
            :sub-title="formData.create_at"
          >
            <template slot="tags">
              <a-tag color="blue"> {{ orderStatusText }} </a-tag>
            </template>
            <template slot="extra">
              <a-button type="danger" @click="cancelOrder" v-if="formData.status == 1"> Hủy đơn hàng </a-button>
              <a-button type="primary" @click="applyOrder" v-if="formData.status == 1"> Xác nhận đơn hàng </a-button>
            </template>
          </a-page-header>
          <a-divider />
          <a-descriptions size="small" :column="2">
            <a-descriptions-item label="Khách hàng">
              {{ formData.name_of_customer }}
            </a-descriptions-item>
            <a-descriptions-item label="Quãng đường">
              {{ formData.distant }} km
            </a-descriptions-item>
            <a-descriptions-item label="Trạng thái">
              {{ orderStatusText }}
            </a-descriptions-item>
            <a-descriptions-item label="Địa điểm nhận hàng">
              {{ formData.location_destination }}
            </a-descriptions-item>
            <a-descriptions-item label="Địa điểm trả hàng">
              {{ formData.location_arrival }}
            </a-descriptions-item>
          </a-descriptions>
          <a-divider />
          <a-row>
            <a-col :span="14" style="border-right : 1px solid #e0e0e0">
              <a-list
                class="menu-restaurant-list"
                item-layout="horizontal"
                :data-source="listItemOfOrder"
              >
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a-list-item-meta :description="'Món #' + item.food_id">
                    <a slot="title">{{ item.name_of_food }}</a>
                    <a-avatar
                      style="margin-top: 8px"
                      slot="avatar"
                      :src="
                        require('../../../../public/images/' + item.avatar_id)
                      "
                    />
                  </a-list-item-meta>
                  <div class="quantity">
                    <b>Số lượng</b>
                    <span>{{ item.quantity }}</span>
                  </div>
                  <div class="cost">
                    <b>Giá món</b>
                    <span
                      >{{
                        Intl.NumberFormat("vi-VN").format(
                          Number.parseFloat(
                            item.price - (item.price * item.discount) / 100
                          ).toFixed(0)
                        )
                      }}đ</span
                    >
                  </div>
                  <div class="cost">
                    <b>Tổng cộng</b>
                    <span
                      >{{
                        Intl.NumberFormat("vi-VN").format(
                          Number.parseFloat(
                            (item.price - (item.price * item.discount) / 100) *
                              item.quantity
                          ).toFixed(0)
                        )
                      }}đ</span
                    >
                  </div>
                </a-list-item>
              </a-list>
            </a-col>
            <a-col :span="1">
            </a-col>
            <a-col :span="9">
              
              <div class="right-order-info">
                <span>Giảm giá : </span>
                <b>{{
                        Intl.NumberFormat("vi-VN").format(
                          Number.parseFloat(
                            formData.discount ? formData.discount : 0
                          ).toFixed(0)
                        )
                      }}đ
                      </b> 
              </div>
              <div class="right-order-info">
                <span>Phí ship : </span>
                <b>{{
                        Intl.NumberFormat("vi-VN").format(
                          Number.parseFloat(
                            formData.shipping
                          ).toFixed(0)
                        )
                      }}đ
                      </b> 
              </div>
              <div class="right-order-info">
                <span>Tổng tiền : </span>
                <b>{{
                        Intl.NumberFormat("vi-VN").format(
                          Number.parseFloat(
                            formData.grand_total
                          ).toFixed(0)
                        )
                      }}đ
                      </b> 
              </div>
            </a-col>
          </a-row>
        </div>
      </template></a-modal
    >
  </div>
</template>

<script>
import Constant from "../../../constant";
import http from "../../../http-common"
export default {
  props: {
    show: Boolean,
    title: String,
    formData: Object,
    listItemOfOrder: Array,
  },
  data() {
    let orderStatus = Constant.orderCustomerStatus;
    return {
      orderStatus,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    applyOrder(){
      http.post('/orders/update',{
        status : 2
      },{
        params : {
          id : this.formData.id,

        }
      }).then((res)=>{
          this.$message.success('Xác nhận đơn hàng thành công!')
        }).catch(err=>{
          console.log(err);
        })
    },
    cancelOrder(){
       http.post('/orders/update',{
        status : 4
      },{
        params : {
          id : this.formData.id,

        }
      }).then((res)=>{
          this.$message.success('Hủy đơn hàng thành công!')
        }).catch(err=>{
          console.log(err);
        })
    }
  },
  computed: {
    orderStatusText() {
      return this.orderStatus.find((p) => p.value == this.formData.status).text;
    },
  },
};
</script>
<style>
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
.right-order-info{
  display: flex;
  justify-content: space-between;
  padding : 8px 4px;
  border-bottom:1px solid #e0e0e0
}
</style>