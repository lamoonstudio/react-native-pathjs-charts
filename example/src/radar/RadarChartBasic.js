/*
Copyright 2016 Capital One Services, LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.

SPDX-Copyright: Copyright (c) Capital One Services, LLC
SPDX-License-Identifier: Apache-2.0
*/

'use strict'

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Radar } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class RadarChartBasic extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Radar - Basic`,
  });

  onLabelPress = (label, value) => {
    alert(label + ':' + value);
  }

  render() {
    let data = [{
      "speed": 74,
      "balance": 29,
      "explosives": 40,
      "energy": 40,
      "flexibility": 30,
      "agility": 25,
      "endurance": 44
    }]

    let thresholds = [[{
      "speed": 74,
      "balance": 29,
      "explosives": 60,
      "energy": 50,
      "flexibility": 20,
      "agility": 65,
      "endurance": 34
    }],
      [{
        "speed": 66,
        "balance": 34,
        "explosives": 58,
        "energy": 52,
        "flexibility": 25,
        "agility": 68,
        "endurance": 68
      }]
    ]

    let options = {
      width: 290,
      height: 400,
      margin: {
        top: 20,
        left: 20,
        right: 30,
        bottom: 20
      },
      r: 150,
      max: 100,
      fill: "#2980B9",
      stroke: "#2980B9",
      animate: {
        type: 'oneByOne',
        duration: 200
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: true,
        fill: '#34495E',
        onLabelPress: this.onLabelPress
      },
      threshold: [
        {name: 'x', strokeColor: '#7F9F00'},
        {name: 'y', strokeColor: '#FF0000'}
        ],
      thresholdWidth: 2,
    };

    return (
      <View style={styles.container}>
        <Radar data={data} thresholds={thresholds} options={options} />
      </View>
    )
  }
}

export default RadarChartBasic;
