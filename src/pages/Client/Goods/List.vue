<template>
  <div class="menu-restaurant">
    <a-list
      v-if="discountCodeList.length !== 0"
      class="discount-code-list"
      item-layout="horizontal"
      :data-source="discountCodeList"
      style="background-color : #fbf9d8;border: 1px dashed #575757"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="item.content">
          <a slot="title">{{ item.code }}</a>
          <a-avatar style="height:32px;width:32px" slot="avatar" icon="gift" />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-input-search
      placeholder="Tìm món"
      style="width: 100%"
      @search="onSearch"
    />
    <div class="title-menu" v-if="combo.length !== 0">
      Combo
    </div>
    <a-list
      v-if="combo.length !== 0"
      class="discount-code-list"
      item-layout="horizontal"
      :data-source="combo"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions">
          <a-button
            type="danger"
            style="background : #cf2127;color :white"
            @click="addToCart(index, 'combo')"
          >
            <a-icon type="plus" />
          </a-button>
        </a>
        <a-list-item-meta :description="item.content">
          <a slot="title">{{ item.title }}</a>
          <a-avatar
            @click="handlePreview(item)"
            style="cursor : pointer;border-radius : 0;width : 60px;height :60px"
            slot="avatar"
            :src="require('../../../../public/images/' + item.avatar_id)"
          />
        </a-list-item-meta>
        <div class="cost">
          <span class="original-cost" v-if="item.discount !== 0"
            >{{
              Intl.NumberFormat("vi-VN").format(
                Number.parseFloat(item.cost).toFixed(0)
              )
            }}đ</span
          >
          <span class="after-discount-cost"
            >{{
              Intl.NumberFormat("vi-VN").format(
                Number.parseFloat(
                  item.cost - (item.cost * item.discount) / 100
                ).toFixed(0)
              )
            }}đ</span
          >
        </div>
      </a-list-item>
    </a-list>
    <div class="title-menu">
      Menu
    </div>
    <a-empty
      v-if="foodData.length == 0"
      style="margin-top : 20px;margin-bottom : 20px"
      ><span slot="description">Hiện tại nhà hàng chưa có món ăn</span></a-empty
    >
    <a-list
      class="menu-restaurant-list"
      item-layout="horizontal"
      :data-source="foodData"
      v-if="foodData.length > 0"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions">
          <a-button
            type="danger"
            style="background : #cf2127;color :white"
            @click="addToCart(index, 'food')"
          >
            <a-icon type="plus" />
          </a-button>
        </a>
        <a-list-item-meta :description="item.content">
          <a slot="title" @click="addToCart(index)">{{ item.title }}</a>
          <a-avatar
            style="cursor : pointer;border-radius : 0;width : 60px;height :60px"
            @click="handlePreview(item)"
            slot="avatar"
            :src="require('../../../../public/images/' + item.avatar_id)"
          />
        </a-list-item-meta>
        <div class="cost">
          <span class="original-cost" v-if="item.discount !== 0"
            >{{
              Intl.NumberFormat("vi-VN").format(
                Number.parseFloat(item.cost).toFixed(0)
              )
            }}đ</span
          >
          <span class="after-discount-cost"
            >{{
              Intl.NumberFormat("vi-VN").format(
                Number.parseFloat(
                  item.cost - (item.cost * item.discount) / 100
                ).toFixed(0)
              )
            }}đ</span
          >
        </div>
      </a-list-item>
    </a-list>
    <a-modal
      :bodyStyle="{ padding: '0px' }"
      v-model="previewVisible"
      :footer="null"
      :closable="false"
    >
      <img
        style="width : 520px"
        :src="
          require(`../../../../public/images/${
            previewImage ? previewImage : 'no-photo.jpg'
          }`)
        "
      />
    </a-modal>
  </div>
