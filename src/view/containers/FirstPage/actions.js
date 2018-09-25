import { apiAction, action } from '../../utils/actionUtils';

const Module = 'FIRST_PAGE';

export const { add, ADD } = apiAction('ADD', Module);
export const { cut, CUT } = apiAction('CUT', Module);

export const PAGE_CLEAR = 'PAGE_CLEAR';
export const clear = () => action(PAGE_CLEAR);
