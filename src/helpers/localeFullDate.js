import * as moment from 'moment-timezone';
import { getTimezone } from './timezone';
export const localeFullDate = (date, timezone = getTimezone(), format = 'YYYY-MM-DD HH:mm:ss') => {
    const isUnix = typeof date === 'number';
    const momentObj = isUnix ? moment.unix(date) : moment(date);
    return momentObj.tz(timezone).format(format);
};

