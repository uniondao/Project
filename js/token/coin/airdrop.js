//绑定推荐人
function bindInvit(){
    var SELF_ADDR = $("#address").val();
    var bind_card = $("#bind_card").val();
    var gas = $("#getGasPrice").val();
    $('.candy-cont-btn').addClass('gray-btn');
    
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000);
    }

    Contract_udao.methods.accountsToAddress(bind_card).call()
        .then(function(data) {
            console.log(data);

            var address_ox = data.substring(0, 2);
            if(address_ox != '0x'){
                bindInvit();
            }
            if(data == 0 || isNaN(data)){
                layer.msg(script_Lan.invit_not[currentLan]);
                btnChange();
                return false;
            }else{
                console.log(1111);
                if(SELF_ADDR == data){

                    layer.msg(script_Lan.operate_err[currentLan]);
                    btnChange();
                    return false;
                }
                console.log(2222);
                Contract_team.methods.status(data).call()
                .then(function(data2) {

                    console.log(data2);
                    if(data2 == true){
                        btnChange()
                        $('.candy-cont-btn').html(script_Lan.bing_of[currentLan]+"<dot>···</dot>");
                        Contract_team.methods.addReferee(data).send({ from: SELF_ADDR, gasPrice: gas ,gas:100000}, function(error, transactionHash){
                        if(error){
                            layer.msg(script_Lan.operate_err[currentLan]);
                            $('.candy-cont-btn').html(script_Lan.determine_binding[currentLan]);

                        }else{
                            Verification_bind(transactionHash);
                        }

                        });
                    }else{
                        layer.msg(script_Lan.addreferee_status[currentLan]);
                        return false;
                    }
                    btnChange();

                });
               

            }

        });
}


//获取上级推荐人
function invit_referee(){

    var SELF_ADDR = $("#address").val();
    Contract_team.methods.referee(SELF_ADDR).call()
        .then(function(data) {
            if (isNaN(data)) {
                invit_referee();
                return null;
            }
            if(data && data != '0x0000000000000000000000000000000000000000'){

                Contract_udao.methods.addressToAccounts(data).call()
                    .then(function(data2) {
                        if (isNaN(data2)) {
                            invit_referee();
                            return null;
                        }
                        if(data2 == 0){
                            $('#invit_referee').val('');
                        }else{
                            $('#invit_referee').val(data2);
                        }
                    })
            }else{
                $('#invit_referee').val('');
            }
        });
}

//获取中奖金额
function winning(){
    var SELF_ADDR = $("#bank_card").html();
    if(!SELF_ADDR){
        return false;
    }
    Contract_airdrop.methods.queryLuck(SELF_ADDR).call()
        .then(function(data) {
            var data = web3.utils.fromWei(data, CONFIG.udao_wei);
            $('#all_winning').html(data);
        });
}
//获取已领取金额
function haveGetGift(){
    var SELF_ADDR   = $("#address").val();
    var all_winning = $('#all_winning').html();
    if(Number(all_winning) == 0){
        return false;
    }
    Contract_airdrop.methods.haveGetGift(SELF_ADDR).call()
        .then(function(data) {
            var data = web3.utils.fromWei(data, CONFIG.udao_wei);
            not_received = Number(all_winning)-Number(data);
            $('#have_received').html(data);
            $('#not_received').html(not_received);
        });
}

//查询总推荐奖励
function queryRefereeLuck(){
    var SELF_ADDR   = $("#address").val();

    Contract_airdrop.methods.queryRefereeLuck(SELF_ADDR).call()
        .then(function(data) {
            var data = web3.utils.fromWei(data, CONFIG.udao_wei);
            $('#invit_winning').html(data/10);
        });
}


//获取已领取推荐奖金额
function haveGetRefereeGift(){
    var SELF_ADDR   = $("#address").val();
    var invit_winning = $('#invit_winning').html();
    if(Number(invit_winning) == 0){
        return false;
    }
    Contract_airdrop.methods.haveGetRefereeGift(SELF_ADDR).call()
        .then(function(data) {
            var data = web3.utils.fromWei(data, CONFIG.udao_wei);
            not_received_invit = Number(invit_winning)-Number(data);
            $('#have_received_invit').html(data);
            $('#not_received_invit').html(not_received_invit);
        });
}

//领取奖励
function getGift(){
    var SELF_ADDR = $("#address").val();
    var und_balance = $("#und_balance").val();
    $('.candy-receive-btn').addClass('gray-btn');
    
    if(Number(und_balance) < 0.01){
        layer.msg(script_Lan.und_no_enough[currentLan]);
        btnChange();
        return false;
    }
    var gas = $("#getGasPrice").val();
    if(!gas){
        gas = 10000000000;
    }else{
        gas = Number(gas)+Number(3000000000)
    }
    $(".candy-receive-btn").html(script_Lan.submitting[currentLan]+"<dot>···</dot>");
    Contract_airdrop.methods.getGift().send({ from: SELF_ADDR, gasPrice: gas }, function(error, transactionHash){
        if(error){
            layer.msg(script_Lan.operate_err[currentLan]);
            $(".candy-receive-btn").html(script_Lan.free_receive[currentLan]);
            btnChange();

        }else{
            Verification_airdrop(transactionHash);
            btnChange();

        }
        btnChange();

    });

}

function btnChange(){
    $('.gray-btn').attr('disabled',false)
    $('.gray-btn').removeClass('gray-btn');
}