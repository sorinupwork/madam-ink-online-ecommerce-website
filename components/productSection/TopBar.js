import styled from "styled-components";

const TopBar = (props) => {
  return (
    <TopBarStyled>
      <div className="sectionTitle">
        <div className="menuTitle">
          <h3>{props.title ? props.title : "Products"}</h3>
        </div>
      </div>
    </TopBarStyled>
  );
};

export default TopBar;

const TopBarStyled = styled.div`
  .sectionTitle {
    background-color: #004695;
    text-align: center;
    border-radius: 6px 6px 0 0;

    .menuTitle {
      h3 {
        color: #e9edf2;
        font-weight: 300;
        letter-spacing: 0.05rem;
        padding: 0.3rem 0;
      }
    }
  }
`;
