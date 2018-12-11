import * as React from 'react';
import * as className from './Day.classname';
import { getClassFor } from '../functions';
import classNames from 'classnames';
var Day = function (props) {
    var _a;
    var selected = props.selected, today = props.today, start = props.start, end = props.end, disabled = props.disabled, displayValue = props.displayValue;
    var baseClass = getClassFor({
        key: 'dayItem',
        theme: props.theme,
        defaultClass: className.dayClass
    });
    var endClass = getClassFor({
        key: 'selectionEnd',
        theme: props.theme && props.theme.status,
        defaultClass: className.selectionEndClass
    });
    var selectedClass = getClassFor({
        key: 'day',
        theme: props.theme && props.theme.selected,
        defaultClass: className.selectedDayClass
    });
    var todayClass = getClassFor({
        key: 'today',
        theme: props.theme && props.theme.status,
        defaultClass: className.todayClass
    });
    var disabledClass = getClassFor({
        key: 'disabled',
        theme: props.theme && props.theme.status,
        defaultClass: className.disabledClass
    });
    var dayClassNames = classNames((_a = {},
        _a[endClass] = end || start,
        _a[baseClass] = true,
        _a[selectedClass] = selected && !start && !end,
        _a[todayClass] = today,
        _a[disabledClass] = disabled,
        _a));
    return (React.createElement("div", { className: dayClassNames, onMouseOver: function (_) { return !props.disabled && props.eventsHandlers && props.eventsHandlers.mouseOverHandler(props.itemIndex); }, onMouseDown: function (_) { return !props.disabled && props.eventsHandlers && props.eventsHandlers.mouseDownHandler(props.itemIndex); }, onMouseUp: function (_) { return !props.disabled && props.eventsHandlers && props.eventsHandlers.mouseUpHandler(props.itemIndex); }, onClick: function (_) { return !props.disabled && props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex); }, onContextMenu: function (_) { return !props.disabled && props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex); } }, displayValue));
};
export default Day;
//# sourceMappingURL=Day.js.map