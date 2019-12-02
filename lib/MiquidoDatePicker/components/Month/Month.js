import * as React from 'react';
import { monthClass, disabledClass, selectedMonthClass } from './Month.classname';
import { getClassFor } from '../../functions';
var Month = function (props) {
    var baseClass = getClassFor({ key: 'month', theme: props.theme, defaultClass: monthClass }) + ' ' +
        (props.selected ? getClassFor({
            key: 'month',
            theme: props.theme && props.theme.selected,
            defaultClass: selectedMonthClass
        }) + ' ' : '') +
        (props.allowed ? '' : getClassFor({ key: 'month', theme: props.theme, defaultClass: disabledClass }));
    return (React.createElement("div", { className: baseClass, onClick: function (_) { return props.allowed && props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex); }, onContextMenu: function (_) { return props.allowed && props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex); } }, props.displayValue));
};
export default Month;
//# sourceMappingURL=Month.js.map