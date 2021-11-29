import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { theme, GlobalStyle } from './theme';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import WeatherPage from './components/WeatherPage';

const App = () => {
  const [city, setCity] = useState({});

  const onCityUpdated = ({ lat, lon, name }) => {
    setCity({ lat, lon, name });
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Sidebar onCityUpdated={onCityUpdated} />
        <WeatherPage {...city} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
