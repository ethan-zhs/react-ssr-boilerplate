
var HTTPS = 'https://';

var LOCAL = 'localhost:4999';
var DEV = HTTPS + 'dev.itouchtv.cn:8090';
var TEST = HTTPS + 'test1.itouchtv.cn:8090';
var PRO = HTTPS + 'api.itouchtv.cn:8090';

var BASENAME = {
    localhost: TEST,
    'dev-www.itouchtv.cn': DEV,
    'test-www.itouchtv.cn': TEST,
    'www.itouchtv.cn': PRO
};


const currentBaseName = BASENAME[window.location.hostname] || TEST;


export default currentBaseName;
