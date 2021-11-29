import styled from 'styled-components';
import { theme } from '../../theme';

const variants = {
  primary: {
    color: 'white',
    backgroundColor: theme.colors.blue,
  },
  secondary: {
    color: 'black',
    backgroundColor: 'lightgray',
  },
};

const Button = styled.button`
  color: ${(props) => variants[props.variant || 'primary'].color};
  background-color: ${(props) =>
    variants[props.variant || 'primary'].backgroundColor};
  padding: 12px 0;
  border-radius: 4px;
  border: none;
  outline: none;
`;

export default Button;
