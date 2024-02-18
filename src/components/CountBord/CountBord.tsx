import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Chip } from 'react-native-paper';

type Props = {
  maleCount: number;
  femaleCount: number;
  naCount: number;
};

const CountBord = ({ maleCount, femaleCount, naCount }: Props) => {
  return (
    <View style={styles.container}>
      <Chip>
        <View style={styles.chip}>
          <Text style={styles.text}>{maleCount}</Text>
          <Text>Male Fans</Text>
        </View>
      </Chip>
      <Chip>
        <View style={styles.chip}>
          <Text style={styles.text}>{femaleCount}</Text>
          <Text>Female Fans</Text>
        </View>
      </Chip>
      <Chip>
        <View style={styles.chip}>
          <Text style={styles.text}>{naCount}</Text>
          <Text>Others Fans</Text>
        </View>
      </Chip>
    </View>
  );
};

export default CountBord;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 30,
  },
  chipContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  chip: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
