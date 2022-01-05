$(function () {
  // Approve Button
  $("#sudahTransfer").click(function (e) {
    e.preventDefault();
    // $("#data_id").val("");
    $("#dataFormPark").trigger("reset");
    $("#modelHeadingPark").html("Masukkan Bukti Transfer");
    $("#modalTransfer").modal("show");
  });

  $("form#dataFormSudahTransfer").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    console.log("form ", formData);
    $.ajax({
      url: $("#dataFormSudahTransfer").data("url"),
      type: "POST",
      data: formData,
      success: function (data) {
        console.log("success : ", data);
        Swal.fire(
          "Upload Sukses!",
          "Bukti transfer berhasil diupload",
          "success"
        ).then((result) => {
          location.href = $("#dataFormSudahTransfer").data("backhome");
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
});
