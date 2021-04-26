<template>
  <div class="content">
    <a-form :form="form" @submit="handleSubmit" class="register-form container">
      <a-alert v-if="notify" :message="notify" type="error" show-icon />
      <div class="title">Đăng ký</div>

      <a-form-item v-bind="formItemLayout">
        <a-input
          placeholder="Tên đăng nhập"
          v-decorator="[
            'username',
            {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập tên đăng nhập!',
                },
              ],
            },
          ]"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" has-feedback>
        <a-input
          placeholder="Mật khẩu"
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
                {
                  validator: validateToNextPassword,
                },
              ],
            },
          ]"
          type="password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" has-feedback>
        <a-input
          placeholder="Xác nhận mật khẩu"
          v-decorator="[
            'passwordConfirm',
            {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng xác nhận mật khẩu!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ],
            },
          ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>

      <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" style="width: 100%" html-type="submit">
          Đăng ký
        </a-button>
      </a-form-item>
      <div class="login-mess-policy">
        Chúng tôi không sử dụng thông tin của bạn với bất kỳ mục đích nào. Bằng
        cách đăng nhập hoặc đăng ký, bạn đồng ý với
        <a
          style="
            color: #0495ba;
            border-bottom: 2px solid;
            text-decoration: none !important;
          "
          target="_blank"
          href="https://now.vn/gioi-thieu#footer-bottom"
          >Chính sách quy định của Foody</a
        >
      </div>
    </a-form>
  </div>
</template>

<script>
import http from "../../../http-common";
export default {
  data() {
    return {
      notify: "",
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 0 },
          sm: { span: 0 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 24,
            offset: 0,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          http
            .post("/auth/register", Object.assign({avatar_id:'avatar_default.jpg'},values))
            .then((response) => {
              let data = response.data;
              if (data.errorCode == 0) {
                this.notify = response.data.errorMessage;
              } else {
                this.$message.success(data.successMessage);
                this.$router.push("/login");
              }
            })
            .catch((error) => {
              this.$message.error(error);
            });
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Mật khẩu và xác nhận mật khẩu không giống nhau!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
  },
};
</script>
<style  scoped>
.content {
  background-color: #f2f2f2;
  padding-top: 64px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.register-form {
  margin-top: 30px;
  background-color: #fff;
  /* padding: 48px; */
  max-width: 600px;
  padding: 30px;
}
.title {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 17px;
  margin-top:17px;
}
.login-mess-policy {
  text-align: center;
  color: #707070;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>