<template>
  <a-layout class="main-footer">
    <a-layout-footer style="text-align: center; position: relative">
      <div class="container">
        <div class="container-inner">
          <div class="block-footer">
            <p class="title-block">Công ty</p>
            <ul class="menu-footer">
              <li class="menu-item"><a href="/gioi-thieu">Giới thiệu</a></li>
              <li class="menu-item">
                <a
                  href="https://help.now.vn/s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  >Trung tâm Trợ giúp</a
                >
              </li>
              <li class="menu-item"><a href="/regulation-web">Quy chế</a></li>
              <li class="menu-item">
                <a href="/terms-of-service">Điều khoản sử dụng</a>
              </li>
              <li class="menu-item">
                <a href="/security-policy">Bảo mật thông tin</a>
              </li>
              <li class="menu-item">
                <a href="/adjustment-of-claims">Giải quyết khiếu nại</a>
              </li>
              <li class="menu-item"><a href="/lien-he">Liên hệ</a></li>
              <li class="menu-item">
                <a href="/tuyen-dung">Hợp tác nhân viên giao nhận</a>
              </li>
              <li class="menu-item">
                <a href="/merchant-register">Đăng ký quán</a>
              </li>
              <li class="menu-item">
                <a href="/boosting-your-business-with-deliverynow"
                  >Ứng dụng NowMerchant</a
                >
              </li>
            </ul>
          </div>
          <div class="block-footer">
            <p class="title-block">Now App</p>
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://itunes.apple.com/us/app/deliverynow/id1137866760"
              title="Down app iOS"
              ><span class="apps app-ios"
                ><a-icon type="apple" />iOS</span
              ></a
            ><a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://play.google.com/store/apps/details?id=com.deliverynow"
              title="Down app Android"
              ><span class="apps app-android" title="Down app Android"
                ><a-icon type="android" />Android</span
              ></a
            >
          </div>
          <div class="block-footer txt-center">
            <div class="logo-footer">
              <a class="link" href="/ha-noi/table"
                ><img
                  id="delivery-footer-logo"
                  :src="require('../../../public/images/Logo-Nowvn-Elip.png')"
                  alt="Đặt món trực tuyến giao hàng tận nơi"
                  title="Đặt món trực tuyến giao hàng tận nơi"
                  width="80"
                  data-nsfw-filter-status="sfw"
                  style="visibility: visible"
              /></a>
            </div>
            <p class="font12">© Trinh Xuan Tung</p>
            <ul class="social-ico">
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://www.facebook.com/now.vn"
                  title="Facebook"
                  ><span class="facebook ico"
                    ><a-icon type="facebook" /></span
                ></a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://www.facebook.com/now.vn"
                  title="Facebook"
                  ><span class="google ico"
                    ><a-icon type="google-plus" /></span
                ></a>
                
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://www.instagram.com/now.vn_saigon"
                  title="Instagram"
                  ><span class="instagram ico"
                    ><a-icon type="instagram" /></span
                ></a>
              </li>
            </ul>
          </div>
          <div class="block-last">
            <p class="title-block">Địa chỉ công ty</p>
            <span
              ><p>Công Ty Cổ Phần Foody</p>
              <p>Lầu G, Tòa nhà Jabes 1,</p>
              <p>số 32 đường Nguyễn Khang, phường Yên Hòa, Quận Cầu Giấy, TP.Hà Nội</p>
              <p>Giấy CN ĐKDN số: 0311828036</p>
              <p>do Sở Kế hoạch và Đầu tư TP.Hà Nội cấp ngày 11/6/2012,</p>
              <p>sửa đổi lần thứ 23, ngày 10/12/2020</p>
              <p>Số điện thoại: 0971600489</p>
              <p>Email: <a href="mailto:tungtrinh99@gmail.com">tungtrinh99@gmail.com</a></p></span
            ><span class="registered"
              ><a
                target="_blank"
                rel="noopener noreferrer nofollow"
                href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=22747"
                title="ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG"
                ><img
                  alt="ĐÃ ĐĂNG KÝ BỘ CÔNG THƯƠNG"
                  :src="require('../../../public/images/gov_seals.jpg')"
                  data-nsfw-filter-status="sfw"
                  style="visibility: visible" /></a
            ></span>
          </div>
        </div>
      </div>
    </a-layout-footer>
  </a-layout>
</template>
<style scoped>
.container {
  width: 1200px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 10px;
  padding-left: 10px;
}
.container-inner {
  padding-top: 32px;
  padding-bottom: 25px;
  overflow: hidden;
  clear: both;
}
.block-footer {
  width: 241px;
  float: left;
  color: #959595;
  text-align: left;
}
.block-footer:first-child .title-block {
  margin-bottom: 10px;
}
.main-footer .title-block {
  font-weight: 700;
  color: #252525;
  margin-bottom: 15px;
}
.menu-footer {
  line-height: 25px;
  margin-top: 0;
  padding-left: 0;
  list-style: none;
}
.menu-item {
  cursor: pointer;
  color: #959595;
  font-size: 13px;
}
.main-footer .title-block {
  font-weight: 700;
  color: #252525;
}
.main-footer .apps:hover {
  color: #0288d1;
  border-color: #0288d1;
}
.main-footer .apps {
  font-size: 15px;
  color: #464646;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid #d7d7d7;
  box-shadow: 0 0 1px 0 #ebebeb;
  display: inline-block;
  width: 120px;
  padding: 5px 0;
  margin-bottom: 14px;
  transition: all 0.2s linear;
  -webkit-transition: all 0.2s linear;
  display: block;
}
.anticon {
  font-size: 25px;
  padding: 0 12px 0 13px;
}
.txt-center{
  text-align: center;
}
.main-footer .logo-footer {
    margin-top: 14px;
    margin-bottom: 17px;
}
.font12{
  margin-bottom:16px ;
}
.main-footer .social-ico {
    margin-top: 20px;
    padding-left: 0;
}
.main-footer .social-ico li {
    display: inline-block;
}
.main-footer .block-last {
    text-align: right;
    float: right;
    padding-top: 14px;
}
.main-footer .block-last p {
    font-size: 12px;
    margin-bottom: 2px;
    margin-top: 0;
}
.main-footer .registered {
    width: 177px;
    margin-top: 14px;
    display: inline-block;
}
.main-footer .registered img {
    width: 100%;
}
</style>

