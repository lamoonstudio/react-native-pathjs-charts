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

import { Bar } from 'react-native-pathjs-charts'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
});

class BarChartColumnBasic extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Bar (Column) - Basic`,
  });
  render() {
    let data = [
      [{
        "v": 49,
        "name": "apple",
        "thold": {"name": "TH1", "val": 12, "color": "#000000"},
      }, {
        "v": 42,
        "name": "apple",
        "thold": [
          {"name": () => 'V', "val": 22, "color": "#FFFF00"},
          {"name": () => 'K', "val": 55, "color": "#00FF00"},
          ],
      }],
      [{
        "v": 69,
        "name": "banana",
        "thold": [{"name": "THC", "val": 30, "color": "#FF0000"}],
      }, {
        "v": 62,
        "name": "banana",
        "thold": {"name": "TH9", "val": 44, "color": "#FF0000"},
      }],
      [{
        "v": 29,
        "name": "grape",
        "thold": [{"name": "BV", "val": 34, "color": "#FF0000"}],
      }, {
        "v": 15,
        "name": "grape",
        "thold": {"name": () => "Jet", "val": 39, "color": "#FF0000"},
      }]
    ];

    let options = {
      width: 300,
      height: 300,
      margin: {
        top: 20,
        left: 25,
        bottom: 50,
        right: 20
      },
      color: '#2980B9',
      gutter: 20,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      axisX: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E',
          rotate: 0,
          offset: 10
        },
        legendLabel: {
          fontFamily: 'Arial',
          fontSize: 10,
          fontWeight: true,
          fill: '#FF0000'
        }
      },
      axisY: {
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        showThreshold: true,
        showThresholdLabels: false,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }
    console.log(data);
    return (
      <View style={styles.container}>
        <Bar data={data} options={options} accessorKey='v'/>
      </View>
    )
  }
}

export default BarChartColumnBasic;
