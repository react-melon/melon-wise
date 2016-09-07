(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.date = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    exports.addDays = addDays;
    exports.addMonths = addMonths;
    exports.addYears = addYears;
    exports.clone = clone;
    exports.cloneAsDate = cloneAsDate;
    exports.getDaysInMonth = getDaysInMonth;
    exports.getFirstDayOfMonth = getFirstDayOfMonth;
    exports.getLastDayOfMonth = getLastDayOfMonth;
    exports.getShortMonth = getShortMonth;
    exports.getDayOfWeek = getDayOfWeek;
    exports.parse = parse;
    exports.format = format;
    exports.datePad = datePad;
    exports.isEqualDate = isEqualDate;
    exports.isEqualMonth = isEqualMonth;
    exports.isEqualYear = isEqualYear;
    exports.isBeforeDate = isBeforeDate;
    exports.isAfterDate = isAfterDate;
    exports.isBeforeMonth = isBeforeMonth;
    exports.isAfterMonth = isAfterMonth;
    exports.isBetweenDates = isBetweenDates;
    exports.isDateObject = isDateObject;
    exports.monthDiff = monthDiff;
    exports.yearDiff = yearDiff;
    exports.now = now;
    /**
     * @file melon date tools
     * @author cxtom(cxtom2008@gmail.com)
     */

    function addDays(d, days) {
        var newDate = this.clone(d);
        newDate.setDate(d.getDate() + days);
        return newDate;
    }

    function addMonths(d, months) {
        var newDate = this.clone(d);
        newDate.setMonth(d.getMonth() + months);
        return newDate;
    }

    function addYears(d, years) {
        var newDate = this.clone(d);
        newDate.setFullYear(d.getFullYear() + years);
        return newDate;
    }

    function clone(d) {
        return new Date(d.getTime());
    }

    function cloneAsDate(d) {
        var clonedDate = this.clone(d);
        clonedDate.setHours(0, 0, 0, 0);
        return clonedDate;
    }

    function getDaysInMonth(d) {
        var resultDate = this.getFirstDayOfMonth(d);

        resultDate.setMonth(resultDate.getMonth() + 1);
        resultDate.setDate(resultDate.getDate() - 1);

        return resultDate.getDate();
    }

    function getFirstDayOfMonth(d) {
        return new Date(d.getFullYear(), d.getMonth(), 1);
    }

    function getLastDayOfMonth(d) {
        var date = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        return this.addDays(date, -1);
    }

    function getShortMonth(d) {
        var month = d.getMonth();
        return month + 1 + '月';
    }

    function getDayOfWeek(d) {
        var dow = d.getDay();

        var array = ['日', '一', '二', '三', '四', '五', '六'];

        return '星期' + array[dow];
    }

    function parse(value, format) {

        format = format.split(/[^yMdW]+/i);
        value = value.split(/\D+/);

        var map = {};

        for (var i = 0, l = format.length; i < l; i++) {
            if (format[i] && value[i] && (format[i].length > 1 && value[i].length === format[i].length || format[i].length === 1)) {
                map[format[i]] = value[i];
            }
        }

        var year = map.yyyy || map.y || (map.yy < 50 ? '20' : '19') + map.yy;

        var month = (map.m || map.mm) | 0;
        var date = (map.d || map.dd) | 0;

        return new Date(year | 0, month - 1, date);
    }

    function format(date, format) {
        var lang = arguments.length <= 2 || arguments[2] === undefined ? {
            week: '周',
            days: '日,一,二,三,四,五,六'
        } : arguments[2];


        var y = date.getFullYear();
        var M = date.getMonth() + 1;
        var d = date.getDate();
        var week = date.getDay();

        if (lang && lang.days) {
            week = lang.days.split(',')[week];
        }

        var map = {
            yyyy: y,
            yy: y % 100,
            y: y,
            mm: this.datePad(M),
            m: M,
            dd: this.datePad(d),
            d: d,
            w: week,
            ww: lang ? lang.week + week : ''
        };

        return format.replace(/y+|M+|d+|W+/gi, function ($0) {
            return map[$0] || '';
        });
    }

    function datePad(num) {
        num = num < 10 ? '0' + num : num + '';
        return num;
    }

    function isEqualDate(d1, d2) {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    }

    function isEqualMonth(d1, d2) {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    }

    function isEqualYear(d1, d2) {
        return d1 && d2 && d1.getFullYear() === d2.getFullYear();
    }

    function isBeforeDate(d1, d2) {
        var date1 = this.cloneAsDate(d1);
        var date2 = this.cloneAsDate(d2);

        return date1.getTime() < date2.getTime();
    }

    function isAfterDate(d1, d2) {
        var date1 = this.cloneAsDate(d1);
        var date2 = this.cloneAsDate(d2);

        return date1.getTime() > date2.getTime();
    }

    function isBeforeMonth(d1, d2) {
        var date1 = this.cloneAsDate(d1);
        var date2 = this.cloneAsDate(d2);

        return date1.getFullYear() <= date2.getFullYear() && date1.getMonth() < date2.getMonth();
    }

    function isAfterMonth(d1, d2) {
        var date1 = this.cloneAsDate(d1);
        var date2 = this.cloneAsDate(d2);

        return date1.getFullYear() >= date2.getFullYear() && date1.getMonth() > date2.getMonth();
    }

    function isBetweenDates(dateToCheck, startDate, endDate) {
        return !this.isBeforeDate(dateToCheck, startDate) && !this.isAfterDate(dateToCheck, endDate);
    }

    function isDateObject(d) {
        return d instanceof Date;
    }

    function monthDiff(d1, d2) {
        var m = void 0;
        m = (d1.getFullYear() - d2.getFullYear()) * 12;
        m += d1.getMonth();
        m -= d2.getMonth();
        return m;
    }

    function yearDiff(d1, d2) {
        return d1.getFullYear() - d2.getFullYear();
    }

    function now() {

        if (Date.now) {
            return Date.now();
        }

        return new Date().getTime();
    }
});