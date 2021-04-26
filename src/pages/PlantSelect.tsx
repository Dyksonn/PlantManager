import React, { useEffect, useState } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
 } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { EnviromentButton } from '../components/EnviromentButton';
import { Header } from '../components/Header';
import { Load } from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { fonts, themes } from '../constants';
import api from '../services/api';
import { PlantProps } from '../libs/storage';

interface EnviromentProps {
  key: string;
  title: string;
}


export function PlantSelect() {
  const navigation = useNavigation();

  const [environment, setEnvironment] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all')
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', {plant})
  }

  function handleEnviromentSelected(environment: string) {
    setEnvironmentSelected(environment);

    if (environment === 'all')
      return setFilteredPlants(plants);
    
    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)
    );
    
    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1)
      return;
    
    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if (!data)
      return setLoading(true);
    
    if(page > 1) {
      // juntando com dados antigos com dados novos
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    }else {
      setPlants(data);
      setFilteredPlants(data);
    }
   
    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc');

      setEnvironment([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }

    fetchEnviroment();
  }, [])

  useEffect(() => {
    fetchPlants();
  }, [])


  if (loading) 
    return <Load />
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>
          Em qual hambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList 
          data={environment}
          keyExtractor={(item, index) => String(item.key + index)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
          renderItem={({ item }) => (
            <EnviromentButton 
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
        />
      </View>

      <View style={styles.plants}>
          <FlatList 
            data={filteredPlants}
            keyExtractor={(item, index) => String(item.id + index)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <PlantCardPrimary 
                data={item}
                onPress={() => handlePlantSelect(item)}
              />
            )}
            onEndReachedThreshold={0.1}
          onEndReached={({distanceFromEnd}) => handleFetchMore(distanceFromEnd)}
          ListFooterComponent={
            loadingMore
            ? <ActivityIndicator color={themes.green} />
            : <></>
          }
          />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.background
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: themes.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: themes.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 6,
    marginLeft: 32,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },
})