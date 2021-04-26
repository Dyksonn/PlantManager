import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Alert
} from 'react-native';
import { Header } from '../components/Header';
import { fonts, images, themes } from '../constants';
import { PlantProps, loadPlant, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWatered] = useState<string>();


  function handleRemovePlant(plant: PlantProps) {
    Alert.alert(
      'Remover',
      `Deseja remover ${plant.name}?`, 
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: async () => {
          try {
            await removePlant(String(plant.id))
            setMyPlants(oldState => oldState.filter(item => item.id !== plant.id))
          } catch (err) {
            console.log(err);
            Alert.alert('Não foi possível remover a planta')
          }
        }}
      ]
      )
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );
        
      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} á ${nextTime}.`
      )

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageData();
  }, [])

  if(loading)
    return <Load />

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image 
          source={images.waterdrop}
          style={styles.spotlightImage}
        />
        <Text
          style={styles.spotlightText}
        >
          {nextWaterd}
        </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList 
          data={myPlants}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }: any) => (
            <PlantCardSecondary data={item} onRemove={() => handleRemovePlant(item)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: themes.background
  },
  spotlight: {
    backgroundColor: themes.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    color: themes.blue,
    paddingHorizontal: 20,
    // textAlign: 'justify'
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 20,
    fontFamily: fonts.heading,
    color: themes.heading,
    marginVertical: 20
  }
})