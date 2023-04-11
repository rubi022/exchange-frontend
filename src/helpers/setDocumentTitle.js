import { PG_TITLE_PREFIX } from '../constants';
export const setDocumentTitle = (title, prefix) => {
    document.title = [prefix || PG_TITLE_PREFIX, title].join(': ');
};

