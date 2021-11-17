(function(blackjack_sdk,wallet_sdk){
    /**
     * 错误码
     */
    let errCode = function(code,msg) {
        function ErrorCode(code,msg){
            this.code = code;
            this.msg = msg;
        }
        return new ErrorCode(code,msg);
    }
    let errCodes = {
        //登录相关错误，使用1xxx
        noToken : errCode("1000","no token"),
        noAccount : errCode("1001","no account"),
        notLogin : errCode("1002","not login"),

        //游戏相关，使用2xxx
        notCommitment : errCode("2000","no commitment or reveal"),
        errReveal : errCode("2001","error reveal"),
        playerNotExist : errCode("2002","player is not exist"),
        playerStatusError : errCode("2003","player status error"),
        errServerReveal : errCode("2004","error server reveal"),
        cardIsBust : errCode("2005","card is bust"),
        cardNumError : errCode("2006","card num error"),
        gameIdError : errCode("2007","gameId error"),
        noPlayerId : errCode("2008","no playerId"),
    }
    
    /**
     * openPledge 打开分红弹出框
     *
     */
    blackjack_sdk.openPledge = function(){
        $(".pledge-cover").show();
        $(".pledge-open-wrap-box").show();
        pageInit();
    }

    /**
     * 登录，login
     * @param {*} success 
     */
    blackjack_sdk.login = function (success) {
        //生成随机数
        var token = randomHex();
        //加密随机数
        var tokenCommitment = eosSha256(token);
        var refer = window.getUrlParam("refer");
        var memo = "login   |"+tokenCommitment;
        if(refer){
            memo = memo + "|" + refer;
        }
        //构建login的Action
        var params = {
            "to": blackjack_sdk.contractAccount,
            "amount": 0.0001,
            "tokenName": "EOS",
            "precision": 4,
            "contract": "eosio.token",
            "memo": memo
        }
        //alert(JSON.stringify(params, null, 4));
        //转账
        wallet_sdk.transfer(params,function(trRet){
            var accountName = trRet.accountName;
            //alert(JSON.stringify(trRet));
            localStorage.setItem(accountName+"_token",token);
            success(trRet);
        });
    }
    /**
     * 获取是否登录成功
     * @param {*} success 
     */
    blackjack_sdk.isLogin = function (success) { 
        //获取当前用户
        blackjack_sdk.getCurrentAccount(function(ret){
            //alert(JSON.stringify(ret));
            var accountName = ret.data.name;
            //查询token
            var token = localStorage.getItem(accountName+"_token");
            if(!token){
                success({
                    "result": false,
                    "errCode":errCodes.noToken.code,
                    "msg": errCodes.noToken.msg
                });
                return;
            }
            //alert(JSON.stringify({"account":accountName,"token":token}));
            ajaxPost("/api/isLogin",{"account":accountName,"token":token},success);
        });
    }

    //延迟查询登录状态
    function delayGetLoginStatus(account,token,success){
        setTimeout(function(){getLoginStatus(account,token,success);},1000);
    }
    //查询登录状态
    function getLoginStatus(account,token,success){
        ajaxPost("/api/isLogin",{"account":account,"token":token},success);
    }

    /**
     *  获取全局信息，包括奖池总金额
     */
    blackjack_sdk.getGlobal = function (success) {
        //查询table
        var gameParams = {
            "json": true,
            "code": blackjack_sdk.contractAccount,
            "scope": blackjack_sdk.contractAccount,
            "table": "global",
            "limit":1
        };
        //alert(JSON.stringify(params, null, 4));
        wallet_sdk.getTableRows(gameParams,function(res){
            var rows = res.data.rows;

            if(rows.length > 0){
                var g = rows[0];
                var divParams = {
                    "json": true,
                    "code": blackjack_sdk.divAccount,
                    "scope": blackjack_sdk.divAccount,
                    "table": "global",
                    "limit":1
                };
                wallet_sdk.getTableRows(divParams,function(ret){
                    var divRows = ret.data.rows;
                    if(divRows.length > 0){
                        var divG = divRows[0];
                        g.dividents_balance = divG.dividents_balance;
                    }
                    //成功回调
                    success({
                        "result": true,
                        "msg": "success",
                        "data": g
                    });
                });
            }else{
                success({
                    "result":true,
                    "msg":"success",
                    "data":{
                        "total_bonus": "0.0000 EOS",
                        "total_deposit": "0.0000 EOS",
                        "total_withdraw": "0.0000 EOS",
                        "total_game_amount": "0.0000 EOS",
                        "dividents_balance": "0.0000 EOS",
                        "total_dividents": "0.0000 EOS"
                    }
                });
            }
        });
        
    }

    /**
     *  获取坐庄信息
     */
    blackjack_sdk.getBanker = function (success) {
        //查询table
        var gameParams = {
            "json": true,
            "code": blackjack_sdk.contractAccount,
            "scope": blackjack_sdk.contractAccount,
            "table": "banker",
            "limit":10
        };
        //alert(JSON.stringify(params, null, 4));
        wallet_sdk.getTableRows(gameParams,function(res){
            var rows = res.data.rows;

            if(rows.length > 0){
                //成功回调
                success({
                    "result": true,
                    "msg": "success",
                    "data": rows
                });
            }else{
                success({
                    "result":true,
                    "msg":"success",
                    "data":[
                        {"type": 0,"banker_player_num":0},
                        {"type": 1,"banker_player_num":0},
                        {"type": 5,"banker_player_num":0}
                    ]
                });
            }
        });
        
    }

    /**
     *  获取当前钱包账户
     */
    blackjack_sdk.getCurrentAccount = function (success) {
        if(blackjack_sdk.testMode){
            success({
                "data":{
                    "name":blackjack_sdk.testAccount
                }
            });
            return;
        }
        wallet_sdk.getCurrentAccount(success);
    }

    /**
     *  获取用户游戏账户
     */
    blackjack_sdk.getGameAccount = function (success) {
        if(!!(window.TPJSBrigeClient || (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getDeviceId))){
            //alert("isTP");
            //获取账户
            wallet_sdk.getCurrentAccount(function(ret){
                //alert(JSON.stringify(ret));
                var accountName = ret.data.name;
                //alert(accountName);
                wallet_sdk.getBalance("eosio.token",accountName,"EOS",function(ret){
                    var eosBalance = "0.0000 EOS";
                    if(ret.data.balance && ret.data.balance.length > 0){
                        eosBalance = ret.data.balance[0];
                    }
                    //查询table
                    var params = {
                        "json": true,
                        "code": blackjack_sdk.contractAccount,
                        "scope":  " " + accountName + " ",
                        "table": "accounts"
                    };
                    //alert(JSON.stringify(params, null, 4));
                    wallet_sdk.getTableRows(params,function(res){
                        //alert(JSON.stringify(res, null, 4));
                        var rows = res.data.rows;
                        if(rows.length > 0){
                            var acc = rows[0];
                            acc.account = accountName;
                            acc.is_playing = 0;//是否正在玩，已废弃全都是0
                            acc.eosBalance = eosBalance;
                            //alert(JSON.stringify(acc));
                            //成功回调
                            success({
                                "result": true,
                                "msg": "success",
                                "data": acc
                            });
                        }else{
                            var ept = {
                                account : accountName,          //玩家账号
                                balance : "0.0000 EOS",         //账户余额，可提现
                                total_cost : "0.0000 EOS",      //玩家总消费额
                                total_bonus : "0.0000 EOS",     //玩家获得的总奖金
                                is_playing : 0,                 //是否正在玩，已废弃
                                commitment : "",                //加密随机数
                                eosBalance : eosBalance         //钱包账户eos
                            };
                            success({
                                "result": true,
                                "msg": "success",
                                "data": ept
                            });
                        }
                    });
                });
            });
        }else{
            //alert("isScatter");
            const network = wallet_sdk.network;
            // 有 scatter 插件
            if (window["scatter"]) {
                console.log(" 有 scatter 插件");
                ScatterJS.scatter.connect('BlackJack').then(function (connected) {
                    console.log("connected:", connected);
                    if (!connected) return false;
                    const scatter = ScatterJS.scatter;
                    const requiredFields = {accounts: [network]};
                    scatter.getIdentity(requiredFields).then(() => {
                        const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                        const account = acc.name;
                        const eosOptions = {expireInSeconds: 60};
                        const eos = scatter.eos(network, Eos, eosOptions);
                        eos.getCurrencyBalance("eosio.token",account,"EOS").then(accBalance => {
                            console.log("accBalance:", accBalance);
                            var eosBalance = "0.0000 EOS";
                            if(accBalance && accBalance.length > 0){
                                eosBalance = accBalance[0];
                            }
                            //查询表
                            //查询table
                            var params = {
                                "json": true,
                                "code": blackjack_sdk.contractAccount,
                                "scope":  " " + account + " ",
                                "table": "accounts"
                            };
                            eos.getTableRows(params).then(data => {
                                console.log("table_data:", data);
                                var rows = data.rows;
                                if(rows.length > 0){
                                    var acc = rows[0];
                                    acc.account = account;
                                    acc.is_playing = 0;//是否正在玩，已废弃全都是0
                                    acc.eosBalance = eosBalance;
                                    //alert(JSON.stringify(acc));
                                    //成功回调
                                    success({
                                        "result": true,
                                        "msg": "success",
                                        "data": acc
                                    });
                                }else{
                                    var ept = {
                                        account : account,          //玩家账号
                                        balance : "0.0000 EOS",         //账户余额，可提现
                                        total_cost : "0.0000 EOS",      //玩家总消费额
                                        total_bonus : "0.0000 EOS",     //玩家获得的总奖金
                                        is_playing : 0,                 //是否正在玩，已废弃
                                        commitment : "",                //加密随机数
                                        eosBalance : eosBalance         //钱包账户eos
                                    };
                                    success({
                                        "result": true,
                                        "msg": "success",
                                        "data": ept
                                    });
                                }
                            }).catch(err1 => {
                                console.error(err1);
                            });
                        }).catch(err2 => {
                            console.error(err2);
                        });
                    }).catch(err => {
                        // The user rejected this request, or doesn't have the appropriate requirements.
                        console.error(err);
                    });
                });
            } else {
                // 无 scatter 插件
                alert("Scatter not loaded!请安装Scatter插件！");
                return Promise.reject("Scatter not loaded!");
            }          
        }
    }

    /**
     * 充值
     * @param amount 充值金额 1 EOS
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"transactionId": "b428357c7xxxxxxxxxxxxxx"}}
     *          transactionId：本次交易的事务号
     */
    blackjack_sdk.deposit = function (amount,success) {
        //转账transfer
        var params = {
            "to": blackjack_sdk.contractAccount,
            "amount": amount,
            "tokenName": "EOS",
            "precision": 4,
            "contract": "eosio.token",
            "memo": "deposit"
        }
        //alert(JSON.stringify(params, null, 4));
        //转账
        wallet_sdk.transfer(params,success)
    }

    /**
     * start 启动游戏
     * @param type 筹码类型：0.1/1/5
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"blockNum": 111,"blockId":"1111sdfsds","transactionId":"1111"}}
     *          transactionId：本次交易的事务号
     *          blockNum:本次交易所在区块号
     *          blockId：本次交易所在区块id，hash值
     * @param isDeposit 是否充值模式
     * @param isbanker 是否庄家 1为庄 2为闲
     */
    blackjack_sdk.start = function (type,success,isDeposit,isbanker) {
        if(type != 1 && type != 0.1 && type != 0.5 && type != 5){
            success({
                "result":false,
                "msg":"type is error"
            });
            return;
        }
        if(isbanker != 1 && isbanker != 2){
            success({
                "result":false,
                "msg":"isbanker is error"
            });
            return;
        }
        var amount = 0.0001;
        //amount=0.0001时为充值模式
        if(isDeposit != true){//充值模式的金额变成相应的筹码
            if(type == 1){
                amount = 1;
            }else if(type == 0.1){
                amount = 0.1;
            }else if(type == 0.5){
                amount = 0.5;
            }else if(type == 5){
                amount = 5;
            }else if(type == 10){
                amount = 10;
            }else if(type == 20){
                amount = 20;
            }else if(type == 50){
                amount = 50;
            }
        }
        //生成随机数
        var reveal = randomHex();
        //加密随机数
        var commitment = eosSha256(reveal);
        //存储实际随机数
        localStorage.setItem(commitment,reveal);
        //构建start的Action
        var params = {
            "to": blackjack_sdk.contractAccount,
            "amount": amount,
            "tokenName": "EOS",
            "precision": 4,
            "contract": "eosio.token",
            "memo": "start   |"+type+"|"+commitment+"|"+isbanker
        }
        //alert(JSON.stringify(params, null, 4));
        //转账
        wallet_sdk.transfer(params,function(res){
            var accountName = res.accountName;
            //alert(JSON.stringify(res));
            success(res);
        });
    }

    /**
     * 获取当前正在游戏的玩家信息，包括牌
     * @param {*} success(ret)
     *              ret格式：({
                        "result": true,
                        "data": {
                            "playerId":0,               //player编号
                            "type":"1",                 //游戏类型，1 为1EOS局 0.1为0.1 EOS的局
                            "status":0,                 //状态:0、已就绪(投注了，但是没有发牌，可退)，1、进行中（已发牌），2，已停牌，3、结算锁定中，4已结算,5:退款锁定 6：退款成功
                            "account": "",              //玩家账户
                            "commitment": "",           //用户随机数密文
                            "cards":[],                 //玩家的牌
                            "lastHitTime":0,            //最后要牌时间，单位毫秒 new Date(lastHitTime)获取最后要牌时间，用于显示超时还剩几分钟
                            "isbanker":2,               //是否为庄 1庄 2闲
                            "bankerFirstCard":-1,       //庄家的第一张牌
                            "bankerWords":""            //庄家留言
                        }
                    }
     */
    blackjack_sdk.getCurrentPlayer = function(success){
        //获取当前用户
        blackjack_sdk.getCurrentAccount(function(ret){
            var accountName = ret.data.name;
            //查询token
            var token = localStorage.getItem(accountName+"_token");
            if(!token){
                success({
                    "result": false,
                    "errCode":errCodes.noToken.code,
                    "msg": errCodes.noToken.msg
                });
                return;
            }

            ajaxPost(
                "/api/game/getCurrentPlayer"
                ,{
                    "account":accountName,
                    "token":token
                },success);
        });
    }

    /**
     * 发开始的两张牌
     * @param {*} success 
     */
    blackjack_sdk.hitStartCards = function(playerId,commitment,success){
        //获取当前用户
        blackjack_sdk.getCurrentAccount(function(ret){
            var accountName = ret.data.name;
            //查询token
            var token = localStorage.getItem(accountName+"_token");
            if(!token){
                success({
                    "result": false,
                    "errCode":errCodes.noToken.code,
                    "msg": errCodes.noToken.msg
                });
                return;
            }
            var reveal = localStorage.getItem(commitment);
            if(!commitment || commitment == '' || !reveal || reveal == ''){
                success({
                    "result": false,
                    "errCode":errCodes.notCommitment.code,
                    "msg": errCodes.notCommitment.msg
                });
                return;
            }

            if(!playerId || playerId == ''){
                success({
                    "result": false,
                    "errCode":errCodes.noPlayerId.code,
                    "msg": errCodes.noPlayerId.msg
                });
                return;
            }

            ajaxPost(
                "/api/game/hitStartCards"
                ,{
                    "account":accountName,
                    "token":token,
                    "playerId":playerId,
                    "commitment":commitment,
                    "reveal":reveal
                },success);
        });
    }


    /**
     * hit 要牌
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"blockNum": 111,"blockId":"1111sdfsds","transactionId":"1111"}}
     *          transactionId：本次交易的事务号
     *          blockNum:本次交易所在区块号
     *          blockId：本次交易所在区块id，hash值
     */
    blackjack_sdk.hit = function (playerId,commitment,success) {
        //获取当前用户
        blackjack_sdk.getCurrentAccount(function(ret){
            var accountName = ret.data.name;
            //查询token
            var token = localStorage.getItem(accountName+"_token");
            if(!token){
                success({
                    "result": false,
                    "errCode":errCodes.noToken.code,
                    "msg": errCodes.noToken.msg
                });
                return;
            }
            if(!commitment || commitment == ''){
                success({
                    "result": false,
                    "errCode":errCodes.notCommitment.code,
                    "msg": errCodes.notCommitment.msg
                });
                return;
            }
            if(!playerId || playerId == ''){
                success({
                    "result": false,
                    "errCode":errCodes.noPlayerId.code,
                    "msg": errCodes.noPlayerId.msg
                });
                return;
            }

            ajaxPost(
                "/api/game/hitCard"
                ,{
                    "account":accountName,
                    "token":token,
                    "playerId":playerId,
                    "commitment":commitment
                },success);
        });
    }

    /**
     * stand 停牌
     * @param success 成功回调 function(res)
     * res格式：
     *      {"action":"stand",
     *           "result": true,
     *          "msg": "success",
     *           "data": {
     *               "isbanker" : player.isbanker,   //庄闲标志 1庄 2闲
     *               "winnerStatus": -1,             //闲家显示，胜负状态 -1负，0平 1胜
     *               "winnerBonus" : "0.0000 EOS",   //闲家显示，赢的金额
     *               "minedAmount" : "0.0000 EGT",   //闲家显示，挖矿额
     *               "bankerCards" : [],             //闲家显示，庄牌
     *               "bankerPoint" : 0               //闲家显示，庄家点数
     *           },
     *           "timestamp":new Date().getTime()
     *       }
     *          
     */
    blackjack_sdk.stand = function(playerId,commitment,bankerWords,success){
        //获取当前用户
        blackjack_sdk.getCurrentAccount(function(ret){
            var accountName = ret.data.name;
            //查询token
            var token = localStorage.getItem(accountName+"_token");
            if(!token){
                success({
                    "result": false,
                    "errCode":errCodes.noToken.code,
                    "msg": errCodes.noToken.msg
                });
                return;
            }
            if(!commitment || commitment == ''){
                success({
                    "result": false,
                    "errCode":errCodes.notCommitment.code,
                    "msg": errCodes.notCommitment.msg
                });
                return;
            }

            if(!playerId || playerId == ''){
                success({
                    "result": false,
                    "errCode":errCodes.noPlayerId.code,
                    "msg": errCodes.noPlayerId.msg
                });
                return;
            }

            ajaxPost(
                "/api/game/stand"
                ,{
                    "account":accountName,
                    "token":token,
                    "playerId":playerId,
                    "commitment":commitment,
                    "bankerWords":bankerWords
                },success);
        });
    }

    /**
     * bankWords 补充庄家留言
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"transactionId": "b428357c7xxxxxxxxxxxxxx"}}
     *          transactionId：本次交易的事务号
     */
    blackjack_sdk.bankWords = function(playerId,commitment,bankerWords,success){
        //获取当前用户
        blackjack_sdk.getCurrentAccount(function(ret){
            var accountName = ret.data.name;
            //查询token
            var token = localStorage.getItem(accountName+"_token");
            if(!token){
                success({
                    "result": false,
                    "errCode":errCodes.noToken.code,
                    "msg": errCodes.noToken.msg
                });
                return;
            }
            if(!commitment || commitment == ''){
                success({
                    "result": false,
                    "errCode":errCodes.notCommitment.code,
                    "msg": errCodes.notCommitment.msg
                });
                return;
            }
            if(!playerId || playerId == ''){
                success({
                    "result": false,
                    "errCode":errCodes.noPlayerId.code,
                    "msg": errCodes.noPlayerId.msg
                });
                return;
            }

            ajaxPost(
                "/api/game/bankWords"
                ,{
                    "account":accountName,
                    "token":token,
                    "playerId":playerId,
                    "commitment":commitment,
                    "bankerWords":bankerWords
                },success);
        });
    }

    function getAmountByPrecision(amt,precision){
        let amtFloat = "0.0000";
        let afArr = (amt+"").split(".");
        if(afArr.length == 1){
            amtFloat = amt + ".0000";
        }else{
            let inte = afArr[0];
            let dec = afArr[1];
            if(dec.length >= precision){
                dec = dec.substr(0,precision);
            }else{
                let len = dec.length;
                for(let i=0;i<(precision - len);i++){
                    dec += "0";
                }
            }
            amtFloat = inte+"."+dec;
        }
        return amtFloat;
    }

    /**
     * 提现
     * @param amount 提现金额 1 EOS
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"transactionId": "b428357c7xxxxxxxxxxxxxx"}}
     *          transactionId：本次交易的事务号
     */
    blackjack_sdk.withdraw = function(amount,success){
        var quantity = parseInt(amount * 10000);
        //提现
        var params = {
            "to": blackjack_sdk.contractAccount,
            "amount": 0.0001,
            "tokenName": "EOS",
            "precision": 4,
            "contract": "eosio.token",
            "memo": "withdraw|"+quantity
        }
        //转账
        wallet_sdk.transfer(params,success);
    }

    /**
     *  获取玩家当前牌局的牌 TODO
     */
    blackjack_sdk.getPlayerCards = function (success) {
        blackjack_sdk.getCurrentPlayer(function(ret){
            if(ret.result){
                success({
                    "result": true,
                    "message": ret.message,
                    "data":ret.data.cards
                });
                return;
            }
            success(ret);
        });
    }

    /**
     *  获取玩家游戏记录 TODO
     */
    blackjack_sdk.getPlayerRecord = function (page,pageSize,success) {
        //获取账户
        blackjack_sdk.getCurrentAccount(function(ret){
            var accountName = ret.data.name;
            //查询token
            var token = localStorage.getItem(accountName+"_token");
            if(!token){
                success({
                    "result": false,
                    "errCode":errCodes.noToken.code,
                    "msg": errCodes.noToken.msg
                });
                return;
            }
            //var accountName = "baidualibaba";
            //获取玩家牌局记录
            ajaxPost(
                "/api/game/getPlayerRecord"
                ,{
                    "account":accountName,
                    "token":token,
                    "page":page,
                    "pageSize":pageSize
                },success);
        });
    }

    /**
     *  获取某局游戏的详情 TODO
     */
    blackjack_sdk.getGameDetail = function (gameId,success) {
        //根据gameId获取玩家记录
        //获取账户
        blackjack_sdk.getCurrentAccount(function(ret){
            var accountName = ret.data.name;
            //查询token
            var token = localStorage.getItem(accountName+"_token");
            if(!token){
                success({
                    "result": false,
                    "errCode":errCodes.noToken.code,
                    "msg": errCodes.noToken.msg
                });
                return;
            }
            //获取玩家牌局记录
            ajaxPost(
                "/api/game/getGameDetail"
                ,{
                    "account":accountName,
                    "token":token,
                    "gameId":gameId
                },success);
        });
    }

    /*
    *   获取玩家图片
    */
    blackjack_sdk.getPic = function (success) {
        blackjack_sdk.getCurrentAccount(function(ret){
            var accountName = ret.data.name;
            var params = {
                json: true,
                code: "accountphoto",
                scope: "accountphoto",
                table: "photo",
                lower_bound: accountName
            };
            //alert(JSON.stringify(params, null, 4));
            wallet_sdk.getTableRows(params,function(res){
                var rows = res.data.rows;

                if(rows.length > 0){
                    var g = rows[0];
                    //成功回调
                    success({
                        "result": true,
                        "msg": "success",
                        "data": g
                    });
                }else{
                    success({
                        "result":true,
                        "msg":"success",
                        "data":{
                            "photo_hash":""
                        }
                    });
                }
            });
        })
    }

})(window.blackjack_sdk=window.blackjack_sdk || {"contractAccount":"tttblackjack","divAccount":"egtdividends","isTest":false},wallet_sdk);
