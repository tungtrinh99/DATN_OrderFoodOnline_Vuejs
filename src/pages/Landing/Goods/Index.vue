<template>
  <div class="now-detail-restaurant clearfix">
    <div class="container">
      <div class="detail-restaurant-img">
        <iframe
          title="Trà Sữa Tocotoco - Tây Sơn"
          width="480"
          height="300"
          src="https://www.youtube.com/embed/YG22dXyEPx0?showinfo=0&amp;autoplay=1&amp;loop=0&amp;iv_load_policy=3&amp;controls=1&amp;cc_load_policy=1&amp;enablejsapi=1&amp;rel=0&amp;mute=1"
          frameborder="0"
        ></iframe>
      </div>
      <div class="detail-restaurant-info">
        <div class="breadcumb">
          <a-breadcrumb>
            <a-breadcrumb-item href="/home">
              <a-icon type="home" />
              <span>Home</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item href="">
              <span>Trà Sữa Tocotoco - Tây Sơn</span>
            </a-breadcrumb-item>
           
          </a-breadcrumb>
        </div>
        <div class="kind-restaurant">
          <div
            class="tag-preferred"
            data-toggle="modal"
            data-target="#modal-preferred-merchant"
          >
            <i class="fa fa-thumbs-up" aria-hidden="true"></i>Yêu thích
          </div>
          <span>
            Café/Dessert<span>
              -<a
                class="link-brand"
                title="TocoToco Bubble Tea - HN"
                rel="nofollow"
                href="/thuong-hieu/tocotoco-bubble-tea-hn"
                >Chi nhánh</a
              ></span
            ></span
          >
        </div>
        <h1 class="name-restaurant">Trà Sữa Tocotoco - Tây Sơn</h1>
        <div class="address-restaurant">137 Tây Sơn, Đống Đa, Hà Nội</div>
        <div class="rating">
          <div class="stars">
            <span class="full"><i class="fas fa-star"></i></span
            ><span class="full"><i class="fas fa-star"></i></span
            ><span class="full"><i class="fas fa-star"></i></span
            ><span class="full"><i class="fas fa-star"></i></span
            ><span class="half"><i class="fas fa-star-half-alt"></i></span>
          </div>
          <span class="number-rating">999+</span>lượt đánh giá từ Now
        </div>
        <div class="view-more-rating">
          <a
            href="https://foody.vn/ha-noi/tra-sua-tocotoco-tay-son"
            rel="noopener noreferrer nofollow"
            target="_blank"
            class="number-review"
            >Xem thêm lượt đánh giá từ Foody</a
          >
        </div>
        <div class="status-restaurant">
          <div class="opentime-status">
            <span class="stt online" title="Mở cửa"></span>
          </div>
          <div class="time">
            <i class="far fa-clock"></i>00:00 - 00:30 | 08:00 - 23:59
          </div>
        </div>
        <div class="cost-restaurant">
          <i class="fas fa-dollar-sign"></i>30,000 - 45,000
        </div>
        <div class="share-social clearfix">
          <a
            class="link-merchant"
            target="_blank"
            rel="nofollow"
            href="/boosting-your-business-with-deliverynow"
            ><i class="icon-merchant"></i>Dành cho chủ quán</a
          >
          <div class="share-social-box">
            <div
              class="fb-like"
              data-layout="button"
              data-action="like"
              data-size="small"
              data-show-faces="false"
              data-share="true"
              data-colorscheme="light"
              data-kid-directed-site="false"
            ></div>
          </div>
        </div>
        <div class="utility-restaurant clearfix">
          <div class="utility-item">
            <div class="utility-title">Phí dịch vụ</div>
            <div class="utility-content">
              <span class="txt-bold txt-red"> 0.0% Phí phục vụ </span>
            </div>
            <span
              class="icon icon-partner-vi"
              data-toggle="modal"
              data-target="#modal-verify-merchant"
            ></span>
          </div>
          <div class="utility-item">
            <div class="utility-title">Dịch vụ bởi</div>
            <div class="utility-content">
              <span class="txt-bold txt-red">Now</span>
            </div>
          </div>
          <div class="utility-item">
            <div class="utility-title">Chuẩn bị</div>
            <div class="utility-content">12 Phút</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.now-detail-restaurant {
    background-color: #fff;
    padding-top: 30px;
}
.container{
  max-width: 1200px;
  margin : 0 auto;
}
.now-detail-restaurant .detail-restaurant-img {
    width: 480px;
    height: 300px;
    position: relative;
    float: left;
}
.now-detail-restaurant .detail-restaurant-img img {
    width: 100%;
    height: 100%;
}
.now-detail-restaurant .detail-restaurant-info {
    color: #252525;
    float: right;
    width: 645px;
    padding-bottom: 15px;
}
.now-detail-restaurant .name-restaurant {
    font-size: 22px;
    color: #464646;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 4px;
    line-height: 33px;
}
.now-detail-restaurant .address-restaurant {
    font-size: 13px;
    margin-bottom: 2px;
}
.now-detail-restaurant .rating {
    margin-bottom: 4px;
    font-size: 14px;
}
.now-detail-restaurant .rating .number-rating {
    background-color: #ffc107;
    padding: 0 5px;
    border-radius: 4px;
    color: #fff;
    margin: 0 5px;
}
.now-detail-restaurant .view-more-rating {
    margin-bottom: 4px;
}
.now-detail-restaurant .number-review {
    font-size: 14px;
}
.now-detail-restaurant .status-restaurant {
    margin-bottom: 6px;
}
.now-detail-restaurant .opentime-status {
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
}
.now-detail-restaurant .cost-restaurant {
    color: #959595;
    font-size: 15px;
}
</style>