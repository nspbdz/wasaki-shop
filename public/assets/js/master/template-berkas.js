$(function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });

  var src = $("#logo_kai").attr("src");
  var $white = "#fff";

  var url = $("#table_berkas").data("url");
  var table = $("#table_berkas").DataTable({
    processing: true,
    serverSide: true,
    bFilter: false,
    language: {
      sEmptyTable: "Tidak ada data yang tersedia pada tabel ini",
      sProcessing: "Sedang memproses...",
      sLengthMenu: "Tampilkan data _MENU_",
      sZeroRecords: "Tidak ditemukan data yang sesuai",
      sInfo: "_START_ - _END_ dari _TOTAL_",
      sInfoEmpty: "0 - 0 dari 0",
      sInfoFiltered: "(disaring dari _MAX_ data keseluruhan)",
      sInfoPostFix: "",
      sSearch: "",
      searchPlaceholder: "Cari",
      sUrl: "",
      oPaginate: {
        sFirst: "pertama",
        sPrevious: "sebelumnya",
        sNext: "selanjutnya",
        sLast: "terakhir",
      },
    },
    ajax: {
      url: url,
    },
    columns: [
      {
        data: "DT_RowIndex",
        name: "DT_RowIndex",
        orderable: false,
        searchable: false,
        className: "text-center",
      },
      {
        data: "action",
        name: "action",
        orderable: false,
        searchable: false,
        className: "text-center",
      },
      {
        data: "nama_template",
        name: "nama_template",
      },
    ],
  });
});
