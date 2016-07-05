/**
 * @file melon date tools
 * @author cxtom(cxtom2008@gmail.com)
 */

export function addDays(d, days) {
    const newDate = this.clone(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
}

export function addMonths(d, months) {
    const newDate = this.clone(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
}

export function addYears(d, years) {
    const newDate = this.clone(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
}

export function clone(d) {
    return new Date(d.getTime());
}

export function cloneAsDate(d) {
    const clonedDate = this.clone(d);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
}

export function getDaysInMonth(d) {
    const resultDate = this.getFirstDayOfMonth(d);

    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);

    return resultDate.getDate();
}

export function getFirstDayOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function getLastDayOfMonth(d) {
    const date = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    return this.addDays(date, -1);
}

export function getShortMonth(d) {
    const month = d.getMonth();
    return (month + 1) + '月';
}

export function getDayOfWeek(d) {
    const dow = d.getDay();

    const array = ['日', '一', '二', '三', '四', '五', '六'];

    return '星期' + array[dow];
}

export function parse(value, format) {

    format = format.split(/[^yMdW]+/i);
    value  = value.split(/\D+/);

    const map = {};

    for (let i = 0, l = format.length; i < l; i++) {
        if (format[i]
            && value[i]
            && (format[i].length > 1
                && value[i].length === format[i].length
                || format[i].length === 1
               )
        ) {
            map[format[i]] = value[i];
        }
    }

    const year  = map.yyyy
        || map.y
        || ((map.yy < 50 ? '20' : '19') + map.yy);

    const month = (map.m || map.mm) | 0;
    const date  = (map.d || map.dd) | 0;

    return new Date(year | 0, month - 1, date);
}

export function format(date, format, lang = {
    week: '周',
    days: '日,一,二,三,四,五,六'
}) {

    const y         = date.getFullYear();
    const M         = date.getMonth() + 1;
    const d         = date.getDate();
    let week        = date.getDay();

    if (lang && lang.days) {
        week = lang.days.split(',')[week];
    }

    const map = {
        yyyy: y,
        yy: y % 100,
        y: y,
        mm: this.datePad(M),
        m: M,
        dd: this.datePad(d),
        d: d,
        w: week,
        ww: lang ? (lang.week + week) : ''
    };

    return format.replace(
        /y+|M+|d+|W+/gi,
        function ($0) {
            return map[$0] || '';
        }
    );
}

export function datePad(num) {
    num = num < 10 ? '0' + num : num + '';
    return num;
}

export function isEqualDate(d1, d2) {
    return d1 && d2
      && (d1.getFullYear() === d2.getFullYear())
      && (d1.getMonth() === d2.getMonth())
      && (d1.getDate() === d2.getDate());
}

export function isEqualMonth(d1, d2) {
    return d1 && d2
      && (d1.getFullYear() === d2.getFullYear())
      && (d1.getMonth() === d2.getMonth());
}

export function isEqualYear(d1, d2) {
    return d1 && d2
      && (d1.getFullYear() === d2.getFullYear());
}

export function isBeforeDate(d1, d2) {
    const date1 = this.cloneAsDate(d1);
    const date2 = this.cloneAsDate(d2);

    return (date1.getTime() < date2.getTime());
}

export function isAfterDate(d1, d2) {
    const date1 = this.cloneAsDate(d1);
    const date2 = this.cloneAsDate(d2);

    return (date1.getTime() > date2.getTime());
}

export function isBeforeMonth(d1, d2) {
    const date1 = this.cloneAsDate(d1);
    const date2 = this.cloneAsDate(d2);

    return (date1.getFullYear() <= date2.getFullYear()
        && date1.getMonth() < date2.getMonth());
}

export function isAfterMonth(d1, d2) {
    const date1 = this.cloneAsDate(d1);
    const date2 = this.cloneAsDate(d2);

    return (date1.getFullYear() >= date2.getFullYear()
        && date1.getMonth() > date2.getMonth());
}

export function isBetweenDates(dateToCheck, startDate, endDate) {
    return (!(this.isBeforeDate(dateToCheck, startDate))
        && !(this.isAfterDate(dateToCheck, endDate)));
}

export function isDateObject(d) {
    return d instanceof Date;
}

export function monthDiff(d1, d2) {
    let m;
    m = (d1.getFullYear() - d2.getFullYear()) * 12;
    m += d1.getMonth();
    m -= d2.getMonth();
    return m;
}

export function yearDiff(d1, d2) {
    return d1.getFullYear() - d2.getFullYear();
}

export function now() {

    if (Date.now) {
        return Date.now();
    }

    return new Date().getTime();
}
