import { Text } from '@chakra-ui/react'
import * as React from 'react'

interface Props {
  text: string
  fontSize?: number
}

const Label = ({ text, fontSize }: Props) => {
  return (
    <Text color="labelText" fontSize={fontSize ?? 19}>
      {text}
    </Text>
  )
}

export default Label
