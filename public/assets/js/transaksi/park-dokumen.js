$(function () {
  $("#nilai_evaluasi_input").keyup(function (e) {
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

  // Approve Button
  $("#approvePark").click(function (e) {
    e.preventDefault();
    // $("#data_id").val("");
    $("#dataFormPark").trigger("reset");
    $("#modelHeadingPark").html("Masukkan Informasi Park Dokumen");
    $("#modalPark").modal("show");
  });

  $("#savePark").click(function (e) {
    e.preventDefault();
    console.log(
      "data edit : ",
      $("#dataFormApproveParkdokumenApproved").serialize()
    );
    $.ajax({
      data: $("#dataFormApproveParkdokumenApproved").serialize(),
      url: $("#dataFormApproveParkdokumenApproved").data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        Swal.fire("Success!", data.success, "success").then((result) => {
          location.href = $("#dataFormApproveParkdokumen").data("backhome");
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

  // Reject Button
  $("#rejectPark").click(function (e) {
    e.preventDefault();

    Swal.fire({
      title: "Tolak Data Penyaluran - Park Dokumen",
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
          data: $("#dataFormApproveParkdokumen").serialize(),
          url: $("#dataFormApproveParkdokumen").data("urlrejected"),
          type: "POST",
          dataType: "json",
          success: function (data) {
            Swal.fire(
              "Success!",
              "Data Penyaluran - Park Dokumen Sukses Ditolak",
              "success"
            ).then((result) => {
              location.href = $("#dataFormApproveParkdokumen").data("backhome");
            });
          },
          error: function (data) {
            console.log("Error:", data);
            message = data.responseJSON.message;
            $("#saveBtnImport").html("Save Changes");
            toastr.error("Komentar harus diisi", "Save Failed", {
              iconClass: "toast-error",
            });
          },
        });
      }
    });
  });
});
