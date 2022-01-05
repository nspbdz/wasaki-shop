$(function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });

  var src = $("#logo_kai").attr("src");
  var $white = "#fff";

  var btnBackURL = $("#table_penyaluran").data("backurl");

  // INISIALISASI SELECT2
  var bank = $("#bank_select");
  bank.select2({
    placeholder: "Pilih Bank",
  });

  var nama_program = $("#nama_program_select");
  nama_program.select2({
    placeholder: "Pilih Nama Program",
  });

  var pilar_sdg = $("#pilar_sdg_select");
  pilar_sdg.select2({
    placeholder: "Pilih Pilar SDG",
  });

  var tujuan_global = $("#tujuan_global_select");
  tujuan_global.select2({
    placeholder: "Pilih Tujuan Global",
  });

  var sasaran_global = $("#sasaran_global_select");
  sasaran_global.select2({
    placeholder: "Pilih Sasaran Global",
  });

  var area_search = $("#area_search");
  area_search.select2({
    placeholder: "Pilih Area",
  });

  var kode_sektor = $("#kode_sektor_select");
  kode_sektor.select2({
    placeholder: "Pilih Sektor",
  });

  var kota = $("#kota_select");
  kota.select2({
    placeholder: "Pilih Kota",
  });

  var kecamatan = $("#kecamatan_select");
  kecamatan.select2({
    placeholder: "Pilih Kecamatan",
  });

  var kelurahan = $("#kelurahan_select");
  kelurahan.select2({
    placeholder: "Pilih Kelurahan",
  });

  var provinsi = $("#provinsi_select");
  provinsi.select2({
    placeholder: "Pilih Provinsi",
  });

  var rekening = $("#rekening_select");
  rekening.select2({
    placeholder: "Pilih Rekening",
  });

  var area = $("#area_select");
  area.select2({
    placeholder: "Pilih Area",
  });

  // Tujuan global -> Sasaran global
  sasaran_global.attr("disabled", "disabled");
  tujuan_global.on("change", function () {
    sasaran_global.attr("disabled", "disabled");
    var id = $(this).val();
    var tujuan_select = {};
    tujuan_select["id"] = id;

    $.ajax({
      data: JSON.parse(JSON.stringify(tujuan_select)),
      url: tujuan_global.data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        sasaran_global.empty();

        $.each(data, function (id, value) {
          sasaran_global.prop("disabled", false);
          sasaran_global.append(
            "<option></option>",
            '<option value=" ' +
              value.id +
              '">' +
              value.kode_sasaran_global +
              " - " +
              value.nama_sasaran_global +
              "</option>"
          );
        });
      },
      error: function (data) {
        console.log("gagal");
      },
    });
  });

  // Sasaran global -> Kode Sektor
  // kode_sektor.attr("disabled", "disabled");
  sasaran_global.on("change", function () {
    kode_sektor.attr("disabled", "disabled");
    var id = $(this).val();
    var sasaran_select = {};
    sasaran_select["id"] = id;

    $.ajax({
      data: JSON.parse(JSON.stringify(sasaran_select)),
      url: sasaran_global.data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        kode_sektor.empty();

        $.each(data, function (id, value) {
          kode_sektor.prop("disabled", false);
          kode_sektor.append(
            "<option></option>",
            '<option value=" ' +
              value.id +
              '" data-sasaran="' +
              value.sasaran_nasional +
              '" data-nama="' +
              value.nama_sektor +
              '">' +
              value.kode_sektor +
              "</option>"
          );
        });
      },
      error: function (data) {
        console.log("gagal");
      },
    });
  });

  // Update form select kode sektor
  kode_sektor.change(function () {
    var sasaranNasional = kode_sektor.find(":selected").data("sasaran");
    console.log("sasaran nasional nih ", sasaranNasional);
    $("#sasaran_nasional_input").val(sasaranNasional);

    var namaSektor = kode_sektor.find(":selected").data("nama");
    $("#nama_sektor_input").val(namaSektor);
  });

  // Provinsi -> Kota
  provinsi.on("change", function () {
    kota.attr("disabled", "disabled");
    var id = $(this).val();
    var provinsi_select = {};
    provinsi_select["id"] = id;

    $.ajax({
      data: JSON.parse(JSON.stringify(provinsi_select)),
      url: provinsi.data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        // Kota
        kota.empty();

        $.each(data, function (id, value) {
          kota.prop("disabled", false);
          kota.append(
            "<option></option>",
            '<option value=" ' +
              value.id +
              '">' +
              value.kode_kota_kab +
              " - " +
              value.nama_kota_kab +
              "</option>"
          );
        });
      },
      error: function (data) {
        console.log("gagal");
      },
    });
  });

  // Kota -> Kecamatan
  kota.on("change", function () {
    kecamatan.attr("disabled", "disabled");
    var id = $(this).val();
    var kota_select = {};
    kota_select["id"] = id;

    $.ajax({
      data: JSON.parse(JSON.stringify(kota_select)),
      url: kota.data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        $.each(data, function (id, value) {
          kecamatan.prop("disabled", false);
          kecamatan.append(
            "<option></option>",
            '<option value=" ' +
              value.id +
              '">' +
              value.kode_kecamatan +
              " - " +
              value.nama_kecamatan +
              "</option>"
          );
        });
      },
      error: function (data) {
        console.log("gagal");
      },
    });
  });

  // Kecamatan -> Kelurahan
  kecamatan.on("change", function () {
    kelurahan.attr("disabled", "disabled");
    var id = $(this).val();
    var kecamatan_select = {};
    kecamatan_select["id"] = id;

    $.ajax({
      data: JSON.parse(JSON.stringify(kecamatan_select)),
      url: kecamatan.data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        $.each(data, function (id, value) {
          kelurahan.prop("disabled", false);
          kelurahan.append(
            "<option></option>",
            '<option value=" ' +
              value.id +
              '">' +
              value.kode_kelurahan +
              " - " +
              value.nama_kelurahan +
              "</option>"
          );
        });
      },
      error: function (data) {
        console.log("gagal");
      },
    });
  });

  if (tujuan_global.val() !== null) {
    sasaran_global.attr("disabled", false);
  } else {
    sasaran_global.attr("disabled", true);
  }

  if (nama_program.val() !== null) {
    pilar_sdg.attr("disabled", false);
  } else {
    pilar_sdg.attr("disabled", true);
  }

  // Nama Program -> Pilar SDG
  nama_program.on("change", function () {
    pilar_sdg.attr("disabled", "disabled");
    var id = $(this).val();
    var nama_program_select = {};
    nama_program_select["id"] = id;

    $.ajax({
      data: JSON.parse(JSON.stringify(nama_program_select)),
      url: nama_program.data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        // console.log("pilar ", data);
        pilar_sdg.empty();

        $.each(data, function (id, value) {
          pilar_sdg.prop("disabled", false);
          pilar_sdg.append(
            "<option></option>",
            '<option value=" ' +
              value.id +
              '">' +
              value.get_pilar_sdg.kode_pilar +
              " - " +
              value.nama_pilar +
              "</option>"
          );
        });
      },
      error: function (data) {
        console.log("gagal");
      },
    });
  });

  // Area -> Rekening
  area.on("change", function () {
    var id = $(this).val();
    // console.log("id ", id);
    var area_select = {};
    area_select["id"] = id;

    $.ajax({
      data: JSON.parse(JSON.stringify(area_select)),
      url: area.data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        // Kota
        rekening.empty();

        $.each(data, function (id, value) {
          // console.log("value ", id);

          rekening.prop("disabled", false);
          rekening.append(
            "<option></option>",
            '<option value=" ' +
              value.id +
              '">' +
              value.kode_rekening +
              " - " +
              value.nama_rekening +
              "</option>"
          );
        });
      },
      error: function (data) {
        console.log("gagal");
      },
    });
  });

  // Nilai Usulan/Bantuan
  $("#nilai_usul_input").keyup(function (e) {
    $(this).val(format($(this).val()));
  });

  var format = function (num) {
    var str = num.toString().replace("", ""),
      parts = false,
      output = [],
      i = 1,
      formatted = null;
    if (str.indexOf(".") > 0) {
      parts = str.split(".");
      str = parts[0];
    }
    str = str.split("").reverse();
    for (var j = 0, len = str.length; j < len; j++) {
      if (str[j] != ",") {
        output.push(str[j]);
        if (i % 3 == 0 && j < len - 1) {
          output.push(",");
        }
        i++;
      }
    }
    formatted = output.reverse().join("");
    return "" + formatted + (parts ? "." + parts[1].substr(0, 2) : "");
  };

  // Batal Pengajuan
  var url_batal = $("#table_penyaluran").data("batal");
  $("body").on("click", ".batalpengajuan", function () {
    var id = $(this).data("id");

    var warningMessage = "";
    var buttonName = "";
    var successMessage = "";

    warningMessage =
      warningMessage + "Yakin ingin membatalkan pengajuan data penyaluran ini?";
    buttonName = "Batal Pengajuan";
    successMessage = "Pengajuan Dibatalkan";

    Swal.fire({
      title: "Batalkan Pengajuan",
      text: warningMessage,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: buttonName,
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajaxSetup({
          headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
          },
        });

        $.ajax({
          type: "POST",
          dataType: "json",
          data: {
            id: id,
          },
          url: url_batal,
          success: function (data) {
            Swal.fire(successMessage, data.success, "success");
            table.draw();
          },
          error: function (data) {
            console.log("Error:", data);
            if (data.status == 500) {
              Swal.fire({
                icon: "error",
                title: "Change Status Error",
                text: data.responseJSON.message,
              });
            } else {
              var errors = data.responseJSON.message;
              var errorsHtml = "";
              $.each(errors.errors, function (key, value) {
                Swal.fire({
                  icon: "error",
                  title: "Change Status Failed",
                  text: value[0],
                });
              });
            }
            table.draw();
          },
        });
      } else {
        table.draw();
      }
    });
  });

  // Approve Button for Manager
  $("#approveBtn").click(function (e) {
    e.preventDefault();
    $("#approval").val(2);

    $.ajax({
      data: $("#dataFormApprove").serialize(),
      url: $("#dataFormApprove").data("urlapproved"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        // console.log("sukses ", data);
        Swal.fire(
          "Success!",
          "Data Penyaluran Sukses Disetujui",
          "success"
        ).then((result) => {
          $("#dataFormApprove").trigger("reset");
          $("#ajaxModelApproval").modal("hide");
          location.href = $("#dataFormApprove").data("backhome");
        });
      },
      error: function (data) {
        // console.log("Error:", data);
        message = data.responseJSON.message;
        $("#saveBtnImport").html("Save Changes");
        toastr.error("Komentar harus diisi", "Save Failed", {
          iconClass: "toast-error",
        });
      },
    });
    $("#search_form").trigger("reset");
  });

  // Reject Button for Manager
  $("#rejectBtn").click(function (e) {
    e.preventDefault();
    $("#approval").val(3);

    Swal.fire({
      title: "Reject Data Penyaluran",
      text: "Yakin ingin menolak data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Tolak",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          data: $("#dataFormApprove").serialize(),
          url: $("#dataFormApprove").data("urlrejected"),
          type: "POST",
          dataType: "json",
          success: function (data) {
            Swal.fire(
              "Success!",
              "Data Penyaluran Sukses Ditolak",
              "success"
            ).then((result) => {
              $("#dataFormApprove").trigger("reset");
              $("#ajaxModelApproval").modal("hide");
              location.href = $("#dataFormApprove").data("backhome");
            });
          },
          error: function (data) {
            console.log("Error:", data);
            message = data.responseJSON.message;
            toastr.error("Komentar harus diisi", "Save Failed", {
              iconClass: "toast-error",
            });
          },
        });
      }
    });
  });

  function disableDropdown() {
    kota.attr("disabled", "disabled");
    kecamatan.attr("disabled", "disabled");
    kelurahan.attr("disabled", "disabled");
  }
  // INISIALISASI SELECT2 - END

  // Datatable
  var url = $("#table_penyaluran").data("url");
  var table = $("#table_penyaluran").DataTable({
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
      data: function (d) {
        d.search = $("input[name=search]").val();
        d.area_search = $("select#area_search option:checked").val();
        d.status_select = $("select#status_select option:checked").val();
        d.range_date = $("input[name=range_date]").val();
      },
    },
    columns: [
      {
        data: "DT_RowIndex",
        name: "DT_RowIndex",
        orderable: false,
        searchable: false,
      },
      {
        data: "action",
        name: "action",
        orderable: false,
        searchable: false,
        className: "text-center",
      },
      {
        data: "status",
        name: "status",
        className: "text-center",
        sWidth: "100%",
      },
      {
        data: "deadline",
        name: "deadline",
        className: "text-center",
      },
      {
        data: "checklist",
        name: "checklist",
        className: "text-center",
      },
      {
        data: "no_penyaluran",
        name: "no_penyaluran",
        className: "text-center",
      },
      {
        data: "alias",
        name: "alias",
        className: "text-center",
      },
      {
        data: "uraian_kegiatan",
        name: "uraian_kegiatan",
        className: "text-center",
      },
      {
        data: "provinsi",
        name: "provinsi",
        className: "text-center",
      },
      {
        data: "kota",
        name: "kota",
        className: "text-center",
      },
      {
        data: "area",
        name: "area",
        className: "text-center",
      },
      {
        data: "alamat_detail",
        name: "alamat_detail",
        className: "text-center",
      },
      {
        data: "nilai",
        name: "nilai",
        className: "text-center",
      },
      {
        data: "createdon",
        name: "nilai",
        className: "text-center",
      },
      {
        data: "modifiedon",
        name: "nilai",
        className: "text-center",
      },
    ],
  });

  // Reset Form
  $("#reset_form").on("click", function (e) {
    e.preventDefault();
    $("#search_form").trigger("reset");
    // $("#status_select").val(null).trigger("change");
    $.blockUI({
      message:
        '<img src="' +
        src +
        '" style="height: 80px; width: auto"> <hr> <h3>Mohon Tunggu ...</h3>',
      timeout: 500, //unblock after 0.5 seconds
      overlayCSS: {
        backgroundColor: $white,
        opacity: 0.8,
        cursor: "wait",
      },
      css: {
        border: 0,
        padding: 0,
        backgroundColor: "transparent",
      },
    });
    table.draw();
  });

  // Search Form
  $("#search_form").on("submit", function (e) {
    e.preventDefault();
    table.draw();
    // console.log("status : ", $("select#status_select option:checked").val());
  });

  // ====== DATE PICKER
  $(".daterange").daterangepicker();
  // Date Ranges Initially Empty
  $(".initial-empty").daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: "Clear",
    },
  });

  $(".showdropdowns").on("apply.daterangepicker", function (ev, picker) {
    $(this).val(
      picker.startDate.format("MM/DD/YYYY") +
        " - " +
        picker.endDate.format("MM/DD/YYYY")
    );
  });

  $(".showdropdowns").on("cancel.daterangepicker", function (ev, picker) {
    $(this).val("");
  });

  // Show Dropdowns
  $(".showdropdowns").daterangepicker({
    showDropdowns: true,
    drops: "down",
    autoUpdateInput: false,
    locale: {
      cancelLabel: "Clear",
    },
  });
  // ====== DATE PICKER
});

