export const formatPaketDetail = (detail) => {
    return `
      <div class='text-start'>Title: ${detail.title}<div/>
      <div class='text-start'>Sub title: ${detail.subTitle}<div/>
      <div class='text-start'>Harga: ${detail.harga}<div/>
      <div class='text-start'>Pemasangan: ${detail.fee}<div/>
      <div class='text-start'>Keterangan: ${detail.ket}<div/>
      
    `;
  };