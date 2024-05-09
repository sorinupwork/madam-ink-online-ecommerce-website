import styled from 'styled-components';

import Footer from './Footer';
import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <LayoutStyled>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </LayoutStyled>
  );
};

export default Layout;

const LayoutStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
