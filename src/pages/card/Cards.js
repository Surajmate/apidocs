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
              <h2 class="card__title">Encryption and Decryption</h2>
               <p class="card__description ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                in labore laudantium deserunt fugiat numquam.
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
              {/* <p class="card__description w-100">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                in labore laudantium deserunt fugiat numquam.
              </p> */}
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
              {/* <p class="card__description w-100">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                in labore laudantium deserunt fugiat numquam.
              </p> */}
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
              {/* <p class="card__description w-100">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
                in labore laudantium deserunt fugiat numquam.
              </p> */}
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default Cards;