import React from "react";
import { Html, Body, Head, Heading, Hr, Section, Text, Link, Img } from '@react-email/components';


const IndiHomeEmailTemplate = ({ clientName, paket, fee }) => {
  const logo = 'https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01h528ms7qphj2ybv6n7x60qnr.jpg'
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Section style={container}>
          <Img src={logo} alt="Logo IndiHome" style={logoStyle} />
          <Heading style={heading}>Halo {clientName},</Heading>
          <Text style={paragraph}>
            Terima kasih telah berlangganan IndiHome!
          </Text>

          <Text style={total} className="text-center text-green-400 text-xl font-semibold">
            Total biaya pemasangan Rp {fee}
          </Text>

          <Text style={paragraph}>
            Teknisi kami akan segera menghubungi Anda untuk proses instalasi.
          </Text>

          <Hr style={divider} />

          <Heading style={subHeading}>Detail Kontak Teknisi:</Heading>
          <Text style={paragraph}>
            Nama: Tim Teknisi IndiHome<br />
            WhatsApp:{' '}
            <Link href="https://wa.me/6281275669055" style={link}>
              0812 7566 9055
            </Link>
          </Text>

          <Hr style={divider} />

          <Text style={footer}>
            Hormat kami,<br />
            <strong>Tim IndiHome</strong>
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

const subHeading = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#2c3e50',
  marginTop: '20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#3d4852',
  marginBottom: '15px',
};

const total = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#FF0025',
  textAlign: 'center',
}

const link = {
  color: '#3182ce',
  textDecoration: 'underline',
};

const divider = {
  borderColor: '#e8e8e8',
  margin: '20px 0',
};

const footer = {
  fontSize: '14px',
  color: '#74858d',
  marginTop: '20px',
};

export default IndiHomeEmailTemplate;
