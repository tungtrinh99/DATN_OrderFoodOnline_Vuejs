<template>
  <div class="content">
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form container"
      @submit="handleSubmit"
    >
      <a-alert v-if="notify" :message="notify" type="error" show-icon />
      <div class="title">Đăng nhập</div>
      <a-form-item>
        <a-input
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, message: 'Vui lòng điền tên đăng nhập!' },
              ],
            },
          ]"
          placeholder="Tên đăng nhập"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Vui lòng điền mật khẩu!' }] },
          ]"
          type="password"
          placeholder="Mật khẩu"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a class="login-form-forgot" href=""> Quên mật khẩu </a>
        <a-button type="primary" html-type="submit" class="login-form-button">
          Đăng nhập
        </a-button>
        Hoặc
        <router-link :to="'/register'"> Đăng kí ngay! </router-link>
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
import EventBus from "../../../event-bus";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      notify: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
         Object.assign(values, { role: 2 });
        if (!err) {
          http
            .post("/auth/login", values)
            .then((response) => {
              if (response.data.errorCode == 0) {
                this.notify = response.data.errorMessage;
              } else {
                this.notify = "";
                this.$notification["success"]({
                  message: "Thông báo đăng nhập",
                  description:
                    "Bạn đã đăng nhập thành công!",
                });
                localStorage.setItem(
                  "user_customer_id",
                  JSON.stringify(response.data.user.id)
                );
                localStorage.setItem(
                  "default_auth_token",
                  JSON.stringify(response.data.accessToken)
                );
                this.$router.back();
                EventBus.$emit("login");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
  },
  created() {},
};
</script>
<style scoped>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.content {
  background-color: #f2f2f2;
  padding-top: 64px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.login-form {
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
  margin-top: 17px;
}
.login-mess-policy {
  text-align: center;
  color: #707070;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>