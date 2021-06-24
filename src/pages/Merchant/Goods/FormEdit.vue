<template>
  <a-form-model
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :model="goods"
    :rules="rules"
    ref="ruleForm"
  >
    
    <a-form-model-item label="Giá đồ ăn" ref="title" prop="title">
      <a-input v-model="goods.cost" type="text" :allowClear="true" />
    </a-form-model-item>
    <a-form-model-item label="Giảm giá" ref="title" prop="title">
      <a-input v-model="goods.discount" type="text" :allowClear="true" />
    </a-form-model-item>
    <a-form-model-item label="Ghi chú" ref="content" prop="content">
      <a-textarea v-model="goods.content" :rows="4"/>
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
    EventBus.$on("saveEdit", this.save);
    EventBus.$off("data", this.fetchDataEdit);
  },
  props: {
    entity: String,
    id:Number
  },
  data() {
    var rules = RuleConfig[this.entity];
    return {
      goods: {
        cost: "",
        discount: null,
        content : ""
      },
      rules,
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      data: [],
      loading: false,
      imageUrl: "",
    };
  },
  methods: {
    fetchDataEdit(data) {
      this.goods.cost = data.cost;
      this.goods.discount = data.discount;
      this.goods.content = data.content;
    },
    save() {
      var data = {
        cost: this.goods.cost,
        discount: this.goods.discount,
        content : this.goods.content
      };
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          http
            .post("/restaurant-food/update",data, { params: {
                id : this.id
            } })
            .then((response) => {
              this.$emit("hideModal");
              this.$message.success("Lưu thành công");

            })
            .catch((error) => {
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
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
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
      fmData.append("file", file);
      http
        .post("/food/uploadFiles", fmData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          this.goods.avatar_id = response.data.data;
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
  },
  mounted() {},
};
</script>
