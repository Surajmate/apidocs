import React from 'react'
import "./Cards.css";
const Cards = () => {
  return (
    <>
      <div className="main-container-card">
        <article class="card">
          <img
            class="card__background"
            src="https://vidhilegalpolicy.in/wp-content/uploads/2021/12/encryption-security-infosec-illustration-getty-1.jpg"
            alt="dataImg"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
              <h2 class="card__title">Encryption & Decryption</h2>
               <p class="card__description ">
               Secure your data with industry-standard encryption and decryption mechanisms.
              </p> 
            </div>
          </div>
        </article>
        <article class="card">
          <img
            class="card__background"
            src="https://routemobile.b-cdn.net/wp-content/uploads/2020/03/Blog-icons-_Mobile-identity-is-a-new-face-for-Digital-authentication.svg"
            alt="dataImg"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
              <h2 class="card__title">Auth</h2>
              <p class="card__description w-100">
              Enable safe, token-based authentication and authorization for your applications.
              </p>
            </div>
          </div>
        </article>
        <article class="card">
          <img
            class="card__background"
            src="https://www.chicagoinstituteofbusiness.com/blog/sales.jpg"
            alt="dataImg"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
              <h2 class="card__title">Sales API</h2>
              <p class="card__description w-100">
              Access real-time data on bike models, availability, pricing, and dealer information.
              </p>
            </div>
          </div>
        </article>
        <article class="card">
          <img
            class="card__background"
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid&w=740"
            alt="dataImg"
            width="1920"
            height="2193"
          />
          <div class="card__content | flow">
            <div class="card__content--container | flow">
              <h2 class="card__title">Service API</h2>
              <p class="card__description w-100">
              Integrate service booking, maintenance history, and service center locators seamlessly.
              </p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default Cards;