
Hashcash = {
  parallelism: 4,
  
  workers: {},
  
  requests: {},
  
  makeWorkers: function (reqid) {
    var i, w;
    this.workers[reqid] = [];
    for (i=0; i<this.parallelism; i++) {
      w = new Worker('hashcash-worker.js');
      w.onmessage = this.hashcallback;
      this.workers[reqid].push(w);
    }
    this.workers[reqid];
  },
  
  hashcash: function (resource, bitcost, reqid) {
    if (!bitcost) bitcost = 16;
    function randString() {
      var length = 8,
          alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=',
          string = '';
      while (string.length < length) {
        string += alphabet[Math.floor(Math.random() * alphabet.length)];
      }
      return string;
    }
    function formatLength2(str) {
      if (str.length === 1) {
        return ('0' + str);
      } else {
        return str;
      }
    }
    var date = new Date(),
        base_cash = '1:' + bitcost + ':';
    base_cash += formatLength2((date.getFullYear() % 100).toString());
    base_cash += formatLength2((date.getMonth() + 1).toString());
    base_cash += formatLength2((date.getDay() + 1).toString());
    base_cash += ':' + resource + '::' + randString() + ':';
    
    this.makeWorkers(reqid);
    var w, i;
    for (i=0; i < this.workers[reqid].length; i++) {
      w = this.workers[reqid][i];
      w.postMessage(JSON.stringify({'reqid': reqid, 'base': base_cash, 'cost': bitcost, 'multiple': this.workers[reqid].length, 'start': i}));
    }
  },
  
  hashcallback: function (event) {
    var data = JSON.parse(event.data),
        reqid = data.reqid,
        hashcash = data.hashcash;
    if (!(Hashcash.requests[reqid])) return false; // already dealt with
    (Hashcash.requests[reqid])(hashcash);
    Hashcash.requests[reqid] = undefined;
    var ww, i;
    for (i=0; i < Hashcash.workers[reqid].length; i++) {
      ww = Hashcash.workers[reqid][i];
      ww.terminate();
    }
    // Hashcash.workers[reqid] = undefined; -- garbage collecting Workers crashes in Safari
  },
  
  mint: function (resource, bitcost, callback) {
    var reqid = Math.floor(Math.random() * 100000000);
    this.requests[reqid] = callback;
    this.hashcash(resource, bitcost, reqid);
  }
}
