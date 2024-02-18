import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import RootNavigator from './navigation';
import { store } from './store/store';

IconFontAwesome.loadFont();

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
