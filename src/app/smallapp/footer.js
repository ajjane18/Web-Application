// 'use client' directive for React components in a client-side environment
'use client';

// Importing necessary modules from 'react' and '@mui/material'
import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';

// Defining the Footer component
const Footer = () => {

  return (
    <Container>
      <section className='Home-signup'>
        <h3 id='home-h3'>Not Signed In Yet?</h3>
        {/* Link to the registration page */}
        <a id='home-Register' href='../smallapp/register'>Register Here!</a>
      </section>

      <footer className="footer">
        <div className='con-foot'>
          <p id='home-p'>Follow Krispy Kremes social media for more updates!</p>
          <div className="social-media">
            {/* Social media links */}
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
        </div>
      </footer>
    </Container>
  );
};

// Exporting the Footer component as the default export
export default Footer;
