import { style } from 'typestyle';
// DAY
var day = style({
    width: '25px',
    height: '25px',
    margin: '3px',
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '25px',
    textAlign: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    $nest: {
        '&:hover': {
            color: '#333333',
            backgroundColor: '#ffc800',
            opacity: .7
        }
    }
});
// DayPicker
var dayPicker = style({
    minWidth: '250px',
    padding: '0 15px',
    maxWidth: (35 * 7) + 'px',
    display: 'flex',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '1px',
    boxSizing: 'border-box',
    width: '100%',
    margin: '0 auto',
    minHeight: '186px'
});
// DaysHeader
var daysHeaderWrapper = style({
    height: '40px',
    fontSize: '12px',
    fontWeight: 400,
    color: '#333333',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
    alignContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottom: 'rgba(196, 197, 202, 0.2)',
    padding: '0 20px',
    fontFamily: 'Roboto',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: '250px',
    margin: '0 auto'
});
var daysHeaderDay = style({
    width: '30px',
    height: '25px',
    textAlign: 'center',
    fontFamily: 'Roboto',
    margin: '0 3px',
    fontWeight: 500
});
// FooterMenu
var footer = style({
    height: '40px',
    fontSize: '12px',
    fontWeight: 500,
    color: '#333333',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '0 20px',
    fontFamily: 'Roboto',
    maxWidth: '200px',
    margin: '0 auto'
});
var clearBtn = style({
    fontSize: '12px',
    fontWeight: 300,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#c4c5ca',
    textDecoration: 'none',
    cursor: 'pointer'
});
var saveBtn = style({
    fontSize: '12px',
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    color: '#333333',
    textDecoration: 'none',
    cursor: 'pointer'
});
// HeaderMenu
var headerMenu = style({
    height: '50px',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 500,
    letterSpacing: '0.5px',
    textAlign: 'center',
    color: '#333333',
    borderBottom: '1px solid rgba(196, 197, 202, 0.2)',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    boxSizing: 'border-box',
    width: '100%'
});
var prevMonthBtn = style({
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    left: '50px',
    transform: 'translateX(-50%)',
    userSelect: 'none'
});
var monthSelectBtn = style({
    cursor: 'pointer',
    margin: '0 auto',
    userSelect: 'none',
    $nest: {
        'img': {
            width: '15px',
            height: '15px',
            transform: 'translateY(2px)'
        }
    }
});
var nextMonthBtn = style({
    cursor: 'pointer',
    position: 'absolute',
    top: '50%',
    right: '50px',
    transform: 'translateX(-50%)',
    userSelect: 'none'
});
// Month
var month = style({
    width: '55px',
    height: '29px',
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '29px',
    textAlign: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    margin: '14px 6px',
    $nest: {
        '&:hover': {
            color: '#333333',
            backgroundColor: '#ffc800',
            borderRadius: '6px'
        }
    }
});
// MonthPicker
var monthPicker = style({
    minWidth: '250px',
    padding: '0 15px',
    maxWidth: (35 * 7) + 'px',
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '1px',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)'
});
// Year
var year = style({
    width: '49px',
    height: '29px',
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '29px',
    textAlign: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    margin: '14px 6px',
    boxSizing: 'border-box',
    $nest: {
        '&:hover': {
            color: '#333333',
            backgroundColor: '#ffc800',
            borderRadius: '6px'
        }
    }
});
// YearPicker
var yearPicker = style({
    minWidth: '250px',
    padding: '0 15px',
    maxWidth: (35 * 7) + 'px',
    display: 'flex',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '1px',
    boxSizing: 'border-box',
    width: '100%',
    position: 'absolute',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)'
});
// selected
var selectedMonth = style({
    color: '#ffffff',
    backgroundColor: '#ffc800',
    fontWeight: 400,
    borderRadius: '6px',
    $nest: {
        '&:hover': {
            color: '#ffffff',
            backgroundColor: '#ffc800',
            borderRadius: '6px'
        }
    }
});
var selectedYear = style({
    backgroundColor: '#ffc800',
    fontWeight: 400,
    color: '#ffffff',
    borderRadius: '6px'
});
var selectedDay = style({
    color: '#333333',
    backgroundColor: '#ffc800',
    borderRadius: '50%',
    $nest: {
        '&:hover': {
            color: '#333333',
            backgroundColor: '#ffc800'
        }
    }
});
// -- MAIN --
var pickerWrapper = style({
    position: 'relative',
    display: 'inline-block',
    fontSize: '17px',
    boxSizing: 'border-box'
});
var picker = style({
    position: 'absolute',
    backgroundColor: '#ffffff',
    minWidth: '450px',
    zIndex: 500
});
var disabled = style({
    color: '#c4c5ca',
    cursor: 'normal',
    $nest: {
        '&:hover': {
            color: '#c4c5ca',
            backgroundColor: 'transparent'
        }
    }
});
var today = style({
    color: '#ffc800'
});
var selectionStart = style({
    color: '#333333',
    backgroundColor: '#ffc800',
    borderRadius: '50%'
});
var selectionEnd = style({
    color: '#333333',
    backgroundColor: '#ffc800',
    borderRadius: '50%',
    $nest: {
        '&&': {
            color: '#333333',
            backgroundColor: '#ffc800',
            borderRadius: '50%'
        }
    }
});
export var tripGateTheme = {
    pickerWrapper: pickerWrapper,
    picker: picker,
    headerMenu: headerMenu,
    prevMonthBtn: prevMonthBtn,
    nextMonthBtn: nextMonthBtn,
    monthSelectBtn: monthSelectBtn,
    footerWrapper: footer,
    daysHeaderWrapper: daysHeaderWrapper,
    daysHeaderItem: daysHeaderDay,
    saveBtn: saveBtn,
    clearBtn: clearBtn,
    yearPicker: yearPicker,
    yearItem: year,
    monthPicker: monthPicker,
    monthItem: month,
    dayPicker: dayPicker,
    dayItem: day,
    selected: {
        day: selectedDay,
        month: selectedMonth,
        year: selectedYear
    },
    status: {
        today: today,
        disabled: disabled,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd
    }
};
//# sourceMappingURL=tripgate_theme.js.map