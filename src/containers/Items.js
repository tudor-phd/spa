import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';

import CalendarFilter from './CalendarFilter';

const options = [
  { value: 'M', label: 'Male' },
  { value: 'F', label: 'Female' }
];

class Items extends React.Component {
  state = {
    date: null,
    selectedOption: null,
    displayCal: false
  };
  search = date => {
    this.setState({ date });
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption, displayCal: true });
  };

  render() {
    let result = '';
    let { items } = this.props;
    const { selectedOption } = this.state;
    if (selectedOption && items) {
      let selection = moment(this.state.date)
        .add(1, 'days')
        .format('YYYY-MM-DD');
      let filteredDates = this.props.items.filter(
        x =>
          Date.parse(selection) <= Date.parse(x.to) &&
          Date.parse(selection) >= Date.parse(x.from)
      );
      if (filteredDates.length === 1) {
        result = filteredDates[0];
      }
      if (filteredDates.length === 2 && selectedOption.value === 'M') {
        if (filteredDates[0].gender === 'M') {
          result = filteredDates[0];
        }
        if (filteredDates[1].gender === 'M') {
          result = filteredDates[1];
        }
      }
      if (filteredDates.length === 2 && selectedOption.value === 'F') {
        if (filteredDates[0].gender === 'F') {
          result = filteredDates[0];
        }
        if (filteredDates[1].gender === 'F') {
          result = filteredDates[1];
        }
      }
      if (
        this.state.date &&
        result.spa_months &&
        result.spa_years &&
        !result.spa
      ) {
        items = this.props.items.filter(
          x =>
            x.spa_months === result.spa_months &&
            x.spa_years === result.spa_years &&
            !x.spa
        );
      }
      if (this.state.date && result.spa_years && !result.spa_months) {
        items = this.props.items.filter(
          x => x.spa_years === result.spa_years && !x.spa_months
        );
      }
      if (
        this.state.date &&
        result.spa &&
        !result.spa_months &&
        !result.spa_years
      ) {
        items = this.props.items.filter(
          x => x.spa === result.spa && !x.spa_months && !x.spa_years
        );
      }
    }

    return (
      <div>
        {items && (
          <div className='wrapper'>
            <div id='one'>
              <table>
                <thead>
                  <tr>
                    <th>Gender</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date State Pension age reached</th>
                  </tr>
                </thead>
                <tbody>
                  {items &&
                    items.map(function(item, index) {
                      return (
                        <tr key={index}>
                          <td>{item.gender}</td>
                          <td>{item.from}</td>
                          {item.to && (
                            <td>{moment(item.to).format('YYYY-MM-DD')}</td>
                          )}
                          {item.spa_years && !item.spa && !item.spa_months && (
                            <td>{item.spa_years}</td>
                          )}
                          {!item.spa && item.spa_years && item.spa_months && (
                            <td>
                              {item.spa_years +
                                ' years and ' +
                                item.spa_months +
                                ' months'}
                            </td>
                          )}
                          {item.spa && <td>{item.spa}</td>}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div id='two'>
              <h3>Select your gender</h3>
              <Select
                placeholder='Select gender...'
                isClearable
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
              />
              {this.state.displayCal ? <h3>Select your birthday</h3> : null}
              {this.state.displayCal ? (
                <CalendarFilter search={this.search} date={this.state.date} />
              ) : null}
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  items: state.items
});

export default connect(mapStateToProps)(Items);