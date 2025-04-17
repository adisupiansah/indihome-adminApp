import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";

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
      <body className={`${poppins.variable} antialiased`} cz-shortcut-listen="true">{children}</body>
    </html>
  );
}
