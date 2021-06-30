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
      <a-input v-model="discount.max_distance" suffix="Km/h"/>
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
    EventBus.$on("save", this.save);
  },
  destroyed() {
    EventBus.$off("save", this.save);
  },
  props: {
    entity: String
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
      imageUrl: ""
    };
  },
  methods: {
    
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
            .post(`/${this.entity}/save`, data)
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
