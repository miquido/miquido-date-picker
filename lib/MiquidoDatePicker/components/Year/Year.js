import * as React from 'react';
import { baseClass, disabledClass, selectedClass } from './Year.classname';
import { getClassFor } from '../../functions';
var Year = function (props) {
    var className = getClassFor({ key: 'year', theme: props.theme, defaultClass: baseClass }) + ' ' +
        (props.selected ? getClassFor({
            key: 'year',
            theme: props.theme && props.theme.selected,
            defaultClass: selectedClass
        }) + ' ' : '') +
        (props.allowed ? '' : getClassFor({ key: 'year', theme: props.theme, defaultClass: disabledClass }));
    return (React.createElement("div", { className: className, onClick: function (_) { return props.allowed && props.eventsHandlers && props.eventsHandlers.clickHandler(+props.displayValue); }, onContextMenu: function (_) { return props.allowed && props.eventsHandlers && props.eventsHandlers.clickHandler(+props.displayValue); } }, props.displayValue));
};
export default Year;
//# sourceMappingURL=Year.js.map