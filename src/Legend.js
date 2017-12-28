import React from 'react'
import { G, Text, Line } from 'react-native-svg'


export default function Legend(props) {
  const { positionStartX, y, width, name, style, strokeColor } = props;
  const positionEndX = positionStartX + width;
  const textPositionX = positionEndX + 4;
  const textPositionY = y - 6;

  return (
    <G>
      <Line x1={positionStartX} y1={y} x2={positionEndX} y2={y}
            stroke={strokeColor} strokeOpacity={1} strokeDashoffset={0} strokeDasharray={[5, 5]}/>
      <Text
        fontFamily={style.fontFamily}
        fontSize={style.fontSize}
        fontWeight={style.fontWeight}
        fontStyle={style.fontStyle}
        fill={style.fill}
        textAnchor="middle" x={textPositionX} y={textPositionY}>{name}
      </Text>
    </G>
  )
}
