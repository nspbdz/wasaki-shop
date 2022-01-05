$(function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });

  var src = $("#logo_kai").attr("src");
  var $white = "#fff";

  var area = $("#area_select");
  area.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Area",
  });

  var area2 = $("#area_select2");
  area2.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Area",
  });

  var url = $("#table_rekeningkas").data("url");
  var access = $("#table_rekeningkas").data("access");

  //Jika Admin
  var table = $("#table_rekeningkas").DataTable({
    processing: true,
    serverSide: true,
    bFilter: true,
    scrollX: true,
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
        d.area_select = $("select#area_select option:checked").val();
        d.status_select = $("select#status_select option:checked").val();
        d.status_approval = $("select#status_approval option:checked").val();
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
          if (row.is_admin === "false" || row.is_admin === false) {
            if (row.status === 2 && row.approval == "Approved") {
              button = "Active";
            } else if (row.status === 1 && row.approval == "Approved") {
              button = "Inactive";
            } else if (
              row.approval == "Pending" ||
              row.approval == "Rejected"
            ) {
              button = "Inactive";
            }
          } else if (row.status === 2 && row.approval == "Approved") {
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
          } else if (row.status === 1 && row.approval == "Approved") {
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
          } else if (row.approval == "Pending" || row.approval == "Rejected") {
            button =
              `<div class="custom-control custom-switch" id="switchStatus" data-toggle="tooltip" data-placement="top" title="Change Status Denied" >
                  <input type="checkbox" class="custom-control-input switchStatus" data-id="` +
              row.id +
              `" id="switch_status_` +
              row.id +
              `" disabled="">
                  <label class="custom-control-label" for="switch_status_` +
              row.id +
              `"></label>
                </div>`;
          }
          return button;
        },
      },
      { data: "approval", name: "approval", className: "text-center" },
      { data: "kode_rekening", name: "kode_rekening" },
      { data: "nama_rekening", name: "nama_rekening" },
      { data: "jenis_rekening_detail", name: "jenis_rekening_detail" },
      { data: "area", name: "area" },
    ],
  });

  // On Click Button Reset Filter
  $("#reset_form").on("click", function (e) {
    e.preventDefault();
    $("#search_form").trigger("reset");
    area.val(null).trigger("change");
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

  // Search
  $("#search_form").on("submit", function (e) {
    e.preventDefault();
    table.draw();
    console.log("status : ", $("select#status_select option:checked").val());
  });

  // On Click Button Tambah Data
  $("#createNewData").click(function () {
    $("#saveBtn").val("create-product");
    $("#data_id").val("");
    $("#dataForm").trigger("reset");
    $("#modelHeading").html("Tambah Data");
    $("#ajaxModel").modal("show");
    $("#created").html("Rekening Kas");
    $("#updated").html("");
    $("#saveBtn").text("Simpan");

    $("#kode_rekening").attr("disabled", false);
    $("#kode_perkiraan").attr("disabled", false);
    $("#area_select2").attr("disabled", false);
    $("#jenis_rekening").attr("disabled", false);
    $("#type").attr("disabled", false);
  });

  // On Click Button Edit
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
      console.log("data.id_area : ", data.id_area);
      $("#saveBtn").val("edit-user");
      $("#saveBtn").text("Update");
      $("#ajaxModel").modal("show");
      $("#data_id").val(data.id);
      $("#kode_rekening").val(data.kode_rekening);
      $("#kode_perkiraan").val(data.kode_perkiraan);
      $("#nama_rekening").val(data.nama_rekening);
      $("#area_select2").val(data.id_area).trigger("change");
      $("#type").val(data.type).trigger("change");
      $("#jenis_rekening").val(data.jenis_rekening).trigger("change");

      $("#kode_rekening").attr("disabled", true);
      $("#kode_perkiraan").attr("disabled", true);
      $("#area_select2").attr("disabled", true);
      $("#jenis_rekening").attr("disabled", true);
      $("#type").attr("disabled", true);
    });
  });

  // On Click Button Detail
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
      if (data.status === 2) {
        statusMessage = `<span class='rounded-pill bg-primary' style="padding:5px; color: white"> Active </span>`;
      } else if (data.status === 1) {
        statusMessage = `<span class='rounded-pill bg-danger' style="padding:5px; color: white"> Inactive </span>`;
      } else {
        statusMessage = "-";
      }

      var statusApproval;
      if (data.approval_detail === "Approved") {
        statusApproval = `<span class='rounded-pill bg-success' style="padding:5px; color: white"> Approved </span>`;
      } else if (data.approval_detail === "Rejected") {
        statusApproval = `<span class='rounded-pill bg-danger' style="padding:5px; color: white"> Rejected </span>`;
      } else {
        statusApproval = `<span class='rounded-pill bg-warning' style="padding:5px; color: white"> Pending </span>`;
      }

      $("#ajaxModelDetail").modal("show");
      $("#kode_rekeningD").html(data.kode_rekening);
      $("#kode_perkiraanD").html(data.kode_perkiraan);
      $("#nama_rekeningD").html(data.nama_rekening);
      $("#areaD").html(data.nama_area);
      $("#typeD").html(data.type_detail);
      $("#jenis_rekeningD").html(data.jenis_rekening_detail);
      $("#approvalD").html(statusApproval);
      $("#keteranganD").html(data.keterangan_detail);
      $("#status_dataD").html(statusMessage);
      $("#createdbyD").html(data.userCreated);
      $("#createdatD").html(data.createdAt);
      $("#updatedbyD").html(data.userUpdated);
      $("#updatedatD").html(data.updatedAt);
    });
  });

  // Action Submit Form Create/Edit
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
        console.log("Error:", data);
        message = data.responseJSON.errors.kode_rekening;
        $("#saveBtnImport").html("Save Changes");
        toastr.error(message, "Save Failed", {
          iconClass: "toast-error",
        });
      },
    });
    $("#search_form").trigger("reset");
  });

  // Change Status Data
  var url_switch = $("#table_rekeningkas").data("switchurl");
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
                // footer: '<a href="">Why do I have this issue?</a>'
              });
            } else {
              var errors = data.responseJSON.message;
              var errorsHtml = "";
              $.each(errors.errors, function (key, value) {
                Swal.fire({
                  icon: "error",
                  title: "Change Status Failed",
                  text: value[0],
                  // footer: '<a href="">Why do I have this issue?</a>'
                });
                // errorsHtml += alert(value[0]);
                // toastr.error(value[0], "Update Status Error", {
                //   iconClass: "toast-error",
                // });
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

  // On Click Button Action Approval
  $("body").on("click", "#approval", function (e) {
    var uri = $(this).data("href");
    $.get(uri, function (data) {
      $("#modelHeadingApproved").html("Approval Data");
      $("#createdApproval").html(
        "<small>Created By : " +
          data.userCreated +
          "<br>Created At : " +
          data.createdAt +
          "</small>"
      );
      $("#updatedApproval").html(
        "<small>Updated By : " +
          data.userUpdated +
          "<br>Updated At : " +
          data.updatedAt +
          "</small>"
      );
      $("#ajaxModelApproval").modal("show");
      $("#data_idA").val(data.id);
      $("#kode_rekeningA").html(": " + data.kode_rekening);
      $("#kode_perkiraanA").html(": " + data.kode_perkiraan);
      $("#nama_rekeningA").html(": " + data.nama_rekening);
      $("#areaA").html(": " + data.nama_area);
      $("#typeA").html(": " + data.type_detail);
      $("#jenis_rekeningA").html(": " + data.jenis_rekening_detail);
      $("#keteranganA").html(data.keterangan);
      $("#status_dataA").html(": " + data.status_data);
      $("#approval_detailA").html(": " + data.approval_detail);
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
        Swal.fire("Success!", "Data Rekening Approved", "success").then(
          (result) => {
            $("#dataFormApprove").trigger("reset");
            $("#ajaxModelApproval").modal("hide");
            // toastr.success(data.success, "Save Success", {"iconClass": 'toast-success'});
            table.draw();
          }
        );
      },
      error: function (data) {
        console.log("Error:", data);
        message = data.responseJSON.message;
        $("#saveBtnImport").html("Save Changes");
        toastr.error(message, "Save Failed", {
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

    console.log("link reject ", $("#rejectBtn").data("urlrejected"));
    Swal.fire({
      title: "Reject Data Rekening",
      text: "Yakin ingin me-reject data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          data: $("#dataFormApprove").serialize(),
          url: $("#dataFormApprove").data("urlrejected"),
          type: "POST",
          dataType: "json",
          success: function (data) {
            Swal.fire("Success!", "Data Rekening Rejected", "success").then(
              (result) => {
                $("#dataFormApprove").trigger("reset");
                $("#ajaxModelApproval").modal("hide");
                table.draw();
              }
            );
          },
          error: function (data) {
            console.log("Error:", data);
            message = data.responseJSON.message;
            $("#saveBtnImport").html("Save Changes");
            toastr.error(message, "Save Failed", {
              iconClass: "toast-error",
            });
          },
        });
      }
    });
  });
});
