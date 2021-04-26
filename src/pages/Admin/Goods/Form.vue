<template>
  <a-form-model
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="goods"
    :rules="rules"
    ref="ruleForm"
  >
    <a-form-model-item label="Ảnh sản phẩm" prop="avatar">
      <a-upload
        name="file"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        :customRequest="customRequest"
        @change="handleChangeFile"
      >
        <img
          v-if="goods.avatar_id"
          :src="require('../../../../public/images/'+goods.avatar_id)"
          alt="file"
          :style="{ width: '120px', height: '120px' }"
        />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">Tải ảnh sản phẩm</div>
        </div>
      </a-upload>
      
    </a-form-model-item>    
    <a-form-model-item label="Tên đồ ăn" ref="title" prop="title">
      <a-input v-model="goods.title" type="text" :allowClear="true"/>
    </a-form-model-item> 
    <a-form-model-item label="Kiểu đồ ăn" ref="price" prop="price">
      <a-input-number v-model="goods.type" :style="{ width: '50%' }" />
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
       title : "",
       type : null ,
       avatar_id : ""
      },
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      data: [],
      loading: false,
      imageUrl: ""
    };
  },
  methods: {
    
    save() {
      var data = {
        avatar_id:this.goods.avatar_id,
        title: this.goods.title,
        type : this.goods.type
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
