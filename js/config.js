var CONFIG = {
    //Address
     "undt_addr": "0x960Ee18F2aC33209370580D85B9DC6f1A11006cd",  //0x960Ee18F2aC33209370580D85B9DC6f1A11006cd  0x9b33bcb1143367fdc4069c8658543c01c33044e4
    // "udao_addr": "0x23edca64c6fa8d2f35e5338528ce9cacdc3863e4",
    // "usdt_addr": "0xbC5D4D074BAA3431466c8952C750dc6D579d9691",
    // "dai_addr": "0xfd7cd115a188cd92bf42afb9c574999ff5cc3776",
    // "tusd_addr": "0x8e6ffd7c41ee9481105f6a74851857c170cd1515",
    // "usdc_addr": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    // "pax_addr": "0x8e870d67f660d95d5be530380d0ec0bd388289e1",
    // "factory_addr": "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95",
    // "exchange_addr": "0x32a17ae3d6684105acb39e0c33699fc398a9522e",
    // "reserve_addr": "0x425984f014ca5b7ea5ad5f5e27687f6b8da1a02a",
    //
    // "und_issue_addr": "0x34d0f683d109c645f0047686c527a4e9ef85470b",
    // "udao_issue_addr": "0x9c223905c7d2d432aabbd9470b49c71494a66b70", //  0x426e90e1dcf04c02407a7401e9b74b162e3c6f58
    // "candy_addr": "0x9bdedd179dfe6bc95a36b68a884fa7f297db2d5d",
    // "query_addr" : "0xc9847d92a1429ed331f6bb94e1dbf7d5c26c690c",
	"c2c_addr" : "0x24E3aBDC967617730674275B9Fd3d51f42cb9503",  //0x64abE95327BC35cdf004363F72E7d8D526DFE738
        //0x61aB6e48f51bE76D020680c4F46d2Ea5307ebdfa
    //0x221c0921Eb5a2f8a1e06044595B2f8d18154B136
    //0x7A6026869682862c38a894CE848C8E25dA681142
    //0x28986aD01E6A38368234C585cc1bf5fb0716e4c1
    //Format
    "Fixed": 4,
    "Fixed2": 2,

    "undt_wei": 'ether',
    //start_block
    "start_block" :  0,
    "GasLimit" : 800000,
    "GasExtra" : 3000000000,
    "GasExtra2" : 300000,

    "status-msg" : {
         "1" : "等待接单",
         "2" : "等待付款",
         "3" : "等待确认",
         "4" : "交易完成",
         "5" : "投诉处理中",
         "6" : "交易关闭",
         "7" : "交易取消",
         "8" : "交易完成",
         "9" : "交易完成",
         "10" : "交易取消",
         "12" : "交易取消",
         "13" : "申诉中",
         "17" : "交易完成",
         "19" : "交易完成",
    },

    "pay-type" : {
        "LB" : "银行汇款",
        "TT" : "电汇",
        "PP" : "PAYPAL",
        "AP" : "Alipay",
        "WP" : "WeChat Pay",
        "BIT" : "加密货币",
    }
}