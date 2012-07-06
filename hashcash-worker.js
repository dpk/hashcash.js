/*
CryptoJS v3.0.2
code.google.com/p/crypto-js
(c) 2009-2012 by Jeff Mott. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions, and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions, and the following disclaimer in the documentation or other materials provided with the distribution.
Neither the name CryptoJS nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS," AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var CryptoJS=CryptoJS||function(i,m){var p={},h=p.lib={},n=h.Base=function(){function a(){}return{extend:function(b){a.prototype=this;var c=new a;b&&c.mixIn(b);c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),o=h.WordArray=n.extend({init:function(a,b){a=
this.words=a||[];this.sigBytes=b!=m?b:4*a.length},toString:function(a){return(a||e).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes,a=a.sigBytes;this.clamp();if(d%4)for(var f=0;f<a;f++)b[d+f>>>2]|=(c[f>>>2]>>>24-8*(f%4)&255)<<24-8*((d+f)%4);else if(65535<c.length)for(f=0;f<a;f+=4)b[d+f>>>2]=c[f>>>2];else b.push.apply(b,c);this.sigBytes+=a;return this},clamp:function(){var a=this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<32-8*(b%4);a.length=i.ceil(b/4)},clone:function(){var a=
n.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var b=[],c=0;c<a;c+=4)b.push(4294967296*i.random()|0);return o.create(b,a)}}),q=p.enc={},e=q.Hex={stringify:function(a){for(var b=a.words,a=a.sigBytes,c=[],d=0;d<a;d++){var f=b[d>>>2]>>>24-8*(d%4)&255;c.push((f>>>4).toString(16));c.push((f&15).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d+=2)c[d>>>3]|=parseInt(a.substr(d,2),16)<<24-4*(d%8);return o.create(c,b/2)}},g=q.Latin1={stringify:function(a){for(var b=
a.words,a=a.sigBytes,c=[],d=0;d<a;d++)c.push(String.fromCharCode(b[d>>>2]>>>24-8*(d%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return o.create(c,b)}},j=q.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},k=h.BufferedBlockAlgorithm=n.extend({reset:function(){this._data=o.create();
this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=j.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,c=b.words,d=b.sigBytes,f=this.blockSize,e=d/(4*f),e=a?i.ceil(e):i.max((e|0)-this._minBufferSize,0),a=e*f,d=i.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(c,g);g=c.splice(0,a);b.sigBytes-=d}return o.create(g,d)},clone:function(){var a=n.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});h.Hasher=k.extend({init:function(){this.reset()},
reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=k.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(b,c){return a.create(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return l.HMAC.create(a,c).finalize(b)}}});var l=p.algo={};return p}(Math);
(function(){var i=CryptoJS,m=i.lib,p=m.WordArray,m=m.Hasher,h=[],n=i.algo.SHA1=m.extend({_doReset:function(){this._hash=p.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(o,i){for(var e=this._hash.words,g=e[0],j=e[1],k=e[2],l=e[3],a=e[4],b=0;80>b;b++){if(16>b)h[b]=o[i+b]|0;else{var c=h[b-3]^h[b-8]^h[b-14]^h[b-16];h[b]=c<<1|c>>>31}c=(g<<5|g>>>27)+a+h[b];c=20>b?c+((j&k|~j&l)+1518500249):40>b?c+((j^k^l)+1859775393):60>b?c+((j&k|j&l|k&l)-1894007588):c+((j^k^l)-
899497514);a=l;l=k;k=j<<30|j>>>2;j=g;g=c}e[0]=e[0]+g|0;e[1]=e[1]+j|0;e[2]=e[2]+k|0;e[3]=e[3]+l|0;e[4]=e[4]+a|0},_doFinalize:function(){var i=this._data,h=i.words,e=8*this._nDataBytes,g=8*i.sigBytes;h[g>>>5]|=128<<24-g%32;h[(g+64>>>9<<4)+15]=e;i.sigBytes=4*h.length;this._process()}});i.SHA1=m._createHelper(n);i.HmacSHA1=m._createHmacHelper(n)})();
/* END CRYPTOJS CODE */

function hashcash(resource, bitcost) {
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
  var ctr = 0,
      hash,
      done = false,
      shiftbits = (32 - bitcost);
  while (!done) {
    hash = CryptoJS.SHA1(base_cash + ctr).words[0];
    if ((hash >> shiftbits) === 0) {
      done = true;
    } else {
      ctr++;
    }
  }
  
  return base_cash + ctr;
}

self.onmessage = (function (event) {
  var data = JSON.parse(event.data),
      resource = data.resource,
      bitcost = data.bitcost,
      reqid = data.reqid,
      cashd = hashcash(resource, bitcost);
  
  self.postMessage(JSON.stringify({'reqid': reqid, 'hashcash': cashd}));
});
