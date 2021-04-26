<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="textTitle"
    >
      <template slot="extra">
        <a-icon type="undo" @click="reload" />
        <a-button key="1" type="primary" @click="show" v-if="isAdd">
          Thêm mới
        </a-button>
        <a-modal
          v-model="visible"
          :title="title"
          okText="Lưu"
          cancelText="Hủy"
          @ok="save"
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
        </a-modal>
      </template>
    </a-page-header>
    <base-grid
      ref="grid"
      :column="column"
      :entity="entity"
      :key="key"
      :isAction="isAction"
    ></base-grid>
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

import Constant from "../../constant";
import EventBus from "../../event-bus";
export default {
  components: {
    "base-grid": BaseGrid,
    "form-goods": Goods,
    "form-customer": Customer,
    "form-merchant": Merchant,
    "form-restaurant": Restaurant,
    "form-location": Location,
  },
  data() {
    const column = ColumnConfig[this.entity];
    const title = Constant[this.entity];

    return {
      visible: false,
      column,
      title,
      key: 0,
      data: [],
    };
  },
  props: {
    textTitle: String,
    entity: String,
    isAction: Boolean,
    isAdd: Boolean,
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
  },
  created() {
    EventBus.$on("reload", this.reload);
  },
  destroyed() {
    EventBus.$off("reload", this.reload);
  },
};
</script>

<style></style>
