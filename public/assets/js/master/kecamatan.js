$(function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });

  var src = $("#logo_kai").attr("src");
  var $white = "#fff";

  var kota_kab_search = $("#kota_kab_search");
  kota_kab_search.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Kota/Kabupaten",
  });

  var kota_kab = $("#kota_kab");
  kota_kab.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Kota/Kabupaten",
  });

  var url = $("#table_kecamatan").data("url");
  var table = $("#table_kecamatan").DataTable({
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
        d.kota_kab = $("select#kota_kab_search option:checked").val();
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
        data: "kota_kab",
        name: "kota_kab",
      },
      {
        data: "kode_kecamatan",
        name: "kode_kecamatan",
      },
      {
        data: "nama_kecamatan",
        name: "nama_kecamatan",
      },
    ],
  });

  $("#reset_form_jp").on("click", function (e) {
    e.preventDefault();
    $("#search_form_jp").trigger("reset");
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

  $("#search_form_jp").on("submit", function (e) {
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
    $("#created").html("Kecamatan");
    $("#updated").html("");
    $("#saveBtn").text("Simpan");
    $("#kode_kecamatan").attr("disabled", false);
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
      $("#kota_kab").val(data.id_kota_kab).trigger("change");
      $("#kode_kecamatan").val(data.kode_kecamatan);
      $("#nama_kecamatan").val(data.nama_kecamatan);
      $("#keterangan").val(data.keterangan);
      $("#kode_kecamatan").attr("disabled", true);
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
      $("#kota_kabD").html(data.kota_kab);
      $("#kode_kecamatanD").html(data.kode_kecamatan);
      $("#nama_kecamatanD").html(data.nama_kecamatan);
      $("#keteranganD").html(data.keterangan_detail);
      $("#status_dataD").html(statusMessage);
      $("#createdbyD").html(data.userCreated);
      $("#createdatD").html(data.createdAt);
      $("#updatedbyD").html(data.userUpdated);
      $("#updatedatD").html(data.updatedAt);
    });
  });

  $("#saveBtn").click(function (e) {
    e.preventDefault();
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
        console.log("Error:", data.responseJSON.errors.kode_kecamatan);
        message = data.responseJSON.errors.kode_kecamatan;
        toastr.error(data.responseJSON.errors.kode_kecamatan, "Save Failed", {
          iconClass: "toast-error",
        });
      },
    });
    $("#search_form_jp").trigger("reset");
  });

  $("form#productFormImport").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      url: $("#productFormImport").data("url"),
      type: "POST",
      data: formData,
      success: function (data) {
        console.log("success : ", data);
        Swal.fire("Success!", data.success, "success").then((result) => {
          $("#productFormImport").trigger("reset");
          $("#ajaxModel").modal("hide");
          table.draw();
        });
      },
      error: function (data) {
        console.log("Error:", data);
        message = data.responseJSON;
        $("#saveBtnImport").html("Save Changes");
        toastr.error(message.message);
      },
      cache: false,
      contentType: false,
      processData: false,
    });
  });

  var url_switch = $("#table_kecamatan").data("switchurl");
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
