import nodemailer from 'nodemailer';
import { db } from "@/libs/Firebase";
import { ref, get } from "firebase/database";

export async function POST(req) {
  try {
    const { clientId, recipientEmail } = await req.json();

    // Ambil data klien dari Firebase
    const clientRef = ref(db, `clients/${clientId}`);
    const snapshot = await get(clientRef);
    if (!snapshot.exists()) {
      return new Response(JSON.stringify({ error: 'Client not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const clientData = snapshot.val();
    const message = `OKE CLEAR`;

    // Konfigurasi Nodemailer
    const transporter = nodemailer.createTransport({
     service: 'gmail',
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'videografikadapter@gmail.com', // Alamat email pengirim
        pass: 'ugsr wqme rxgk ntbm', // Password atau app password
      },
    });

    // Kirim email
    await transporter.sendMail({
      from: '"IndiHome Support" <videografikadapter@gmail.com>', // Alamat email pengirim
      to: recipientEmail, // Alamat email penerima
      subject: 'Konfirmasi Pemesanan IndiHome',
      text: message,
      html: `<p>${message}</p>`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}