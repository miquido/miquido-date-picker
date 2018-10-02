import * as React from 'react';
import { baseClass, selectedClass } from './Year.classname';
import { getClassFor } from '../functions';
var Year = function (props) {
    var className = getClassFor({ key: 'year', theme: props.theme, defaultClass: baseClass }) + ' ' +
        (props.selected ? getClassFor({
            key: 'year',
            theme: props.theme && props.theme.selected,
            defaultClass: selectedClass
        }) + ' ' : '');
    return (React.createElement("div", { className: className, onClick: function (_) { return props.eventsHandlers && props.eventsHandlers.clickHandler(+props.displayValue); }, onContextMenu: function (_) { return props.eventsHandlers && props.eventsHandlers.clickHandler(+props.displayValue); } }, props.displayValue));
};
export default Year;
//# sourceMappingURL=Year.js.map