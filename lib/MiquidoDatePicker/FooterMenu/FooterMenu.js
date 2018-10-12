import * as React from 'react';
import { footerWrapper, saveBtn, clearBtn } from './FooterMenu.classname';
import { getClassFor } from '../functions';
var FooterMenu = function (props) {
    var clear = props.clear, save = props.save, theme = props.theme;
    return (React.createElement("div", { className: getClassFor({ key: 'footerWrapper', theme: theme, defaultClass: footerWrapper }) },
        !(props.noButtons) &&
            React.createElement("p", { className: getClassFor({ key: 'clearBtn', theme: theme, defaultClass: clearBtn }), onClick: function (event) { return clear(event); } }, "Clear dates"),
        !(props.noButtons) &&
            React.createElement("p", { className: getClassFor({ key: 'saveBtn', theme: theme, defaultClass: saveBtn }), onClick: function (event) { return save(event); } }, "Apply")));
};
export default FooterMenu;
//# sourceMappingURL=FooterMenu.js.map