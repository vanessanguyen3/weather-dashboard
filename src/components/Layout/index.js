import styled from 'styled-components';

const Topbar = styled.div`
  height: 80px;
  background-color: ${(props) => props.theme.colors.blue};
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: white;
`;

const LayoutContent = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
`;

const Layout = (props) => (
  <>
    <Topbar>
      <h1>Weather Dashboard</h1>
    </Topbar>
    <LayoutContent {...props} />
  </>
);

export default Layout;
