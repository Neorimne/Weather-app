import React from 'react';
import ContentContainer from './components/Content/ContentContainer';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <ContentContainer store={store} /> 
    </div>
  );
}

export default App;
