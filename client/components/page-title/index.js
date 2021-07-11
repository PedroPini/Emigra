import React, { useContext } from 'react'
import cn from 'classnames'

import { AuthContext } from '../../store/auth'
import { Text } from "@chakra-ui/react"

import { Link } from "@chakra-ui/react"

import styles from './page-title.module.css'
import Button from '../button'
const PageTitle = ({ title, button, borderBottom = true, children }) => {
  const { isAuthenticated } = useContext(AuthContext)
  return (
    <div className={cn(styles.container, borderBottom && styles.borderBottom)}>
      <div className={styles.title}>
      <Text fontSize="6xl">{title}</Text>
        <div className={styles.buttonContainer}>
          {button && (
           <Button
           href={isAuthenticated() ? '/questions/ask' : '/auth'}
           primary
         >
           Ask Question
         </Button>
            
          )}
        </div>
      </div>
      {children && <p className={styles.summary}>{children}</p>}
      
    </div>
  )
}

export default PageTitle
