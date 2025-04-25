import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "./Firebase";
import { useRouter } from "next/navigation";



export const useLogout = () => {

  const router = useRouter()
 
  const handleLogout = async () => {
    try {
      Swal.fire({
        title: "Apakah Anda Yakin ?",
        text: "Anda akan keluar dari aplikasi",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#72bf78",
        cancelButtonColor: "#c62e2e",
        confirmButtonText: "Ya, Keluar!",
        cancelButtonText: "Tidak",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await signOut(auth);
          router.push('/auth')
          sessionStorage.removeItem('user');
        }
      })
    } catch (error) {
        console.error("Error signing out: ", error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }
  };
  return { handleLogout };
};
