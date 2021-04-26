import React, { useEffect, useState } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fonts, themes } from '../constants';

export function Header() {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');

      setUserName(user || '');
    }

    loadStorageUserName();
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          Olá,
        </Text>
        <Text style={styles.userName}>
          {userName}
        </Text>

      </View>

      <Image 
        style={styles.image}
        source={{
          uri: 'https://avatars.githubusercontent.com/u/44515719?v=4'
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    color: themes.heading,
    fontFamily: fonts.text
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: themes.heading,
    lineHeight: 40
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80/2
  },
})