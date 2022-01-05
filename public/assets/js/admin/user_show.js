function active() {
    var active = $("#active");

    var id = active.data('value');
    var url = active.data('url');
    var token = $("meta[name='csrf-token']").attr("content");

    Swal.fire({
        title: "Confirmation",
        text: 'Apakah anda yakin akan mengaktifkan data ini ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Active',
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-primary ml-1',
        buttonsStyling: false
    }).then(function (result) {
        if (result.value) {
            loadingScreen('Loading ...');
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    _token: token,
                    id: id
                },
                success: function (response) {
                    $.unblockUI();
                    if (response.status == 200) {
                        Swal.fire({
                            icon: "success",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        }).then(function (result) {
                            if (result.value) {
                                loadingScreen('Redirecting ...');
                                window.location.href = "/user/show/" + id;
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        }).then(function (result) {
                            if (result.value) {
                                loadingScreen('Redirecting ...');
                                window.location.href = "/user/show/" + id;
                            }
                        });
                    }
                }
            });
        }
    });
}

function lock() {
    var active = $("#lock");

    var id = active.data('value');
    var url = active.data('url');
    var token = $("meta[name='csrf-token']").attr("content");

    Swal.fire({
        title: "Confirmation",
        text: 'Apakah anda yakin akan mengunci data ini ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Kunci',
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-primary ml-1',
        buttonsStyling: false
    }).then(function (result) {
        if (result.value) {
            loadingScreen('Loading ...');
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    _token: token,
                    id: id
                },
                success: function (response) {
                    $.unblockUI();
                    if (response.status == 200) {
                        Swal.fire({
                            icon: "success",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        }).then(function (result) {
                            if (result.value) {
                                loadingScreen('Redirecting ...');
                                window.location.href = "/user/show/" + id;
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        }).then(function (result) {
                            if (result.value) {
                                loadingScreen('Redirecting ...');
                                window.location.href = "/user/show/" + id;
                            }
                        });
                    }
                }
            });
        }
    });
}

function inactive() {
    var active = $("#inactive");

    var id = active.data('value');
    var url = active.data('url');
    var token = $("meta[name='csrf-token']").attr("content");

    Swal.fire({
        title: "Confirmation",
        text: 'Apakah anda yakin akan meng non-aktifkan data ini ?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Inactive',
        confirmButtonClass: 'btn btn-danger',
        cancelButtonClass: 'btn btn-primary ml-1',
        buttonsStyling: false
    }).then(function (result) {
        if (result.value) {
            loadingScreen('Loading ...');
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    _token: token,
                    id: id
                },
                success: function (response) {
                    $.unblockUI();
                    if (response.status == 200) {
                        Swal.fire({
                            icon: "success",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        }).then(function (result) {
                            if (result.value) {
                                loadingScreen('Redirecting ...');
                                window.location.href = "/user/show/" + id;
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: response.header,
                            text: response.message,
                            confirmButtonClass: 'btn btn-success'
                        }).then(function (result) {
                            if (result.value) {
                                loadingScreen('Redirecting ...');
                                window.location.href = "/user/show/" + id;
                            }
                        });
                    }
                }
            });
        }
    });
}

function loadingScreen(msg) {
    var $white = '#fff';
    var src = $("#logo_kai").attr('src');
    $.blockUI({
        message: '<img src="' + src + '" style="height: 80px; width: auto"> <hr> <h3>' + msg + '</h3>',
        timeout: 5000, //unblock after 5 seconds
        overlayCSS: {
            backgroundColor: $white,
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}