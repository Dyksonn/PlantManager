import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { fonts, themes } from '../constants';

interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnviromentButton({
  title,
  active,
  ...rest
} : EnviromentButtonProps) {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {...rest}
    >
      <Text style={[
        styles.text,
        active && styles.textActive
      ]}>
        {title}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.shape,
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5
  },
  containerActive: {
    backgroundColor: themes.green_light
  },
  text: {
    color: themes.heading,
    fontFamily: fonts.text
  },
  textActive: {
    fontFamily: fonts.heading,
    color: themes.green_dark,
  }
})