import * as React from 'react'
import { Flex } from '@chakra-ui/react'
import Language from './Language'

interface Props {
  langs: Lang[]
}

const Languages = ({ langs }: Props) => {
  return (
    <Flex gap={2}>
      {langs.map((lang, i) => (
        <Language key={i} lang={lang} />
      ))}
    </Flex>
  )
}

export default Languages
