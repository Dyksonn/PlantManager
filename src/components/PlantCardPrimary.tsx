import React from 'react';
import { 
  StyleSheet,
  Text,
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import { fonts, themes } from '../constants';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export const PlantCardPrimary = ({ data, ...rest} : PlantProps) => {
  return (
    <RectButton
      style={styles.container}
      {...rest}
    >
      <SvgFromUri 
        uri={data.photo}
        width={70}
        height={70} 
      />
      <Text
        style={styles.text}
      >
        { data.name }
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: themes.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: themes.heading,
    fontFamily: fonts.heading,
    marginVertical: 16
  }
})