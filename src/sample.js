import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Button, Picker, ListItem} from 'native-base';
import RnDatePicker from 'react-native-datepicker';
import {defaultStateValues} from './data.js';
export default class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      initialDate: new Date(),
      selectedState: '',
      selectedCity: '',
    };
  }
  API() {
    const url =
      'https://api.nasa.gov/neo/rest/v1/neo/' +
      this.state.Asteroid +
      '?api_key=XeCmbcMQHClxcpfDSYzvRhNCwf477n9YdmOSwcNj';
    return (
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          console.log('json' + JSON.stringify(json));
          this.setState({data: json});
        })
        // eslint-disable-next-line handle-callback-err
        .catch((err) => {
          alert('Asteroid ID is not available in list');
          this.setState({data: {}});
        })
    );
  }
  gererateRandomAsteroid() {
    const url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY';
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        var near_earth_objects = json.near_earth_objects;
        var index =
          near_earth_objects[
            Math.floor(Math.random() * near_earth_objects.length)
          ];
        this.setState({data: index});
      })
      .catch((err) => {
        return {
          status: false,
          error: err,
        };
      });
  }
  onChangeDate = (value) => {
    this.setState({date: value});
  };
  render() {
    var {date, initialDate, selectedState, selectedCity} = this.state;
    const statelist = defaultStateValues.usaStates;
    const cities = defaultStateValues.cities;
    return (
      <View>
        <ListItem style={{flexDirection: 'row'}}>
          <View style={{flex: 2, alignItems: 'flex-start'}}>
            <Text style={{textAlign: 'left'}}>DOB: </Text>
          </View>
          <View style={{flex: 7}}>
            <RnDatePicker
              date={date}
              initialDate={initialDate}
              mode="date"
              format="DD/MM/YYYY"
              confirmBtnText={'Confirm'}
              cancelBtnText={'Cancel'}
              onDateChange={(value) => this.onChangeDate(value)}
              disabled={false}
            />
          </View>
        </ListItem>
        <ListItem style={{flexDirection: 'row'}}>
          <View style={{flex: 2, alignItems: 'flex-start'}}>
            <Text style={{textAlign: 'left'}}>State: </Text>
          </View>
          <View style={{flex: 7, borderWidth: 0.3}}>
            <Picker
              placeholder={'Select State'}
              mode="dropdown"
              selectedValue={selectedState}
              onValueChange={(val) => {
                this.setState({selectedState: val});
              }}>
              {statelist.map((eachItem) => {
                return (
                  <Picker.Item
                    key={eachItem.abbreviation}
                    label={eachItem.name}
                    value={eachItem.abbreviation}
                  />
                );
              })}
            </Picker>
          </View>
        </ListItem>
        <ListItem style={{flexDirection: 'row'}}>
          <View style={{flex: 2, alignItems: 'flex-start'}}>
            <Text style={{textAlign: 'left'}}>City: </Text>
          </View>
          <View style={{flex: 7, borderWidth: 0.3}}>
            <Picker
              placeholder={'Select City'}
              mode="dropdown"
              selectedValue={selectedCity}
              onValueChange={(val) => {
                this.setState({selectedCity: val});
              }}>
              {cities.map((eachItem) => {
                return (
                  <Picker.Item
                    key={eachItem.rank}
                    label={eachItem.city}
                    value={eachItem.rank}
                  />
                );
              })}
            </Picker>
          </View>
        </ListItem>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
  <Text>Developed by Sudhir </Text>
        </View>
      </View>
    );
  }
}
