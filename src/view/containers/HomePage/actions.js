import { apiAction, action } from 'Utils/actionUtils';

const Module = 'HOME_PAGE';

export const { getIndexBanner, GET_INDEX_BANNER } = apiAction('GET_INDEX_BANNER', Module);

export const { getIndexLatest, GET_INDEX_LATEST } = apiAction('GET_INDEX_LATEST', Module);

export const { getFriendLinks, GET_FRIEND_LINKS } = apiAction('GET_FRIEND_LINKS', Module);

export const { getIndexHots, GET_INDEX_HOTS } = apiAction('GET_INDEX_HOTS', Module);

export const { getIndexPush, GET_INDEX_PUSH } = apiAction('GET_INDEX_PUSH', Module);

export const LEAVE_PAGE = 'LEAVE_PAGE';
export const leavePage = () => action(LEAVE_PAGE);
