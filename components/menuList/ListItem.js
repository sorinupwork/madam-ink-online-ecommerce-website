import Link from "next/link";
import styled from "styled-components";

const ListItem = (props) => {
  const { itemTitle, rawTitle } = props;
  return (
    <StyledItem>
      <div className="menuSubmenu">
        <div className="noBrandItem">
          <Link href={`/products/all/${rawTitle}`}>
            <p>{itemTitle}</p>
          </Link>
        </div>
      </div>
    </StyledItem>
  );
};

export default ListItem;

const StyledItem = styled.div``;
