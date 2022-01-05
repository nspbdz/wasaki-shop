$(function () {
  var pembayaran = document.getElementById("sisa_dana_input");
  var totalBayar_edit = document.getElementById("totalBayar_edit");
  pembayaran.addEventListener("keyup", function (e) {
    pembayaran.value = formatRupiah(this.value);
    // console.log(pembayaran.value);
    var bayar = pembayaran.value.replace(".", "");
    var bayarInt = parseInt(bayar);
    var totalBayar = parseInt(totalBayar_edit.value);
    // console.log(totalBayar);
    var reverse = bayarInt.toString().split("").reverse().join(""),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join(".").split("").reverse().join("");

    document.getElementById("sisa_dana_input").value = ribuan;
  });

  /* Fungsi formatRupiah */
  function formatRupiah(angka, prefix) {
    var number_string = angka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  // Approve Button
  $("#pengembalian").click(function (e) {
    e.preventDefault();
    // $("#data_id").val("");
    $("#dataFormPengembalian").trigger("reset");
    $("#modelHeadingPengembalian").html("Masukkan Informasi G.215");
    $("#modalPengembalian").modal("show");
  });

  $("#savePengembalian").click(function (e) {
    e.preventDefault();
    $.ajax({
      data: $("#dataFormPengembalian").serialize(),
      url: $("#dataFormPengembalian").data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        Swal.fire("Sukses Menyimpan Data!", data.success, "success").then(
          (result) => {
            location.href = $("#dataFormPengembalian").data("backhome");
          }
        );
      },
      error: function (data) {
        console.log("Error:", data);
        message = data.responseJSON.errors.kode_sektor;
        toastr.error(message, "Save Failed", {
          iconClass: "toast-error",
        });
      },
    });
  });
});
