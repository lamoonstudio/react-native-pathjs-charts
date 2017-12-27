import React from 'react'
import { G, Line, Text } from 'react-native-svg'


export default function BarThreshold (props) {
  const { name, rect, value, style, strokeColor } = props;

  const xList = rect.line.path.points()
    .map(coordinate => coordinate[0]);

  const xBorder = xList.reduce(
    (xBorder, x) => [Math.min(x, xBorder[0]), Math.max(x, xBorder[1])],
    [xList[0], xList[0]]
  );

  const minX = xBorder[0];
  const maxX = xBorder[1];
  const width = maxX - minX;
  const textAnchorX = minX + width / 2;

  return (
    <G>
      <Line x1={minX} y1={value} x2={minX + width} y2={value} stroke={strokeColor} strokeOpacity={1}
            strokeDashoffset={0} strokeDasharray={[5, 5]}/>
      <Text
        fontFamily={style.fontFamily}
        fontSize={style.fontSize}
        fontWeight={style.fontWeight}
        fontStyle={style.fontStyle}
        fill={style.fill}
        textAnchor="middle" x={textAnchorX} y={value}>{name}
      </Text>
    </G>
  )
}
