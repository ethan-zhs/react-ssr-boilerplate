import React, { Component } from 'react';

import style from './index.less';

/**
 * ModuleName: 内容loading
 * 
 * Author: zhuhuishao 
 * use: [ 信息流内容正在加载loading展示 ]
 * 
*/
class LoadingBox extends Component {
    render() {
        const { children, loading } = this.props;

        return (
            <div>
                {children}
                {loading && ( 
                    <div className={style['spinner-box']}>
                        <div className={style['sk-three-bounce']}>
                            <div className={style['sk-bounce1']} />
                            <div className={style['sk-bounce2']} />
                            <div className={style['sk-bounce3']} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default LoadingBox;
