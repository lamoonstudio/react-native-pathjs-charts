import React from 'react'
import { G, Text, Line } from 'react-native-svg'


export default function Legend(props) {
  const { positionStartX, y, width, name, style, strokeColor, strokeWidth} = props;
  const textPositionY = 0;

  return (
    <G x={positionStartX} y={y}>
      <Line x1={0} y1={0} x2={width} y2={0}
            stroke={strokeColor} strokeWidth={strokeWidth || 2}
            strokeOpacity={1} strokeDashoffset={0} strokeDasharray={[5, 5]}/>
      <Text
        fontFamily={style.fontFamily}
        fontSize={style.fontSize}
        fontWeight={style.fontWeight}
        fontStyle={style.fontStyle}
        fill={style.fill}
        textAnchor="middle"
        x={width/2}
        y={textPositionY}
        originX={width/2}
      >
        {name}
      </Text>
    </G>
  )
}
