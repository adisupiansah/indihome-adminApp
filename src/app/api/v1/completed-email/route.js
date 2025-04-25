import nodemailer from 'nodemailer';
import { db } from '@/libs/Firebase';
import { ref, get } from 'firebase/database';
import IndiHomeComplete from '@/components/reactEmail/IndiHomeComplete';
import { render } from '@react-email/render';

export async function POST (req) {
    try {
        const { clientId, clientName, recipientEmail } = await req.json();

        const clientsRef = ref(db, `clients/${clientId}`)
        const snapshot = await get(clientsRef)

        if (!snapshot.exists()) {
            return new Response(JSON.stringify({error: 'CLients tidak di temukan'}), {
                status: 404,
                header: {'Content/Type' : 'application/json'}
            })
        }
        
        const clientData = snapshot.val()
        const htmlContent = await render(
            <IndiHomeComplete
                clientName={clientData.nama} 
            />
        )
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
            to: recipientEmail, 
            subject: 'Konfirmasi Pemesanan IndiHome',
            html: htmlContent,
        })

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
            headers: { 'Content-Type': 'application/json' },
        });
    }
}