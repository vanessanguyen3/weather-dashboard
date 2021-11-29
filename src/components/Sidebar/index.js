import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Input from '../Input';

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 0 16px;
`;

const Divider = styled.div`
  content: '';
  border: 1px solid black;
`;

const ErrorMessage = styled.div``;

// have prepopulated cities so that we don't have to use another API that might
// cost money
const cities = [
  {
    name: 'Austin',
    // lat and lon should use strings because of JS's tendency to lose floating
    // point value accuracy
    lat: '30.26759',
    lon: '-97.74299',
  },
  {
    name: 'Chicago',
    lat: '41.881832',
    lon: '-87.623177',
  },
  {
    name: 'New York City',
    lat: '40.730610',
    lon: '-73.935242',
  },
  {
    name: 'Orlando',
    lat: '28.53833',
    lon: '-81.378876',
  },
  {
    name: 'San Francisco',
    lat: '37.77986',
    lon: '-122.42905',
  },
  {
    name: 'Seattle',
    lat: '47.60357',
    lon: '-122.32945',
  },
  {
    name: 'Denver',
    lat: '39.73715',
    lon: '-104.989174',
  },
  {
    name: 'Atlanta',
    lat: '33.74831',
    lon: '-84.39111',
  },
];

const Sidebar = ({ onCityUpdated }) => {
  const [searchValue, setSearchValue] = useState('');
  const [priorSearches, setPriorSearches] = useState([]);
  const [hasError, setHasError] = useState(false);

  const changeHandler = ({ target }) => {
    const { value } = target;
    setSearchValue(value);
    if (hasError) {
      setHasError(false);
    }
  };

  const handleSearchSubmitted = (value) => {
    const match = cities.find(
      (city) => city.name.toLowerCase() === value.toLowerCase()
    );
    if (!match) {
      setHasError(true);
    } else {
      onCityUpdated(match);
      setPriorSearches([
        value,
        ...priorSearches.filter((priorSearch) => priorSearch !== value),
      ]);
    }
  };

  return (
    <StyledSidebar>
      <h1>Search for a City:</h1>
      <Input
        placeholder="Atlanta"
        value={searchValue}
        onChange={changeHandler}
        list="search-options"
      />
      <datalist id="search-options">
        {cities.map((city, i) => (
          <option value={city.name} key={i} />
        ))}
      </datalist>
      {hasError && <ErrorMessage>Invalid city</ErrorMessage>}
      <Button
        variant="primary"
        onClick={() => handleSearchSubmitted(searchValue)}
      >
        Search
      </Button>
      <Divider />
      {priorSearches.map((priorSearch, i) => (
        <Button
          variant="secondary"
          onClick={() => handleSearchSubmitted(priorSearch)}
          key={i}
        >
          {priorSearch}
        </Button>
      ))}
    </StyledSidebar>
  );
};

export default Sidebar;
