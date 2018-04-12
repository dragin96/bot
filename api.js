;

var request = require('request');

const mafia = {
  options: {
    url: 'http://www.mafia-rules.net/standalone/a8739d15fdf7d8b01d22dd193c76515e/DO/0.5990377626850216',
    method: 'POST',
    headers: {'Origin': 'http://www.mafia-rules.net','Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7','Accept-Encoding': 'gzip, deflate','User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36','Content-Type': 'application/x-www-form-urlencoded','Accept': 'application/json, text/javascript, */*; q=0.01','Referer': 'http://www.mafia-rules.net/standalone/84ea0d0ea170a8f968bb2a56ade70428/','X-Requested-With': 'XMLHttpRequest','Connection': 'keep-alive','Cookie': 'CCM_lobybook_n=2'},
  },
  loger(error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body);
      }
  },
  messages(_val, when, id){
    let dataString = 'method=cht_send&sd=1&val=';
    const chats = ['opt[pv]='+id, '', 'opt[mf]=1', 'opt[tf]=1', 'opt[sm]=1']
    dataString = `${dataString} ${_val} & ${chats[when]}`;
    this.options['body'] = dataString;
    request(this.options, this.loger);
    console.log(this.options, this.loger);
  },
  creatRoom ({players = 8,bet = 20,league = 0,prior = 1}){
    this.options['body'] = `method=gam_create&players=${players}&bet=${bet}&league=${league}&prior=${prior}`;
    request(this.options, this.loger);
  },
  joinRoom(id){
    this.options['body']  = `method=gam_join&id=${id}`
    request(this.options, this.loger);
  },
  golos(id){
    //kv
    this.options['body']  = `method=vte_act&id=${id}&kv=0&md=0`
    request(this.options, this.loger);
  },
  auk(){
    this.options['body']  = `method=sale_bet`
    request(this.options, this.loger);
  },
  game_exit(){
    this.options['body']  = `method=gam_exit&state=play`
    request(this.options, this.loger);
  },



}

//mafia.messages("ff", 0, 10886141)
// let obj = {
//
// }
// mafia.creatRoom(obj)
mafia.golos(8140627)
//mafia.game_exit()
