import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';
import { fonts, themes } from '../constants';

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name)
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string){
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if(!name)
      return Alert.alert('Me diz como chamar você 😢');

    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect'
      });
    } catch {
      Alert.alert('Não foi possivel salvar o seu nome. 😢');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>   
              <View style={styles.header}>       
                <Text style={styles.emoji}>
                  {isFilled ? '😄' : '😀'}
                </Text>

                <Text style={styles.title}>
                  Como podemos{"\n"}
                  chamar você?
                </Text>
              </View>

              <TextInput 
                placeholder='Digite um nome'
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderBottomColor: themes.green, }
                ]}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button 
                  onPress={handleSubmit}
                  title="Confirmar"
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 52,
    alignItems: 'center'
  },
  header: {
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    color: themes.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 20
  },
  emoji: {
    fontSize: 44
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: themes.gray,
    color: themes.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  footer:{
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
})