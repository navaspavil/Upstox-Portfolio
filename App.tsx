import React from 'react';
import {SafeAreaView} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import PortfolioScreen from './src/screens/Portfolio';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={{flex: 1}}>
        <PortfolioScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
export default App;
