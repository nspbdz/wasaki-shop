/*=========================================================================================
    File Name: wizard-steps.js
    Description: wizard steps page specific js
    ----------------------------------------------------------------------------------------
    Item Name: Frest HTML Admin Template
    Version: 1.0
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
//    Wizard tabs with icons setup
// ------------------------------
var no_voucher = $("#no_voucher").val();
$(".wizard-horizontal").steps({
  headerTag: "h6",
  bodyTag: "fieldset",
  transitionEffect: "fade",
  titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: "Submit",
  },
  onFinished: function (event, currentIndex) {
    // console.log("data edit : ", $("#dataFormCashCash").serialize());
    $.ajaxSetup({
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
    });
    // console.log("data ", $("#dataFormCashCash").serialize());
    $.ajax({
      data: $("#dataFormCashCash").serialize(),
      url: $("#dataFormCashCash").data("url"),
      type: "POST",
      dataType: "json",
      success: function (data) {
        // console.log("sukses ", data);
        Swal.fire(
          "Perubahan Status Berhasil",
          "Penyaluran Bina Lingkungan dengan Nomor Penyaluran " +
            no_voucher +
            " sudah berstatus Masuk Cash Card",
          "success"
        ).then((result) => {
          $("#dataFormCashCash").trigger("reset");
          $("#ajaxModel").modal("hide");
          // toastr.success(data.success, "Save Success", {"iconClass": 'toast-success'});
          location.href = $("#dataFormCashCash").data("backurl");
        });
      },
      error: function (data) {
        // console.log("Error:", data.responseText);
        message = data.responseText.message;
        toastr.error("Form Tidak Boleh Dikosongkan", "Save Failed", {
          iconClass: "toast-error",
        });
      },
    });
  },
});
//        vertical Wizard       //
// ------------------------------
$(".wizard-vertical").steps({
  headerTag: "h3",
  bodyTag: "fieldset",
  transitionEffect: "fade",
  enableAllSteps: true,
  stepsOrientation: "vertical",
  labels: {
    finish: "Submit",
  },
  onFinished: function (event, currentIndex) {
    alert("Form submitted.");
  },
});

//       Validate steps wizard //
// -----------------------------
// Show form
var stepsValidation = $(".wizard-validation");
var form = stepsValidation.show();

stepsValidation.steps({
  headerTag: "h6",
  bodyTag: "fieldset",
  transitionEffect: "fade",
  titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: "Submit",
  },
  onStepChanging: function (event, currentIndex, newIndex) {
    // Allways allow previous action even if the current form is not valid!
    if (currentIndex > newIndex) {
      return true;
    }
    form.validate().settings.ignore = ":disabled,:hidden";
    return form.valid();
  },
  onFinishing: function (event, currentIndex) {
    form.validate().settings.ignore = ":disabled";
    return form.valid();
  },
  onFinished: function (event, currentIndex) {
    alert("Submitted!");
  },
});

// Initialize validation
stepsValidation.validate({
  ignore: "input[type=hidden]", // ignore hidden fields
  errorClass: "danger",
  successClass: "success",
  highlight: function (element, errorClass) {
    $(element).removeClass(errorClass);
  },
  unhighlight: function (element, errorClass) {
    $(element).removeClass(errorClass);
  },
  errorPlacement: function (error, element) {
    error.insertAfter(element);
  },
  rules: {
    email: {
      email: true,
    },
  },
});
// live Icon color change on state change
$(document).ready(function () {
  $(".current").find(".step-icon").addClass("bx bx-time-five");
  $(".current").find(".fonticon-wrap .livicon-evo").updateLiviconEvo({
    strokeColor: "#5A8DEE",
  });
});
// Icon change on state
// if click on next button icon change
$(".actions [href='#next']").click(function () {
  $(".done")
    .find(".step-icon")
    .removeClass("bx bx-time-five")
    .addClass("bx bx-check-circle");
  $(".current")
    .find(".step-icon")
    .removeClass("bx bx-check-circle")
    .addClass("bx bx-time-five");
  // live icon color change on next button's on click
  $(".current").find(".fonticon-wrap .livicon-evo").updateLiviconEvo({
    strokeColor: "#5A8DEE",
  });
  $(".current")
    .prev("li")
    .find(".fonticon-wrap .livicon-evo")
    .updateLiviconEvo({
      strokeColor: "#39DA8A",
    });
});
$(".actions [href='#previous']").click(function () {
  // live icon color change on next button's on click
  $(".current").find(".fonticon-wrap .livicon-evo").updateLiviconEvo({
    strokeColor: "#5A8DEE",
  });
  $(".current")
    .next("li")
    .find(".fonticon-wrap .livicon-evo")
    .updateLiviconEvo({
      strokeColor: "#adb5bd",
    });
});
// if click on  submit   button icon change
$(".actions [href='#finish']").click(function () {
  $(".done")
    .find(".step-icon")
    .removeClass("bx-time-five")
    .addClass("bx bx-check-circle");
  $(".last.current.done").find(".fonticon-wrap .livicon-evo").updateLiviconEvo({
    strokeColor: "#39DA8A",
  });
});
// add primary btn class
$('.actions a[role="menuitem"]').addClass("btn btn-primary");
$('.icon-tab [role="menuitem"]').addClass("glow ");
$('.wizard-vertical [role="menuitem"]')
  .removeClass("btn-primary")
  .addClass("btn-light-primary");
