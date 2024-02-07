import React from 'react';
import {StyleSheet, View} from 'react-native';

const style = StyleSheet.create({
  divider: {height: 2},
});

export default function SeparatorComponent() {
  return <View style={style.divider} />;
}
