import * as React from 'react';
import * as className from './Month.classname';
import { getClassFor } from '../../functions';
var Month = function (props) {
    var baseClass = getClassFor({ key: 'month', theme: props.theme, defaultClass: className.monthClass }) + ' ' +
        (props.selected ? getClassFor({
            key: 'month',
            theme: props.theme && props.theme.selected,
            defaultClass: className.selectedMonthClass
        }) + ' ' : '');
    return (React.createElement("div", { className: baseClass, onClick: function (_) { return props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex); }, onContextMenu: function (_) { return props.eventsHandlers && props.eventsHandlers.clickHandler(props.itemIndex); } }, props.displayValue));
};
export default Month;
//# sourceMappingURL=Month.js.map