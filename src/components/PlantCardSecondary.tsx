import React from 'react';
import { 
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg';

import { fonts, themes } from '../constants';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  },
  onRemove: () => void
}

export const PlantCardSecondary= ({ data, onRemove, ...rest} : PlantProps) => {
  return (
    <Swipeable overshootRight={false} renderRightActions={() => (
      <Animated.View>
        <View>
          <RectButton style={styles.removeButton} onPress={onRemove}>
            <Feather name="trash" size={32} color={themes.white} />
          </RectButton>
        </View>
      </Animated.View>
    )}>
      <RectButton
        style={styles.container}
        {...rest}
      >
        <SvgFromUri 
          uri={data.photo}
          width={50}
          height={50} 
        />
        <Text
            style={styles.text}
          >
            { data.name }
        </Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>
            Regar ás
          </Text>
          <Text style={styles.time}>
            {data.hour}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themes.shape,
    marginVertical: 5
  },
  text: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: themes.heading,
  },
  details: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: themes.body_light
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: themes.body_dark
  },
  removeButton: {
    width: 90,
    height: 80,
    marginTop: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    right: 20,
    paddingLeft: 15,
    backgroundColor: themes.red,
  }
})