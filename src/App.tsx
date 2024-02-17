import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import RootNavigator from './navigation';
import { store } from './store/store';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </PaperProvider>
  );
}

export default App;
