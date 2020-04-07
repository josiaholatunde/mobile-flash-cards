import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

const TextButton = ({ color, children, onPress, ...props  }) => {
  return (
    <TouchableOpacity onPress={() => onPress()} { ...props}>
        <Text style={{color}}> { children } </Text>
    </TouchableOpacity>
  )
}

export default TextButton
