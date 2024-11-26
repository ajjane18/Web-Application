import React from 'react';
import '../css/index.css';

export default function Home() {
  return (
    <header>
      <h1>Welcome to the Krispy Kreme app!</h1>
      <div className='Christmas-sec'>
        <h2>Christmas Deals</h2>
        <div className='home-Christmas-deals'>
          <img src='/images/ChristmasDealB1.jpg' alt='Christmas Deal 1' />
          <img src='/images/ChristmasDonutsDisplayed.jpg' alt='Christmas Donuts Displayed' />
          <img src='/images/ChristmasDealB2.jpg' alt='Christmas Deal 2' />
        </div>
      </div>

      <br/>
      <div className='boxDeal-sec'>
        <h2>Dozen Box Deals</h2>
        <div className='Dozendeal'>
          <img src='/images/DozenDeals.jpg' alt='Dozen Assorted Box deal' />
          <img src='/images/DozenGDeal.png' alt='Dozen Glazed Box deal' />
        </div>
      </div>

      <br/>
      <div className='deals1-sec'>
        <h2>Deals</h2>
        <div className='deals1'>
          <img src='/images/cook&kremeS.png' alt='Cookies and Kreme single donut' />
          <img src='/images/lotusBiscoff.png' alt='Lotus Biscoff Donuts' />
          <img src='/images/strawberryDonut.png' alt='Strawberry donut' />
        </div>
      </div>
      
      <section className='Home-signup'>
        <h3>Not Signed In Yet? Click the link below!</h3>
        {/* Signup/Register link*/}
        <a href = '/smallapp/register.js'>Register</a>
        </section> 
         
        <footer className="footer">
        <p>Follow Krispy Kremes social media or more updates!</p>
        {/* Social Media Icons */}
        <div className="social-media">
          <a href='https://www.instagram.com/KrispyKreme/' className="Instagram">
            <img src='/images/soc/insta.png' alt='Instagram' />
          </a>
          <a href='https://x.com/krispykreme' className="Twitter">
            <img src='/images/soc/Twitter.png' alt='Twitter' />
          </a>
          <a href='https://www.tiktok.com/@krispykreme' className="Tiktok">
            <img src='/images/soc/tiktok.jpg' alt='Tiktok' />
          </a>
        </div>
      </footer>

    </header>
  );
}
