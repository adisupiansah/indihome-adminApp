import nodemailer from 'nodemailer';
import { db } from "@/libs/Firebase";
import { ref, get } from "firebase/database";
import { render } from '@react-email/render';
import IndiHomeEmailTemplate from '@/components/reactEmail/IndiHomeEmailTemplate';


export async function POST(req) {
  try {
    const { clientId, recipientEmail } = await req.json();

    // Ambil data klien dari Firebase
    const clientRef = ref(db, `clients/${clientId}`);
    const snapshot = await get(clientRef);
    if (!snapshot.exists()) {
      return new Response(JSON.stringify({ error: 'Client tidak ditemukan' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const clientData = snapshot.val();

    // Render template React ke HTML
    const htmlContent = await render(
      <IndiHomeEmailTemplate
        clientName={clientData.nama}
        paket={clientData.paket}
        fee={clientData.paketDetail.fee}
      />
    );

    // Konfigurasi Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'videografikadapter@gmail.com', // Alamat email pengirim
        pass: 'ugsr wqme rxgk ntbm', // Password atau app password
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // Konfigurasi email
    const mailOptions = {
      from: '"IndiHome Support" <videografikadapter@gmail.com>',
      to: recipientEmail,
      subject: 'Konfirmasi Pemesanan IndiHome - No. Order: ' + clientData.paket,
      html: htmlContent,
      headers: {
        'List-Unsubscribe': '<mailto:support@indihome.com?subject=Unsubscribe>',
        'X-Mailer': 'IndiHome Mail Service',
      },
    };

    // Kirim email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Gagal mengirim email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}