</template>
<script>
import http from "../../../http-common";
import EventBus from "../../../event-bus";
export default {
  props: {
    id: Number,
    discountCodeList: Array,
    combo: Array
  },
  data() {
    return {
      foodData: [],
      cartData: [],
      previewVisible: false,
      previewImage: "",
      keyword: ""
    };
  },
  methods: {
    fetchData() {
      http
        .post("/restaurant-food/list", {
          id: this.id,
          textSearch: this.keyword
        })
        .then(response => {
          this.foodData = response.data.data.items;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(item) {
      this.previewImage = item.avatar_id;
      this.previewVisible = true;
    },
    addToCart(index, type) {
      let restaurantId = JSON.parse(
        localStorage.getItem("client_restaurant_info")
      ).id;
      let defaultToken = JSON.parse(localStorage.getItem("default_auth_token"));
      if (defaultToken) {
        if (!localStorage.getItem("cart")) {
          localStorage.setItem("cart", JSON.stringify([]));
        }
        this.cartData = JSON.parse(localStorage.getItem("cart"));
        if (
          this.cartData.length == 0 ||
          this.cartData.filter(item => item.restaurant_id == restaurantId)
            .length > 0
        ) {
          let food = Object.assign({ quantity: 1 }, this.foodData[index]);
          let combo = Object.assign({ quantity: 1 }, this.combo[index]);
          let indexFood = this.cartData.findIndex(
            d => d.id === food.id && d.restaurant_food_id
          );
          let indexCombo = this.cartData.findIndex(
            d => d.id === combo.id && !d.restaurant_food_id
          );
          if (type == "food") {
            if (indexFood >= 0) {
              this.cartData[indexFood].quantity += food.quantity;
            } else if (indexFood === -1) {
              this.cartData.push(food);
            } else {
              this.cartData.push(food);
            }
            localStorage.setItem("cart", JSON.stringify(this.cartData));
            EventBus.$emit("reload");
          } else if (type == "combo") {
            if (indexCombo >= 0) {
              this.cartData[indexCombo].quantity += combo.quantity;
            } else if (indexCombo === -1) {
              this.cartData.push(combo);
            } else {
              this.cartData.push(combo);
            }
            localStorage.setItem("cart", JSON.stringify(this.cartData));
            EventBus.$emit("reload");
          }
        } else {
          const component = this;
          this.$confirm({
            title: `Bạn có muốn tạo giỏ hàng mới ? `,
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
              localStorage.removeItem("cart");
              EventBus.$emit("reload");
              component.$message.success("Xin mời bạn tiến hành đặt món");
            }
          });
        }
      } else {
        this.$notification["warning"]({
          message: "Cảnh báo đăng nhập",
          description:
            "Bạn phải thực hiện đăng nhập trước khi tiến hành đặt hàng."
        });
        this.$router.push("/login");
      }
    },
    onSearch(value) {
      this.keyword = value;
      this.fetchData();
    }
  },
  created: function() {
    this.fetchData();
  }
};
</script>
<style scoped>
.cost {
  display: flex;
  flex-direction: column;
}
.cost > .original-cost {
  text-decoration: line-through;
}
.cost > .after-discount-cost {
  font-size: 16px;
  font-weight: 700;
  color: #0288d1;
}
.ant-list-item-meta-title {
  font-size: 16px;
  font-weight: 700;
  color: #0288d1;
  text-align: left;
  margin-bottom: 0;
}
.ant-input-search.ant-input-affix-wrapper {
  margin-bottom: 16px;
}
.menu-restaurant {
  padding: 8px 16px;
  background-color: #fff;
}
.ant-btn.ant-btn-danger {
  padding: 0 4px;
  height: 24px;
}
.ant-input-search.ant-input-affix-wrapper {
  margin-top: 12px;
}
.ant-avatar {
  width: 48px;
  height: 48px;
}
.ant-list-item-meta {
  align-items: center;
}
.ant-list-item-meta-description {
  font-size: 12px;
  text-align: left;
}
.ant-list-item {
  padding: 12px 8px;
}
.title-menu {
  text-transform: uppercase;
  color: #6d6f71;
  padding: 5px 0 0;
  margin: 10px 0 20px 8px;
  text-align: left;
}
</style>
