import React, { useContext } from 'react'
import cn from 'classnames'

import { AuthContext } from '../../store/auth'



import styles from './page-title.module.css'
import { Button } from '@chakra-ui/react'
const PageTitle = ({ title, button, borderBottom = true, children }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className={cn(styles.container, borderBottom && styles.borderBottom)}>
      <div className={styles.title}>
        <h1>{title}</h1>
        <div className={styles.buttonContainer}>
          {button && (
            <Button
            href={isAuthenticated() ? '/questions/ask' : '/auth'}
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}>
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
