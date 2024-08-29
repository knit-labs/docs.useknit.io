import React, { useEffect } from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer__links}>
        <div className={styles.footer__links__group}>
          <h3>Products</h3>
          <p className={styles.footer__link}>
            <a href="https://www.useknit.io/#payment-gateway">
              Payment Gateway
            </a>
          </p>
          <p className={styles.footer__link}>
            <a href="https://www.useknit.io/#crypto-pos">Crypto P.O.S</a>
          </p>
          <p className={styles.footer__link}>
            <a href="https://www.useknit.io/#payment-link">Payment Link</a>
          </p>
          <p className={styles.footer__link}>
            <a href="https://www.useknit.io/#direct-debit">Direct Debit</a>
          </p>
          <p className={styles.footer__link}>
            <a href="https://www.useknit.io/#">
              Wallet as a Service (Request Access)
            </a>
          </p>
          <p className={styles.footer__link}>
            Banking as a Platform (Coming Soon)
          </p>
        </div>

        <div className={styles.footer__links__group}>
          <h3>Company</h3>
          <p className={styles.footer__link}>
            <a href="https://www.notion.so/Terms-Conditions-0b867bfd0ec243398dde03e79c50f4a7?pvs=4">
              Terms of Service
            </a>
          </p>
          <p className={styles.footer__link}>
            <a
              target="_blank"
              href="https://www.notion.so/Privacy-Security-a8fd95813e0043278b820ad28e33e202?pvs=4"
            >
              Privacy Policy
            </a>
          </p>
        </div>

        <div className={styles.footer__links__group}>
          <h3>Developers</h3>
          <p className={styles.footer__link}>
            <a target="_blank" rel="noreferrer" href="https://docs.useknit.io">
              API Documentation
            </a>
          </p>
        </div>
        {/* 
                  : "https://www.notion.so/For-Customers-fe4e7fd18862451db8c7bcbfef5c8a72?pvs=4"

         */}

        <div className={styles.footer__links__group}>
          <h3>Help</h3>
          <p className={styles.footer__link}>
            <a
              target="_blank"
              rel="noreferrer"
              href={
                "https://www.notion.so/For-Merchants-79e257e8959b4c8eb757ead6b7d3ebf3?pvs=4"
              }
            >
              Help & FAQs
            </a>
          </p>
        </div>

        <div className={styles.footer__links__group}>
          <h3>Contact</h3>
          <p>info@useknit.io</p>

          <p style={{ marginTop: ".7rem" }}>
            <b
              style={{
                fontWeight: "700",
                fontSize: ".9rem",
              }}
            >
              Knit Business Technologies Ltd.
            </b>
            <br />
            27 Old Gloucester Street, <br />
            London, United Kingdom, WC1N 3AX
          </p>
          <p style={{}}>
            <b
              style={{
                fontWeight: "700",
                fontSize: ".9rem",
                marginTop: ".5rem",
              }}
            >
              Knit Business Financial Services Ltd.
            </b>{" "}
            <br />
            3080 Yonge St <br />
            Toronto ON, M4N 3N1, Canada
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
