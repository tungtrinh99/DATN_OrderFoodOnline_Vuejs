<template>
  <a-form-model
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="discount"
    ref="ruleForm"
    :rules="rules"

  >
       
    <a-form-model-item label="Mã giảm giá" prop="code">
      <a-input v-model="discount.code" type="text" :allowClear="true"/>
    </a-form-model-item> 
    <a-form-model-item label="Giảm giá" prop="discount">
      <a-input v-model="discount.discount" suffix="VND"/>
    </a-form-model-item>
    <a-form-model-item label="Đơn hàng tối thiểu" prop="min_total_order">
      <a-input v-model="discount.min_total_order" suffix="VND"/>
    </a-form-model-item>
    <a-form-model-item label="Quảng đường tối đa" prop="max_distance">
      <a-input v-model="discount.max_distance" suffix="VND"/>
    </a-form-model-item>
    <a-form-model-item label="Thông tin giảm giá" prop="content">
      <a-textarea v-model="discount.content" :rows="4"/>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import http from "../../../http-common";
import EventBus from "../../../event-bus";
import RuleConfig from "../../../common/RuleConfig";
export default {
  created() {
    EventBus.$on("saveEdit", this.save);
    EventBus.$on("data", this.fetchDataEdit);

  },
  destroyed() {
    EventBus.$off("saveEdit", this.save);
    EventBus.$off("data", this.fetchDataEdit);

  },
  props: {
    entity: String,
    id:Number
  },
  data() {
    var rules = RuleConfig[this.entity.replace('-','_')];
    return {
      discount: {
       code : "",
       discount : null ,
       min_total_order : null,
       max_distance : null,
       content : ""
      },
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 16 },
      data: [],
      loading: false,
    };
  },
  methods: {
     fetchDataEdit(data) {
      this.discount.code = data.code;
      this.discount.discount = data.discount;
      this.discount.min_total_order = data.min_total_order;
      this.discount.max_distance = data.max_distance;
      this.discount.content = data.content;
    },
    save() {
      var data = {
        code:this.discount.code,
        discount: this.discount.discount,
        content: this.discount.content,
        max_distance: this.discount.max_distance,
        min_total_order : this.discount.min_total_order,
      };
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          http
            .post(`/restaurant-discount/update`,data, { params: {
                id : this.id
            } })
            .then(response => {
              this.id = response.data.id;
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
    },

    
    
  },
  mounted() {
    
  }
};
</script>
