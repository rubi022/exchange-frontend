import classnames from 'classnames';
import * as React from 'react';
import iconUp from '../../../assets/images/open-icon.svg'
import iconDown from '../../../assets/images/close.svg'
import iconUpDark from '../../../containers/NavBar/open__dark-icon.svg';
/**
 *  App Dropdown that overrides default dropdown with list of options.
 */
class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        /**
         * function that handles the selection
         * @param index - number of selected element
         */
        this.handleSelect = (index) => {
            if (this.props.onSelect) {
                this.props.onSelect(index);
            }
            this.setState({
                open: false,
                selected: index,
            });
        };
        /**
         * function that opens dropdown list
         */
        this.handleInputClick = () => {
            this.setState({ open: !this.state.open });
        };
        /**
         * function that render one element of dropdown list
         * @param option - element
         * @param index - number of element
         */
        this.renderOptions = (option, index) => {
            return (React.createElement("li", { className: "base-dropdown__list-item", key: index, onClick: this.handleSelect.bind(this, index) },
                React.createElement("span", { className: "base-dropdown__list-item-label" }, option)));
        };
        /**
         * function that render all dropdown list
         * @param listIsOpen - true, if dropdown list is open
         * @param list - list of elements
         */
        this.renderList = (listIsOpen, list) => {
            return listIsOpen ? (React.createElement("ul", { className: "base-dropdown__list" }, list.map(this.renderOptions))) : '';
        };
        this.state = {
            open: false,
            selected: 0,
        };
    }

    render() {
        const { open } = this.state;
        const cx = classnames('base-dropdown', this.props.className);
        return (React.createElement("div", { className: cx },
            React.createElement("div", { className: `base-dropdown__input${open ? '--open' : ''}`, onClick: this.handleInputClick },
                React.createElement("span", { className: "base-dropdown__input-label" }, this.props.defaultSelectedValue ? this.props.defaultSelectedValue : this.props.list[this.state.selected]),
                React.createElement("span", { className: "base-dropdown__input-icon" },
                    React.createElement("img", { src: this.state.open ? (localStorage.getItem('colorTheme') === 'light' ?  iconUpDark : iconUp) : iconDown })
                )),
            this.renderList(this.state.open, this.props.list)));
    }
}
export { Dropdown, };
