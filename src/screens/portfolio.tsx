import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import PortfolioRow from '../components/PortfolioRow';
import SeparatorComponent from '../components/SeperatorComponent';
import Accordion from '../components/AccordionComponent';
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
  bottomSheetRowContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 4,
  },
  bottomSheetRowTitle: {fontWeight: '600', color: 'black', fontSize: 16},
  accordionChildContainer: {
    paddingBottom: 16,
  },
});

type BottomSheetRowViewProps = {
  title: string;
  value: string;
  textColor?: string;
};

function BottomSheetRowView({
  title,
  value,
  textColor = 'black',
}: BottomSheetRowViewProps) {
  return (
    <View style={styles.bottomSheetRowContainer}>
      <Text style={styles.bottomSheetRowTitle}>{title}</Text>
      <Text style={{color: textColor}}>{`₹ ${value}`}</Text>
    </View>
  );
}

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
      <Accordion
        titleView={
          <BottomSheetRowView
            title="Profit & Loss"
            value={data?.totalPnLValue ?? ''}
            textColor={getPnLTextColor(Number(data?.totalPnLValue))}
          />
        }>
        <View style={styles.accordionChildContainer}>
          <BottomSheetRowView
            title="Current Value"
            value={data?.portfolioCurrentValue ?? ''}
          />
          <BottomSheetRowView
            title="Total Investment"
            value={data?.portfolioInvestmentValue ?? ''}
          />
          <BottomSheetRowView
            title="Today's Profit & Loss"
            value={data?.todaysPnLValue ?? ''}
            textColor={getPnLTextColor(Number(data?.todaysPnLValue))}
          />
        </View>
      </Accordion>
    </View>
  );
}
