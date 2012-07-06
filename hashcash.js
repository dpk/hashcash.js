
Hashcash = {
  worker: new Worker('hashcash-worker.js'),
  requests: {},
  mint: function (resource, bitcost, callback) {
    var reqid = Math.floor(Math.random() * 100000000);
    this.requests[reqid] = callback;
    
    this.worker.postMessage(JSON.stringify({
      'resource': resource,
      'bitcost': bitcost,
      'reqid': reqid
    }));
  }
}

Hashcash.worker.onmessage = (function(event) {
  var data = JSON.parse(event.data),
      reqid = data.reqid,
      hashcash = data.hashcash;
  if (Hashcash.requests[reqid]) {
    var callback = Hashcash.requests[reqid];
    callback(hashcash);
  } else {
    console.log("wasted hashcash: reqid: "+reqid+"; hashcash: "+hashcash);
  }
});
