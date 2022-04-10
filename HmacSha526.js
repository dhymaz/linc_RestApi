exports.hmacsha256 = (string) => {
    //Name of the file : sha256-hmac.js
    //Loading the crypto module in node.js
    var crypto = require('crypto');
    //creating hmac object 
    var secret = ' HMAC SHA-256';
    var hmac = crypto.createHmac('sha256', secret);
    //passing the data to be hashed
    data = hmac.update(string);
    //Creating the hmac in the required format
    gen_hmac= data.digest('hex');
    //Printing the output on the console
    return gen_hmac;
}
