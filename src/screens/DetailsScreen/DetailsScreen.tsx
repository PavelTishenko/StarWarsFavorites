import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, selectCharacters } from '@/store/charactersSlice';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList, Screens } from '@/navigation/RootNavigator';

const DetailsScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, Screens.DETAILS>>();
  const { name } = params;
  const characters = useSelector(selectCharacters);
  const dispatch = useDispatch();
  const character = useMemo(
    () => characters.find(item => item.name === name),
    [characters, name],
  );

  const handleAddToFavoritesPress = () => {
    dispatch(addToFavorite(character?.name));
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>{character?.name}</Text>
      <Pressable onPress={handleAddToFavoritesPress}>
        <Text>Add to favorites</Text>
      </Pressable>
    </View>
  );
};

export default DetailsScreen;
