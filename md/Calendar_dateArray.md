#### 日历

参考：https://www.teakki.com/p/57dfb23fd3a7507f975e775c

```javascript
// 一个月的天数
function getDaysInMonth (year, month) {
    return new Date(year, month, 0).getDate();
}
// 一个月第一天是星期几，注：星期天是0
function getFirstDayInMonth (year, month) {
    return new Date(year, (month - 1), 1).getDay();
}
function getDateArray (year, month) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayInMonth = getFirstDayInMonth(year, month);
    // 日历表格行数
    const rowsNum = Math.ceil((firstDayInMonth + daysInMonth) / 7);
    const weeks = [];
    for (let i = 0; i < rowsNum; i++) {
        const week = [];
        if (i === 0) {
            for (let j = 0; j < firstDayInMonth; j++) {
                week.push('-');
            }
            for (let j = firstDayInMonth; j < 7; j++) {
                week.push(7 * i + j - firstDayInMonth + 1);
            }
        } else {
            for (let j = 0; j < 7; j++) {
                if (7 * i + j - firstDayInMonth + 1 > daysInMonth) {
                    week.push('-');
                } else {
                    week.push(7 * i + j - firstDayInMonth + 1);
                }
            }
        }
        weeks.push(week);
    }
    return weeks;
}
```
