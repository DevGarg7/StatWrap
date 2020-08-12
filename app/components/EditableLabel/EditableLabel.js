/*
  This is the react-inline-editing component from: https://github.com/bfischer/react-inline-editing
  Original license included at the bottom of this file.

  The version imported via yarn was not working, and so we needed to get the most recent version from
  GitHub.  This will also allow local customization when/if needed.
*/

import React from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;
const DEFAULT_LABEL_PLACEHOLDER = 'Click To Edit';

export default class EditableLabel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: this.props.isEditing || false,
      text: this.props.text || ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.setState({
        text: this.props.text || ''
      });
    }

    if (prevProps.isEditing !== this.props.isEditing) {
      this.setState({
        isEditing: this.state.isEditing || this.props.isEditing || false
      });
    }
  }

  isTextValueValid = () => {
    return typeof this.state.text != 'undefined' && this.state.text.trim().length > 0;
  };

  handleFocus = () => {
    if (this.state.isEditing) {
      if (typeof this.props.onFocusOut === 'function') {
        this.props.onFocusOut(this.state.text);
      }
    } else {
      if (typeof this.props.onFocus === 'function') {
        this.props.onFocus(this.state.text);
      }
    }

    if (this.isTextValueValid()) {
      this.setState({
        isEditing: !this.state.isEditing
      });
    } else {
      if (this.state.isEditing) {
        this.setState({
          isEditing: this.props.emptyEdit || false
        });
      } else {
        this.setState({
          isEditing: true
        });
      }
    }
  };

  handleChange = () => {
    this.setState({
      text: this.textInput.value
    });
  };

  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.handleEnterKey();
    }
  };

  handleEnterKey = () => {
    this.handleFocus();
  };

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <input
            type="text"
            className={this.props.inputClassName}
            ref={input => {
              this.textInput = input;
            }}
            value={this.state.text}
            onChange={this.handleChange}
            onBlur={this.handleFocus}
            onKeyDown={this.handleKeyDown}
            style={{
              width: this.props.inputWidth,
              height: this.props.inputHeight,
              fontSize: this.props.inputFontSize,
              fontWeight: this.props.inputFontWeight,
              borderWidth: this.props.inputBorderWidth
            }}
            maxLength={this.props.inputMaxLength}
            placeholder={this.props.inputPlaceHolder}
            tabIndex={this.props.inputTabIndex}
            autoFocus
          />
        </div>
      );
    }

    const labelText = this.isTextValueValid()
      ? this.state.text
      : this.props.labelPlaceHolder || DEFAULT_LABEL_PLACEHOLDER;
    return (
      <div>
        <label
          className={this.props.labelClassName}
          onClick={this.handleFocus}
          style={{
            fontSize: this.props.labelFontSize,
            fontWeight: this.props.labelFontWeight
          }}
        >
          {labelText}
        </label>
      </div>
    );
  }
}

EditableLabel.propTypes = {
  text: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
  emptyEdit: PropTypes.bool,

  labelClassName: PropTypes.string,
  labelFontSize: PropTypes.string,
  labelFontWeight: PropTypes.string,
  labelPlaceHolder: PropTypes.string,

  inputMaxLength: PropTypes.number,
  inputPlaceHolder: PropTypes.string,
  inputTabIndex: PropTypes.number,
  inputWidth: PropTypes.string,
  inputHeight: PropTypes.string,
  inputFontSize: PropTypes.string,
  inputFontWeight: PropTypes.string,
  inputClassName: PropTypes.string,
  inputBorderWidth: PropTypes.string,

  onFocus: PropTypes.func,
  onFocusOut: PropTypes.func
};

/*
https://github.com/bfischer/react-inline-editing/blob/master/LICENSE

MIT License

Copyright (c) 2017 Blake Fischer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
