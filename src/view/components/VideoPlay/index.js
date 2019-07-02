import React, { Component } from 'react';

import 'Public/css/theme/video-js.less';
import styles from './index.less';


/**
 * ModuleName: 视频播放组件
 * 
 * Author: zhuhuishao 
 * use: [ 用于视频详情页视频播放，UI采用videoJs ]
 * 
*/
class VideoPlay extends Component {
    componentDidMount() {        
        const videoJs = require('videojs');
        videoJs.addLanguage('zh-CN', {
            Play: '播放',
            Pause: '暂停',
            'Stream Type': '媒体流类型',
            LIVE: '直播',
            Loaded: '加载完毕',
            Progress: '进度',
            Fullscreen: '全屏',
            'Non-Fullscreen': '退出全屏',
            Mute: '静音',
            Unmute: '取消静音',
            'You aborted the media playback': '视频播放被终止',
            'A network error caused the media download to fail part-way.': '网络错误导致视频下载中途失败。',
            'The media could not be loaded, either because the server or network failed or because the format is not supported.': '视频因格式不支持或者服务器或网络的问题无法加载。',
            'The media playback was aborted due to a corruption problem or because the media used features your browser did not support.': '由于视频文件损坏或是该视频使用了你的浏览器不支持的功能，播放终止。',
            'No compatible source was found for this media.': '无法找到此视频兼容的源。',
            'The media is encrypted and we do not have the keys to decrypt it.': '视频已加密，无法解密。'
        });
        videoJs('video', {
            controls: true,
            language: 'zh-CN'
        }, function () {            
            this.load();
            const playPromise = this.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    this.play();
                }).catch(() => {
                    console.log('play failed');
                });
            }
        });
    }


    render() {
        const { poster, videoUrl } = this.props;

        const isHls = videoUrl.indexOf('.m3u8') >= 0;        

        return (
            <div className={styles['video-play']}>
                <video id='video' className='video-js vjs-big-play-centered' poster={poster} autoPlay="autoplay" style={{ width: '100%', height: '100%' }} data-setup='{}'>
                    <source src={videoUrl} type={isHls ? 'application/x-mpegURL' : 'video/mp4'} />
                </video>
            </div>
        );
    }
}

export default VideoPlay;