// ========== FORM
var btnBackURLHome = $("#dataForm").data("backurl");
// location.href = btnBackURLHome;
// Action Save Data
// $("#saveBtn").click(function (e) {
//   e.preventDefault();
//   console.log("data edit : ", $("#dataForm").serialize());
//   $.ajax({
//     data: $("#dataForm").serialize(),
//     url: $("#dataForm").data("url"),
//     type: "POST",
//     dataType: "json",
//     success: function (data) {
//       Swal.fire(
//         "Success!",
//         "Penyaluran Bina Lingkungan Berhasil Disimpan",
//         "success"
//       ).then((result) => {
//         $("#dataForm").trigger("reset");
//         $("#ajaxModel").modal("hide");
//         // toastr.success(data.success, "Save Success", {"iconClass": 'toast-success'});
//         location.href = btnBackURLHome;
//         table.draw();
//       });
//     },
//     error: function (data) {
//       console.log("Error:", data.responseJSON.errors.kode_pola);
//       message = data.responseJSON.errors.kode_pola;
//       toastr.error(message, "Save Failed", {
//         iconClass: "toast-error",
//       });
//     },
//   });
//   $("#search_form").trigger("reset");
// });

// ========== FORM - EDIT

// =============================== WIZARD ================================
// wizard yg dipake
$(".wizard-horizontal").steps({
  headerTag: "h6",
  bodyTag: "fieldset",
  transitionEffect: "fade",
  titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: "Submit",
  },
  onFinished: function (event, currentIndex) {
    // console.log("data edit : ", $("#dataForm").serialize());
    $.ajax({
      data: $("#dataForm").serialize(),
      url: $("#dataForm").data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        // console.log("sukses ", data);
        Swal.fire(
          "Success!",
          "Penyaluran Bina Lingkungan Berhasil Disimpan",
          "success"
        ).then((result) => {
          $("#dataForm").trigger("reset");
          $("#ajaxModel").modal("hide");
          // toastr.success(data.success, "Save Success", {"iconClass": 'toast-success'});
          location.href = $("#dataForm").data("backurl");
          table.draw();
        });
      },
      error: function (data) {
        // console.log("Error:", data.responseJSON.errors.kode_pola);
        message = data.responseJSON.errors.kode_pola;
        toastr.error(message, "Save Failed", {
          iconClass: "toast-error",
        });
      },
    });
  },
});
//        vertical Wizard       //
// ------------------------------
$(".wizard-vertical").steps({
  headerTag: "h3",
  bodyTag: "fieldset",
  transitionEffect: "fade",
  enableAllSteps: true,
  stepsOrientation: "vertical",
  labels: {
    finish: "Submit",
  },
  onFinished: function (event, currentIndex) {
    alert("Form submitted.");
  },
});

