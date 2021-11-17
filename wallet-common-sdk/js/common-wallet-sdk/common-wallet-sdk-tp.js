//使用tp
(function (window,wallet_sdk) {
    /**
     * 检查环境是否具备
     * @return true:具备, false:不具备
     */
    wallet_sdk.isConnected = function () {
        return tp.isConnected();
    }

    /**
     * 获取当前使用的钱包账户
     * @return success查询成功的回调函数function(data)
     *          data格式：{"result":true,"msg":"success","data":{"name":"account_name"}}
     *  data.data.name为当前账户
     */
    wallet_sdk.getCurrentAccount = function (success) {
        tp.getCurrentWallet().then(success);
    }

    /**
     *  获取EOS某个代币的余额
     *  @param contract 合约账户
     *  @param account 用户账户
     *  @symbol 代币符号
     *  @return success查询成功的回调函数function(data)
     *          data格式：{"result":true,"msg":"success","data":{"symbole":"EOS","balance":["1.0202 EOS"]}}
     *
     */
    wallet_sdk.getBalance = function (contract,account,symbol,success) {
        var params = {
            "account": account,
            "contract": contract,
            "symbol": symbol
        }
        tp.getEosBalance(params).then(success);
    }

    /**
     * 获取合约内table数据
     *
     * @param params- Object:
     *          json: boolean 是否json格式返回
     *          code: String  合约账户
     *          scope: String scope
     *          table: String 表
     *          table_key: String 索引Key
     *          lower_bound: String 下限
     *          upper_bound: String 上限
     *          limit: Number       每页总数
     *
     * @param success查询成功的回调函数function(data)
     *          data格式：{"result":true,"msg":"success","data":{"rows":[{}],more:false}}
     *          rows:表数据和表结构一致
     *          more:是否有更多数据
     *
     */
    wallet_sdk.getTableRows = function (params,success) {
        tp.getEosTableRows(params).then(success);
    }

    /**
     * 代币转账
     *
     * @param params- Object: {from:'',to:''.....}
     *      from: String                转出账户
     *      to: String                  转入账户
     *      amount: String|Number       金额
     *      tokenName: String           代币符号，EOS
     *      precision: Number|String    小数点精确，EOS为4
     *      contract: String            合约账户
     *      memo: String- (optional)    备注memo
     *
     * @param success查询成功的回调函数function(data)
     *          data格式：{"result":true,"msg":"success","data":{"transactionId": "b428357c7xxxxxxxxxxxxxx"}}
     *          transactionId：本次交易的事务号
     *
     */
    wallet_sdk.transfer = function (params,success) {
        tp.eosTokenTransfer(params).then(function(ret){
            //判断是不是result是false，因为ios下取消交易也会回调result为false
            if(ret.result == true){
                success(ret);
            }
        });
    }

    /**
     * 执行Actions
     *
     * @param params- Object:格式：
     {
        actions:[{
            account: account,               //合约账户
            name: name,                     //执行函数
            authorization: [{               //使用权限
                actor: from,
                permission: 'active'
            }], 
            data: {                         //函数参数，根据函数不同而不同
                from: from,
                to: to,
                quantity: quantity,
                memo: memo
            }
        }]
     }
     *          actions: Array- 标准eos action，支持多个
     *
     * @param success查询成功的回调函数function(data)
     *          data格式：{"result":true,"msg":"success","data":{"transactionId": "b428357c7xxxxxxxxxxxxxx"}}
     *          transactionId：本次交易的事务号
     *
     */
    wallet_sdk.pushAction = function (params,success) {
        tp.pushEosAction(params).then(function(ret){
            //判断是不是result是false，因为ios下取消交易也会回调result为false
            if(ret.result == true){
                success(ret);
            }
        });
    }
})(window,wallet_sdk);