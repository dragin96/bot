var EventSource = require('eventsource');
var es = new EventSource('http://rc0.www.mafia-rules.net/?identifier=1517782149:MAF_CC_ru,1517782149:MAF_LST_ru');
var options = {
    url: 'http://www.mafia-rules.net/standalone/7430e69a3b9070d44121ae33b1213e6b/DO/0.06017767877610636',
    method: 'POST',
    headers: headers,
};
var request = require('request');

var headers = {
    'Pragma': 'no-cache',
    'Origin': 'http://www.mafia-rules.net',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/64.0.3282.119 Chrome/64.0.3282.119 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Cache-Control': 'no-cache',
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive',
    'Referer': 'http://www.mafia-rules.net/standalone/7430e69a3b9070d44121ae33b1213e6b/',
    'Cookie': 'CCM_lobybook_n=2'
};

function getInfo(msg){
	msg = JSON.parse(msg)[0]['data'][0];
	idMsg = msg[0];
	switch(idMsg){
		case 'gl':
			rez = {'id_room': msg[1][0],
			 'nick_sozd': msg[1][1],
			 'id_sozd': msg[1][2],
			 'num': msg[1][3],
			 'liga': msg[1][4],
			 'money': msg[1][5]
			}
			entryRoom(rez,'1');
			return rez;
		default:
			return false;
	}
}
function entryRoom(obj,hoz_liga){
	if(obj.liga == hoz_liga){
		opt = options;
		opt.body = 'method=gam_join&sd=1&id='+obj.id_room;
		console.log(obj.id_room,request(opt)['body']);
	}
	else{
		console.log(obj.nick_sozd,obj.liga);
	}
}

es.onmessage = function(e) {
  getInfo(e.data);
};