//       Validate steps wizard //
// -----------------------------
// Show form
var stepsValidation = $(".wizard-validation");
var form = stepsValidation.show();

stepsValidation.steps({
  headerTag: "h6",
  bodyTag: "fieldset",
  transitionEffect: "fade",
  titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: "Submit",
  },
  onStepChanging: function (event, currentIndex, newIndex) {
    // Allways allow previous action even if the current form is not valid!
    if (currentIndex > newIndex) {
      return true;
    }
    form.validate().settings.ignore = ":disabled,:hidden";
    return form.valid();
  },
  onFinishing: function (event, currentIndex) {
    form.validate().settings.ignore = ":disabled";
    return form.valid();
  },
  onFinished: function (event, currentIndex) {
    alert("Submitted!");
  },
});

// Initialize validation
stepsValidation.validate({
  ignore: "input[type=hidden]", // ignore hidden fields
  errorClass: "danger",
  successClass: "success",
  highlight: function (element, errorClass) {
    $(element).removeClass(errorClass);
  },
  unhighlight: function (element, errorClass) {
    $(element).removeClass(errorClass);
  },
  errorPlacement: function (error, element) {
    error.insertAfter(element);
  },
  rules: {
    email: {
      email: true,
    },
  },
});
// live Icon color change on state change
$(document).ready(function () {
  $(".current").find(".step-icon").addClass("bx bx-time-five");
  $(".current").find(".fonticon-wrap .livicon-evo").updateLiviconEvo({
    strokeColor: "#5A8DEE",
  });
});
// Icon change on state
// if click on next button icon change
$(".actions [href='#next']").click(function () {
  $(".done")
    .find(".step-icon")
    .removeClass("bx bx-time-five")
    .addClass("bx bx-check-circle");
  $(".current")
    .find(".step-icon")
    .removeClass("bx bx-check-circle")
    .addClass("bx bx-time-five");
  // live icon color change on next button's on click
  $(".current").find(".fonticon-wrap .livicon-evo").updateLiviconEvo({
    strokeColor: "#5A8DEE",
  });
  $(".current")
    .prev("li")
    .find(".fonticon-wrap .livicon-evo")
    .updateLiviconEvo({
      strokeColor: "#39DA8A",
    });
});
$(".actions [href='#previous']").click(function () {
  // live icon color change on next button's on click
  $(".current").find(".fonticon-wrap .livicon-evo").updateLiviconEvo({
    strokeColor: "#5A8DEE",
  });
  $(".current")
    .next("li")
    .find(".fonticon-wrap .livicon-evo")
    .updateLiviconEvo({
      strokeColor: "#adb5bd",
    });
});
// if click on  submit   button icon change
$(".actions [href='#finish']").click(function () {
  $(".done")
    .find(".step-icon")
    .removeClass("bx-time-five")
    .addClass("bx bx-check-circle");
  $(".last.current.done").find(".fonticon-wrap .livicon-evo").updateLiviconEvo({
    strokeColor: "#39DA8A",
  });
});
// add primary btn class
$('.actions a[role="menuitem"]').addClass("btn btn-primary");
$('.icon-tab [role="menuitem"]').addClass("glow ");
$('.wizard-vertical [role="menuitem"]')
  .removeClass("btn-primary")
  .addClass("btn-light-primary");
