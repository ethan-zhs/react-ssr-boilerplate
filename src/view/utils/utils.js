/**
 * 解析封面
 * 
 * @param [string] coverUrl [封面url json 字符串]
*/
export function getCoverUrl(coverUrl) {
    const cover = coverUrl != '' ? JSON.parse(coverUrl) : {};

    let coverImageUrl = [];

    if (cover && cover.L && cover.L.length) {
        coverImageUrl = [
            ...coverImageUrl,
            ...cover.L
        ];
    }
    if (cover && cover.S && cover.S.length) {
        coverImageUrl = [
            ...coverImageUrl,
            ...cover.S
        ];
    }
    return coverImageUrl;
}


/**
 * 计算视频长度
 * 
 * @param [number] timeLength [时间长度]
*/
export function calVideoTime(timeLength) {
    let timeL = '';
    const h = parseInt(timeLength / 3600, 10);
    const m = parseInt((timeLength % 3600) / 60, 10);
    const s = parseInt((timeLength % 3600) % 60, 10);
    if (h > 0) {
        timeL = h >= 10 ? (h + ':') : ('0' + h + ':');
    }

    timeL += m >= 10 ? (m + ':') : ('0' + m + ':');
    timeL += s >= 10 ? s : '0' + s;

    return timeL;
}


/**
 * 格式化阅读数
 * 
 * @param [number] nums [阅读数]
 */
export function formatNum(nums) {
    const _nums = nums.toString();
    const _splitNum = 3;

    if (_nums.length <= _splitNum) return nums;

    let _result = '';

    const _first = _nums.slice(0, _nums.length % _splitNum);
    const _after = _nums.slice(_nums.length % _splitNum);

    for (let i = 0, j = 1; i < _after.length; i += 1) {
        _result += _after[i];
        if (j % _splitNum == 0) _result += ',';
        j += 1;
    }

    _result = _result.slice(0, -1);
    return _first + ',' + _result;
}


/**
 * 获得视频Url
 * 
 * @param [string] videoUrl [url json 字符串]
 * @param [string] quality [输出视频质量： hd | sd]
*/
export function getVideoUrl(videoUrl, quality) {
    const video = videoUrl && videoUrl != '' ? JSON.parse(videoUrl) : {};

    let videoSourceUrl = '';

    if (video.source && video.source.hd && video.source.sd) {
        videoSourceUrl = quality == 'sd' ? video.source.sd : video.source.hd;
    }

    return videoSourceUrl;
}


/**
 * 获取对应文章url
 * 
 * @param [object] item [数据对象]
 */
export function toUrl(item) {
    const { sid, contentType } = item;
    const component = {
        0: 'article',
        1: 'video',
        2: 'gallery'
    };
    return `/${component[contentType.toString()]}/${sid}`;
}


/**
 * 获得字符串长度
 * 
 * @param  [syring] str [目标字符串]
 */
