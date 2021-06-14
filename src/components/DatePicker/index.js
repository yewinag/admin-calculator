import React, { useState } from "react";
import moment from "moment";
import omit from "lodash/omit";
import { polyfill } from "react-lifecycles-compat";
import PropTypes from "prop-types";
import momentPropTypes from "react-moment-proptypes";
import { SingleDatePicker } from "react-dates";
import { HORIZONTAL_ORIENTATION } from "../../constants";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "../../styles/datepicker.scss";
import { dateFormat } from "../../constants";
import * as types from '../../constants/actionTypes';
const propTypes = {
  autoFocus: PropTypes.bool,
  initialDate: momentPropTypes.momentObj,

  ...omit(DatePicker, ["date", "onDateChange", "focused", "onFocusChange"]),
};

const defaultProps = {
  initialDate: null,
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
  onDateChange = (date) => {
    this.setState({ date });
    this.props.dispatch({
      type: types.SELECTED_DATE,
      payload: moment(date).format(dateFormat),
    }); // add date to state management
  };

  onFocusChange = ({ focused }) => this.setState({ focused });

  isOutsideRange = (day) =>
    day.isAfter(moment().add(8, "days")) || day.isBefore(moment().add(1,"days")); // allow only next 7 days
  render() {
    const { focused, date } = this.state;
    const props = omit(this.props, ["autoFocus", "initialDate", "dispatch"]);

    return (
      <>
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
        <span className="icon" />
      </>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;
export default polyfill(DatePicker);
