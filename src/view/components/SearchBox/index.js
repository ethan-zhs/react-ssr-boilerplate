import React, { Component } from 'react';

import style from './index.less';

/**
 * ModuleName: 首页搜索模块
 * 
 * Author: zhuhuishao 
 * use: [ 首页搜索模块 ]
 * 
*/
class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: ''
        };
    }

    render() {
        return (
            <div className={style['search-wrap']}>
                <div className={style['search-box']}>
                    <input 
                        ref="keyInput" 
                        className={style.keywords} 
                        onKeyUp={this.handelKeyUpSearch} 
                        type="text" 
                        placeholder="搜索更多资讯"
                    />
                    <span className={style['search-btn']} onClick={this.handleClickSearch}></span>
                </div>
            </div>
        );
    }

    
    /**
     * 
     * 按enter键搜索
     * 
     * @param [object] e [当前输入框对象]
     */
    handelKeyUpSearch = (e) => {
        this.setState(Object.assign({}, this.state, { keyword: e.target.value }));
        if (e.keyCode == 13) {
            window.location.href = `/search/?key=${encodeURIComponent(e.target.value)}`;
        }
    }


    // 点击按钮搜索
    handleClickSearch = () => {
        window.location.href = `/search/?key=${encodeURIComponent(this.state.keyword)}`;
    }
}

export default SearchBox;
