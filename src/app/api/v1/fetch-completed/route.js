import { db } from "@/libs/Firebase";
import { ref, get } from 'firebase/database'

export async function GET () {
    try {
        const dataRef = ref(db, '/selesai')
        // mengambil data
        const data = await get(dataRef)

        if (data.exists() ) {
            const dataObject = data.val()

            // konversi object ke array
            const dataArray = Object.keys(dataObject).map(key => ({
                id: key,
                ...dataObject[key]
            }))

            // tampilkan data berdasarkan createdAt secara descending
            dataArray.sort((a, b) => new Date(b.tanggalDaftar) - new Date(a.tanggalDaftar))
            
            return new Response(JSON.stringify(dataArray), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        } else {
            return new Response(JSON.stringify(JSON.stringify([])), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }

    } catch (error) {
        console.error('Error di backend', error);
        return new Response(JSON.stringify({ message: 'Terjadi kesalahan di backend' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}