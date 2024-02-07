import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {UserHoldingItemModified} from '../utils/types';
import {getPnLTextColor} from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  innerRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    color: 'black',
    fontSize: 14,
  },
  valueText: {
    fontWeight: '500',
  },
  stockSymbolText: {
    fontWeight: '600',
  },
});

type PortfolioRowProps = {
  userHoldingItem: UserHoldingItemModified;
};

export default function PortfolioRow({userHoldingItem}: PortfolioRowProps) {
  const {ltp, quantity, symbol, currentPnL} = userHoldingItem;

  return (
    <View style={styles.container}>
      <View style={styles.innerRowContainer}>
        <Text style={[styles.labelText, styles.stockSymbolText]}>{symbol}</Text>
        <Text style={styles.labelText}>
          LTP:
          <Text style={styles.valueText}>{` ₹ ${ltp.toFixed(2)}`}</Text>
        </Text>
      </View>
      <View style={styles.innerRowContainer}>
        <Text style={styles.labelText}>{quantity}</Text>
        <Text style={styles.labelText}>
          P/L:
          <Text
            style={[
              styles.valueText,
              {color: getPnLTextColor(Number(currentPnL))},
            ]}>{` ₹ ${currentPnL}`}</Text>
        </Text>
      </View>
    </View>
  );
}
