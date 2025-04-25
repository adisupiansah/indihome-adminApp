"use clients";
import React, { useEffect, useState } from "react";
import { InisialisasiTable } from "@/libs/insialisasiTable";
import { IoTrashBin } from "react-icons/io5";
import { Tooltip } from "react-tooltip";
import { formatPaketDetail } from "@/libs/tooltipDetailPaket";
import Swal from "sweetalert2";
const Completed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFetchData = async () => {
    try {
      const response = await fetch("/api/v1/fetch-completed", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      // Validasi hasil dari backend
      if (!Array.isArray(result)) {
        setData([]); // Tetapkan data sebagai array kosong
        return;
      }

      setData(result);
    } catch (error) {
      console.error("Terjadi error di fron end", error);
    } finally {
      setLoading(false);
    }
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
      const response = await fetch("/api/v1/delete-completed", {
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
      }).then((result) => {
        if (result.isConfirmed){
          window.location.href = '/selesai'
        }
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

  return (
    <div className="Completed">
      <div className="container-fluid">
        <h5 className="card-title">Completed</h5>
        <div className="row">
          <div className="col-md-12 mt-3">
            <div className="card">
              <div className="card-body">
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
                      <th className="text-center">Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.length > 0 ? (
                      data.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center">{item.nama}</td>
                            <td className="text-center">{item.alamat}</td>
                            <td className="text-center">{item.nowa}</td>
                            <td
                              className="text-center cursor-pointer"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-place="top"
                              data-tooltip-html={formatPaketDetail(
                                item.paketDetail
                              )}
                            >
                              {item.paket}
                              <Tooltip id="my-tooltip" />
                            </td>
                            <td className="text-center">
                              <div className="flex justify-center items-center p-1 bg-green-300 rounded-sm text-black">
                                {item.status}
                              </div>
                            </td>
                            <td className="flex justify-center items-center">
                              <div
                                className="cursor-pointer flex justify-center items-center p-1 bg-red-500 rounded-sm text-white col-md-6"
                                onClick={() => handleDelete(item.id)}
                              >
                                <IoTrashBin size={22} />
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          Tidak ada data untuk ditampilkan
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
  );
};

export default Completed;
