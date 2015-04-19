var weedDealersOwned;
var weedDealers = [
    new Dealer("Dealer 1",		500,                0.15,   1.30,	0),
    new Dealer("Dealer 2",		50000,              0.75,	1.25,	0),
    new Dealer("Dealer 3",		1000000,            2,      1.20,	0),
    new Dealer("Dealer 4",		250000000,          5,      1.15,	0),
];

var methDealersOwned;
var methDealers = [
    new Dealer("Dealer 1",		250000,            	0.15,   1.30, 	1),
    new Dealer("Dealer 2",		10000000,          	0.75,	1.25, 	1),
    new Dealer("Dealer 3",  	500000000,         	2,      1.20, 	1),
    new Dealer("Dealer 4",		10000000000,		5,      1.15, 	1),
];

var cocaineDealersOwned;
var cocaineDealers = [
    new Dealer("Dealer 1",      250000000,          0.15,   1.30,	2),
    new Dealer("Dealer 2",      50000000000,        0.75,	1.25,	2),
    new Dealer("Dealer 3",      750000000000,       2,      1.20,	2),
    new Dealer("Dealer 4",      25000000000000,     5,      1.15,	2)
];

function Dealer(name, price, sell, inflation, jsType) {
	this.name = name;
	this.price = price;
	this.sell = sell;
	this.inflation = inflation;
	this.jsType = jsType;
};
Dealer.init = function() {
	Log("Calling Dealer.init()");
	weedDealersOwned = [];
	for (var i = 0; i < weedDealers.length; i++) {
		var w = weedDealers[i];
		weedDealersOwned.push(0);
		$("#dealers-weed").append('<li id="dealers-weed-' + (i+1) + '" class="list-group-item cur-p"><b>' + w.name + '</b> cost : $' + fix(getDealerPrice(i, 0)) + '<br>Sell ' + fix(getDealerSell(i, 0)) + 'g/sec of <b>weed</b>');
		$("#dealers-weed-" + (i+1)).attr("onclick", 'Dealer.buy(' + i + ', 0);');
		$("#dealers-weed-" + (i+1)).append('<span id="dealers-weed-owned-' + (i+1) + '" class="badge">' + weedDealersOwned[i] + ' owned</span>');
	};
	methDealersOwned = [];
	for (var i = 0; i < methDealers.length; i++) {
		var m = methDealers[i];
		methDealersOwned.push(0);
		$("#dealers-meth").append('<li id="dealers-meth-' + (i+1) + '" class="list-group-item cur-p"><b>' + m.name + '</b> cost : $' + fix(getDealerPrice(i, 1)) + '<br>Sell ' + fix(getDealerSell(i, 1)) + 'g/sec of <b>meth</b>');
		$("#dealers-meth-" + (i+1)).attr("onclick", 'Dealer.buy(' + i + ', 1);');
		$("#dealers-meth-" + (i+1)).append('<span id="dealers-meth-owned-' + (i+1) + '" class="badge">' + methDealersOwned[i] + ' owned</span>');
	};
	cocaineDealersOwned = [];
	for (var i = 0; i < cocaineDealers.length; i++) {
		var c = cocaineDealers[i];
		cocaineDealersOwned.push(0);
		$("#dealers-cocaine").append('<li id="dealers-cocaine-' + (i+1) + '" class="list-group-item cur-p"><b>' + c.name + '</b> cost : $' + fix(getDealerPrice(i, 2)) + '<br>Sell ' + fix(getDealerSell(i, 2)) + 'g/sec of <b>cocaine</b>');
		$("#dealers-cocaine-" + (i+1)).attr("onclick", 'Dealer.buy(' + i + ', 2);');
		$("#dealers-cocaine-" + (i+1)).append('<span id="dealers-cocaine-owned-' + (i+1) + '" class="badge">' + cocaineDealersOwned[i] + ' owned</span>');
	};
};
Dealer.check = function() {
	Log("Calling Dealer.check()");
	for (var i = 0; i < weedDealers.length; i++) {
		var w = weedDealers[i];
		$("#dealers-weed-" + (i+1)).html('<b>' + w.name + '</b> cost : $' + fix(getDealerPrice(i, 0)) + '<br>Sell ' + fix(getDealerSell(i, 0)) + 'g/sec of <b>weed</b>');
		$("#dealers-weed-" + (i+1)).append('<span id="dealers-weed-owned-' + (i+1) + '" class="badge">' + weedDealersOwned[i] + ' owned</span>');
	};
	for (var i = 0; i < methDealers.length; i++) {
		var m = methDealers[i];
		$("#dealers-meth-" + (i+1)).html('<b>' + m.name + '</b> cost : $' + fix(getDealerPrice(i, 1)) + '<br>Sell ' + fix(getDealerSell(i, 1)) + 'g/sec of <b>meth</b>');
		$("#dealers-meth-" + (i+1)).append('<span id="dealers-meth-owned-' + (i+1) + '" class="badge">' + methDealersOwned[i] + ' owned</span>');	
	};
	for (var i = 0; i < cocaineDealers.length; i++) {
		var c = cocaineDealers[i];
		$("#dealers-cocaine-" + (i+1)).html('<b>' + c.name + '</b> cost : $' + fix(getDealerPrice(i, 2)) + '<br>Sell ' + fix(getDealerSell(i, 2)) + 'g/sec of <b>cocaine</b>');
		$("#dealers-cocaine-" + (i+1)).append('<span id="dealers-cocaine-owned-' + (i+1) + '" class="badge">' + cocaineDealersOwned[i] + ' owned</span>');	

	};
};
Dealer.buy = function(index, jsType) {
	if (jsType == 0 && money[0] >= getDealerPrice(index, 0)) {
		money[0] -= getDealerPrice(index, 0);
		weedDealersOwned[index]++;
	};
	if (jsType == 1 && money[0] >= getDealerPrice(index, 1)) {
		money[0] -= getDealerPrice(index, 1);
		methDealersOwned[index]++;
	};
	if (jsType == 2 && money[0] >= getDealerPrice(index, 2)) {
		money[0] -= getDealerPrice(index, 2);
		cocaineDealersOwned[index]++;
	};
	Dealer.check();
};
Dealer.sell = function(times) {
	/* thanks to grammarxcore (http://www.reddit.com/user/grammarxcore) for this code! */
	moneyPerSec[0] = 0;
	for (var i = 0; i < weedDealers.length; i++) {
	    var sold = (getDealerSelling(i, 0) * times) / fps;
	    if (sold > drugStock[0]){
	        sold = drugStock[0];
	    };
	    drugStock[0] -= sold;
	    gainMoney(sold * getDrugPrice(0));
	    moneyPerSec[0] += sold * getDrugPrice(0) * fps;
	};

	moneyPerSec[1] = 0;
	for (var i = 0; i < methDealers.length; i++) {
	    var sold = (getDealerSelling(i, 1) * times) / fps;
	    if (sold > drugStock[1]){
	        sold = drugStock[1];
	    };
	    drugStock[1] -= sold;
	    gainMoney(sold * getDrugPrice(1));
	    moneyPerSec[1] += sold * getDrugPrice(1) * fps;
	};

	moneyPerSec[2] = 0;
	for (var i = 0; i < cocaineDealers.length; i++) {
	    var sold = (getDealerSelling(i, 2) * times) / fps;
	    if (sold > drugStock[2]){
	        sold = drugStock[2];
	    };
	    drugStock[2] -= sold;
	    gainMoney(sold * getDrugPrice(2));
	    moneyPerSec[2] += sold * getDrugPrice(2) * fps;
	};
};