<template>
  <div>
    <div class="content">
      <a-table :columns="cols" :data-source="data">
        <div slot="action" slot-scope="record">
          <a-icon
            type="edit"
            style="color:green;margin-left:4px"
            @click="showEditModal(record)"
          />
          <a-icon
            type="delete"
            style="color:red;margin-left:4px"
            @click="showDeleteConfirm(record)"
          />
          
          
        </div>
        <div slot="file" slot-scope="text">
          <img
            v-if="text"
            :src="require('../../../public/images/' + text)"
            alt="avatar"
            :style="{ width: '50px', height: '50px' }"
          />
        </div>
        <span slot="status" slot-scope="text">{{ renderStatus(text) }}</span>
        <a slot="link" slot-scope="text" @click="openRecord(text)"
          >{{ text }}
        </a>
      </a-table>
      
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
import Constant from "../../constant";
import EventBus from "../../event-bus";

export default {
  components: {
  },
  props: {
    column: {
      type: Array
    },
    entity: String,
    isAction: Boolean
  },
  data() {
    var cols = [];
    if (this.isAction) {
      cols.push({
        title: "Hành động",
        key: "operation",
        dataIndex: "id",
        fixed: "left",
        width: 120,
        scopedSlots: { customRender: "action" }
      });
    }

    const title = Constant[this.entity];
    var tmp = this.column.map(p => {
      if (!p.scopedSlots) {
        p.scopedSlots = {
          filterIcon: "filterIcon",
          customRender: "customRender"
        };
      }
      if (p.isCodeIndex) {
        p.scopedSlots.customRender = "link";
      } else {
        if (p.dataType) {
          p.scopedSlots.customRender = p.dataType;
        }
      }

      return p;
    });
    cols = [].concat.apply(cols, tmp);
    return {
      data: [],
      cartData: [],
      key: 0,
      cols: cols,
      visible: false,
      title,
      dataEdit: [],
      id: null,
      filters: [],
      searchText: "",
    };
  },
  methods: {
    fetchData() {
      http
        
        .get(`/${this.entity}/list`)
        .then(response => {
          this.data = response.data.data.items;
          
          
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    showDeleteConfirm(record) {
      const entity = this.entity;
      const component = this;
      this.$confirm({
        title: `Bạn có muốn xóa ${this.title} ${record} không?`,
        okText: "Xác nhận",
        okType: "danger",
        cancelText: "Hủy",

        onOk() {
          http
            .get(`/${entity}/delete`,{params:{
              id : record
            }})
            .then(response => {
              component.$message.success(
                `Xóa ${component.title} ${record} thành công`
              );
              EventBus.$emit("reload");
            })
            .catch(error => {
              component.$message.error(error.message);
            });
        }
      });
    },
    showEditModal(record) {
      this.visible = true;
      this.id = record;
      var data = [];
      http
        .get(`${this.entity}/details/${record}`)
        .then(response => {
          data = response.data;
          EventBus.$emit("data", data[0]);
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    },
    addCart(record) {
      // debugger

      http
        .get(`/goods/details/${record}`)
        .then(response => {
          this.cartData = response.data;
          this.cartData.forEach(item => {
            item.qty = 1;
          });
          this.addToCartSession(this.cartData[0], record);
        })
        .catch(error => {
          this.$message.error(message.error);
        });
    },
    addToCartSession(data, record) {
      http
        .post("/cart/add", data)
        .then(response => {
          this.$message.success(
            `Thêm thành công sản phẩm ${record} vào giỏ hàng `
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    openRecord(text) {
      this.$emit("openRecord", text);
    },
    save() {
      EventBus.$emit("saveEdit");
    },
    hideModal() {
      this.visible = false;
      this.$emit("reload");
    },
    renderStatus(text) {
      var title = 'title';
      return this.status.find(p => p.value == text).title;
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style scoped>

</style>
