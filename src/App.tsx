import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
import GlobalStyle from './styles/GlobalStyle';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyle />
        <Suspense fallback={<div>Loading...</div>}>
          <Router />
        </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
