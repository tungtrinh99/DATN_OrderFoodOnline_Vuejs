<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100">
        <div class="login100-pic js-tilt" data-tilt>
          <img
            :src="require('../../../../public/images/img-01.png')"
            alt="IMG"
          />
        </div>

        <form class="login100-form validate-form">
          <span class="login100-form-title"> Đăng nhập </span>

          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form container"
            @submit="handleSubmit"
          >
            <a-form-item>
              <a-input
                v-decorator="[
                  'username',
                  {
                    rules: [
                      {
                        required: true,
                        message: 'Vui lòng điền tên đăng nhập!',
                      },
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
                  {
                    rules: [
                      { required: true, message: 'Vui lòng điền mật khẩu!' },
                    ],
                  },
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
            <div class="container-login100-form-btn">
              <button class="login100-form-btn" html-type="submit">
                Đăng nhập
              </button>
            </div>
          </a-form>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import http from "../../../http-common";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      this.form.validateFields((err, values) => {
        Object.assign(values, { role: 4 });
        if (!err) {
          http
            .post("/auth/login", values)
            .then((response) => {
              if (response.data.errorCode == 0) {
                this.notify = response.data.errorMessage;
                this.$notification["error"]({
                  message: "Thông báo đăng nhập",
                  description: this.notify,
                });
              } else {
                let data = response.data.user;
                this.$notification["success"]({
                  message: "Thông báo đăng nhập",
                  description: "Bạn đã đăng nhập thành công!",
                });
                localStorage.setItem(
                  "user_merchant_id",
                  JSON.stringify(data.id)
                );
                localStorage.setItem("merchant_logged_in", 1);
                http
                  .get("/restaurant/detail", {
                    params: {
                      userId: data.id,
                    },
                  })
                  .then((res) => {
                    localStorage.setItem(
                      "merchant_restaurant_id",
                      JSON.stringify(res.data.data.items[0].id)
                    );
                    this.$router.push("/merchant/dashboard");
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
  },
};
</script>
<style scoped>
.limiter {
  width: 100%;
  margin: 0 auto;
}
.container-login100 {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #9053c7;
  background: -webkit-linear-gradient(-135deg, #c850c0, #4158d0);
  background: -o-linear-gradient(-135deg, #c850c0, #4158d0);
  background: -moz-linear-gradient(-135deg, #c850c0, #4158d0);
  background: linear-gradient(-135deg, #c850c0, #4158d0);
}
.wrap-login100 {
  width: 960px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 130px 130px;
}
.login100-pic {
  width: 316px;
}
.login100-pic img {
  max-width: 100%;
}
img {
  vertical-align: middle;
  border-style: none;
}
.login100-form {
  width: 290px;
}
.login100-form-title {
  font-size: 24px;
  color: #333333;
  line-height: 1.2;
  text-align: center;
  width: 100%;
  display: block;
  padding-bottom: 54px;
  font-weight: 700;
}
.container-login100-form-btn {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
}
.login100-form-btn {
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  text-transform: uppercase;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background: #57b846;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 25px;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
  font-weight: 700;
}
.login100-form-btn:hover {
  background: #333333;
}

button:hover {
  cursor: pointer;
}
button {
  outline: none !important;
  border: none;
  background: transparent;
}

.txt2 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
}
.p-t-12 {
  padding-top: 12px;
}
.text-center {
  text-align: center !important;
}
.txt1 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #999999;
}
.txt2 {
  font-family: Poppins-Regular;
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
}
.p-t-136 {
  padding-top: 136px;
}
</style>