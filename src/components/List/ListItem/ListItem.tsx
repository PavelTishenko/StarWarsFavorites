import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { Person } from '@/api/types.api';
import { Card, Icon, useTheme } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import { HeartEmpty, Heart } from '@/assets/svg';

type Props = {
  item: Person;
  onItemPress: (item: Person) => void;
  onHeartPress: (name: string) => void;
};

const ListItem = ({ item, onItemPress, onHeartPress }: Props) => {
  const theme = useTheme();

  return (
    <Card
      onPress={() => onItemPress(item)}
      style={{ marginHorizontal: 20, marginVertical: 10 }}>
      <Card.Title
        title={item.name}
        subtitle={item.gender}
        theme={theme}
        titleStyle={{ color: theme.colors.primary }}
      />

      <Card.Content>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
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
