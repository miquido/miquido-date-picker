// TODO split singe and multi picker
// TODO refactor year list to be single current date
// TODO daysArray to render? -> poczatek koniec zaznaczenia , aktualny miesiac i rok
// TODO is today -> wyrzucic today z daysArray
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
// TODO split things that need to be only on init and on update
// TODO disabled from props ?
// TODO cache variables
// TODO make functions for condition checks
// TODO single source of truth for state ( remove selected )
// TODO month change animation
// TODO theme refactor?
// TODO daysArray indexy i display value sa potrzebne
// TODO - displayMonth
// TODO dont modify childrens?
import * as React from 'react';
import SingleSelection from './SingleSelection/SingleSelection';
import DoubleSelection from './DoubleSelection/DoubleSelection';
var MiquidoDatePicker = /** @class */ (function (_super) {
    __extends(MiquidoDatePicker, _super);
    function MiquidoDatePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.Picker = function (props) {
            var type = props.type;
            switch (type) {
                case 'single':
                    return React.createElement(SingleSelection, __assign({}, _this.props));
                case 'double':
                    return React.createElement(DoubleSelection, __assign({}, _this.props));
                // case 'multi': return <MultiSelection {...this.props} />
                default:
                    return React.createElement(SingleSelection, __assign({}, _this.props));
            }
        };
        return _this;
    }
    MiquidoDatePicker.prototype.render = function () {
        return (React.createElement(this.Picker, { type: this.props.type || 'single' }));
    };
    return MiquidoDatePicker;
}(React.Component));
export default MiquidoDatePicker;
//# sourceMappingURL=MiquidoDatePicker.js.map