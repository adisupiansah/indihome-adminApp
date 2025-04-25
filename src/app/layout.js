import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ProtectedLayout from "./ProtectedLayout";
import AuthListener from "@/components/AuthListener";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Admin",
  description: "Admin registrasi indihome",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <ProtectedLayout>
          <Sidebar />
          <AuthListener/>
          {children}
        </ProtectedLayout>
      </body>
    </html>
  );
}