// ==================================== WIZARD ====================================

// ================================ DATE PICKER ===================================
(function (window, document, $) {
  "use strict";

  // Basic date
  $(".pickadate").pickadate();

  // Format Date Picker
  $(".format-picker").pickadate({
    format: "mmmm, d, yyyy",
  });

  // Date limits
  $(".pickadate-limits").pickadate({
    min: [2019, 7, 20],
    max: [2019, 7, 28],
  });

  // Disabled Dates & Weeks

  $(".pickadate-disable").pickadate({
    disable: [1, [2019, 6, 6], [2019, 6, 20]],
  });

  // Picker Translations
  $(".pickadate-translations").pickadate({
    formatSubmit: "dd/mm/yyyy",
    monthsFull: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    monthsShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ags",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    weekdaysShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    today: "Hari Ini",
    clear: "Reset",
    close: "Tutup",
  });

  // Month Select Picker
  $(".pickadate-months").pickadate({
    selectYears: false,
    selectMonths: true,
  });

  // Month and Year Select Picker
  $(".pickadate-months-year").pickadate({
    selectYears: true,
    selectMonths: true,
  });

  // Short String Date Picker
  $(".pickadate-short-string").pickadate({
    weekdaysShort: ["S", "M", "Tu", "W", "Th", "F", "S"],
    showMonthsShort: true,
  });

  // Change first weekday
  $(".pickadate-firstday").pickadate({
    firstDay: 1,
  });

  // Inline Date Picker
  $(".inlineDatePicker").pickadate({
    container: "#inlineDatePicker-container",
  });

  // ************************//
  // * Pick a Time Picker *//
  // ************************//
  // Basic time
  $(".pickatime").pickatime();

  // Format options
  $(".pickatime-format").pickatime({
    // Escape any “rule” characters with an exclamation mark (!).
    format: "T!ime selected: h:i a",
    formatLabel: "HH:i a",
    formatSubmit: "HH:i",
    hiddenPrefix: "prefix__",
    hiddenSuffix: "__suffix",
  });

  // Format options
  $(".pickatime-formatlabel").pickatime({
    formatLabel: function (time) {
      var hours = (time.pick - this.get("now").pick) / 60,
        label =
          hours < 0 ? " !hours to now" : hours > 0 ? " !hours from now" : "now";
      return (
        "h:i a <sm!all>" + (hours ? Math.abs(hours) : "") + label + "</sm!all>"
      );
    },
  });

  // Min - Max Time to select
  $(".pickatime-min-max").pickatime({
    // Using Javascript
    min: new Date(2015, 3, 20, 7),
    max: new Date(2015, 7, 14, 18, 30),

    // Using Array
    // min: [7,30],
    // max: [14,0]
  });

  // Intervals
  $(".pickatime-intervals").pickatime({
    interval: 150,
  });

  // Disable Time
  $(".pickatime-disable").pickatime({
    disable: [
      // Disable Using Integers
      3, 5, 7, 13, 17, 21,

      /* Using Array */
      // [0,30],
      // [2,0],
      // [8,30],
      // [9,0]
    ],
  });

  // Close on a user action
  $(".pickatime-close-action").pickatime({
    closeOnSelect: false,
    closeOnClear: false,
  });

  // ************************//
  // * Date Range Picker *//
  // ************************//

  // Basic Date Range Picker
  $(".daterange").daterangepicker();

  // Date & Time
  $(".datetime").daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
      format: "MM/DD/YYYY h:mm A",
    },
  });

  // Single Date Picker
  $(".single-daterange").daterangepicker(
    {
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      maxYear: parseInt(moment().format("YYYY"), 10),
    },
    function (start, end, label) {
      var years = moment().diff(start, "years");
      alert("You are " + years + " years old!");
    }
  );

  // Date Ranges
  $(".dateranges").daterangepicker({
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "Last 30 Days": [moment().subtract(29, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Last Month": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
  });

  // Date Ranges Initially Empty
  $(".initial-empty").daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: "Clear",
    },
  });

  $(".initial-empty").on("apply.daterangepicker", function (ev, picker) {
    $(this).val(
      picker.startDate.format("MM/DD/YYYY") +
        " - " +
        picker.endDate.format("MM/DD/YYYY")
    );
  });

  $(".initial-empty").on("cancel.daterangepicker", function (ev, picker) {
    $(this).val("");
  });

  //Calendars are not linked
  $(".timeseconds").daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    timePicker24Hour: true,
    timePickerSeconds: true,
    locale: {
      format: "MM-DD-YYYY h:mm:ss",
    },
  });

  // Auto Apply Date Range
  $(".autoapply").daterangepicker({
    autoApply: true,
  });

  // Date Limit
  $(".dateLimit").daterangepicker({
    dateLimit: {
      days: 7,
    },
  });

  // Show Dropdowns
  $(".showdropdowns").daterangepicker({
    showDropdowns: true,
    drops: "up",
  });

  // Show Week Numbers
  $(".showweeknumbers").daterangepicker({
    showWeekNumbers: true,
  });

  // Always Show Calendar on Ranges
  $(".showCalRanges").daterangepicker({
    ranges: {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "Last 30 Days": [moment().subtract(29, "days"), moment()],
      "This Month": [moment().startOf("month"), moment().endOf("month")],
      "Last Month": [
        moment().subtract(1, "month").startOf("month"),
        moment().subtract(1, "month").endOf("month"),
      ],
    },
    alwaysShowCalendars: true,
  });

  // Date Range Alignment
  $(".openRight").daterangepicker({
    opens: "left", // left/right/center
  });

  // Date Range Open on Top
  $(".drops").daterangepicker({
    drops: "up", // up/down
  });

  // Change Buttons bg-color
  $(".buttonClass").daterangepicker({
    drops: "up",
    buttonClasses: "btn",
    applyClass: "btn-success",
    cancelClass: "btn-danger",
  });

  // Inline Date Picker
  var picker = $(".inlineDateRangePicker").daterangepicker({
    parentEl: "#daterangepicker-container",
  });

  // To remain picker opened after date range applied
  picker.data("daterangepicker").hide = function () {};

  // show picker on load
  picker.data("daterangepicker").show();
})(window, document, jQuery);

// =============== DATE PICKER END =================
