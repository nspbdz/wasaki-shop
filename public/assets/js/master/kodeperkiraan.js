$(function () {
  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });

  var src = $("#logo_kai").attr("src");
  var $white = "#fff";

  var parent = $("#parent_select");
  parent.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Kode Perkiraan Parent",
    ajax: {
      dataType: "json",
      url: $("#createNewData").data("url"),
      type: "GET",
      delay: 250,
      processResults: function (data) {
        return {
          results: data,
        };
      },
      cache: true,
    },
  });

  // var data = {
  //   id: 0,
  //   text: "Tidak Ada Parent",
  // };

  // var newOption = new Option(data.text, data.id, true, true);
  // $("#parent_select").append(newOption).trigger("change");

  var parentF = $("#parent");
  parentF.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Kode Perkiraan Parent",
  });

  var jenisperkiraan = $("#jenisperkiraan_select");
  jenisperkiraan.select2({
    // theme: 'bootstrap4',
    placeholder: "Pilih Jenis Perkiraan",
  });

  var url = $("#table_kode_perkiraan").data("url");
  var table = $("#table_kode_perkiraan").DataTable({
    processing: true,
    paginate: true,
    lengthChange: true,
    serverSide: true,
    scrollX: false,
    bFilter: false,
    // dom: '<"top"i>rt<"bottom"><"clear">',
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
        d.search = $("input[name=search_kode]").val();
        d.parent = $("select#parent option:checked").val();
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
        data: "parent",
        name: "parent",
      },
      {
        data: "parent_nama",
        name: "parent_nama",
      },
      {
        data: "jenis_perkiraan",
        name: "jenis_perkiraan",
      },
      {
        data: "kode_perkiraan",
        name: "kode_perkiraan",
      },
      {
        data: "nama_perkiraan",
        name: "nama_perkiraan",
      },
      {
        data: "jenis_akun",
        name: "jenis_akun",
      },
    ],
  });

  // Reset Button
  $("#reset_form_kode").on("click", function (e) {
    e.preventDefault();
    $("#search_form_kode").trigger("reset");
    $("#parent").val(null).trigger("change");
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

  $("#reset_parent").on("click", function (e) {
    e.preventDefault();
    $("#parent_select").val(null).trigger("change");
  });

  // Search Filter
  $("#search_form_kode").on("submit", function (e) {
    e.preventDefault();
    table.draw();
  });

  // Tambah Data
  $("#createNewData").click(function () {
    $("#saveBtn").val("create-product");
    $("#data_id").val("");
    $("#dataForm").trigger("reset");
    $("#modelHeading").html("Tambah Data");
    $("#ajaxModel").modal("show");
    $("#created").html("Kode Perkiraan");
    $("#updated").html("");
    $("#saveBtn").text("Simpan");

    $("#parent_select").val(null).trigger("change");
    $("#jenisperkiraan_select").val(null).trigger("change");
    $("#kode_perkiraan").attr("disabled", false);
  });

  // Edit Data
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
      $("#kode_perkiraan").val(data.kode_perkiraan);
      $("#nama_perkiraan").val(data.nama_perkiraan);
      $("input[name=jenis_akun]")
        .val([data.jenis_akun])
        .attr("checked", "checked");
      $("#jenisperkiraan_select")
        .val(data.id_jenis_perkiraan)
        .trigger("change");
      $("#kode_perkiraan").attr("disabled", true);

      if (
        data.parent_kode_perkiraan !== "" &&
        data.parent_kode_perkiraan !== null
      ) {
        $("#parent_select").val(data.parent_kode_perkiraan).trigger("change");
      } else {
        $("#parent_select").val(0).trigger("change");
      }
    });
  });

  // Preview Detail
  $("body").on("click", "#detailData", function (e) {
    var uri = $(this).data("href");
    $.get(uri, function (data) {
      // console.log("data detail : ", data);

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
      $("#parentD").html(data.parent);
      $("#kode_perkiraanD").html(data.kode_perkiraan);
      $("#nama_perkiraanD").html(data.nama_perkiraan);
      $("#jenis_perkiraan_detailD").html(data.jenis_perkiraan_detail);
      $("#jenis_akunD").html(data.jenis_akun);
      $("#status_dataD").html(statusMessage);
      $("#createdbyD").html(data.userCreated);
      $("#createdatD").html(data.createdAt);
      $("#updatedbyD").html(data.userUpdated);
      $("#updatedatD").html(data.updatedAt);
    });
  });

  // Action Save
  $("#saveBtn").click(function (e) {
    e.preventDefault();
    // console.log("data edit : ", $("#dataForm").serialize());
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
        // console.log("Error:", data);
        message = data.responseJSON.errors.kode_perkiraan;
        toastr.error(message, "Save Failed", {
          iconClass: "toast-error",
        });
      },
    });
    $("#search_form_kode").trigger("reset");
  });

  // Action Change Status
  var url_switch = $("#table_kode_perkiraan").data("switchurl");
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

  // Hierarki
  // Expand / Collapse All options define here
  var $primary = "#5A8DEE",
    $danger = "#FF5B5C",
    $warning = "#FDAC41",
    $primary_light = "#e6ecf2",
    $warning_light = "#FFEED9",
    $dark_primary = "#2c6de9",
    $hover_warning = "#fed8a6",
    $white = "#fff";

  // a default data nested arrary for treeview
  var return_first = (function () {
    var tmp = null;
    $.ajax({
      async: false,
      type: "GET",
      global: false,
      dataType: "html",
      url: $("#hierarki-tab-fill").data("url"),
      data: { request: "", target: "arrange_url", method: "method_target" },
      success: function (data) {
        tmp = data;
      },
    });
    return tmp;
  })();

  // console.log("data hirarki : ", return_first);

  // a default data nested arrary for treeview
  var defaultData = [
    {
      text: "Parent 1",
      href: "#parent1",
      tags: ["4"],
      nodes: [
        {
          text: "Child 1",
          href: "#child1",
          tags: ["2"],
          nodes: [
            {
              text: "Grandchild 1",
              href: "#grandchild1",
              tags: ["0"],
            },
            {
              text: "Grandchild 2",
              href: "#grandchild2",
              tags: ["0"],
            },
          ],
        },
        {
          text: "Child 2",
          href: "#child2",
          tags: ["0"],
        },
      ],
    },
    {
      text: "Parent 2",
      href: "#parent2",
      tags: ["0"],
    },
    {
      text: "Parent 3",
      href: "#parent3",
      tags: ["0"],
    },
    {
      text: "Parent 4",
      href: "#parent4",
      tags: ["0"],
    },
    {
      text: "Parent 5",
      href: "#parent5",
      tags: ["0"],
    },
  ];

  var $expandibleTree = $("#expandible-tree").treeview({
    expandIcon: "bx bx-stop-circle",
    collapseIcon: "bx bx-check-square",
    nodeIcon: "icon-head",
    color: [$primary],
    backColor: [$white],
    onhoverColor: [$primary_light],
    borderColor: [$primary_light],
    showBorder: true,
    showTags: true,
    highlightSelected: true,
    selectedColor: [$white],
    selectedBackColor: [$dark_primary],
    data: return_first,
  });

  // Expand btn's method fire here
  $("#btn-expand-all").on("click", function (e) {
    var levels = $("#select-expand-all-levels").val();
    $expandibleTree.treeview("expandAll", {
      levels: 5,
    });
  });
  //  Collapse btn's methode fire here
  $("#btn-collapse-all").on("click", function (e) {
    $expandibleTree.treeview("collapseAll");
  });

  $("#default-treeview").treeview({
    selectedBackColor: [$primary],
    data: dataHirarki,
  });
});
