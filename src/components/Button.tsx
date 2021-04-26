import React from 'react';
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { fonts, themes } from '../constants';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button({ title, ...rest } : ButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      {...rest}
    >
      <Text style={styles.text}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: themes.white,
    fontFamily: fonts.heading
  }
})