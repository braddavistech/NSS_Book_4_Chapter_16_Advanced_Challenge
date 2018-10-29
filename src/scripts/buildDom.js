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