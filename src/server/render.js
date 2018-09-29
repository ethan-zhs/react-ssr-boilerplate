export const renderHeader = helmet => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="root">
`;

export const renderFooter = (loadableState, preloadedState) => `
            </div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script src="/dist/client/vendor.js"></script>
            <script src="/dist/client/client.js"></script>
            ${loadableState.getScriptTag()}
        </body>
    </html>
`;
