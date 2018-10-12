import { style } from 'typestyle';
export var baseClass = style({
    width: '49px',
    height: '29px',
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '29px',
    textAlign: 'center',
    userSelect: 'none',
    cursor: 'pointer',
    margin: '17px 6px',
    boxSizing: 'border-box',
    $nest: {
        '&:hover': {
            color: '#333333',
            backgroundColor: '#efefef',
            borderRadius: '2px'
        }
    }
});
export var selectedClass = style({
    backgroundColor: '#ff5b9e',
    fontWeight: 400,
    color: '#ffffff',
    borderRadius: '2px'
});
//# sourceMappingURL=Year.classname.js.map