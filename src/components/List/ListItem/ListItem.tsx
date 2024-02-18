import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';

import { Person } from '@/api/types.api';
import { HeartEmpty, Heart } from '@/assets/svg';

type Props = {
  item: Person;
  onItemPress: (item: Person) => void;
  onHeartPress: (name: string) => void;
};

const ListItem = ({ item, onItemPress, onHeartPress }: Props) => {
  const theme = useTheme();

  return (
    <Card onPress={() => onItemPress(item)} style={styles.card}>
      <Card.Title
        title={item.name}
        subtitle={item.gender}
        theme={theme}
        titleStyle={{ color: theme.colors.primary }}
      />
      <Card.Content>
        <View style={styles.contentContainer}>
          <Text>Birth year: {item.birth_year}</Text>
          <Pressable onPress={() => onHeartPress(item.name)}>
            <SvgXml
              role="img"
              xml={item.favorite ? Heart : HeartEmpty}
              height={40}
              width={40}
            />
          </Pressable>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
