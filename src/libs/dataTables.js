import $ from 'jquery';
import 'datatables.net'; // Core DataTables
import 'datatables.net-bs5'; // Bootstrap 5 DataTables
import 'datatables.net-bs5/css/dataTables.bootstrap5.css'; // Gaya Bootstrap 5

// Daftarkan jQuery ke global window
if (typeof window !== "undefined") {
  window.$ = $;
  window.jQuery = $;
}

export default function InitTable(selector, options = {}) {
  if (typeof window !== "undefined" && $(selector).length) {
    if ($.fn.DataTable.isDataTable(selector)) {
      $(selector).DataTable().destroy(); // Hancurkan instance sebelumnya
    }
    $(selector).DataTable(options); // Inisialisasi ulang DataTables
  }
}