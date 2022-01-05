$(function () {
  // Action Looping Form Kode Perkiraan
  // Picker Translations
  $(".pickadate-translations-cash").pickadate({
    formatSubmit: "dd/mm/yyyy",
    monthsFull: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    monthsShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Ags",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    weekdaysShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    today: "Hari Ini",
    clear: "Reset",
    close: "Tutup",
  });

  var html = $(".clones").html();

  $("#btn-add").click(function () {
    var jum = $("#count").val();
    if (jum < 50) {
      var html2 = html;
      $(".increments").after(html2);
      $("#count").val(parseInt(jum) + 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Data Maksimal 50 pernyataan!",
        text: "Hanya diperbolehkan menambahkan premis perjanjian sebanyak 50 pernyataan",
        confirmButtonText: "Tutup",
      });
    }
  });

  // Delete Looping Form Kode Perkiraan
  $("body").on("click", ".btn-danger", function () {
    $(this).parents(".control-groups").remove();
    var jum = $("#count").val();
    $("#count").val(parseInt(jum) - 1);
  });

});
