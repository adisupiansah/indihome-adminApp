import { db } from "@/libs/Firebase";
import { ref, get, remove, set } from "firebase/database";

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

    // Ambil data klien dari database clients
    const clientRef = ref(db, `clients/${clientId}`);
    const snapshot = await get(clientRef);

    if (!snapshot.exists()) {
      return new Response(
        JSON.stringify({ error: "Client tidak ditemukan" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const clientData = snapshot.val();

    // Pindahkan data ke database selesai dengan status success
    const completedRef = ref(db, `selesai/${clientId}`);
    await set(completedRef, {
      ...clientData,
      status: "success",
    });

    // Hapus data dari database clients
    await remove(clientRef);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error completing client:", error);
    return new Response(
      JSON.stringify({ error: "Failed to complete client" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}