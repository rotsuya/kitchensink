/**
 * Created with JetBrains WebStorm.
 * User: rotsuya
 * Date: 2013/01/16
 * Time: 17:25
 * To change this template use File | Settings | File Templates.
 */
var isPrime = function(n) {
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
};

self.addEventListener('error', function(event) {
    throw event.data;
}, false);

self.addEventListener('message', function(event) {
    if (typeof event.data.from === 'number' && typeof event.data.to === 'number'){
        // message from main thread
        var primes = [];
        for(var i = event.data.from; i < event.data.to; i++) {
            if (isPrime(i)) {
                primes.push(i);
            }
        }
        self.postMessage(primes);
    } else {
        // message from sub worker
        self.postMessage(event.data);
    }
}, false);

