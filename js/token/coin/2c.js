//挂卖单
async function sellOrder(gateWay,num,orderInfoA,orderInfoB) {
    let res = await Contract2c.methods.beginOrder(gateWay,num,orderInfoA,orderInfoB).call();

}

//取消挂单
async function cancelOrder(orderID,txt) {
    let res = await Contract2c.methods.cancelOrderByCustomer(orderID,txt).call();
}

//锁定订单
async function lockOrder(orderID) {
    let res = await Contract2c.methods.lockOrder(orderID).call();
}

//取消订单
async function cancelOrderByMerchant(orderID,txt) {
    let res = await Contract2c.methods.cancelOrderByMerchant(orderID,txt).call();
}

//待付款
async function awaitPay(num,txt){
    let res = await Contract2c.methods.completeOrder(num,txt).call();
}

//支付订单
async function payOrder(orderID) {
    let res = await Contract2c.methods.payOrderByCustomer(orderID).call();
}

//强制确认订单
async function payOrderByChecker(orderID) {
    let res = await Contract2c.methods.payOrderByCustomer(orderID).call();
}

//申诉
async function appealOrder(orderID,txt) {
    let res = await Contract2c.methods.appealOrder(orderID,txt).call();
}

//退单
async function refundOrder(orderID,txt) {
    let res = await Contract2c.methods.appealOrder(orderID,txt).call();
}

//关闭申诉
async function closeAppealOrder(orderID,txt) {
    let res = await Contract2c.methods.closeAppealOrder(orderID,txt).call();
}

//查询所有订单
async function queryAllOrder(start,limit,status,gateWay,merchant) {
    let res = await Contract2c.methods.queryAllOrder(start,status,gateWay,merchant,limit).call();
}

//查询用户订单
async function queryUserOrder(address,start,limit,status) {
    let res = await Contract2c.methods.queryAllOrder(address,start,status,limit).call();
}