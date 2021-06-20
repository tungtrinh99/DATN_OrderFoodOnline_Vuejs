<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="textTitle"
    >
      <template slot="subTitle"
        ><a-icon type="undo" @click="reload" />
      </template>
      <template slot="extra">
        <a-button key="1" type="primary" @click="show" v-if="isAdd">
          Thêm mới
        </a-button>
      </template>
    </a-page-header>
    <a-tabs
      v-if="isTabs"
      :default-active-key="0"
      @change="selectMenuItem"
      :tabBarStyle="{ margin: '0' }"
    >
      <a-tab-pane
        v-for="(item, index) in listStatusSorted"
        :key="item.id"
        :tab="item.text"
      >
      </a-tab-pane>
    </a-tabs>
    <base-grid
      ref="grid"
      :column="column"
      :entity="entity"
      :key="key"
      :isAction="isAction"
      :isMerchant="isMerchant"
      @openRecord="openRecord($event)"
    ></base-grid>
    <a-modal
      v-model="visible"
      :title="title"
      okText="Lưu"
      cancelText="Hủy"
      @ok="save"
      :bodyStyle="{
        padding: '16px',
        overflow: 'auto'
      }"
    >
      <form-goods
        :entity="entity"
        v-if="entity == 'food'"
        @hideModal="hideModal"
      ></form-goods>
      <form-customer
        :entity="entity"
        v-if="entity == 'customer'"
        @hideModal="hideModal"
      ></form-customer>
      <form-merchant
        :entity="entity"
        v-if="entity == 'merchant'"
        @hideModal="hideModal"
      ></form-merchant>
      <form-restaurant
        :entity="entity"
        v-if="entity == 'restaurant'"
        @hideModal="hideModal"
      ></form-restaurant>
      <form-location
        :entity="entity"
        v-if="entity == 'location'"
        @hideModal="hideModal"
      ></form-location>
      <form-add-restaurant-food
        :entity="entity"
        v-if="entity == 'restaurant-food'"
        @hideModal="hideModal"
      ></form-add-restaurant-food>
      <form-discount
        :entity="entity"
        v-if="entity == 'restaurant-discount'"
        @hideModal="hideModal"
      ></form-discount>
    </a-modal>
  </div>
</template>

<script>
import BaseGrid from "../../components/Grid/BaseGrid";
import ColumnConfig from "../../common/ColumnConfig";
import Goods from "../../pages/Admin/Goods/Form";
import Customer from "../../pages/Admin/Customer/Form";
import Merchant from "../../pages/Admin/Merchant/Form";
import Restaurant from "../../pages/Admin/Restaurant/Form";
import Location from "../../pages/Admin/Location/Form";
import FoodMerchant from "../../pages/Merchant/Goods/Form";
import Discount from "../../pages/Admin/Discount/Form";

import Constant from "../../constant";
import EventBus from "../../event-bus";
import mixin from "@/mixin";
import Lang from "../../common/Lang";
export default {
  mixins: [mixin],
  components: {
    "base-grid": BaseGrid,
    "form-goods": Goods,
    "form-customer": Customer,
    "form-merchant": Merchant,
    "form-restaurant": Restaurant,
    "form-location": Location,
    "form-add-restaurant-food": FoodMerchant,
    "form-discount": Discount
  },
  data() {
    
    let column = ColumnConfig[this.entity.replace('-','_')];
    let title = Lang[this.entity] || "";

    return {
      visible: false,
      column,
      title,
      key: 0,
      data: []
    };
  },
  props: {
    textTitle: String,
    entity: String,
    isAction: Boolean,
    isAdd: Boolean,
    isTabs: Boolean,
    isMerchant: Boolean,
    isExport: Boolean
  },
  methods: {
    show() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
      this.key += 1;
    },
    reload() {
      this.key += 1;
    },
    save() {
      EventBus.$emit("save");
    },
    openRecord(record) {
      this.$emit("openRecord", record);
    },
    selectMenuItem(item) {
      let Obj = {};
      Obj.status = item;
      EventBus.$emit("filterDataByStatus", Obj);
    }
  },
  created() {
    EventBus.$on("reload", this.reload);
  },
  destroyed() {
    EventBus.$off("reload", this.reload);
  },
  computed: {
    listStatusSorted: function() {
      const compareStatus = (status1, status2) => {
        return status1.sortOrder - status2.sortOrder;
      };
      return this.listStatus.concat().sort(compareStatus);
    },
    
  },
};
</script>

<style></style>
