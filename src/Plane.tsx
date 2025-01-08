import * as React from 'react'
import { Animated } from 'react-native'
import { SpinnerProps, defaultProps } from './SpinnerProps'
import AnimationContainer from './AnimationContainer'
import { loop } from './utils'

export default class Plane extends React.Component<SpinnerProps & { width?: number; height?: number }> {
  static defaultProps = defaultProps

  render() {
    const {
      size,
      width,
      height,
      color,
      style,
      animating,
      hidesWhenStopped,
      ...rest
    } = this.props

    // Use width and height props or fallback to size
    const rectWidth = width || size
    const rectHeight = height || size

    return (
      <AnimationContainer
        initAnimation={() => ({
          plane: (value) => ({
            values: [value],
            animation: loop({
              duration: 1200,
              value: value,
              keyframes: [0, 50, 100],
            }),
          }),
        })}
        animating={animating}
      >
        {(values) => (
          <Animated.View
            style={[
              {
                width: rectWidth, // Rectangle width
                height: rectHeight, // Rectangle height
                borderWidth: size * 0.1, // Thickness of the border (adjust as needed)
                borderColor: color, // Border color
                backgroundColor: 'transparent', // Hollow center
                opacity: !animating && hidesWhenStopped ? 0 : 1,
                transform: [
                  {
                    perspective: size * 3,
                  },
                  {
                    rotateX: values.plane[0].interpolate({
                      inputRange: [0, 50, 100],
                      outputRange: ['0.1deg', '-179.9deg', '-179.9deg'],
                    }),
                  },
                  {
                    rotateY: values.plane[0].interpolate({
                      inputRange: [0, 50, 100],
                      outputRange: ['0.1deg', '0.1deg', '-179.9deg'],
                    }),
                  },
                ],
              },
              style,
            ]}
            {...rest}
          />
        )}
      </AnimationContainer>
    )
  }
}
