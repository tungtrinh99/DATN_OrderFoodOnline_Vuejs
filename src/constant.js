const title = {
    food : 'Đồ ăn',
    restaurant : 'Quán ăn',
    user : 'Người dùng',
    location : 'Địa chỉ',
    order : 'Đơn hàng',
}
const gender = {
    NAM : 1,
    NU : 2
}
const restaurantType = {
    QUANAN : 1,
    QUANNUOC : 2 , 
    ANVATVIAHE : 3 ,
    QUANONLINE : 4
}
const orderStatus = {
    CHO_XAC_NHAN : 1 , 
    DANG_VAN_CHUYEN : 3 ,
    DA_HOAN_THANH : 4 , 
    HUY : 5,
    DANG_TIM_TAI_XE : 2
}
const userStatus = {
    SAN_SANG : 1,
    KHONG_SAN_SANG : 2
}
export default  {
    title,
    genderText : [
        {
            value : gender.NAM,
            text : "Nam",
    
        },
        {
            value : gender.NU,
            text : "Nữ",
    
        }
    ],
    typeRestaurant : [
        {
            value : restaurantType.QUANAN,
            text : 'Quán ăn',
        },
        {
            value : restaurantType.QUANNUOC,
            text : 'Quán nước',
        },{
            value : restaurantType.ANVATVIAHE,
            text : 'Ăn vặt vỉa hè',
        },{
            value : restaurantType.QUANONLINE,
            text : 'Quán onlines',
        }

    ],
    orderCustomerStatus : [
        
        {
            value : orderStatus.CHO_XAC_NHAN,
            text:'Chờ xác nhận',
            color: 'orange',

        },{
            value : orderStatus.DANG_VAN_CHUYEN,
            text:'Đang vận chuyển',
            color: 'blue',


        },{
            value : orderStatus.DA_HOAN_THANH,
            text:'Đã hoàn thành',
            color: 'green',

        },{
            value : orderStatus.HUY,
            text:'Hủy',
            color: 'purple',

        },
        {
            value : orderStatus.DANG_TIM_TAI_XE,
            text:'Đang tìm tài xế',
            color: 'red',

        }
    ],
    userStatus : [
        {
            value : userStatus.SAN_SANG,
            text:'Sẵn sàng',
        },
        {
            value : userStatus.KHONG_SAN_SANG,
            text:'Không sẵn sàng',

        },
    ]
}