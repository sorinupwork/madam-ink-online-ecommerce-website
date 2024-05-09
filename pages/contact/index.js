import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import Head from 'next/head';

import MenuList from '../../components/menuList/MenuList';
import TopBar from '../../components/productSection/TopBar';

const ContactPage = () => {
  const topBarTitle = 'Contact';

  const form = useRef();

  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID,
        process.env.NEXT_PUBLIC_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
        e.target.reset(),
        setSent(true),
        setTimeout(() => {
          setSent(false);
        }, 4000)
      );
  };
  return (
    <>
      <Head>
        <title>{topBarTitle}</title>
        <meta name="description" content="Contact details" />
      </Head>
      <ContactStyle>
        <MenuList />
        <div className="mainContactSection">
          <TopBar title={topBarTitle} />
          <div className="contactSection">
            <div className="sectionTitle">
              <h3>Contact Us</h3>
            </div>

            <div className="formAndInfo">
              <div className="formWrap">
                <form ref={form} onSubmit={sendEmail} className="theForm">
                  <p>
                    <label>Enter your Name</label>
                    <input
                      type="text"
                      name="user_name"
                      minLength={'3'}
                      required
                    />
                  </p>
                  <p>
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="user_email"
                      minLength={'7'}
                      required
                    />
                  </p>
                  <p>
                    <label>Message Subject</label>
                    <input
                      type="text"
                      name="user_subject"
                      minLength={'2'}
                      required
                    />
                  </p>
                  <p>
                    <label>Enter your Message</label>
                    <textarea
                      name="user_message"
                      minLength={'5'}
                      rows={'7'}
                      cols={'40'}
                    />
                  </p>
                  <div className="btn">
                    <button>Submit</button>
                    {sent && (
                      <span className="sentSpan">
                        Message sent successfully !
                      </span>
                    )}
                  </div>
                </form>
              </div>

              <div className="infoSection">
                <div className="infoCard">
                  <h4 className="cardHeadline">Contact Info</h4>
                  <hr />
                  <h4>
                    <span>Name: </span>Madam Ink
                  </h4>
                  <h4>
                    <span>Phone: </span>0040 724 825 785
                  </h4>
                  <h4>
                    <span>Email: </span>sorin.upwork@gmail.com
                  </h4>
                  <h4>
                    <span>Address: </span>Ploiesti, Romania,
                  </h4>
                  <h4>
                    <span>Location: </span>Blvd. Bucharest
                  </h4>
                </div>
              </div>
            </div>

            <div className="mapSection">
              <div className="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2825.3775925524938!2d26.03297677634253!3d44.9156562698708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b249d88b31b8d5%3A0x884fcde97d11b8c5!2sBulevardul%20Bucure%C8%99ti%2C%20Ploie%C8%99ti!5e0!3m2!1sen!2sro!4v1688673389165!5m2!1sen!2sro"
                  width="600"
                  height="450"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </ContactStyle>
    </>
  );
};

export default ContactPage;

const ContactStyle = styled.div`
  /* background-color: lightblue; */
  display: flex;
  padding: 0 10%;
  gap: 5%;
  @media (max-width: 1440px) {
    padding: 0 5%;
  }
  @media (max-width: 768px) {
    gap: 0;
  }
  .mainContactSection {
    width: 100%;
    .contactSection {
      padding: 0;
      padding: 0 10%;
      display: flex;
      flex-direction: column;
      @media (max-width: 1600px) {
        padding: 0 5%;
      }
      @media (max-width: 1440px) {
        padding: 0 3%;
      }
      @media (max-width: 1280px) {
        padding: 0;
      }
      .sectionTitle {
        text-align: center;
        h3 {
          font-size: 1.25rem;
          letter-spacing: 0.05rem;
        }
      }
    }
    .infoSection {
      flex: 5;
      .infoCard {
        background-color: #e9edf2;
        border: solid 1px #c3ced9;
        border-radius: 4px;
        padding: 0 1rem;
        margin: 1.5rem 0.5rem;
        h4 {
          color: #3f6795;
          margin: 1.23rem 0;
        }
        span {
          color: #7c90a6;
        }
        hr {
          border: 0;
          height: 1px;
          background: #c3ced9;
        }
        .cardHeadline {
          text-align: center;
          margin: 0.8rem 0;
        }
      }
    }
    .mapSection {
      padding: 0 5%;
      margin-bottom: 3rem;
      @media (max-width: 1024px) {
        padding: 0 1%;
      }
      .map {
        overflow: hidden;
        padding-bottom: 60%;
        position: relative;
        height: 0;
      }
      .map iframe {
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        position: absolute;
      }
    }
    .formAndInfo {
      display: flex;
      padding: 0 4%;
      gap: 9%;
      margin-bottom: 2rem;
      @media (max-width: 1024px) {
        padding: 0;
      }
      @media (max-width: 590px) {
        flex-direction: column;
      }
      .formWrap {
        flex: 8;
        padding: 0 0.5rem;
        .theForm {
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .sentSpan {
            color: #19a695;
            margin-left: 0.5rem;
          }
          label {
            display: block;
            margin-bottom: 0.2em;
            margin-left: 0.5rem;
          }
          p {
            width: 100%;
            margin-bottom: 0;
            :first-of-type {
              margin-top: 0;
            }
            input:-webkit-autofill,
            input:-webkit-autofill:hover,
            input:-webkit-autofill:focus,
            textarea:-webkit-autofill,
            textarea:-webkit-autofill:hover,
            textarea:-webkit-autofill:focus,
            select:-webkit-autofill,
            select:-webkit-autofill:hover,
            select:-webkit-autofill:focus {
              -webkit-text-fill-color: #3f6795;
              transition: background-color 5000s ease-in-out 0s;
            }
            input,
            textarea {
              color: #3f6795;
              background-color: #e9edf2;
              width: 100%;
              border-radius: 4px;
              border: solid 1px #c3ced9;
              letter-spacing: 0.04rem;
              :focus {
                outline: none !important;
                border: 1px solid #7c90a6;
                box-shadow: 0px 4px 7px -2px rgba(113, 158, 206, 0.49);
                -webkit-box-shadow: 0px 4px 7px -2px rgba(113, 158, 206, 0.49);
                -moz-box-shadow: 0px 4px 7px -2px rgba(113, 158, 206, 0.49);
              }
            }
            input {
              height: 2rem;
            }
          }
          .btn {
            margin: 0.75rem 0 1rem 0;
            align-self: flex-start;
            button {
              padding: 0.6rem 1.5rem;
              letter-spacing: 0.15rem;
            }
          }
        }
      }
    }
  }
`;
