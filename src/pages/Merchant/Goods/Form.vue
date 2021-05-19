<template>
  <a-form-model
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="goods"
    :rules="rules"
    ref="ruleForm"
  >
       
    <a-form-model-item label="Chọn món" ref="type" prop="type">
      <a-select
        show-search
        :value="goods.food_id"
        placeholder="Vui lòng chọn kiểu quán"
        style="width: 100%"
        :default-active-first-option="false"
        :show-arrow="true"
        :filter-option="false"
        :not-found-content="null"
        :allowClear="true"
        @focus="getListFood"
        @change="handleChange"
      >
        <a-select-option v-for="d in listFood" :key="d.id">
          {{ d.title }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="Giá" ref="title" prop="title">
      <a-input v-model="goods.cost" type="text" :allowClear="true"/>
    </a-form-model-item> 
    <a-form-model-item label="Giảm giá" ref="price" prop="price">
      <a-input-number v-model="goods.discount" :style="{ width: '50%' }" />
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
    var rules = RuleConfig[this.entity];
    return {
      goods: {
       food_id : null,
       cost : null ,
       discount : null
      },
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      data: [],
      loading: false,
      imageUrl: "",
      listFood : []
    };
  },
  methods: {
    getListFood(){
        http.post(`/food/list`).then((res)=>{
            this.listFood = res.data.data.items;
        }).catch(err=>{
            console.log(err);
        })
    },
    handleChange(value){
        this.goods.food_id = value;
    },
    save() {
      var data = {
        food_id:this.goods.food_id,
        cost: this.goods.cost,
        discount : this.goods.discount,
        restaurant_id : JSON.parse(localStorage.getItem('merchant_restaurant_id'))
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

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChangeFile(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.goods.avatar_id = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("Bạn chỉ được upload ảnh định dạng jpeg hoặc png");
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("Dung lượng ảnh không được quá 5MB");
      }
      return isJpgOrPng && isLt5M;
    },
    customRequest(options) {
      const fmData = new FormData();
      const { onSuccess, onError, file, onProgress } = options;
      fmData.append("file",file);
      http
        .post("/food/uploadFiles",fmData,{
          headers: { "content-type": "multipart/form-data" }
        })
        .then(response => {
          this.goods.avatar_id = response.data.data;
        })
        .catch(error => {
          this.$message.error(error.message);
        });
    }
  },
  mounted() {
    
  }
};
</script>
