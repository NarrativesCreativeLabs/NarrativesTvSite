import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className='mb-20 w-full flex items-center justify-between'>
        <div>
          © 2026 Narratives Creative Lab. In the end, we are nothing but stories.
        </div>
        <div>
          <a href="https://twitter.com/narratives_tv" target="_blank" rel="noreferrer">Twitter</a>
          {' · '}
          <a href="https://instagram.com/narratives_tv" target="_blank" rel="noreferrer">Instagram</a>
          {' · '}
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>

      </div>
      
    </footer>
  );
};

export default Footer;
