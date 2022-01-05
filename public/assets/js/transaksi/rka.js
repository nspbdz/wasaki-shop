$(function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });

  $("#jumlah_input").keyup(function (e) {
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

  var src = $("#logo_kai").attr("src");
  var $white = "#fff";

  var tahun = $("#tahun_select");
  tahun.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Tahun",
  });

  var tahun2 = $("#tahun");
  tahun2.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Tahun",
  });

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

  var url = $("#table_rka").data("url");
  var access = $("#table_rka").data("access");

  //Jika Admin
  var table = $("#table_rka").DataTable({
    processing: true,
    serverSide: true,
    bFilter: true,
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
        d.tahun_select = $("select#tahun_select option:checked").val();
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
            if (row.status === 1 && row.approval == "Approved") {
              $button = "Active";
            } else if (row.status === 0 && row.approval == "Approved") {
              button = "Inactive";
            } else if (
              row.approval == "Pending" ||
              row.approval == "Rejected"
            ) {
              button = "Inactive";
            }
          } else if (row.status === 1 && row.approval == "Approved") {
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
          } else if (row.status === 0 && row.approval == "Approved") {
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
      { data: "area", name: "area", className: "text-center" },
      { data: "jumlah", name: "jumlah", className: "text-center" },
      { data: "tahun", name: "tahun", className: "text-center" },
      { data: "approval", name: "approval", className: "text-center" },
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
    $("#created").html("RKA");
    $("#updated").html("");
    $("#saveBtn").text("Simpan");
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
      console.log("nominal : ", data.nominal_clean_edit);
      $("#saveBtn").val("edit-user");
      $("#saveBtn").text("Update");
      $("#ajaxModel").modal("show");
      $("#data_id").val(data.id);
      $("#jumlah_input").val(format(data.nominal_clean_edit));
      $("#area_select2").val(data.id_area).trigger("change");
      $("#tahun").val(data.tahun).trigger("change");
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
      if (data.status === 1) {
        statusMessage = `<span class='rounded-pill bg-primary' style="padding:5px; color: white"> Active </span>`;
      } else {
        statusMessage = `<span class='rounded-pill bg-danger' style="padding:5px; color: white"> Inactive </span>`;
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
      $("#tahunD").html(data.tahun_detail);
      $("#area_detailD").html(data.area_detail);
      $("#jumlahD").html(data.jumlah_detail);
      $("#approvalD").html(statusApproval);
      $("#alasanD").html(data.comment_detail);
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
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });

    $.ajax({
      data: $("#dataForm").serialize(),
      url: $("#dataForm").data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        Swal.fire("Simpan Sukses!", data.success, "success").then((result) => {
          $("#dataForm").trigger("reset");
          $("#ajaxModel").modal("hide");
          // toastr.success(data.success, "Save Success", {"iconClass": 'toast-success'});
          table.draw();
        });
      },
      error: function (data) {
        console.log("Error:", data);
        message = data.responseJSON.errors.tahun;
        $("#saveBtnImport").html("Save Changes");
        toastr.error(message, "Save Failed", {
          iconClass: "toast-error",
        });
      },
    });
    $("#search_form").trigger("reset");
  });

  // Change Status Data
  var url_switch = $("#table_rka").data("switchurl");
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

  // On Click Button Action Approval
  $("body").on("click", "#approval", function (e) {
    var uri = $(this).data("href");
    $.get(uri, function (data) {
      $("#modelHeadingApproved").html("Approval Data RKA");
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
      $("#created_byA").html(": " + data.userCreated);
      $("#created_atA").html(": " + data.createdAt);
      $("#tahunA").html(": " + data.tahun_detail);
      $("#areaA").html(": " + data.area_detail);
      $("#jumlahA").html(": " + data.jumlah_detail);
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
        Swal.fire("Success!", "Data RKA Berhasil Disetujui", "success").then(
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
      title: "Reject Data RKA",
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
            Swal.fire("Success!", "Data RKA Berhasil Ditolak", "success").then(
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
