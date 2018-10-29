const API = require("./data");
const PRINTTODOM = require("./buildDom");

API.getPolitician().then(indiv => {
  PRINTTODOM.printName(indiv);
  PRINTTODOM.printBills(indiv);
});