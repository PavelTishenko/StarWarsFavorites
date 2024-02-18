import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { Person } from '@/api/types.api';
import ListItem from './ListItem';
import { ActivityIndicator } from 'react-native-paper';

type Props = {
  data: Person[];
  isFetching: boolean;
  refreshing: boolean;
  onEndReached: () => void;
  onItemPress: (item: Person) => void;
  onRefresh: () => void;
  onHeartPress: (name: string) => void;
};

const List = ({
  data,
  isFetching,
  refreshing,
  onEndReached,
  onItemPress,
  onRefresh,
  onHeartPress,
}: Props) => {
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {isFetching ? (
          <ActivityIndicator color="black" style={styles.activity} />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        keyExtractor={(item, index) => `${item.created}-${index}`}
        renderItem={item => (
          <ListItem
            key={`${item.item.created}-${item.index}`}
            item={item.item}
            onItemPress={onItemPress}
            onHeartPress={onHeartPress}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        estimatedItemSize={200}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activity: {
    margin: 15,
  },
});
