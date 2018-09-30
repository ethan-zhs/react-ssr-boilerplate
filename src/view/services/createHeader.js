import MD5 from 'crypto-js/md5';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';

function createHeaders(method, requestUrl, bodyStream) {
    const Timestamp = new Date().getTime();
    let headers = {};

    const key = '28778826534697375418351580924221';
    const secret = 'HGXimfS2hcAeWbsCW19JQ7PDasYOgg1lY2UWUDVX8nNmwr6aSaFznnPzKrZ84VY1';

    let md5 = '';
    let contentMD5 = '';

    if (bodyStream) {
        md5 = MD5(bodyStream);
        contentMD5 = Base64.stringify(md5);
    }

    const stringToSigned = `${method}\n${requestUrl}\n${Timestamp}\n${contentMD5}`;

    const sign = Base64.stringify(HmacSHA256(stringToSigned, secret));

    headers = {
        'Content-Type': 'application/json',
        'X-ITOUCHTV-Ca-Timestamp': Timestamp,
        'X-ITOUCHTV-Ca-Signature': sign,
        'X-ITOUCHTV-Ca-Key': key
    };

    return headers;
}

export default createHeaders;
