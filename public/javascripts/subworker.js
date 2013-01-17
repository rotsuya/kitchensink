/**
 * Created with JetBrains WebStorm.
 * User: rotsuya
 * Date: 2013/01/16
 * Time: 18:11
 * To change this template use File | Settings | File Templates.
 */
var isPrime = function(n) {
    for (var i = 2; i<= Math.sqrt(n); i++) {
        if (n % i == 0) {
            return false;
        }
    }
    return true;
};

self.addEventListener('error', function(event) {
    throw event.data;
}, false);

self.addEventListener('message', function(event) {
    // message from worker
    var num = event.num;
    var calculatorId = event.calculatorId;
    var isPrime = isPrime(n);
    if (isPrime) {
        self.postMessage('(' + calculatorId + ')' + num);
    }
}, false);
