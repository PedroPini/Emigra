import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import CONST from '../../constants';
import useWindowSize from '../../hooks/useWindowSize';

import Sidebar from './sidebar';
import Main from './main';
import Extra from './extra';
import Header from './header';

import styles from './layout.module.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#d53f8c',

    },
    blue: {
      1000: 'rgb(7, 48, 93);',
    },
  },
});

const Layout = ({ extra = true, children }) => {
  let [size, setSize] = useState({});
  const windowSize = useWindowSize();
  useEffect(() => {
    setSize(windowSize);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Header/>

      <div className={styles.container}>
        <div className={cn(styles.body, !extra && styles.main)}>
          {size.width > CONST.MOBILE_SIZE && <Sidebar/>}
          <Main>{children}</Main>
          {size.width > CONST.TABLET_SIZE && extra && <Extra/>}
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Layout;
