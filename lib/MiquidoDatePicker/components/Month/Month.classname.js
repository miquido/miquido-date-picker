import { style } from 'typestyle';
export var monthClass = style({
    width: '55px',
    height: '35px',
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '35px',
    textAlign: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    margin: '15px 6px',
    $nest: {
        '&:hover': {
            color: '#333333',
            backgroundColor: '#efefef',
            borderRadius: '2px'
        }
    }
});
export var selectedMonthClass = style({
    color: '#ffffff',
    backgroundColor: '#ff5b9e',
    fontWeight: 400,
    borderRadius: '2px',
    $nest: {
        '&:hover': {
            color: '#ffffff',
            backgroundColor: '#ff5b9e',
            borderRadius: '2px'
        }
    }
});
export var disabledClass = style({
    color: '#c4c5ca',
    cursor: 'not-allowed',
    $nest: {
        '&:hover': {
            color: '#c4c5ca',
            backgroundColor: 'transparent'
        }
    }
});
//# sourceMappingURL=Month.classname.js.map