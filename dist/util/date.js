define('melon-wise/lib/util/date', [
    'require',
    'exports',
    'module'
], function (require, exports, module) {
    'use strict';
    module.exports = {
        addDays: function addDays(d, days) {
            var newDate = this.clone(d);
            newDate.setDate(d.getDate() + days);
            return newDate;
        },
        addMonths: function addMonths(d, months) {
            var newDate = this.clone(d);
            newDate.setMonth(d.getMonth() + months);
            return newDate;
        },
        addYears: function addYears(d, years) {
            var newDate = this.clone(d);
            newDate.setFullYear(d.getFullYear() + years);
            return newDate;
        },
        clone: function clone(d) {
            return new Date(d.getTime());
        },
        cloneAsDate: function cloneAsDate(d) {
            var clonedDate = this.clone(d);
            clonedDate.setHours(0, 0, 0, 0);
            return clonedDate;
        },
        getDaysInMonth: function getDaysInMonth(d) {
            var resultDate = this.getFirstDayOfMonth(d);
            resultDate.setMonth(resultDate.getMonth() + 1);
            resultDate.setDate(resultDate.getDate() - 1);
            return resultDate.getDate();
        },
        getFirstDayOfMonth: function getFirstDayOfMonth(d) {
            return new Date(d.getFullYear(), d.getMonth(), 1);
        },
        getLastDayOfMonth: function getLastDayOfMonth(d) {
            var date = new Date(d.getFullYear(), d.getMonth() + 1, 1);
            return this.addDays(date, -1);
        },
        getShortMonth: function getShortMonth(d) {
            var month = d.getMonth();
            return month + 1 + '\u6708';
        },
        getDayOfWeek: function getDayOfWeek(d) {
            var dow = d.getDay();
            var array = [
                '\u65E5',
                '\u4E00',
                '\u4E8C',
                '\u4E09',
                '\u56DB',
                '\u4E94',
                '\u516D'
            ];
            return '\u661F\u671F' + array[dow];
        },
        getFullWeekArray: function getFullWeekArray(d) {
            var weekArray = this.getWeekArray(d);
            var firstWeek = weekArray[0];
            var lastWeek = weekArray[weekArray.length - 1];
            var preArray = [];
            var lastArray = [];
            var firstDay = this.getFirstDayOfMonth(d);
            var i;
            var first;
            for (i = 6; i >= 0; i--) {
                if (firstWeek[i]) {
                    first = i;
                    continue;
                }
                preArray.push(this.addDays(firstDay, i - first));
            }
            preArray.reverse();
            var last;
            var lastDay = this.getLastDayOfMonth(d);
            for (i = 0; i < 7; i++) {
                if (lastWeek[i]) {
                    last = i;
                    continue;
                }
                lastArray.push(this.addDays(lastDay, i - last));
            }
            return [].concat([preArray], weekArray, [lastArray]);
        },
        getWeekArray: function getWeekArray(d) {
            var dayArray = [];
            var daysInMonth = this.getDaysInMonth(d);
            var daysInWeek;
            var emptyDays;
            var firstDayOfWeek;
            var week;
            var weekArray = [];
            var i;
            for (i = 1; i <= daysInMonth; i++) {
                dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
            }
            while (dayArray.length) {
                firstDayOfWeek = dayArray[0].getDay();
                daysInWeek = 7 - firstDayOfWeek;
                emptyDays = 7 - daysInWeek;
                week = dayArray.splice(0, daysInWeek);
                for (i = 0; i < emptyDays; i++) {
                    week.unshift(null);
                }
                weekArray.push(week);
            }
            return weekArray;
        },
        parse: function parse(value, format) {
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
        },
        format: function format(date, _format, lang) {
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
            return _format.replace(/y+|M+|d+|W+/gi, function ($0) {
                return map[$0] || '';
            });
        },
        datePad: function datePad(num) {
            num = num < 10 ? '0' + num : num + '';
            return num;
        },
        isEqualDate: function isEqualDate(d1, d2) {
            return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
        },
        isEqualMonth: function isEqualMonth(d1, d2) {
            return d1 && d2 && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
        },
        isEqualYear: function isEqualYear(d1, d2) {
            return d1 && d2 && d1.getFullYear() === d2.getFullYear();
        },
        isBeforeDate: function isBeforeDate(d1, d2) {
            var date1 = this.cloneAsDate(d1);
            var date2 = this.cloneAsDate(d2);
            return date1.getTime() < date2.getTime();
        },
        isAfterDate: function isAfterDate(d1, d2) {
            var date1 = this.cloneAsDate(d1);
            var date2 = this.cloneAsDate(d2);
            return date1.getTime() > date2.getTime();
        },
        isBeforeMonth: function isBeforeMonth(d1, d2) {
            var date1 = this.cloneAsDate(d1);
            var date2 = this.cloneAsDate(d2);
            return date1.getFullYear() <= date2.getFullYear() && date1.getMonth() < date2.getMonth();
        },
        isAfterMonth: function isAfterMonth(d1, d2) {
            var date1 = this.cloneAsDate(d1);
            var date2 = this.cloneAsDate(d2);
            return date1.getFullYear() >= date2.getFullYear() && date1.getMonth() > date2.getMonth();
        },
        isBetweenDates: function isBetweenDates(dateToCheck, startDate, endDate) {
            return !this.isBeforeDate(dateToCheck, startDate) && !this.isAfterDate(dateToCheck, endDate);
        },
        isDateObject: function isDateObject(d) {
            return d instanceof Date;
        },
        monthDiff: function monthDiff(d1, d2) {
            var m;
            m = (d1.getFullYear() - d2.getFullYear()) * 12;
            m += d1.getMonth();
            m -= d2.getMonth();
            return m;
        },
        yearDiff: function yearDiff(d1, d2) {
            return d1.getFullYear() - d2.getFullYear();
        },
        now: function now() {
            if (Date.now) {
                return Date.now();
            }
            return new Date().getTime();
        }
    };
});