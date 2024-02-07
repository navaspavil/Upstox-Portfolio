import {useQuery} from '@tanstack/react-query';
import {apiPaths} from '../utils/constants';
import {PortfolioResponse} from '../utils/types';
import api from './api';

const getPortfolioData = async () => {
  const {data} = await api.get<PortfolioResponse>(apiPaths.userPortfolio);

  return data;
};

export default function useUserPortfolio() {
  return useQuery({
    queryKey: ['portfolioData'],
    queryFn: getPortfolioData,
    select: response => {
      let portfolioCurrentValue = 0;
      let portfolioInvestmentValue = 0;
      let totalPnLValue = 0;
      let todaysPnLValue = 0;
      const newData = response?.userHolding.map(item => {
        const currentValue = item.ltp * item.quantity; // Single Stock current Value
        const investmentValue = item.avgPrice * item.quantity; // Single Investment current Value
        const currentPnL = currentValue - investmentValue; // Single Stock P/L Value
        const todayPnL = (item.close - item.ltp) * item.quantity; // Single Stock todays P/L Value

        portfolioCurrentValue = portfolioCurrentValue + currentValue;
        portfolioInvestmentValue = portfolioInvestmentValue + investmentValue;
        totalPnLValue = totalPnLValue + currentPnL;
        todaysPnLValue = todaysPnLValue + todayPnL;

        return {
          ...item,
          currentPnL: currentPnL.toFixed(2),
        };
      });

      return {
        userHolding: newData,
        portfolioCurrentValue: portfolioCurrentValue.toFixed(2),
        portfolioInvestmentValue: portfolioInvestmentValue.toFixed(2),
        totalPnLValue: totalPnLValue.toFixed(2),
        todaysPnLValue: todaysPnLValue.toFixed(2),
      };
    },
  });
}
