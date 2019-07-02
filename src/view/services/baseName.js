
const HTTPS = 'https://';
const HTTP = 'http://';
const isProd = process.env.NODE_ENV == 'production';

const LOCAL = 'localhost:4999';
const DEV = HTTPS + 'dev-api-domain';
const TEST = HTTPS + 'test-api-domain';
const PRO = HTTPS + 'prod-api-domain';

const BASENAME = {
    localhost: TEST,
    'local-domain': PRO,
    'dev-domain': DEV,
    'test-domain': TEST,
    'prod-domain': PRO
};

const SLB_PROD_HOST = '192.168.31.78';

const SLB_TEST_HOST = {
    newsservice: '192.168.31.78',
    supplementservice: '192.168.31.87',
    userservice: '192.168.31.84',
    liveservice: '192.168.31.81'
};

const SLB_INTERAL = {
    newsservice: 8182,
    supplementservice: 8184,
    userservice: 8180,
    liveservice: 8186
};

let mapBaseName = {};

if (typeof window === 'object') {
    const BaseName = BASENAME[window.location.hostname] || TEST;
    mapBaseName = Object.assign({}, mapBaseName, {
        news: BaseName + '/newsservice',
        user: BaseName + '/userservice',
        spm: BaseName + '/supplementservice'
    });
} else {
    const getBaseName = (service) => `${HTTP}${isProd ? SLB_PROD_HOST : SLB_TEST_HOST[service]}:${SLB_INTERAL[service]}`;
    mapBaseName = Object.assign({}, mapBaseName, {
        news: getBaseName('newsservice'),
        spm: getBaseName('supplementservice'),
        user: getBaseName('userservice')
    });
}

const apiBaseName = mapBaseName;

export default apiBaseName;
