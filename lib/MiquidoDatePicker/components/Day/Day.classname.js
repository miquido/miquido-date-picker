import { style } from 'typestyle';
export var dayClass = style({
    flex: '0 0 35px',
    height: '35px',
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '35px',
    textAlign: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    width: '35px',
    $nest: {
        '&:hover': {
            color: '#333333',
            backgroundColor: '#efefef'
        }
    }
});
export var selectionStartClass = style({
    borderRadius: '2px !important',
    backgroundColor: '#ff5b9e !important',
    color: '#ffffff !important',
    fontWeight: 500,
    $nest: {
        '&:hover': {
            borderRadius: '2px',
            backgroundColor: '#ff5b9e',
            color: '#ffffff',
            fontWeight: 500
        }
    }
});
export var selectionEndClass = style({
    borderRadius: '2px !important',
    backgroundColor: '#ff5b9e !important',
    color: '#ffffff !important',
    fontWeight: 500,
    $nest: {
        '&:hover': {
            borderRadius: '2px',
            backgroundColor: '#ff5b9e',
            color: '#ffffff',
            fontWeight: 500
        }
    }
});
export var selectedDayClass = style({
    color: '#333333',
    backgroundColor: 'rgba(255, 91, 158, .5)',
    $nest: {
        '&:hover': {
            color: '#333333',
            backgroundColor: 'rgba(255, 91, 158, .5)'
        }
    }
});
export var todayClass = style({
    color: '#ff5b9e'
});
export var disabledClass = style({
    color: '#c4c5ca',
    cursor: 'normal',
    $nest: {
        '&:hover': {
            color: '#c4c5ca',
            backgroundColor: 'transparent'
        }
    }
});
//# sourceMappingURL=Day.classname.js.map