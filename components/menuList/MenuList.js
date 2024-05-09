import { gql, GraphQLClient } from 'graphql-request';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ListItem from './ListItem';

const MenuList = () => {
  const [data, setData] = useState([]);
  const [menuHidden, setMenuHidden] = useState(true);

  useEffect(() => {
    async function getMenuItems() {
      const data = await hygraph.request(query);
      setData(data);
    }
    getMenuItems();
  }, []);

  const productsArr = Object.values(data);
  const productsListArr = Object.keys(data);

  function handleMenuOnClick() {
    setMenuHidden(!menuHidden);
  }

  const openMenuIcon = '/menu.svg';
  const closedMenuIcon = '/menu-close.svg';

  return (
    <MenuStyled>
      <div className="wrapper">
        <div className="sidebar">
          <div onClick={handleMenuOnClick} className="menuIcon">
            <Image
              src={menuHidden ? openMenuIcon : closedMenuIcon}
              height={22}
              width={39}
              alt={'menu'}
            />
          </div>
        </div>
        <div className={`menuLeft ${menuHidden ? 'hideMenu' : 'showMenu'}`}>
          <div className="menuSection">
            <div className="menuTitleSection">
              <div className="menuTitle">
                <div className="titleSection">
                  <h3>Products</h3>
                </div>
              </div>
            </div>

            <div>
              <Link href="/">
                <p>New & Promo products</p>
              </Link>
            </div>
            {productsListArr.map((item, idx) => {
              const spaced = item.replace('_', ' ');
              const listItemTitle =
                spaced.charAt(0).toUpperCase() + spaced.slice(1);
              return (
                <ListItem
                  key={idx}
                  itemDetails={productsArr[idx]}
                  itemTitle={listItemTitle}
                  rawTitle={item}
                />
              );
            })}

            <div className="bottomBar">
              <h3>Products ↑</h3>
            </div>
          </div>
        </div>
      </div>
    </MenuStyled>
  );
};

export default MenuList;

const hygraph = new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_API, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});

const query = gql`
  {
    phone_Cases {
      id
      title
      slug
    }
    tShirts {
      id
      title
      slug
    }
    cups {
      id
      title
      slug
    }
    clocks {
      id
      title
      slug
    }
    plates {
      id
      title
      slug
    }
    tablet_Cases {
      id
      title
      slug
    }
  }
`;

const MenuStyled = styled.div`
  .sidebar {
    .menuIcon {
      display: none;
      margin-top: 1.59rem;
      margin-left: 0.25rem;
      @media (max-width: 768px) {
        display: block;
        position: absolute;
        cursor: pointer;
      }
      @media (max-width: 480px) {
        margin-top: 1.55rem;
        margin-left: 0.2rem;
      }
      @media (max-width: 360px) {
        margin-top: 1.5rem;
        margin-left: 0.2rem;
      }
    }
  }

  .menuLeft {
    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .hideMenu {
      display: none;
    }
    .showMenu {
      display: block;
      position: absolute;
      z-index: 777;
      margin-top: 2.5rem;
    }
  }

  .menuSection {
    min-width: 14.5rem;
    max-width: 14.5rem;
    margin-bottom: 2rem;

    .menuTitleSection {
      .menuTitle {
        background-color: #004695;
        text-align: center;
        border-radius: 6px 6px 0 0;

        .titleSection {
          h3 {
            color: #e9edf2;
            font-weight: 400;
            letter-spacing: 0.05rem;
            padding: 0.3rem 0;
            margin-bottom: 0;
          }
        }
      }
    }

    p {
      padding: 0.2rem 0 0.2rem 0.8rem;
      border: solid 1px #d3dce5;
      background-color: #e9edf2;
      margin: 0;

      :hover {
        cursor: pointer;
        background-color: #c3ced9;
        border-color: #d1dfed;
      }
    }

    .bottomBar {
      background-color: #004695;
      text-align: center;
      border-radius: 0 0 6px 6px;

      h3 {
        color: #e9edf2;
        font-weight: 400;
        letter-spacing: 0.05rem;
        padding: 0.3rem 0;
        margin-bottom: 0;
        margin-top: 0;
      }
    }
  }
`;
