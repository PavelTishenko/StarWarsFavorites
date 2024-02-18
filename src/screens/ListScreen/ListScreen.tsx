import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useGetCharactersQuery } from '@/api/base.api';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const ListScreen = () => {
  const theme = useTheme();
  const { data } = useGetCharactersQuery({});
  console.log('data:', data);

  if (!data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating color={theme.colors.primary} />
      </View>
    );
  }

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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
