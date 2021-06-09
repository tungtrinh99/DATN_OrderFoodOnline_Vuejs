export default {
  data() {
    return {
      listStatus: [{
          id: 0,
          text: "Tất cả",
          styleClass: 'badge badge-light',
          sortOrder: 0,
        },
        {
          id: 1,
          text: "Chờ xác nhận",
          styleClass: 'badge badge-light',
          sortOrder: 1,
        },
        {
          id: 3,
          text: "Đang vận chuyển",
          styleClass: 'badge badge-secondary',
          sortOrder: 3,
        },
        {
          id: 4,
          text: "Đã hoàn thành",
          styleClass: 'badge badge-secondary',
          sortOrder: 4,
        },
        {
          id: 5,
          text: "Đã hủy",
          styleClass: 'badge badge-secondary',
          sortOrder: 5,
        },
        {
          id: 2,
          text: "Đang tìm tài xế",
          styleClass: 'badge badge-secondary',
          sortOrder: 2,
        },
      ],
    }
  },
  methods: {
    convertSlug(str) {
      str = str.toLowerCase().replace(/\s/g, "-");
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
      str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
      str = str.replace(/\u02C6|\u0306|\u031B/g, "");
      return str;
    },
    // degreesToRadians(degrees) {
    //   return degrees * Math.PI / 180;
    // },

    // distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    //   var earthRadiusKm = 6371;

    //   var dLat = degreesToRadians(lat2 - lat1);
    //   var dLon = degreesToRadians(lon2 - lon1);

    //   lat1 = degreesToRadians(lat1);
    //   lat2 = degreesToRadians(lat2);

    //   var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //     Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //   return earthRadiusKm * c;
    // }
  }
}
