<template>
  <a-form-model
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="ladingBill"
    ref="ruleForm"
    :rules="rules"
  >
    <a-form-model-item label="Mã vận đơn" prop="code">
      <a-input v-model="ladingBill.code" type="text" :disabled="true" />
    </a-form-model-item>
    <a-form-model-item label="Tài xế">
      <div class="select">
        <a-select
          show-search
          :value="ladingBill.driver_id"
          placeholder="Vui lòng chọn nhà hàng"
          style="width: 100%; border-left: none"
          :default-active-first-option="false"
          :show-arrow="true"
          :filter-option="false"
          :not-found-content="null"
          :allowClear="true"
          @change="handleChangeDriver"
          @focus="getDriver"
        >
          <a-select-option v-for="d in driver" :key="d.id">
            {{ d.fullname }}
          </a-select-option>
        </a-select>
        
      </div>
    </a-form-model-item>
    <a-form-model-item label="Trạng thái" ref="status" prop="status">
          <a-select :value="ladingBill.status" @change="handleChangeStatus">
            <a-select-option :key="1"> Khởi tạo </a-select-option>
            <a-select-option :key="2"> Đang vận chuyển </a-select-option>
            <a-select-option :key="3"> Đã hoàn thành </a-select-option>
          </a-select>
        </a-form-model-item>
  </a-form-model>
</template>
<script>
import http from "../../../http-common";
import EventBus from "../../../event-bus";
import RuleConfig from "../../../common/RuleConfig";
import mixin from "@/mixin";
export default {
  mixins: [mixin],
  created() {
    EventBus.$on("save", this.save);
  },
  destroyed() {
    EventBus.$off("save", this.save);
  },
  props: {
    entity: String
  },
  data() {
    var rules = RuleConfig[this.entity.replace("-", "_")];
    return {
      ladingBill: {
        code: this.createLadingBillCode(),
        driver_id: null,
        status: null
      },
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 16 },
      loading: false,
      imageUrl: "",
      driver: []
    };
  },
  methods: {
    getDriver() {
      http
        .get("/user/list", { params: { id: 3 } })
        .then(res => {
          this.driver = res.data.data.items;
        })
        .catch(err => {});
    },
    handleChangeDriver(value) {
      this.ladingBill.driver_id = value;
    },
    handleChangeStatus(value) {
      this.ladingBill.status = value;
    },
    save() {
      var data = {
        code: this.ladingBill.code,
        driver_id: this.ladingBill.driver_id,
        status: this.ladingBill.status
      };
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          http
            .post(`/${this.entity}/save`, data)
            .then(response => {
              this.$message.success("Tạo thành công");
            })
            .catch(error => {
              this.$message.error(error.message);
            });
          this.$emit("hideModal");
          this.$refs.ruleForm.resetFields();
        } else {
          this.$message.error("Tạo không thành công");
          return false;
        }
      });
    }
  },
  mounted() {}
};
</script>
