import { Input } from "@components/components";
import * as React from "react";
class CustomInput extends React.Component {
  render() {
    const {
      label,
      placeholder,
      defaultLabel,
      inputValue,
      classNameLabel,
      classNameInput,
      type,
      autoFocus,
      onKeyPress,
      disabled,
    } = this.props;
    return disabled === true
      ? React.createElement(
          React.Fragment,
          null,
          // React.createElement(
          //   "label",
          //   { className: classNameLabel },
          //   inputValue && (label || defaultLabel)
          // ),
          React.createElement("input", {
            type: type,
            value: inputValue,
            placeholder: placeholder,
            className: classNameInput,
            disabled: disabled,
          })
        )
      : React.createElement(
          React.Fragment,
          null,
          // React.createElement(
          //   "label",
          //   { className: classNameLabel },
          //   inputValue && (label || defaultLabel)
          // ),
          React.createElement(Input, {
            type: type,
            value: inputValue,
            placeholder: placeholder,
            className: classNameInput,
            onFocus: this.props.handleFocusInput,
            onBlur: this.props.handleFocusInput,
            onChangeValue: this.props.handleChangeInput,
            autoFocus: autoFocus,
            onKeyPress: onKeyPress,
          })
        );
  }
}
export { CustomInput };
