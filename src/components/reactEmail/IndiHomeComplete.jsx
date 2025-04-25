import React from "react";
import { Html, Body, Head, Heading, Hr, Section, Text, Link, Img } from '@react-email/components';


const IndiHomeComplete = ({ clientName }) => {
  const logo = 'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01h528ms7qphj2ybv6n7x60qnr.jpg'
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Section style={container}>
          <Img src={logo} alt="Logo IndiHome" style={logoStyle} />
          <Heading style={heading}>Halo {clientName},</Heading>
          <Text style={paragraph}>
            Proses Instalasi IndiHome Anda telah selesai. Terima kasih telah memilih IndiHome sebagai penyedia layanan internet Anda.
          </Text>

        </Section>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: '20px',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0,0,0,.05)',
};

const logoStyle = {
// logo berada di tengah
  display: 'block',
  margin: '0 auto',
  marginBottom: '10px',
  width: '100%',
  maxWidth: '170px',
  height: 'auto',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#2c3e50',
  marginBottom: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#3d4852',
  marginBottom: '15px',
  textAlign: 'justify',
};


export default IndiHomeComplete;
