import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import { Button } from '../components/Button';
import { fonts, images, themes } from '../constants';
import { isBefore, format } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';
import { useNavigation } from '@react-navigation/native';

interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params as Params;

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if(Platform.OS === 'android'){
      setShowDatePicker(oldState => !oldState);
    }

    if(dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰');
    }

    if(dateTime) {
      setSelectedDateTime(dateTime);
    }
  }
  
  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate('Confirmation', {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.    ',
        buttonTitle: 'Muito Obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      });
    } catch (error) {
      Alert.alert('Não foi possivel salvar. 😢');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri 
          uri={plant.photo}
          height={150}
          width={150}
        />

        <Text style={styles.plantName}>
          {plant.name}
        </Text>
        
        <Text style={styles.plantAbout}>
          {plant.about}
        </Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image 
            source={images.waterdrop}
            style={styles.tipImage}
          />
          <Text style={styles.tipText}>
            {plant.water_tips}
          </Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker 
            value={selectedDateTime}
            mode="time"
            display="spinner"
            onChange={handleChangeTime}
          />
        )}

        {
          Platform.OS === 'android' && (
            <TouchableOpacity
            style={styles.dateTimePickerButton}
              onPress={handleOpenDateTimePickerForAndroid}
            >
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
              </Text>
            </TouchableOpacity>
          )
        }

        <Button 
          title="Cadastrar planta"
          onPress={handleSave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: themes.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: themes.heading,
    marginTop: 15
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: themes.heading,
    fontSize: 17,
    marginTop: 10
  },
  controller: {
    backgroundColor: themes.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themes.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60
  },
  tipImage: {
    width: 56,
    height: 56
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: themes.blue,
    textAlign: 'justify'
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: themes.heading,
    fontSize: 12,
    marginBottom: 5
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40
  },
  dateTimePickerText: {
    color: themes.heading,
    fontSize: 24,
    fontFamily: fonts.text
  }
})