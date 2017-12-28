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

import React,{Component} from 'react'
import {Text as ReactText}  from 'react-native'
import Svg,{ G, Path, Text, Line } from 'react-native-svg'
import { Colors, Options, fontAdapt, cyclic, color, identity } from './util'
import _ from 'lodash'
import Axis from './Axis'
import GridAxis from './GridAxis'
import BarThreshold from './BarThreshold'
import Legend from './Legend'
const Bar = require('paths-js/bar')

export default class BarChart extends Component {

  static defaultProps = {
    accessorKey:'',
    options: {
      width: 600,
      height: 600,
      margin: {top: 20, left: 20, bottom: 50, right: 20},
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
          fontSize: 14,
          bold: true,
          color: '#34495E',
          rotate: 45,
        }
      },
      axisY: {
        min: false,
        max: false,
        showAxis: true,
        showLines: true,
        showLabels: true,
        showTicks: true,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 14,
          bold: true,
          color: '#34495E'
        }
      }
    }
  }

  color(i) {
    let color = this.props.options.color
    if (!_.isString(this.props.options.color)) color = color.color
    const pallete = this.props.pallete || Colors.mix(color || '#9ac7f7')
    return Colors.string(cyclic(pallete, i))
  }

  getMaxAndMin(values, scale) {
    const axisY = this.props.options.axisY
		let maxValue = axisY.max || 0
		let minValue = axisY.min || 0

    let max = _.max(values)
    if (max > maxValue) maxValue = max
    let min = _.min(values)
    if (min < minValue) minValue = min

    return {
      minValue: minValue,
      maxValue: maxValue,
      min: scale(minValue),
      max: scale(maxValue)
    }
  }

  render() {
    const noDataMsg = this.props.noDataMessage || 'No data available'
    if (this.props.data === undefined) return (<ReactText>{noDataMsg}</ReactText>)

    let options = new Options(this.props)
    let accessor = this.props.accessor || identity(this.props.accessorKey)

    let chart = Bar({
      data: this.props.data,
      gutter: this.props.options.gutter || 10,
      width: options.chartWidth,
      height: options.chartHeight,
      accessor: accessor,
      min: this.props.options.axisY.min || undefined,
      max: this.props.options.axisY.max || undefined,
    })

    let values = chart.curves.map((curve) => accessor(curve.item))
    let chartArea = {x: {minValue: 0, maxValue: 200, min: 0, max: options.chartWidth},
                     y: chart.scale(options.axisY.max) || this.getMaxAndMin(values, chart.scale),
                     margin:options.margin}

    let textStyle = fontAdapt(options.axisX.label)
    let labelOffset = this.props.options.axisX.label.offset || 20
    // console.log('chartArea -> ', chartArea);

    let lines = chart.curves.map(function (c, i) {
      let numDataGroups = this.props.data.length || 0
      let colorVariationVal = numDataGroups > 1 ? numDataGroups : 3
      let color = this.color(i % colorVariationVal)
      let stroke = Colors.darkenColor(color)
      let thresholdData = this.props.data[i % numDataGroups][Math.floor(i / numDataGroups)]['thold'];
      if (!Array.isArray(thresholdData)) {
        thresholdData = [thresholdData];
      }

      return (
        <G key={'lines' + i}>
          <Path d={c.line.path.print()} stroke={stroke} fill={color}/>
          {options.axisX.showLabels ?
            <Text fontFamily={textStyle.fontFamily}
                  fontSize={textStyle.fontSize} fontWeight={textStyle.fontWeight} fontStyle={textStyle.fontStyle}
                  fill={textStyle.fill} x={c.line.centroid[0]} y={labelOffset + chartArea.y.min}
                  originX={c.line.centroid[0]} originY={labelOffset + chartArea.y.min} rotate={textStyle.rotate}
                  textAnchor="middle">
              {c.item.name}
            </Text>
            : null}
          {options.axisY.showThreshold ?
            thresholdData.map(function (thold, idx) {
              // console.log('bar -> thold', thold);
              const key = 'thold' + i + idx;
              const name = typeof thold.name === 'function' ? thold.name() : `${thold.name} - ${thold.val}`;
              const value = chart.scale(thold.val);
              const color = thold.color || '#FF0000';
              return (<BarThreshold key={key}
                                    name={name}
                                    rect={c}
                                    value={value}
                                    style={textStyle}
                                    strokeColor={color}/>)
            })
            : null}
        </G>
      )
    }, this)

    const legendDict = this.props.data.reduce((array, data) => array.concat(data), [])
      .map(data => data.thold)
      .reduce((array, thold) => {
        console.log('thold ->', thold);
        console.log('array ->', array);
        return array.concat( Array.isArray(thold) ? thold : [thold] );
      }, [])
      .reduce((dict, thold) => {
        let newDict = { ...dict };
        newDict[thold.color] = thold.name;
        return newDict;
      }, {});

    const legends = Object.keys(legendDict).map((color, index) => {
        const width = 40;
        const margin = 24;
        const positionStartX = index * width + (index > 0 ? index * margin : 0);
        let legendName = legendDict[color];
        legendName = typeof legendName === 'function' ?  legendName() : legendName;
        const offsetY = labelOffset + chartArea.y.min + 24;
        return (
          <Legend key={`legend${index}`}
                  positionStartX={positionStartX} y={offsetY} width={width}
                  name={legendName} style={textStyle} strokeColor={color} />
          )
      });

    return (<Svg width={options.width} height={options.height}>
              <G x={options.margin.left} y={options.margin.top}>
                <GridAxis scale={chart.scale} options={options.axisY} chartArea={chartArea} />
                {lines}
                <Axis scale={chart.scale} options={options.axisY} chartArea={chartArea} />
                {legends}
              </G>
            </Svg>)
  }
}
