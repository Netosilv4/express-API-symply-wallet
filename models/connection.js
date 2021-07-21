var pgp = require('pg-promise')(/* options */)
var client = pgp('postgres://bbghysbgvfomha:f7479f594e3b632184d75883f22bf868709374864cd5d15e1a9972f8aab2018b@ec2-52-1-20-236.compute-1.amazonaws.com:5432/dejloahcvn3abg')

module.exports = {
  client,
}
