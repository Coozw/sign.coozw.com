//使用 Scatter
(function (window,wallet_sdk) {

    ScatterJS.plugins(new ScatterEOS());

    const serversConfig = [
        {"protocol":"http","host":"openapi.eos.ren","weight":8},
        {"protocol":"http","host":"api.fn.eosbixin.com","weight":3},
        {"protocol":"https","host":"geo.eosasia.one","weight":8},
        {"protocol":"https","host":"api.eosbeijing.one","weight":8},
        {"protocol":"https","host":"nodes.eos42.io","weight":3},
        {"protocol":"https","host":"mainnet.eoscanada.com","weight":3},
        {"protocol":"https","host":"nodes.get-scatter.com","weight":1}
    ];
    let servers = [];
    for(let i=0;i<serversConfig.length;i++){
        let sc = serversConfig[i];
        for(let j=0;j<sc.weight;j++){
            servers.push(sc);
        }
    }
    let server = servers[parseInt(Math.random()*servers.length)];
    let port = 80;
    if(server.protocol == "https"){
        port = 443;
    }

    let chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906';

    const network = {
        blockchain: 'eos',
        protocol: server.protocol,
        host: server.host,
        port: port,
        chainId: chainId
    }
    wallet_sdk.network = network;

    /**
     * 检查环境是否具备
     * @return true:具备, false:不具备
     */
    wallet_sdk.isConnected = async function () {
        let connected = await ScatterJS.scatter.connect('BlackJack');
        return connected;
    }

    /**
     * 获取当前使用的钱包账户
     * @return success查询成功的回调函数function(data)
     *          data格式：{"result":true,"msg":"success","data":{"name":"account_name"}}
     *  data.data.name为当前账户
     */
    wallet_sdk.getCurrentAccount = function (success) {
        if (window["scatter"]) {
            // 有 scatter 插件
            console.log(" 有 scatter 插件");
            ScatterJS.scatter.connect('BlackJack').then(function (connected) {
                if (!connected) return false;
                const scatter = ScatterJS.scatter;
                const requiredFields = {accounts: [network]};
                scatter.getIdentity(requiredFields).then(() => {
                    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                    success({
                        "result":true,
                        "msg":"success",
                        "data":{"name":account.name}
                    })
                })
            }).catch(error => {
                // The user rejected this request, or doesn't have the appropriate requirements.
                console.error(error);
            });
        } else {
            // 无 scatter 插件
            alert("Scatter not loaded!请安装Scatter插件！");
            return Promise.reject("Scatter not loaded!");
        }
    }

    /**
     *  获取EOS某个代币的余额
     *  @param contract 合约账户
     *  @param account 用户账户
     *  @symbol 代币符号
     *  @return success查询成功的回调函数function(data)
     *          data格式：{"result":true,"msg":"success","data":{"symbol":"EOS","balance":["1.0202 EOS"]}}
     *
     */
    wallet_sdk.getBalance = function (contract,symbol,success) {
        if (window["scatter"]) {
            // 有 scatter 插件
            console.log(" 有 scatter 插件");
            ScatterJS.scatter.connect('BlackJack').then(function (connected) {
                if (!connected) return false;
                const scatter = ScatterJS.scatter;
                const requiredFields = {accounts: [network]};
                scatter.getIdentity(requiredFields).then(() => {
                    const acc = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                    const account = acc.account;
                    const eosOptions = {expireInSeconds: 60};
                    const eos = scatter.eos(network, Eos, eosOptions);
                    //查询账户余额
                    eos.getCurrencyBalance(contract,account,"EOS").then(accBalance => {
                        console.log("accBalance:", accBalance);
                        success({
                            "result":true,
                            "msg":"success",
                            "data":{
                                "symbol":symbol,
                                "balance":accBalance
                            }
                        })
                    }).catch(error => {
                        console.error(error);
                    });
                }).catch(error => {
                    // The user rejected this request, or doesn't have the appropriate requirements.
                    console.error(error);
                });
            }).catch(error => {
                // The user rejected this request, or doesn't have the appropriate requirements.
                console.error(error);
            });
        } else {
            // 无 scatter 插件
            alert("Scatter not loaded!请安装Scatter插件！");
            return Promise.reject("Scatter not loaded!");
        }
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
        if (window["scatter"]) {
            // 有 scatter 插件
            console.log(" 有 scatter 插件");
            ScatterJS.scatter.connect('BlackJack').then(function (connected) {
                if (!connected) return false;
                const scatter = ScatterJS.scatter;
                
                const eosOptions = {expireInSeconds: 60};
                const eos = scatter.eos(network, Eos, eosOptions);
                //查询表
                eos.getTableRows(params).then(data => {
                    console.log("table_data:", data);
                    success({
                        "result":true,
                        "msg":"success",
                        "data":data
                    })
                }).catch(error => {
                    console.error(error);
                });
            }).catch(error => {
                // The user rejected this request, or doesn't have the appropriate requirements.
                console.error(error);
            });
        } else {
            // 无 scatter 插件
            alert("Scatter not loaded!请安装Scatter插件！");
            return Promise.reject("Scatter not loaded!");
        }
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
        if (window["scatter"]) {
            // 有 scatter 插件
            console.log(" 有 scatter 插件");
            ScatterJS.scatter.connect('BlackJack').then(function (connected) {
                console.log("connected:", connected);
                if (!connected) return false;
                const scatter = ScatterJS.scatter;
                const requiredFields = {accounts: [network]};
                var accountName = "";
                scatter.getIdentity(requiredFields).then(() => {
                    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                    const eosOptions = {expireInSeconds: 60};
                    const eos = scatter.eos(network, Eos, eosOptions);
                    const transactionOptions = {authorization: [`${account.name}@${account.authority}`]};
                    accountName = account.name;
                    var quantity = getAmountByPrecision(params.amount,params.precision) + " " + params.tokenName;
                    //  transaction
                    eos.transaction({
                        actions: [
                            {
                                account: params.contract,
                                name: "transfer",
                                authorization: [{
                                    actor: account.name,
                                    permission: 'active'
                                }],
                                data: {
                                    from: account.name,
                                    to: params.to,
                                    quantity: quantity,
                                    memo: params.memo
                                }
                            }
                        ]
                    }).then(trx => {
                        console.log("trx:", trx);
                        if(trx){
                            trx.accountName = accountName;
                            success({
                                "result":true,
                                "msg":"success",
                                "data":trx,
                                "accountName":accountName
                            });
                        }
                    }).catch(error => {
                        console.error(error);
                    });
                })
            }).catch(error => {
                // The user rejected this request, or doesn't have the appropriate requirements.
                console.error(error);
            });
        } else {
            // 无 scatter 插件
            alert("Scatter not loaded!请安装Scatter插件！");
            return Promise.reject("Scatter not loaded!");
        }
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
        if (window["scatter"]) {
            // 有 scatter 插件
            console.log(" 有 scatter 插件");
            ScatterJS.scatter.connect('BlackJack').then(function (connected) {
                console.log("connected:", connected);
                if (!connected) return false;
                const scatter = ScatterJS.scatter;
                const requiredFields = {accounts: [network]};
                scatter.getIdentity(requiredFields).then(() => {
                    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
                    const eosOptions = {expireInSeconds: 60};
                    const eos = scatter.eos(network, Eos, eosOptions);
                    const transactionOptions = {authorization: [`${account.name}@${account.authority}`]};
                    
                    var quantity = getAmountByPrecision(params.amount,params.precision) + " " + params.tokenName;
                    //  transaction
                    eos.transaction({
                        params
                    }).then(trx => {
                        console.log("trx:", trx);
                        if(trx){
                            success({
                                "result":true,
                                "msg":"success",
                                "data":trx
                            });
                        }
                    }).catch(error => {
                        console.error(error);
                    });
                })
            }).catch(error => {
                // The user rejected this request, or doesn't have the appropriate requirements.
                console.error(error);
            });
        } else {
            // 无 scatter 插件
            alert("Scatter not loaded!请安装Scatter插件！");
            return Promise.reject("Scatter not loaded!");
        }
    }
})(window,wallet_sdk);