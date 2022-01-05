$(function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });

  var src = $("#logo_kai").attr("src");
  var $white = "#fff";

  var kode_perkiraan = $("#kode_perkiraan");
  kode_perkiraan.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Kode Perkiraan",
  });

  var tujuan_global = $("#tujuan_global_select");
  tujuan_global.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Tujuan Global",
  });

  var sasaran_global = $("#sasaran_global_select");
  sasaran_global.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Sasaran Global",
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

  var url = $("#table_jenisbl").data("url");
  var table = $("#table_jenisbl").DataTable({
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
        d.kode_sektor_search = $("input[name=kode_sektor_search]").val();
        d.status_select = $("select#status_select option:checked").val();
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
        orderable: false,
        searchable: false,
        className: "text-center",
        render: function (data, type, row) {
          if (row.status === 1) {
            button =
              `<div class="custom-control custom-switch" id="switchStatus">
                <input type="checkbox" checked class="custom-control-input switchStatus" data-id="` +
              row.id +
              `" id="switch_status_` +
              row.id +
              `">
                  <label class="custom-control-label" for="switch_status_` +
              row.id +
              `"></label>
              </div>`;
          } else {
            button =
              `<div class="custom-control custom-switch" id="switchStatus">
                <input type="checkbox" class="custom-control-input switchStatus" data-id="` +
              row.id +
              `" id="switch_status_` +
              row.id +
              `">
                <label class="custom-control-label" for="switch_status_` +
              row.id +
              `"></label>
              </div>`;
          }
          return button;
        },
      },
      {
        data: "kode_sektor",
        name: "kode_sektor",
      },
      {
        data: "nama_sektor",
        name: "nama_sektor",
      },
      {
        data: "sasaran_nasional",
        name: "sasaran_nasional",
      },
    ],
  });

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

  $("#search_form").on("submit", function (e) {
    e.preventDefault();
    table.draw();
    console.log("status : ", $("select#status_select option:checked").val());
  });

  $("#createNewData").click(function () {
    $("#saveBtn").val("create-product");
    $("#data_id").val("");
    $("#dataForm").trigger("reset");
    $("#modelHeading").html("Tambah Data");
    $("#ajaxModel").modal("show");
    $("#created").html("Jenis BL");
    $("#updated").html("");
    $("#saveBtn").text("Simpan");
    $("#kode_sektor").attr("disabled", false);
  });

  $("body").on("click", "#editData", function (e) {
    var uri = $(this).data("href");
    $.get(uri, function (data) {
      $("#modelHeading").html("Edit Data");
      $("#created").html(
        "<small>Created By : " +
          data.userCreated +
          "<br>Created At : " +
          data.createdAt +
          "</small>"
      );
      $("#updated").html(
        "<small>Updated By : " +
          data.userUpdated +
          "<br>Updated At : " +
          data.updatedAt +
          "</small>"
      );
      $("#saveBtn").val("edit-user");
      $("#saveBtn").text("Update");
      $("#ajaxModel").modal("show");
      $("#data_id").val(data.id);
      $("#kode_sektor").val(data.kode_sektor);
      $("#nama_sektor").val(data.nama_sektor);
      $("#nama_alias").val(data.nama_alias);
      $("#kode_perkiraan").val(data.kode_perkiraan).trigger("change");
      $("#tujuan_global_select").val(data.id_tujuan_global).trigger("change");
      $("#sasaran_global_select").val(data.id_sasaran_global).trigger("change");
      $("#sasaran_nasional_input").val(data.sasaran_nasional);
      $("#kode_sektor").attr("disabled", true);
    });
  });

  $("body").on("click", "#detailData", function (e) {
    var uri = $(this).data("href");
    $.get(uri, function (data) {
      console.log("data detail : ", data);

      $("#modelHeadingDetail").html("Detail Data");
      $("#createdDetail").html(
        "<small>Created By : " +
          data.userCreated +
          "<br>Created At : " +
          data.createdAt +
          "</small>"
      );
      $("#updatedDetail").html(
        "<small>Updated By : " +
          data.userUpdated +
          "<br>Updated At : " +
          data.updatedAt +
          "</small>"
      );

      var statusMessage;
      if (data.status === 1) {
        statusMessage = `<span class='rounded-pill bg-primary' style="padding:5px; color: white"> Active </span>`;
      } else if (data.status === 0) {
        statusMessage = `<span class='rounded-pill bg-danger' style="padding:5px; color: white"> Inactive </span>`;
      } else {
        statusMessage = "-";
      }

      $("#ajaxModelDetail").modal("show");
      $("#kode_sektorD").html(data.kode_sektor);
      $("#nama_sektorD").html(data.nama_sektor);
      $("#nama_aliasD").html(data.nama_alias);
      $("#kode_perkiraanD").html(data.kode_perkiraan_detail);
      $("#sasaran_nasionalD").html(data.sasaran_nasional_detail);
      $("#tujuan_globalD").html(data.tujuan_global_detail);
      $("#sasaran_globalD").html(data.sasaran_global_detail);
      $("#status_dataD").html(statusMessage);
      $("#createdbyD").html(data.userCreated);
      $("#createdatD").html(data.createdAt);
      $("#updatedbyD").html(data.userUpdated);
      $("#updatedatD").html(data.updatedAt);
    });
  });

  $("#saveBtn").click(function (e) {
    e.preventDefault();
    console.log("data edit : ", $("#dataForm").serialize());
    $.ajax({
      data: $("#dataForm").serialize(),
      url: $("#dataForm").data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        Swal.fire("Success!", data.success, "success").then((result) => {
          $("#dataForm").trigger("reset");
          $("#ajaxModel").modal("hide");
          // toastr.success(data.success, "Save Success", {"iconClass": 'toast-success'});
          table.draw();
        });
      },
      error: function (data) {
        console.log("Error:", data);
        message = data.responseJSON.errors.kode_sektor;
        toastr.error(message, "Save Failed", {
          iconClass: "toast-error",
        });
      },
    });
    $("#search_form").trigger("reset");
  });

  var url_switch = $("#table_jenisbl").data("switchurl");
  $("body").on("click", ".switchStatus", function () {
    var id = $(this).data("id");
    console.log($("#switch_status_" + id).is(":checked"));
    console.log("id ", id);

    var warningMessage = "";
    var buttonName = "";
    var successMessage = "";

    if (
      $("#switch_status_" + id).is(":checked") == "true" ||
      $("#switch_status_" + id).is(":checked") == true
    ) {
      warningMessage = warningMessage + "Yakin ingin mengaktifkan data ini?";
      buttonName = "Aktifkan";
      successMessage = "Data Diaktifkan";
    } else {
      warningMessage = warningMessage + "Yakin ingin menonaktifkan data ini?";
      buttonName = "Non-Aktifkan";
      successMessage = "Data Dinonaktifkan";
    }

    Swal.fire({
      title: "Change Data Status",
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
            status: $("#switch_status_" + id).is(":checked"),
          },
          url: url_switch,
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
});
