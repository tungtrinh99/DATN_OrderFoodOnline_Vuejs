<template>
  <a-form-model
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="discount"
    ref="ruleForm"
    :rules="rules"
  >
    <a-form-model-item label="Mã giảm giá" ref="code" prop="code">
      <a-select
        show-search
        :value="discount.code"
        placeholder="Vui lòng chọn mã giảm giá"
        style="width: 100%"
        :default-active-first-option="false"
        :show-arrow="true"
        :filter-option="false"
        :not-found-content="null"
        :allowClear="true"
        @focus="getListDiscount"
        @change="handleChangeDiscount"
      >
        <a-select-option v-for="d in listDiscount" :key="d.id">
          {{ d.code }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Ghi chú" prop="content">
      <a-textarea v-model="discount.content" :rows="4" />
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
       content : ""
      },
      rules,
      labelCol: { span: 7 },
      wrapperCol: { span: 16 },
      loading: false,
      listDiscount : []
    };
  },
  methods: {
    handleChangeDiscount(value){
      this.discount.code = value;
    },
    getListDiscount(){
      http.post('/discount/list')
      .then((res)=>{
        this.listDiscount = res.data.data.items;
      })
      .catch(err=>{
        console.log(err);
      })
      },
    save() {
      var data = {
        discount_code_id:this.discount.code,
        restaurant_id: JSON.parse(localStorage.getItem('merchant_restaurant_id')),
        content: this.discount.content,
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
  
};
</script>
