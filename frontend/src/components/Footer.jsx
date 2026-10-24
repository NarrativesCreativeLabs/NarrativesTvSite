import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className='mb-20 w-full flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left'>
        <div>
          © 2026 Narratives Creative Lab. In the end, we are nothing but stories.
        </div>
        <div>
          <a href="mailto:Contact@narratives.tv">Contact@narratives.tv</a>
          {' · '}
          <a href="tel:+918341056554">+91 83410 56554</a>
          {' · '}
          <span>India · Worldwide</span>
        </div>

      </div>
      
    </footer>
  );
};

export default Footer;

