import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const login = () => {
  return (
    <>
      <Head>
        <title>{'Login Page'}</title>
        <meta name="description" content="Login Page details" />
      </Head>
      <StyledInformation>
        <div className="formWrapper">
          <div className="topbarSection">
            <div className="columnTitle">
              <h3>Please confirm</h3>
            </div>
          </div>

          <div className="backColor">
            <div className="message">
              <h3>By signing up, you agree to our</h3>
              <h3>policy of terms and conditions.</h3>
            </div>
            <hr />
          </div>

          <div className="buttons">
            <div className="btn">
              <button>
                <Link href={'/api/auth/login'}>Yes, login</Link>
              </button>
            </div>
            <div className="btn no">
              <button>
                <Link href={'/'}>No, go back</Link>
              </button>
            </div>
          </div>
        </div>
      </StyledInformation>
    </>
  );
};

export default login;

const StyledInformation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .formWrapper {
    margin-top: 10vh;
    text-align: center;
    width: auto;
    border-radius: 5px;
    .topbarSection {
      background-color: #004595;
      border-radius: 6px 6px 0 0;
      .columnTitle {
        h3 {
          color: #e9edf2;
          margin: 0;
          padding: 0.42rem 0;
          font-weight: 400;
          text-align: center;
        }
      }
    }
    .backColor {
      background-color: #d1dfed;
      .message {
        margin: 0 1rem;
        h3 {
          margin: 0;
          padding: 1.17rem;
          :first-child {
            padding-bottom: 0;
          }
        }
      }
      hr {
        border-top: 1px solid #7c90a6;
      }
    }
    .buttons {
      margin-top: 1.245rem;
      display: flex;
      justify-content: space-between;
      .no {
        button {
          background-color: #e05539;
        }
        button:hover {
          background-color: #ff6a4d;
        }
      }
    }
  }
`;
