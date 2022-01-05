$(function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });

  var src = $("#logo_kai").attr("src");
  var $white = "#fff";

  var btnBackURL = $("#table_pilarsdg").data("backurl");
  var btnBackURLHome = $("#dataForm").data("backurl");

  var kode_form = $("#program_select");
  // kode_form.select2({
  //   placeholder: "Pilih Kode Perkiraan",
  //   ajax: {
  //     dataType: "json",
  //     url: $("#createNewData").data("url"),
  //     type: "GET",
  //     delay: 250,
  //     processResults: function (data) {
  //       return {
  //         results: data,
  //       };
  //     },
  //     cache: true,
  //   },
  // });

  // console.log(kode_form);
  // Datatable
  var url = $("#table_pilarsdg").data("url");
  var table = $("#table_pilarsdg").DataTable({
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
        data: "kode_pilar",
        name: "kode_pilar",
      },
      {
        data: "nama_pilar",
        name: "nama_pilar",
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

  // Tambah Data
  $("#createNewData").click(function () {
    $("#saveBtn").val("create-product");
    $("#data_id").val("");
    $("#dataForm").trigger("reset");
    $("#modelHeading").html("Tambah Data");
    $("#ajaxModel").modal("show");
    $("#created").html("Pilar SDG");
    $("#updated").html("");
    $("#saveBtn").text("Simpan");

    $("#count").val(0).trigger("change");
    $("#program_select").val(0).trigger("change");
  });

  $("#ajaxModel").on("hidden.bs.modal", function (e) {
    $("#count").val(0).trigger("change");
    $("#program_select").val(0).trigger("change"); // $(".anak").hide();
    $(".anak").remove();
  });

  $("#kode_pola").on("change", function (e) {
    $(".anak").show();
  });

  // Edit Data
  $("body").on("click", "#editData", function (e) {
    var uri = $(this).data("href");
    $.get(uri, function (data) {
      $("#modelHeading").html("Edit Data");
      $("#created").html(
        "<small>Created By : " +
          data.pilarsdg.userCreated +
          "<br>Created At : " +
          data.pilarsdg.createdAt +
          "</small>"
      );
      $("#updated").html(
        "<small>Updated By : " +
          data.pilarsdg.userUpdated +
          "<br>Updated At : " +
          data.pilarsdg.updatedAt +
          "</small>"
      );
      $("#saveBtn").val("edit-user");
      $("#saveBtn").text("Update");
      $("#ajaxModel").modal("show");
      $("#data_id").val(data.pilarsdg.id);
      $("#kode_pola").val(data.pilarsdg.kode_pola);
      $("#nama_pola_jurnal").val(data.pilarsdg.nama_pola_jurnal);
      $("#transaksi").val(data.pilarsdg.transaksi).trigger("change");
      $("#deskripsi_pola").val(data.pilarsdg.deskripsi_pola).trigger("change");
      $("#keterangan").val(data.pilarsdg.keterangan);

      var selectedOption = "red";

      kode_form.html("");
      if (kode_form.prop) {
        var options = kode_form.prop("options");
      } else {
        var options = kode_form.attr("options");
      }
      $("option", kode_form).remove();

      $.each(data.programListResult, function (val, text) {
        options[options.length] = new Option(text.text, val.id);
      });

      var totalData = data.kodePerkiraanSelected.length;
      $.each(data.kodePerkiraanSelected, function (valSelected, textSelected) {
        for (var i = 0; i < totalData; i++) {
          // var jum = 0;
          // if (jum < totalData) {
          //   var html2 = html;
          //   kode_form.val(valSelected.id).trigger("change");
          // console.log("id selected : ", valSelected.id);
          //   $(".increments").before(html2);
          //   $("#count").val(parseInt(jum) + 1);
          // }
        }
      });
    });
  });

  // Detail Data
  $("body").on("click", "#detailData", function (e) {
    var uri = $(this).data("href");
    $.get(uri, function (data) {
      // console.log("data detail : ", data.pilarsdg);

      $("#modelHeadingDetail").html("Detail Data");
      $("#createdDetail").html(
        "<small>Created By : " +
          data.pilarsdg.userCreated +
          "<br>Created At : " +
          data.pilarsdg.createdAt +
          "</small>"
      );
      $("#updatedDetail").html(
        "<small>Updated By : " +
          data.pilarsdg.userUpdated +
          "<br>Updated At : " +
          data.pilarsdg.updatedAt +
          "</small>"
      );

      var statusMessage;
      if (data.pilarsdg.status === 1) {
        statusMessage = `<span class='rounded-pill bg-primary' style="padding:5px; color: white"> Active </span>`;
      } else if (data.pilarsdg.status === 0) {
        statusMessage = `<span class='rounded-pill bg-danger' style="padding:5px; color: white"> Inactive </span>`;
      } else {
        statusMessage = "-";
      }

      $("#ajaxModelDetail").modal("show");
      $("#kode_pilarD").html(data.pilarsdg.kode_pilar);
      $("#nama_pilarD").html(data.pilarsdg.nama_pilar);
      $("#keteranganD").html(data.pilarsdg.keterangan_detail);
      $("#status_dataD").html(statusMessage);
      $("#createdbyD").html(data.pilarsdg.userCreated);
      $("#createdatD").html(data.pilarsdg.createdAt);
      $("#updatedbyD").html(data.pilarsdg.userUpdated);
      $("#updatedatD").html(data.pilarsdg.updatedAt);

      var programListResult = "";
      var no = 1;
      data.program.forEach(function (element) {
        programListResult =
          programListResult +
          `` +
          no +
          `. &nbsp; ` +
          element.kode_program +
          ` - ` +
          element.nama_program +
          `<br>`;
        no++;
      });
      $("#programDetailD").html(programListResult);
      var html = "";
      var no = 1;
      data.programSelected.forEach(function (element) {
        html =
          html +
          `<tr><td>` +
          no +
          `</td><td>` +
          element.kode_program +
          `</td>
          <td style="text-align: center !important">` +
          element.nama_program +
          `</td></tr>`;
        no++;
      });

      $("#table_detail_kode").empty().append(html);
    });
  });

  // Action Save Data
  $("#saveBtn").click(function (e) {
    e.preventDefault();
    // console.log("data edit : ", $("#dataForm").serialize());
    $.ajax({
      data: $("#dataForm").serialize(),
      url: $("#dataForm").data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        Swal.fire("Success!", "Pilar SDG Berhasil Disimpan", "success").then(
          (result) => {
            $("#dataForm").trigger("reset");
            $("#ajaxModel").modal("hide");
            // toastr.success(data.success, "Save Success", {"iconClass": 'toast-success'});
            location.href = btnBackURLHome;
            table.draw();
          }
        );
      },
      error: function (data) {
        // console.log("Error:", data.responseJSON.errors.kode_pilar);
        message = data.responseJSON.errors.kode_pilar;
        toastr.error(message, "Save Failed", {
          iconClass: "toast-error",
        });
      },
    });
    $("#search_form").trigger("reset");
  });

  // Action Change Status
  var url_switch = $("#table_pilarsdg").data("switchurl");
  $("body").on("click", ".switchStatus", function () {
    var id = $(this).data("id");
    // console.log($("#switch_status_" + id).is(":checked"));
    // console.log("id ", id);

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
            // console.log("Error:", data);
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

  // Action Looping Form Kode Perkiraan
  var html = $(".clones").html();

  $("#btn-program-add").click(function () {
    var jum = $("#count").val();
    if (jum < 50) {
      var html2 = html;
      $(".increments").after(html2);
      $("#count").val(parseInt(jum) + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Data Maksimal 50 buah!",
        text: "Hanya diperbolehkan menambahkan data kode perkiraan hingga 50 buah",
        confirmButtonText: "Tutup",
      });
    }
  });

  function actionAddForm() {}

  // Delete Looping Form Kode Perkiraan
  $("body").on("click", ".btn-danger", function () {
    $(this).parents(".control-groups").remove();
    var jum = $("#count").val();
    $("#count").val(parseInt(jum) - 1);
  });

  //=========EDIT
  // Action Looping Form Kode Perkiraan EDIT
  var htmledit = $(".clonesedit").html();

  $("#btn-program-add-edit").click(function () {
    var jum = $("#countedit").val();
    if (jum < 50) {
      var html2 = htmledit;
      $(".incrementsedit").after(html2);
      $("#countedit").val(parseInt(jum) + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Data Maksimal 50 buah!",
        text: "Hanya diperbolehkan menambahkan data kode perkiraan hingga 50 buah",
        confirmButtonText: "Tutup",
      });
    }
  });

  function actionAddForm() {}

  // Delete Looping Form Kode Perkiraan EDIT
  $("body").on("click", ".btn-danger-edit", function () {
    $(this).parents(".control-groups").remove();
    var jum = $("#countedit").val();
    $("#countedit").val(parseInt(jum) - 1);
  });

  // Confirmation Batal Simpan
  var btnBackURLHome = $("#dataForm").data("backurl");
  // console.log("back ", btnBackURLHome);
  // Confirmation Batal Update
  $("#batal-update").on("click", function (e) {
    Swal.fire({
      title: "Batal Update Data",
      text: "Yakin ingin membatalkan update data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Batalkan!",
      cancelButtonText: "Lanjutkan Edit Data",
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = btnBackURLHome;
        table.draw();
      }
    });
  });

  $("#batal-simpan").on("click", function (e) {
    Swal.fire({
      title: "Batal Simpan Data",
      text: "Yakin ingin membatalkan inputan data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Batalkan!",
      cancelButtonText: "Lanjutkan Input Data",
    }).then((result) => {
      if (result.isConfirmed) {
        location.href = btnBackURLHome;
        table.draw();
      }
    });
  });
});
