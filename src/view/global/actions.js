import { apiAction, action } from 'Utils/actionUtils';

const Module = 'GLOBAL';

export const { getChannel, GET_CHANNEL } = apiAction('GET_CHANNEL', Module);

export const { login, LOGIN } = apiAction('LOGIN', Module);

export const { thirdPartLogin, THIRD_PART_LOGIN } = apiAction('THIRD_PART_LOGIN', Module);

export const PREFETCH_SET = 'PREFETCH_SET';
export const prefetchSet = () => action(PREFETCH_SET);

export const SEO_SET = 'SEO_SET';
export const seoSet = (seoData) => action(SEO_SET, seoData);
