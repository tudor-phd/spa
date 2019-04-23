import React, { Component } from 'react';
import Calendar from 'react-calendar';
class CalendarFilter extends Component {
  render() {
    return (
      <div>
        <Calendar minDate={new Date(1898, 12, 31)} maxDate={new Date()} onChange={this.props.search} value={this.props.date} />
      </div>
    );
  }
}

export default CalendarFilter;