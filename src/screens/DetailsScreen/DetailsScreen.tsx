import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, selectCharacters } from '@/store/charactersSlice';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Screens } from '@/navigation/RootNavigator';
import { ActivityIndicator, Card, useTheme } from 'react-native-paper';
import moment from 'moment';

const DetailsScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, Screens.DETAILS>>();
  const { name } = params;
  const characters = useSelector(selectCharacters);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [species, setSpecies] = useState('');
  const [homeWorld, setHomeWorld] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const character = useMemo(
    () => characters.find(item => item.name === name),
    [characters, name],
  );

  const handleAddToFavoritesPress = () => {
    dispatch(addToFavorite(character?.name));
  };

  const getDetailsData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetch(character?.species);
      const homeData = await fetch(character?.homeworld);
      const homeWorld = await homeData.json();
      const species = await data.json();
      setHomeWorld(homeWorld?.name);
      setSpecies(species?.name);
      setIsLoading(false);
    } catch (error) {
      console.log('error:', error);
      setIsLoading(false);
    }
  }, [character?.homeworld, character?.species]);

  useEffect(() => {
    getDetailsData();
  }, [getDetailsData]);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Card style={{ marginTop: 10 }}>
        <Card.Title
          title={character?.name}
          titleVariant="headlineMedium"
          titleStyle={{ color: theme.colors.primary }}
        />
        <Card.Content>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { color: theme.colors.backdrop }]}>
              Birth Year:
            </Text>
            <Text style={styles.text}> {character?.birth_year}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { color: theme.colors.backdrop }]}>
              Gender:{' '}
            </Text>
            <Text style={styles.text}>{character?.gender}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { color: theme.colors.backdrop }]}>
              Created:{' '}
            </Text>
            <Text style={styles.text}>
              {moment(character?.created).format('DD/MM/YY')}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { color: theme.colors.backdrop }]}>
              Eye Color:{' '}
            </Text>
            <Text style={styles.text}>{character?.eye_color}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, { color: theme.colors.backdrop }]}>
              Skin Color:{' '}
            </Text>
            <Text style={styles.text}>{character?.skin_color}</Text>
          </View>
          {homeWorld && (
            <View style={styles.textContainer}>
              <Text style={[styles.text, { color: theme.colors.backdrop }]}>
                Home World:{' '}
              </Text>
              <Text style={styles.text}>{homeWorld}</Text>
            </View>
          )}
          {species && (
            <View style={styles.textContainer}>
              <Text style={[styles.text, { color: theme.colors.backdrop }]}>
                Species:{' '}
              </Text>
              <Text style={styles.text}>{species}</Text>
            </View>
          )}
        </Card.Content>
        <Card.Actions>
          <Pressable onPress={handleAddToFavoritesPress}>
            <Text style={[styles.text, { color: theme.colors.primary }]}>
              Add to favorites
            </Text>
          </Pressable>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
