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