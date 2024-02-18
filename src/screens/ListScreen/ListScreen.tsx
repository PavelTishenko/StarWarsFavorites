import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import List from '@/components/List';
import CountBord from '@/components/CountBord';

import { useLazyGetCharactersQuery } from '@/api/base.api';
import { Person } from '@/api/types.api';
import {
  addToFavorite,
  reset,
  saveCharacters,
  selectCharacters,
  updateCharacters,
} from '@/store/charactersSlice';
import { Screens } from '@/navigation/RootNavigator';

const ListScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trigger, { isLoading, isFetching }] = useLazyGetCharactersQuery();
  const dispatch = useDispatch();

  const characters = useSelector(selectCharacters);

  const calculateMaleFavorites = useMemo(() => {
    return characters.filter(
      character => character.favorite === true && character.gender === 'male',
    );
  }, [characters]);
  const calculateFemaleFavorites = useMemo(() => {
    return characters.filter(
      character => character.favorite === true && character.gender === 'female',
    );
  }, [characters]);
  const calculateNAFavorites = useMemo(() => {
    return characters.filter(
      character => character.favorite === true && character.gender === 'n/a',
    );
  }, [characters]);

  const handleListEndReached = useCallback(async () => {
    try {
      const { data } = await trigger({ page: page });
      if (data?.next === null) return;

      setPage(page + 1);
      dispatch(saveCharacters(data?.results));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, page, trigger]);

  const handleOnRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const data = await trigger({ page: 1 });
      dispatch(updateCharacters(data.data?.results));
      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, trigger]);

  const handleItemPress = useCallback(
    (item: Person) => {
      // navigate to details
      console.log(item);
      navigation.navigate(Screens.DETAILS, { name: item.name });
    },
    [navigation],
  );

  const handleHeartPress = useCallback(
    (name: string) => {
      dispatch(addToFavorite(name));
    },
    [dispatch],
  );

  const handleResetPress = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.activityIndicatorContainer]}>
        <ActivityIndicator animating color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <CountBord
          maleCount={calculateMaleFavorites.length}
          femaleCount={calculateFemaleFavorites.length}
          naCount={calculateNAFavorites.length}
        />
      </View>
      <List
        data={characters}
        isFetching={isFetching}
        refreshing={isRefreshing}
        onHeartPress={handleHeartPress}
        onItemPress={handleItemPress}
        onEndReached={handleListEndReached}
        onRefresh={handleOnRefresh}
      />
      <Pressable
        style={[styles.resetBtn, { backgroundColor: theme.colors.primary }]}
        onPress={handleResetPress}>
        <Text>Reset</Text>
      </Pressable>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtn: {
    position: 'absolute',
    right: 25,
    bottom: 35,
    height: 43,
    width: 80,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
