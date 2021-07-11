import React, { useEffect, useContext } from 'react'
//import Link from 'next/link'
import cn from 'classnames'
import styles from './header.module.css'
import useComponentVisible from '../../../hooks/useComponentVisible'
import useWindowSize from '../../../hooks/useWindowSize'
import CONST from '../../../constants'
import ModalContext from '../../../store/modal'
import { AuthContext } from '../../../store/auth'
import { ColorModeSwitcher } from "../../color-mode-switch/index"
import NavigationDropdown from '../../navigation-dropdown'
import { Logo } from '../../icons'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }, { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

const Header = ({ className, ...props }) =>  {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleComponentVisible } = useContext(ModalContext)
  const { isAuthenticated, authState, logout } = useContext(AuthContext)
  const {
    ref,
    toggleRef,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)
  const size = useWindowSize()
  useEffect(() => {
    if (size.width > CONST.MOBILE_SIZE) {
      setIsComponentVisible(false)
    }
  }, [size])
  return (
    <header className={cn(styles.header, className)} {...props}>
      
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: !isOpen ? 'none' : 'inherit' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box> <Logo /></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
         
                 
          <Flex alignItems={'center'}>
           
            
            <Menu>
            {isAuthenticated() ? (
              <>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}>
                <Avatar
                  size={'sm'}
                  src={`https://secure.gravatar.com/avatar/${authState.userInfo}?s=32&d=identicon`}
                />
              </MenuButton>
              <MenuList>
                <MenuItem> 
                  <Link
                    href="/users/[user]"
                    as={`/users/${authState.userInfo.username}`}>
                    My Account
                  </Link>
                </MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
              </>
              ) : (
                <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  
                  onClick={() => handleComponentVisible(true, 'login')}>
                  Sign In
                </Button>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'blue.900'}
                  onClick={() => handleComponentVisible(true, 'signup')}
                  _hover={{
                    bg: 'blue.800',
                  }}>
                  Sign Up
                </Button>
              </Stack>
            )}
            <ColorModeSwitcher justifySelf="flex-end" />
            </Menu>
          </Flex>
          
         
        </Flex>

        {isOpen ? (
          <Box pb={4}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <div ref={ref}>{isComponentVisible && <NavigationDropdown />}</div>
    </header>
    
  );
}

export default Header