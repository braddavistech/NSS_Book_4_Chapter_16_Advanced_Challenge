(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const API = require("./data");
const placeholder = document.querySelector(".politician");

const PRINTTODOM = {
  printName(indiv) {
    let nameHead = document.createElement("header");
    nameHead.setAttribute("class", "politician__name");
    nameHead.innerHTML = indiv[0].name;
    placeholder.appendChild(nameHead);
    return indiv;
  },
  printBills(rep) {
    let billSect = document.createElement("section");
    billSect.setAttribute("class", "politician__bills");
    let billHead = document.createElement("h3");
    billHead.innerHTML = "Sponsored Bills";
    billSect.appendChild(billHead);
    API.getBills().then(bills => bills.forEach(bill => {
      for (let i = 0; i < rep[0].billsId.length; i++) {
        if (bill.id === rep[0].billsId[i]) {
          let billDiv = document.createElement("div");
          let indiBill = document.createElement("h4");
          indiBill.innerHTML = bill.id + ": " + bill.name;
          billDiv.appendChild(indiBill);
          let pacSec = document.createElement("section");
          pacSec.setAttribute("class", "politician__influence");
          pacSec.innerHTML = "PAC Influence";
          let unList = document.createElement("ul");
          let sources = document.createElement("ul");
          for (let i = 0; i < bill.sector.length; i++) {
            let listItem = document.createElement("li");
            listItem.innerHTML = bill.sector[i];
            sources.appendChild(listItem);
            API.getPAC(bill.sector[i]).then(name => {
              if (name !== 1) {
              let listIt = document.createElement("li");
              listIt.innerHTML = name[0].name;
              unList.appendChild(listIt);
              }
            })
          }
          billDiv.appendChild(sources);
          billSect.appendChild(billDiv);
          pacSec.appendChild(unList);
          billSect.appendChild(pacSec);
          placeholder.appendChild(billSect);
        }
        }
    }))
  }
}


module.exports = PRINTTODOM;
},{"./data":2}],2:[function(require,module,exports){
const API = {
  getPolitician () {
    return fetch("http://localhost:8088/politician")
      .then(politician => politician.json())
      .then(politician => {
        return politician;
      });
  },
  getBills () {
    return fetch("http://localhost:8088/bills")
      .then(bills => bills.json())
      .then(bills => {
        return bills;
      });
  },
  getPAC (id) {
    return fetch(`http://localhost:8088/pac?q=${id}`)
      .then(pac => pac.json())
      .then(pac => {
        if (pac.length >= 1) {
        return pac;
        } else {
          return 1;}
      });
  }
};

module.exports = API;
},{}],3:[function(require,module,exports){
const API = require("./data");
const PRINTTODOM = require("./buildDom");

API.getPolitician().then(indiv => {
  PRINTTODOM.printName(indiv);
  PRINTTODOM.printBills(indiv);
});
},{"./buildDom":1,"./data":2}]},{},[3]);
