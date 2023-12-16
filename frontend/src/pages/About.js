import React from 'react';
import BreadCrum from '../components/BreadCrum';
import Meta from '../components/Meta';

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const h2Style = {
  fontSize: '1.2rem', // Adjust the font size as needed
};

const pStyle = {
  fontSize: '1rem', // Adjust the font size as needed
};

const About = () => {
  return (
    <>
      <Meta title={"About Us"} />
      <BreadCrum title="About Us" />

      <section style={sectionStyle}>
        <h1>Welcome to Shreedev Jewels</h1>
        <p style={pStyle}>
          Shreedev Jewels is your premier B2B jewelry supplier. We take pride in offering an exquisite range of meticulously crafted jewelry pieces designed to meet the needs of retailers, wholesalers, and businesses. Our commitment to quality, craftsmanship, and exceptional service sets us apart in the jewelry industry.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Our Story</h2>
        <p style={pStyle}>
          Share the story behind Shreedev Jewels, including its origins, inspirations, and the journey that led to its creation.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2 style={h2Style}>Our Jewelry Collections</h2>
        <p style={pStyle}>
          Explore our extensive range of jewelry collections, including fine jewelry, vintage pieces, and more. Each piece is a testament to our commitment to craftsmanship and elegance.
        </p>
      </section>

      {/* You can add more sections and adjust the styles as needed. */}
    </>
  );
}

export default About;
