import { db } from "@/libs/Firebase";
import { ref, update } from "firebase/database";

export async function POST(req) {
  try {
    const { clientId, newStatus } = await req.json();

    // Perbarui status di Firebase
    const clientRef = ref(db, `clients/${clientId}`);
    await update(clientRef, { status: newStatus });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating status:', error);
    return new Response(JSON.stringify({ error: 'Failed to update status' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}