var abi_c2c = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "id_address",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            }
        ],
        "name": "appealOrder_Wrong",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            }
        ],
        "name": "appealOrder_NoReceive",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            },
            {
                "name": "_refundAmount",
                "type": "uint256"
            }
        ],
        "name": "closeAppealOrder",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_agent",
                "type": "address"
            },
            {
                "name": "_cashier",
                "type": "address"
            },
            {
                "name": "_refundClerk",
                "type": "address"
            },
            {
                "name": "_receive",
                "type": "address"
            }
        ],
        "name": "updateMerchant",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_merchant",
                "type": "address"
            },
            {
                "name": "_status",
                "type": "bool"
            },
            {
                "name": "_level",
                "type": "uint8"
            }
        ],
        "name": "setMerchant",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "watingBurnAmount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            },
            {
                "name": "_payMsg",
                "type": "string"
            }
        ],
        "name": "completeOrder",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_merchantID",
                "type": "uint256"
            },
            {
                "name": "_gateWay",
                "type": "string"
            },
            {
                "name": "_price",
                "type": "uint256"
            },
            {
                "name": "_fee",
                "type": "uint256"
            },
            {
                "name": "_cashAmount",
                "type": "uint256"
            },
            {
                "name": "_orderInfo",
                "type": "string"
            }
        ],
        "name": "beginOrder",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "withdrawShare",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "Statisticss",
        "outputs": [
            {
                "name": "orders",
                "type": "uint32"
            },
            {
                "name": "appeals",
                "type": "uint32"
            },
            {
                "name": "wins",
                "type": "uint32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_gateway",
                "type": "string"
            },
            {
                "name": "_status",
                "type": "bool"
            },
            {
                "name": "_receiveRate",
                "type": "uint256"
            },
            {
                "name": "_payTimestamp",
                "type": "uint256"
            },
            {
                "name": "_lockTimestamp",
                "type": "uint256"
            },
            {
                "name": "_arbitrationMarginRatio",
                "type": "uint256"
            },
            {
                "name": "_lockTimeountPay",
                "type": "uint256"
            },
            {
                "name": "_checker",
                "type": "address"
            }
        ],
        "name": "updateGatewayInfoBase",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            },
            {
                "name": "_Msg",
                "type": "string"
            }
        ],
        "name": "appealOrderAnswer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_add",
                "type": "address"
            },
            {
                "name": "_status",
                "type": "uint8"
            },
            {
                "name": "_gateWay",
                "type": "string"
            },
            {
                "name": "_merchant",
                "type": "address"
            },
            {
                "name": "_start",
                "type": "uint256"
            },
            {
                "name": "_returnNum",
                "type": "uint256"
            }
        ],
        "name": "queryAllOrder",
        "outputs": [
            {
                "name": "_return_order",
                "type": "uint256[256]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "registerMerchant",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "manager",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "addBond",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            },
            {
                "name": "_lock",
                "type": "bool"
            }
        ],
        "name": "lockOrder",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "rsaKeys",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_gateway",
                "type": "string"
            },
            {
                "name": "_price",
                "type": "uint256"
            },
            {
                "name": "_minAmount",
                "type": "uint256"
            },
            {
                "name": "_maxAmount",
                "type": "uint256"
            },
            {
                "name": "_goods",
                "type": "uint256"
            },
            {
                "name": "_fee",
                "type": "uint256"
            }
        ],
        "name": "setMerchantOrder",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "addressShare",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            }
        ],
        "name": "payOrderByChecker",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            }
        ],
        "name": "cancelOrderByCustomer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "merchantCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            },
            {
                "name": "_status",
                "type": "uint256"
            }
        ],
        "name": "arbitrate",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "orderNum",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_add",
                "type": "address"
            }
        ],
        "name": "changeOwner",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "orders",
        "outputs": [
            {
                "name": "orderInfo",
                "type": "string"
            },
            {
                "name": "orderSellAddress",
                "type": "address"
            },
            {
                "name": "orderMerchant",
                "type": "address"
            },
            {
                "name": "orderAmount",
                "type": "uint256"
            },
            {
                "name": "orderStatus",
                "type": "uint8"
            },
            {
                "name": "orderCashAmount",
                "type": "uint256"
            },
            {
                "name": "gateWay",
                "type": "string"
            },
            {
                "name": "beginTime",
                "type": "uint256"
            },
            {
                "name": "payTime",
                "type": "uint256"
            },
            {
                "name": "totalAmount",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "merchantOrders",
        "outputs": [
            {
                "name": "gateway",
                "type": "string"
            },
            {
                "name": "price",
                "type": "uint256"
            },
            {
                "name": "minAmount",
                "type": "uint256"
            },
            {
                "name": "maxAmount",
                "type": "uint256"
            },
            {
                "name": "goods",
                "type": "uint256"
            },
            {
                "name": "fee",
                "type": "uint256"
            },
            {
                "name": "online",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            }
        ],
        "name": "payOrderByCustomer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_add",
                "type": "address"
            },
            {
                "name": "_addressshare",
                "type": "address"
            }
        ],
        "name": "changeManager",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "balance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_status",
                "type": "bool"
            },
            {
                "name": "_start",
                "type": "uint256"
            },
            {
                "name": "_gateWay",
                "type": "string"
            },
            {
                "name": "_online",
                "type": "bool"
            },
            {
                "name": "_level",
                "type": "uint256"
            },
            {
                "name": "_price",
                "type": "uint256"
            },
            {
                "name": "_goods",
                "type": "uint256"
            },
            {
                "name": "_returnNum",
                "type": "uint256"
            }
        ],
        "name": "queryAllMerchantOrders",
        "outputs": [
            {
                "name": "_return_order",
                "type": "uint256[9][256]"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_gateway",
                "type": "string"
            },
            {
                "name": "_online",
                "type": "bool"
            }
        ],
        "name": "setMerchantOnline",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            }
        ],
        "name": "refundOrder",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_orderNum",
                "type": "uint256"
            }
        ],
        "name": "cancelOrderByMerchant",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "name": "checker",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_rsaKey",
                "type": "string"
            }
        ],
        "name": "updateRsaKey",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "name": "gatewayInfoBase",
        "outputs": [
            {
                "name": "status",
                "type": "bool"
            },
            {
                "name": "receiveRate",
                "type": "uint256"
            },
            {
                "name": "payTimestamp",
                "type": "uint256"
            },
            {
                "name": "lockTimestamp",
                "type": "uint256"
            },
            {
                "name": "arbitrationMarginRatio",
                "type": "uint256"
            },
            {
                "name": "lockTimeountPay",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "merchants",
        "outputs": [
            {
                "name": "merchantID",
                "type": "uint256"
            },
            {
                "name": "agent",
                "type": "address"
            },
            {
                "name": "receive",
                "type": "address"
            },
            {
                "name": "cashier",
                "type": "address"
            },
            {
                "name": "refundClerk",
                "type": "address"
            },
            {
                "name": "status",
                "type": "bool"
            },
            {
                "name": "level",
                "type": "uint8"
            },
            {
                "name": "rsaKey",
                "type": "string"
            },
            {
                "name": "bond",
                "type": "uint256"
            },
            {
                "name": "bondUsed",
                "type": "uint256"
            },
            {
                "name": "lastLockTime",
                "type": "uint256"
            },
            {
                "name": "worngNum",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "subBond",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "merchant",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "ordernum",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "msg",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "orderselladdress",
                "type": "address"
            }
        ],
        "name": "CompleteOrder",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "user",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "ordernum",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "msg",
                "type": "string"
            },
            {
                "indexed": false,
                "name": "orderselladdress",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "merchant",
                "type": "address"
            }
        ],
        "name": "AppealOrderAnswer",
        "type": "event"
    }
]