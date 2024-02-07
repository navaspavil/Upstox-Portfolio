import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PortfolioRow from '../components/PortfolioRow';
import SeparatorComponent from '../components/SeperatorComponent';
import useUserPortfolio from '../services/portfolioServices';
import {getPnLTextColor} from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    flex: 1,
    justifyContent: 'space-between',
  },
  pageTitleContainer: {
    backgroundColor: 'purple',
    padding: 16,
  },
  pageTitleText: {
    color: 'white',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default function PortfolioScreen() {
  const {data} = useUserPortfolio();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitleText}>Upstox Holding</Text>
        </View>
        <FlatList
          data={data?.userHolding}
          renderItem={({item}) => <PortfolioRow userHoldingItem={item} />}
          ItemSeparatorComponent={() => <SeparatorComponent />}
        />
      </View>
    </View>
  );
}
