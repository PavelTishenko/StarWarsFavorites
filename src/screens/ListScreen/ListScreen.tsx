import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useGetCharactersQuery } from '@/api/base.api';

const ListScreen = () => {
  const { data } = useGetCharactersQuery({});
  console.log('data:', data);

  return (
    <View style={styles.container}>
      <Text>ListScreen</Text>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
