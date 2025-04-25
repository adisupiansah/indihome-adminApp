"use clients";
import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { FaWhatsapp, FaWrench } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { InisialisasiTable } from "@/libs/insialisasiTable";
import { formatPaketDetail } from "@/libs/tooltipDetailPaket";
import Swal from "sweetalert2";

const Clients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFetchData = async () => {
    try {
      const response = await fetch("/api/v1/fetch", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }

      const result = await response.json();
      // Validasi hasil dari backend
      if (!Array.isArray(result)) {
        setData([]); // Tetapkan data sebagai array kosong
        return;
      }

      setData(result);
     
    } catch (error) {
      console.error("Gagal mengambil data", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    if (!loading && data.length > 0) {
      const timeout = setTimeout(() => {
        InisialisasiTable();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-[40vh]">
        <div className="loader"></div>
      </div>
    );
  }

  const sendEmail = async (clientId, recipientEmail) => {
    try {
      const response = await fetch("/api/v1/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId, recipientEmail }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim email");
      }

      const result = await response.json();

      // update status
      await fetch("api/v1/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId, newStatus: "Process" }),
      });

      Swal.fire({
        title: "Berhasil",
        text: "Email berhasil dikirim",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          handleFetchData(); // Refresh data after sending email
        }
      });
    } catch (error) {
      console.error("Gagal mengirim email:", error.message);
    }
  };

  const formatNumber = (number) => {
    if (number.startsWith("0")) {
      return "62" + number.slice(1);
    }
    return number;
  };

  const sendWhatsApp = (phoneNumber, name, paketDetail, alamat) => {
    const formatedNumber = formatNumber(phoneNumber);
    const message = `
    *Halo ${name}*,
    Terima kasih telah berlangganan dengan IndiHome. Berikut detail paket yang Anda pilih:
    - Title: ${paketDetail.title}
    - Sub Title: ${paketDetail.subTitle}
    - Harga: Rp ${paketDetail.harga}
    - Biaya Pemasangan: Rp ${paketDetail.fee || 0}
    - Keterangan: ${paketDetail.ket}
    - Alamat: ${alamat}

    Jika Anda memiliki pertanyaan atau memerlukan bantuan lebih lanjut, jangan ragu untuk menghubungi kami.
    Segera konfirmasi alamat agar Teknisi kami segera ke Alamat Anda untuk melakukan Instalasi.

    Terima Kasih
  `;
    const encodedMessage = encodeURIComponent(message.trim());
    const url = `https://wa.me/${formatedNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
  };

  const handleDelete = async (clientId) => {
    try {
      // Tampilkan konfirmasi
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data yang dihapus tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      // Jika pengguna membatalkan, hentikan proses
      if (!result.isConfirmed) {
        return;
      }

      // Panggil endpoint untuk menghapus data
      const response = await fetch("/api/v1/delete-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId }),
      });

      // Tangani error jika penghapusan gagal
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menghapus data");
      }

      Swal.fire({
        title: "Berhasil!",
        text: "Data klien berhasil dihapus.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Perbarui state lokal dengan menghapus data yang dihapus
        setData((prevData) => prevData.filter((item) => item.id !== clientId));
      });
    } catch (error) {
      console.error("Error deleting client:", error.message);
      Swal.fire({
        title: "Gagal!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const sendHandleSelesai = async (clientId, recipientEmail, clientName) => {
    try {
      // Kirim email notifikasi
      const responseEmail = await fetch("/api/v1/completed-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId,
          recipientEmail,
          clientName,
        }),
      });

      if (!responseEmail.ok) {
        throw new Error("Gagal mengirim email");
      }

      // Pindahkan data ke database selesai
      const responseComplete = await fetch("/api/v1/completed-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId }),
      });

      if (!responseComplete.ok) {
        const errorData = await responseComplete.json();
        throw new Error(errorData.error || "Gagal memindahkan data");
      }

      // Tampilkan notifikasi sukses
      Swal.fire({
        title: "Berhasil!",
        text: "Data klien berhasil dipindahkan ke selesai.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        // Perbarui state lokal
        setData((prevData) => prevData.filter((item) => item.id !== clientId));
      });
    } catch (error) {
      console.error("Error completing client:", error.message);
      Swal.fire({
        title: "Gagal!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="clients">
      <div className="container-fluid">
        <h5 className="card-title">Pengajuan Clients</h5>
        <div className="row">
          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table
                    className="table table-striped table-bordered"
                    id="example"
                  >
                    <thead>
                      <tr>
                        <th className="text-center">No</th>
                        <th className="text-center">Nama</th>
                        <th className="text-center">alamat</th>
                        <th className="text-center">No WhatsApp</th>
                        <th className="text-center">Paket</th>
                        <th className="text-center">Tanggal Daftar</th>
                        <th className="text-center">Harga</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.length > 0 ? (
                        data.map((item, index) => {
                          const utcDate = new Date(item.tanggalDaftar);
                          const waktuJakarta = moment(utcDate)
                            .tz("Asia/Jakarta")
                            .format("DD-MM-YYYY - HH:mm:ss");
                          return (
                            <tr key={item.id}>
                              <td className="text-center">{index + 1}</td>
                              <td className="text-center">{item.nama}</td>
                              <td className="text-center">{item.alamat}</td>
                              <td className="text-center">{item.nowa}</td>
                              <td
                                className="text-center cursor-pointer td-hover"
                                data-tooltip-id="my-tooltip"
                                data-tooltip-html={formatPaketDetail(
                                  item.paketDetail
                                )}
                                data-tooltip-place="top"
                              >
                                {item.paket}
                                <Tooltip id="my-tooltip" />
                              </td>
                              <td className="text-center">{waktuJakarta}</td>
                              <td className="text-center">{item.totalBiaya}</td>
                              <td>
                                <div
                                  className={`p-1 rounded-sm text-center text-white ${
                                    item.status === "pending"
                                      ? "bg-red-400"
                                      : item.status === "Process"
                                      ? "bg-blue-400"
                                      : "bg-green-400"
                                  }`}
                                >
                                  {item.status}
                                </div>
                              </td>
                              <td>
                                <div className="flex justify-center items-center gap-2">
                                  <span
                                    className="bg-green-400 hover:bg-green-500 p-1 text-white rounded-md cursor-pointer"
                                    onClick={() =>
                                      sendWhatsApp(
                                        item.nowa,
                                        item.nama,
                                        item.paketDetail,
                                        item.alamat
                                      )
                                    }
                                  >
                                    <FaWhatsapp size={21} />
                                  </span>
                                  <span
                                    className="bg-red-500 hover:bg-red-600 p-1 text-white rounded-md cursor-pointer"
                                    onClick={() =>
                                      sendEmail(item.id, item.email)
                                    }
                                  >
                                    <MdOutlineMail size={21} />
                                  </span>
                                  <span
                                    className="bg-green-700 hover:bg-green-800 p-1 text-white rounded-md cursor-pointer"
                                    onClick={() =>
                                      sendHandleSelesai(
                                        item.id,
                                        item.email,
                                        item.nama
                                      )
                                    }
                                  >
                                    <FaCheck size={20} />
                                  </span>
                                  <span
                                    className="bg-red-700 hover:bg-red-800 p-1 text-white rounded-md cursor-pointer"
                                    onClick={() => handleDelete(item.id)}
                                  >
                                    <IoTrashBin size={20} />
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center py-4">
                            Tidak ada data yang tersedia.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
