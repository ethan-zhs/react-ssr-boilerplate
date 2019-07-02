export const renderHeader = (helmetStr, isProd, buildPath) => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            ${helmetStr}
            <meta name="baidu-site-verification" content="7uOfgV8KB5" />
            <meta name="sogou_site_verification" content="RKo6CUD3vK"/>
            <meta name="360-site-verification" content="8fffaf13930370a126f0df0d9469ddd8" />
            <meta name="shenma-site-verification" content="d0fed8bc1c8f00a457963b05612411a2_1502433349" />
            <meta name="google-site-verification" content="u0ka1-HM7dBL9bOQmmJzsWDIlIT8TPtgXmO4ku0fsu8" />
            <link href="https://vjs.zencdn.net/7.4.1/video-js.min.css" rel="stylesheet">
            <script src="https://vjs.zencdn.net/7.4.1/video.min.js"></script>
            <script src="https://unpkg.com/videojs-contrib-hls/dist/videojs-contrib-hls.js"></script>
            ${isProd ? '<link href="' + buildPath['client.css'] + '" rel="stylesheet" />' : ''}
            ${isProd ? '<link href="' + buildPath['vendor.css'] + '" rel="stylesheet" />' : ''}        
        </head>
        <body>
            <div id="root">`;

export const renderFooter = (loadableState, preloadedState, isProd, buildPath) => {
    if (isProd) {
        return `</div>
                <script>
                    window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                </script>
                <script src="${buildPath['manifest.js']}"></script>
                <script src="${buildPath['vendor.js']}"></script>
                <script src="${buildPath['commons.js']}"></script>
                <script src="${buildPath['client.js']}"></script>            
                ${loadableState.getScriptTag && loadableState.getScriptTag()}
            </body>
        </html>`;
    }

    return `</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script src="/dll/vendor.dll.js"></script>
            <script src="/dist/html/manifest.js"></script> 
            <script src="/dist/html/commons.js"></script>
            <script src="/dist/html/vendor.js"></script>
            <script src="/dist/html/client.js"></script>              
            ${loadableState.getScriptTag && loadableState.getScriptTag()}
        </body>
    </html>`;
};
