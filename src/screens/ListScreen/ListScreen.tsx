import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import List from '@/components/List';

import { useLazyGetCharactersQuery } from '@/api/base.api';
import {
  addToFavorite,
  saveCharacters,
  selectCharacters,
  updateCharacters,
} from '@/store/charactersSlice';
import { Person } from '@/api/types.api';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '@/navigation/RootNavigator';

const ListScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [trigger, { isLoading, isFetching }] = useLazyGetCharactersQuery();

  const characters = useSelector(selectCharacters);

  const dispatch = useDispatch();

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

  if (isLoading) {
    return (
      <View style={[styles.container, styles.activityIndicatorContainer]}>
        <ActivityIndicator animating color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <List
        data={characters}
        isFetching={isFetching}
        refreshing={isRefreshing}
        onHeartPress={handleHeartPress}
        onItemPress={handleItemPress}
        onEndReached={handleListEndReached}
        onRefresh={handleOnRefresh}
      />
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
});
