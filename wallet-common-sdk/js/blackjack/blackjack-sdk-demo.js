(function(blackjack_sdk,wallet_sdk){
    //新增登录、查当前牌接口
    
    /**
     * 登录，login
     * @param {*} success 
     */
    blackjack_sdk.login = function (success) {
        success({
            "result":true,
            "msg":"success",
            "data":{
                "transactionId": "b428357c7xxxxxxxxxxxxxx"
            }
        });
    }
    /**
     * 获取是否登录成功
     * @param {*} success 
     */
    blackjack_sdk.isLogin = function (success) { 
        success({
            "result":true,
            "msg":"success",
            "data":{
                "account": "baidualibaba",               //玩家账户
                "commitment":"",                         //用户token密文
            }
        });
    }

    /**
     * 获取当前正在游戏的玩家信息，包括牌
     * @param {*} success 
     */
    blackjack_sdk.getCurrentPlayer = function(success){
        success({
            "result":true,
            "msg":"success",
            "data":{
                "playerId":0,               //player编号
                "gameId":0,                 //游戏局编号
                "account": "",              //玩家账户
                "startTxId":"",             //玩家start的txId
                "customerCommitment": "",   //用户随机数密文
                "serverCommitment": "",     //服务器随机数密文
                "totalBet":10000,           //本局用户总投注金额，单位是1EOS*10000,精确到最小发行单位了
                "cardNum": 0,               //用户总牌数
                "status": 0,                //状态:0、已就绪(投注了，但是没有发牌，可退)，1、进行中（已发牌），2，已停牌，3、结算中，4已结算
                "isBust":false,             //爆牌：true、正常，false、爆牌
                "isWinner":false,           //是否为赢家
                "winnerBonus":0,            //本局赢取的奖金
                "isLotteryWinner":false,    //是否为大奖获得者
                "cards": [],                //玩家所有的牌，在可结算时才显示
                "point": 0,                 //点数
                "lockTime":0                //锁定时间，status设置为3的时间，防止死锁
            }
        });
    }

    /**
     * 发开始的两张牌
     * @param {*} success 
     */
    blackjack_sdk.hitStartCards = function(success){
        success({
            "result": true,
            "msg": "success",
            "data":{
                point:18,
                cards:[32,28]
            }
        });
    }


    /**
     *  获取全局信息，包括奖池总金额
     */
    blackjack_sdk.getGlobal = function (success) {
        success({
            "result":true,
            "msg":"success",
            "data":{
                "total_bonus": "7.0000 EOS",
                "total_deposit": "7.0002 EOS",
                "total_withdraw": "0.0000 EOS",
                "total_game_amount": "0.0000 EOS"
            }
        });
    }
    /**
     *  获取钱包账户列表
     */
    blackjack_sdk.getAccountList = function (success) {
        success({
            "result":true,
            "msg":"success",
            "data":[{
                "name":"google111111",
                "tokens":{
                    "EOS":2.1855
                }
            }]
        });
    }

    /**
     *  获取当前钱包账户
     */
    blackjack_sdk.getCurrentAccount = function (success) {
        success({
            "result":true,
            "msg":"success",
            "data":{
                "name":"google111111"
            }
        });
    }

    /**
     *  获取用户游戏账户
     */
    blackjack_sdk.getGameAccount = function (success) {
        var ept = {
            account:"google111111",                     //用户名
            balance : "0.0000 EOS",             //账户余额，可提现
            total_cost : "0.0000 EOS",          //玩家总消费额
            total_bonus : "0.0000 EOS",         //玩家获得的总奖金
            is_playing : 0,                     //是否正在玩
            commitment : "64位"                 //加密随机数
        };
        success({
            "result":true,
            "msg":"success",
            "data":ept
        });
    }

    /**
     * 充值
     * @param amount 充值金额 1 EOS
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"transactionId": "b428357c7xxxxxxxxxxxxxx"}}
     *          transactionId：本次交易的事务号
     */
    blackjack_sdk.deposit = function (amount,success) {
        success({
            "result":true,
            "msg":"success",
            "data":{
                "transactionId": "b428357c7xxxxxxxxxxxxxx"
            }
        });
    }

    /**
     * start 启动游戏
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"cards":[51,2]}}
     *          cards:返回2张牌
     *          blockNum:区块号
     *          blockId:区块id
     *          transactionId:交易号
     */
    blackjack_sdk.start = function (success) {
        var blockNum = 12345;
        var blockId = "20xxdfssdfxxxxxxx";
        success({
            "result":true,
            "msg":"success",
            "data":{
                "blockNum": blockNum,
                "blockId":blockId,
                "transactionId": "b428357c7xxxxxxxxxxxxxx",
                "cards": [51,2]         //返回两张牌                
            }
        });
    }

    /**
     * hit 要牌
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"blockNum": 111,"blockId":"1111sdfsds","transactionId":"1111"}}
     *          card:返回一张牌
     *          transactionId：本次交易的事务号
     *          blockNum:本次交易所在区块号
     *          blockId：本次交易所在区块id，hash值
     */
    blackjack_sdk.hit = function (success) {
        var blockNum = 12345;
        var blockId = "20xxdfssdfxxxxxxx";
        success({
            "result":true,
            "msg":"success",
            "data":{
                "blockNum": blockNum,
                "blockId":blockId,
                "transactionId": "b428357c7xxxxxxxxxxxxxx",
                "card": 28//返回1张牌
            }
        });
    }

    /**
     * stand 停牌
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"transactionId": "b428357c7xxxxxxxxxxxxxx"}}
     *          transactionId：本次交易的事务号
     */
    blackjack_sdk.stand = function(success){
        success({
            "result":true,
            "msg":"success",
            "data":{
                "transactionId": "b428357c7xxxxxxxxxxxxxx"
            }
        });
    }

    /**
     * 收钱，把赢取的钱收到余额里
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"transactionId": "b428357c7xxxxxxxxxxxxxx"}}
     *          transactionId：本次交易的事务号
     */
    blackjack_sdk.receive = function(success){
        success({
            "result":true,
            "msg":"success",
            "data":{
                "transactionId": "b428357c7xxxxxxxxxxxxxx"
            }
        });
    }

    /**
     * 提现
     * @param amount 提现金额 1 EOS
     * @param success 成功回调 function(res)
     *          res格式：{"result":true,"msg":"success","data":{"transactionId": "b428357c7xxxxxxxxxxxxxx"}}
     *          transactionId：本次交易的事务号
     */
    blackjack_sdk.withdraw = function(amount,success){
        success({
            "result":true,
            "msg":"success",
            "data":{
                "transactionId": "b428357c7xxxxxxxxxxxxxx"
            }
        });
    }

    /**
     *  获取玩家当前牌局的牌，如果第一次没有获取到就调用这个
     */
    blackjack_sdk.getPlayerCards = function (success) {
        success({
            "result":true,
            "msg":"success",
            "data":{
                "cards": [51,2,1] //返回所有的牌
            }
        });
        
    }

    /**
     *  获取玩家游戏记录 TODO
     */
    blackjack_sdk.getPlayerRecord = function (success) {
        success({
            "result":true,
            "msg":"success",
            "data":[
                {
                    "playerId":1,                   //player编号
                    "gameId":1,                     //游戏局编号
                    "account": "google111111",      //玩家账户
                    "cardNum": 3,                   //用户总牌数
                    "status": 4,                    //状态:0、进行中，2、未结算，4已结算
                    "isBust": false,                //爆牌：false、正常，true、爆牌
                    "isWinner": true,               //是否为赢家
                    "winnerBonus":1.8,              //本局赢取的奖金
                    "isLotteryWinner":false,        //是否为大奖获得者
                    "cards": [43,28,38],            //玩家所有的牌，在可结算时才显示
                    "point": 20                     //点数
                },
                {
                    "playerId":2,                   //player编号
                    "gameId":2,                     //游戏局编号
                    "account": "google111111",      //玩家账户
                    "cardNum": 3,                   //用户总牌数
                    "status": 4,                    //状态:0、进行中，2、未结算，4已结算
                    "isBust": true,                //爆牌：false、正常，true、爆牌
                    "isWinner": false,              //是否为赢家
                    "winnerBonus":1.8,              //本局赢取的奖金
                    "isLotteryWinner":false,        //是否为大奖获得者
                    "cards": [12,21,30],            //玩家所有的牌，在可结算时才显示
                    "point": 22                     //点数
                }
            ]
        });
    }

    /**
     *  获取某局游戏的详情 TODO
     */
    blackjack_sdk.getGameDetail = function (gameId,success) {
        success({
            "result":true,
            "msg":"success",
            "data":[
                {
                    "playerId":1,                   //player编号
                    "gameId":1,                     //游戏局编号
                    "account": "google111111",      //玩家账户
                    "cardNum": 3,                   //用户总牌数
                    "status": 4,                    //状态:0、进行中，2、未结算，4已结算
                    "isBust": false,                //爆牌：false、正常，true、爆牌
                    "isWinner": true,              //是否为赢家
                    "winnerBonus":1.8,              //本局赢取的奖金
                    "isLotteryWinner":false,        //是否为大奖获得者
                    "cards": [43,28,38],            //玩家所有的牌，在可结算时才显示
                    "point": 20                     //点数
                },
                {
                    "playerId":3,                   //player编号
                    "gameId":1,                     //游戏局编号
                    "account": "baidualibaba",      //玩家账户
                    "cardNum": 3,                   //用户总牌数
                    "status": 4,                    //状态:0、进行中，2、未结算，4已结算
                    "isBust": true,                //爆牌：false、正常，true、爆牌
                    "isWinner": false,              //是否为赢家
                    "winnerBonus":1.8,              //本局赢取的奖金
                    "isLotteryWinner":false,        //是否为大奖获得者
                    "cards": [12,21,30],            //玩家所有的牌，在可结算时才显示
                    "point": 22                     //点数
                }
            ]
        });
    }

})(window.blackjack_sdk || {},wallet_sdk);
