import { db } from "@/libs/Firebase";
import { ref, remove } from "firebase/database";

export async function POST(req) {
  try {
    const { clientId } = await req.json();

    // Validasi clientId
    if (!clientId) {
      return new Response(JSON.stringify({ error: "Client ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hapus data dari Firebase
    const clientRef = ref(db, `clients/${clientId}`);
    await remove(clientRef);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete client" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}