import { apiAction, action } from 'Utils/actionUtils';

const Module = 'NEWS_DETAIL_PAGE';

export const { getNewsContent, GET_NEWS_CONTENT } = apiAction('GET_NEWS_CONTENT', Module);

export const { getHotNews, GET_HOT_NEWS } = apiAction('GET_HOT_NEWS', Module);

export const { vote, VOTE } = apiAction('VOTE', Module);

export const PAGE_CLEAR = 'PAGE_CLEAR';
export const clear = () => action(PAGE_CLEAR);
