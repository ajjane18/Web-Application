import React from 'react';
import '../css/index.css';

export default function Home() {
  return (
    <header>
      <h1 id = 'home-h1'>Welcome to the Krispy Kreme app!</h1>
      <div className='Christmas-sec'>
        <h2 id = 'home-h2'>Christmas Deals</h2>
        <h3 id = 'home-xmas-h3'>Coming Soon a Christmas feel, don't be late or you'll miss the deal!!</h3>
        <div className='home-Christmas-deals'>
          <img src='/images/ChristmasDealB1.jpg' alt='Christmas Deal 1' />
          <img src='/images/ChristmasDonutsDisplayed.jpg' alt='Christmas Donuts Displayed' />
          <img src='/images/ChristmasDealB2.jpg' alt='Christmas Deal 2' />
        </div>
      </div>

      <br/>
      <div className='boxDeal-sec'>
        <h2 id = 'home-h2'>Dozen Box Deals</h2>
        <div className='Dozendeal'>
          <img src='/images/DozenDeals.jpg' alt='Dozen Assorted Box deal' />
          <img src='/images/DozenGDeal.png' alt='Dozen Glazed Box deal' />
        </div>
      </div>

      <br/>
      <div className='deals1-sec'>
        <h2 id = 'home-h2'>Deals</h2>
        <div className='deals1'>
          <img src='/images/cook&kremeS.png' alt='Cookies and Kreme single donut' />
          <img src='/images/lotusBiscoff.png' alt='Lotus Biscoff Donuts' />
          <img src='/images/strawberryDonut.png' alt='Strawberry donut' />
        </div>
      </div>
    </header>
  );
}
