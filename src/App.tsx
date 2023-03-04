import Router from './shared/Router';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import GlobalStyle from './styles/GlobalStyle';
import { Suspense } from 'react';
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