export function getStrLength(str) {
    var len = 0;
    for (let i = 0; i < str.length; i += 1) {
        const c = str.substr(i, 1);
        const ts = escape(c);
        if (ts.substring(0, 2) == '%u') {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}


// 返回随机默认图
export function defaultThumb() {
    var thumbArr = [
        require('Public/images/default/1.png'),
        require('Public/images/default/2.png'),
        require('Public/images/default/3.png'),
        require('Public/images/default/4.png'),
        require('Public/images/default/5.png'),
        require('Public/images/default/6.png'),
        require('Public/images/default/7.png'),
        require('Public/images/default/8.png'),
        require('Public/images/default/9.png'),
        require('Public/images/default/10.png')
    ];
    const thumbNo = Math.round(Math.random() * 9 + 1);
    const thumb = thumbArr[thumbNo];
    return thumb;
}


/**
 * 本地存储频道列表
 * 
 * @param [object] channelList [频道列表]
 */
export function localSaveChannel(channelList) {
    if (typeof window !== 'object') return;
    if (channelList && channelList.all && channelList.all.length) {
        window.sessionStorage.setItem('channel', JSON.stringify(channelList));
    }
}


// 取本地频道列表
export function getLocalChannel() {
    if (typeof window !== 'object') return false;
    const channel = window.sessionStorage.getItem('channel');
    return channel ? JSON.parse(channel) : false;
}


/**
 * 返回对应channel url (channel id 方式)
 * 
 * @param [number] channelId [频道ID]
 * @param [array] channelList [频道列表]
 */
export function getChannelAliasById(channelId, channelList) {
    if (channelId !== 0) {
        const findChannel = channelList.find(item => item.channelId == channelId);
        if (findChannel && findChannel.alias) {
            return `/news/${findChannel.alias}`;
        } 
        
        return `/news/${channelId}`;
    }    

    return '/index';
}


/**
 * 返回当前频道名称
 * 
 * @param [number] channelId [当前路由ID]
 * @param [array] navList [频道列表]
 */
export function getChannelName(channelId, navList) {
    if (channelId == 0 || !channelId || !navList.length) return false;
    const currChannel = navList.find(item => channelId == item.channelId || channelId == item.alias) || {};
    return currChannel.channelName;
}


/**
 * 裁剪字符串
 * 
 * @param [string] str [需要裁剪的字符串]
 * @param [object] cfg [配置参数 example: {len: 裁剪长度,默认10; stuff: 裁剪后的后缀，默认没有}]
 */
export function cutStr(str, cfg) {
    if (!str) return false;
    const _len = str.length;
    const len = (cfg && cfg.len) || 10;
    const stuff = (cfg && cfg.stuff) || '';
    return str.slice(0, len < _len ? len : _len) + (len < _len ? stuff : '');
}


/**
 * 高亮关键字
 * 
 * @param [string] str [目标字符串]
 * @param [string] key [需要高亮的关键字]
 */
export function hightLight(str, key) {
    if (!str || !str.length || !key) return false;
    const reg = new RegExp(`([${key}]{2,})`, 'g');
    const res = str.replace(reg, "<font color='red'>$1</font>");
    return res;
}


// 判断是否为移动端
export function isMobile() {
    if (typeof window == 'object') {
        const ua = navigator.userAgent;
        if ((ua.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            return -1;
        }        
    }
    return 0;
}


/**
 * 格式化时间
 * 
 * @param [number] time [时间戳]
 * @param [string] type [格式化类型]
 *
 */
export const timeFormat = (time, type) => {
    if (!time) { return ''; }

    const nowDate = new Date();
    const dateInfo = new Date(time);

    const fmtObj = {
        year: dateInfo.getFullYear(),
        month: dateInfo.getMonth() + 1,
        date: dateInfo.getDate(),
        hour: dateInfo.getHours(),
        minute: dateInfo.getMinutes(),
        second: dateInfo.getSeconds()
    };
 
    const keys = Object.keys(fmtObj);
 
    keys.forEach(key => {
        fmtObj[key] = fmtObj[key] < 10 ? '0' + fmtObj[key] : fmtObj[key];
    });
 
    const {
        year, month, date, hour, minute, second
    } = fmtObj;
    let dateData = [year, month, date].join('-');
    const timeData = [hour, minute, second].join(':');

    let timeAfter = parseInt(Math.abs(nowDate - dateInfo) / 1000 / 60, 10);
    if (timeAfter < 60) {
        timeAfter = (timeAfter <= 0 ? 1 : timeAfter) + '分钟';
    } else if (timeAfter >= 60 && timeAfter < 24 * 60) {
        timeAfter = parseInt(timeAfter / 60, 10) + '小时';
    } else {
        timeAfter = parseInt(timeAfter / 60 / 24, 10) + '天';
    }

 
    switch (type) {
        case 'date-after': return timeAfter;
        case 'yyyy-MM-dd':
            dateData = [year, month, date].join('-');
            return dateData;
        case 'yyyy/MM/dd':
            dateData = [year, month, date].join('/');
            return dateData;
        case 'yyyyMMdd':
            dateData = [year, month, date].join('');
            return dateData;
        case 'yyyy-MM-dd hh:mm:ss':
            dateData = [year, month, date].join('-');
            return dateData + ' ' + timeData;
        case 'yyyy/MM/dd hh:mm:ss':
            dateData = [year, month, date].join('/');
            return dateData + ' ' + timeData;
        default: return dateData + ' ' + timeData;
    }
};


/**
 *  全局获取URL参数方法
 * 
 *  @param [string] testParam [测试参数字符串]
 *  @param [bool] preview [是否预览]
*/
export const urlParams = () => {
    const paramObj = {};
    const url = window.location.href;
    if (url.split('?')[1]) {
        const paramList = url.split('?')[1].split('&');
        paramList.forEach(item => {
            const [name, value] = item.split('=');
            paramObj[name] = value;
        });
    }

    return paramObj;
};
