import classnames from 'classnames';
import * as React from 'react';
var HideMode;
(function (HideMode) {
    HideMode["hide"] = "hide";
    HideMode["unmount"] = "unmount";
})(HideMode || (HideMode = {}));
/**
 * Component for switching between different tabs on one page.
 */
class TabPanelVertical extends React.Component {
    constructor() {
        super(...arguments);
        this.renderTabPanel = (tab, index) => {
            const { disabled, hidden, label } = tab;
            const { tabIndex, currentTabIndex } = this.props;
            const newCurrentTabIndex = tabIndex ? tabIndex : currentTabIndex;
            const active = newCurrentTabIndex === index;
            const className = classnames('base-tab', {
                'base-tab__active': active,
                'base-tab__disabled': disabled,
                'base-tab__hidden': hidden,
            });
            return (React.createElement("div", { className: className, key: index, onClick: this.createOnTabChangeHandler(index, tab), role: "tab", tabIndex: index },
                label,
                active && React.createElement("span", { className: "base-tab__pointer" })));
        };
        this.renderTabContent = (tab, index) => {
            const { hideMode, tabIndex, currentTabIndex } = this.props;
            const newCurrentTabIndex = tabIndex ? tabIndex : currentTabIndex;
            const className = classnames('d-none', {
                'col-12 col-md-9 d-inline-block': hideMode === HideMode.hide ?
                    newCurrentTabIndex === index : false,
            });
            return (React.createElement("div", { className: className, key: `${tab.label}-${index}` }, tab.content));
        };
        this.createOnTabChangeHandler = (index, tab) => () => {
            if (!tab.disabled) {
                if (this.props.onCurrentTabChange) {
                    this.props.onCurrentTabChange(index);
                }
                if (this.props.onTabChange) {
                    this.props.onTabChange(index, tab.label);
                }
            }
        };
    }
    render() {
        const { fixed, hideMode, panels, optionalHead, currentTabIndex } = this.props;
        const className = classnames('base-tab-panel', {
            'base-tab-panel__fixed': fixed,
        });
        const contents = hideMode === HideMode.hide
            ? panels.map(this.renderTabContent)
            : panels
                .filter((panel, index) => index === currentTabIndex)
                .map(this.renderTabContent);
        const navCx = '';
        return (React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-12 col-md-3 col-tabs draggable-container" },
                React.createElement("div", { className: navCx, role: "tablist" }, panels.map(this.renderTabPanel)),
                optionalHead && React.createElement("div", { className: "base-tab-panel__optinal-head" }, optionalHead)),
            contents));
    }
}
TabPanelVertical.defaultProps = {
    hideMode: HideMode.hide,
};
export { HideMode, TabPanelVertical, };

