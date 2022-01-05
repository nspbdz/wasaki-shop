$(function () {
  // Approve Button
  $("#terbitG61").click(function (e) {
    e.preventDefault();
    // $("#data_id").val("");
    $("#dataFormPark").trigger("reset");
    $("#modelHeadingPjj").html("Masukkan Informasi G.61");
    $("#modalPjj").modal("show");
  });

  $("form#dataFormPjj").submit(function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var tolak_checked = $('input[name="tolakBantuan_checkbox"]').val();
    console.log("form ", tolak_checked);
    $.ajax({
      url: $("#dataFormPjj").data("url"),
      type: "POST",
      data: formData,
      success: function (data) {
        if (tolak_checked == "on") {
          location.href = $("#dataFormPjj").data("terima");
        } else {
          location.href = $("#dataFormPjj").data("tolak");
        }
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
