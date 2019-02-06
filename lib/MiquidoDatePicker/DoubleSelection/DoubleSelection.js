var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import SingleSelection from '../SingleSelection/SingleSelection';
import * as React from 'react';
import { tripGateTheme } from '../../themes/tripgate/tripgate_theme';
var DoubleSelection = /** @class */ (function (_super) {
    __extends(DoubleSelection, _super);
    function DoubleSelection(props) {
        var _this = _super.call(this, props) || this;
        // @ts-ignore
        _this.state = {
            startDateObj: null,
            startOpen: false,
            endOpen: false
        };
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.openStart = _this.openStart.bind(_this);
        _this.openEnd = _this.openEnd.bind(_this);
        _this.closeAll = _this.closeAll.bind(_this);
        return _this;
    }
    DoubleSelection.prototype.handleSelect = function (value) {
        this.setState({
            startDateObj: {
                start: new Date(value.year, value.month - 1, value.start),
                end: new Date(value.year, value.month - 1, value.start),
                display: new Date(value.year, value.month - 1, value.start)
            },
            startOpen: false,
            endOpen: true
        });
    };
    DoubleSelection.prototype.openStart = function () {
        this.setState({
            startOpen: true,
            endOpen: false
        });
    };
    DoubleSelection.prototype.openEnd = function () {
        this.setState({
            startOpen: false,
            endOpen: true
        });
    };
    DoubleSelection.prototype.closeAll = function () {
        this.setState({
            startOpen: false,
            endOpen: false
        });
    };
    DoubleSelection.prototype.render = function () {
        var _this = this;
        var _a = this.props, restrictions = _a.restrictions, propsForPickers = __rest(_a, ["restrictions"]); // remove children from props
        var endRestrictions = function () {
            if (restrictions && restrictions.end) {
                return _this.state.startDateObj ? {
                    min: _this.state.startDateObj.start,
                    max: restrictions.end.max
                } : __assign({}, restrictions.end);
            }
            else if (_this.state.startDateObj) {
                return {
                    min: _this.state.startDateObj.start
                };
            }
            return undefined;
        };
        return (React.createElement("div", null,
            React.createElement(SingleSelection, __assign({}, propsForPickers, { onSelect: this.handleSelect, theme: tripGateTheme, type: 'single', placeholder: 'DD/MM/YYYY', showOnlyStart: true }, (restrictions ? { restrictions: restrictions.start } : undefined), (this.state.startDateObj ? { defaultValue: this.state.startDateObj } : undefined), { open: this.state.startOpen, close: this.state.endOpen, onClick: this.openStart })),
            React.createElement(SingleSelection, __assign({}, propsForPickers, { theme: tripGateTheme }, (this.state.startDateObj ? { defaultValue: this.state.startDateObj } : undefined), { disabled: !Boolean(this.state.startDateObj), placeholder: 'DD/MM/YYYY', showOnlyEnd: true, restrictions: endRestrictions(), open: this.state.endOpen, close: this.state.startOpen, onClick: this.openEnd, onSelect: this.closeAll }))));
    };
    return DoubleSelection;
}(React.Component));
export default DoubleSelection;
//# sourceMappingURL=DoubleSelection.js.map