
/**
 * 过滤非法id
 * 
 * @param {string} sid 新闻id
 */
export function isCorrectSid(sid) {
    const reg = /^[0-9A-Za-z]{32}/;
    return reg.test(sid) && sid.length === 32;
}

/**
 * 根据新闻不同类型改变URL
 * 
 * @param {object} news 新闻类型
 * @param {string} sid 新闻id
 */
export function changeContentUrl({ contentType, sid }) {
    if (typeof window === 'object' && sid) {
        const CONTENT_TYPE = {
            0: 'article',
            1: 'video',
            2: 'gallery'
        };
    
        const currType = CONTENT_TYPE[contentType.toString()];
    
        if (window.location.href.indexOf(currType) == -1) {
            window.location.href = `/${currType}/${sid}`;
        }
    }    
}
