import React, { useState } from "react";
import moment from "moment";
import omit from "lodash/omit";
import {polyfill} from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { SingleDatePicker } from "react-dates";
import { HORIZONTAL_ORIENTATION } from "../../constants";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
const dateFormat = "DD MMM YYYY";

const propTypes = {
    autoFocus: PropTypes.bool,
    initialDate: momentPropTypes.momentObj,
  
    ...omit(DatePicker, [
      'date',
      'onDateChange',
      'focused',
      'onFocusChange',
    ]),
  };

  
const defaultProps = {
  initialDate: moment().add(1, "days"),
  placeholder: "Date",
  orientation: HORIZONTAL_ORIENTATION,
  numberOfMonths: 1,
  displayFormat: () => dateFormat,
};

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: props.autoFocus,
      date: props.initialDate,
    };
  }
  onDateChange = (date) => this.setState({ date });

  onFocusChange = ({ focused }) => this.setState({ focused });
  
  isOutsideRange = day =>
    day.isAfter(moment().add(8, "days")) || day.isBefore(); // allow only next 7 days
  render() {
    const { focused, date } = this.state;
    const props = omit(this.props, ["autoFocus", "initialDate"]);

    return (
      <SingleDatePicker
        {...props}
        id="date_input"
        date={date}
        focused={focused}
        onDateChange={this.onDateChange}
        onFocusChange={this.onFocusChange}
        readOnly={true}        
        isOutsideRange={this.isOutsideRange}
      />
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;
export default polyfill(DatePicker);
