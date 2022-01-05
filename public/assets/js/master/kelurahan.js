// ############################################################ form submit ################################################################
$('#form-add-kelurahan').on('submit', function (e) {
    e.preventDefault();

    // validatation 
    var emptyVal = false;

    $(this).find('input[class!="form-control descKelurahan"]').each(function () {
        if (!$(this).val()) { emptyVal = true; return false; }
    });

    if (emptyVal) {
        $('#toast').toast({
            delay: 3000,
        });
        $('.message-fail-kelurahan').text("Pastikan form terisi semua");
        $('#toast').toast('show');
    } else {
        var form = $('#form-add-kelurahan').serialize();
        var action = $('#form-add-kelurahan').prop('action');
        $.ajax({
            type: 'post',
            url: action,
            data: form,
            dataType: 'json',
            beforeSend: function () {
                $('.modal-add-kelurahan').modal('hide');
                loadingGetData();
            },
            success: function (response) {
                $('.btn-cancel-add-kelurahan').prop('disabled', false);
                $('.btn-add-kelurahan').prop('disabled', false);
                $('.btn-add-kelurahan').html('Simpan');
                $.unblockUI();
                loadingRedirecting();
                if (response.message == 'success') {
                    //clear modal and form
                    document.getElementById('form-add-kelurahan').reset();

                    var table = $('#table-kelurahan').DataTable();
                    table.destroy();

                    showAllData();

                    Swal.fire({
                        title: 'Sukses',
                        text: 'Kelurahan ' + response.data + ' berhasil di simpan',
                        icon: 'success',
                    });
                } else if (response.message == 'duplicate') {
                    Swal.fire({
                        title: 'Duplikat',
                        text: response.data + ' sudah ada di database',
                        icon: 'error'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error saat menyimpan ke databaase',
                        icon: 'warning'
                    });
                }
            }
        })
    }

});

$('#form-check-kelurahan').submit(function (e) {
    e.preventDefault();

    var data = new FormData($(this)[0]);

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: "/kelurahan/checkvalidate",
        contentType: false,
        processData: false,
        data: data,
        beforeSend: function () {
            loadingRedirecting();
        },
        success: function (response) {
            $.unblockUI();
            $('.btn-add-kelurahan').html('Simpan');
            $('.modal-add-kelurahan').modal('hide');
            $('.row-preview-kelurahan').show();
            $('.row-preview-kelurahan').html(response);
            $('.row-main-kelurahan').hide();
            $('.modal-import-kelurahan').modal('hide');
            $('.btn-add-kelurahan').removeAttr('disabled');
        }
    })
});

$("body").on("click", ".switchStatusKelurahan", function (e) {
    e.preventDefault();

    var active = $(this).data('toogle');
    var buttonText, successText, confirmText;

    if (active == "active") {
        buttonText = "Non-Aktifkan";
        successText = "Data berhasil di nonaktifkan";
        confirmText = "Yakin ingin menonaktifkan data ini?";
    } else {
        buttonText = "Aktifkan";
        successText = "Data berhasil di aktifkan";
        confirmText = "Yakin ingin mengaktifkan data ini?";
    }

    Swal.fire({
        title: "Change Data Status",
        text: confirmText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: buttonText
    }).then((result) => {
        if (result.isConfirmed) {
            var id = $(this).data('id');

            $.ajax({
                type: 'post',
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
                url: "/kelurahan/changeStatus",
                data: {
                    id: id,
                    target: active
                },
                beforeSend: function () {
                    loadingGetData();
                },
                success: function (response) {
                    var dump = '<i class="bx bx-trash" aria-hidden="true" id="deleteProv"></i>';
                    $('#nonactive-kelurahan-btn' + id).html(dump);
                    if (response == 'success') {
                        $.unblockUI();
                        loadingRedirecting();
                        var table = $('#table-kelurahan').DataTable();
                        table.destroy();

                        showAllData();

                        Swal.fire({
                            title: 'Sukses',
                            text: successText,
                            icon: 'success',
                        });
                    } else {
                        Swal.fire({
                            title: 'Gagal',
                            text: 'Gagal menonaktifkan data',
                            icon: 'error',
                        });
                    }
                }
            })
        }
    });
})

$('body').on('click', '.btn-edit-kelurahan', function (e) {
    e.preventDefault();

    // validatation 
    var emptyVal = false;

    $(this).find('input[class!="form-control descKelurahan"]').each(function () {
        if (!$(this).val()) { emptyVal = true; return false; }
    });

    if (emptyVal) {
        $('#toast').toast({
            delay: 3000,
        });
        $('.message-fail-area').text("Pastikan form terisi semua");
        $('#toast').toast('show');
    } else {
        var form = $("#form-edit-kelurahan").serialize();

        $.ajax({
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: "/kelurahan/postEdit",
            data: form,
            beforeSend: function () {
                $('.modal-edit-kelurahan').modal('hide');
                loadingGetData();
            },
            success: function (response) {
                $.unblockUI();
                if (response == 'success') {

                    var table = $('#table-kelurahan').DataTable();
                    table.destroy();

                    showAllData();


                    Swal.fire({
                        title: 'Sukses',
                        text: 'Data berhasil di edit',
                        icon: 'success',
                    });

                    getDetailKelurahan();
                } else if (response == 'duplicate') {
                    Swal.fire({
                        title: 'Gagal',
                        text: 'Data sudah ada di dalam database',
                        icon: 'warning',
                    });
                } else {
                    Swal.fire({
                        title: 'Gagal',
                        text: 'Gagal edit data',
                        icon: 'error',
                    });
                }
            }
        })
    }

})

$("body").on("click", ".delete-area-btn", function (e) {
    e.preventDefault();

    Swal.fire({
        title: 'Hapus data',
        text: "Anda yakin ingin menghapus data ini?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            var id = $(this).data('id');

            $.ajax({
                type: 'post',
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                },
                url: "/area/delete",
                data: {
                    id: id
                },
                beforeSend: function () {
                    var loader = '<div class="text-center">' +
                        '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                        '<span class="visually-hidden"></span>' +
                        '</div>' +
                        '</div>';

                    $('#delete-area-btn' + id).html(loader);
                },
                success: function (response) {
                    var dump = '<i class="bx bx-trash" aria-hidden="true" id="deleteArea"></i>';
                    $('#delete-area-btn' + id).html(dump);
                    if (response == 'success') {

                        var table = $('#table-area').DataTable();
                        table.destroy();

                        showAllData();

                        Swal.fire({
                            title: 'Sukses',
                            text: 'Data berhasil di hapus',
                            icon: 'success',
                        });
                    } else {
                        Swal.fire({
                            title: 'Gagal',
                            text: 'Gagal hapus data',
                            icon: 'error',
                        });
                    }
                }
            })
        }
    });
})

// $("body").on("click", ".nonactive-area-btn", function (e) {
//     e.preventDefault();

//     Swal.fire({
//         title: 'Apakah Anda yakin akan menonaktifkan data ini?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Ya',
//         cancelButtonText: 'Tidak'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             var id = $(this).data('id');

//             $.ajax({
//                 type: 'post',
//                 headers: {
//                     "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
//                 },
//                 url: "/area/nonactive",
//                 data: {
//                     id: id
//                 },
//                 beforeSend: function () {
//                     var loader = '<div class="text-center">' +
//                         '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
//                         '<span class="visually-hidden"></span>' +
//                         '</div>' +
//                         '</div>';

//                     $('#nonactive-area-btn' + id).html(loader);
//                 },
//                 success: function (response) {
//                     var dump = '<i class="bx bx-trash" aria-hidden="true" id="nonactiveAreaTrash"></i>';
//                     $('#nonactive-area-btn' + id).html(dump);
//                     if (response == 'success') {

//                         var table = $('#table-area').DataTable();
//                         table.destroy();

//                         showAllData();

//                         Swal.fire({
//                             title: 'Sukses',
//                             text: 'Data berhasil di nonaktifkan',
//                             icon: 'success',
//                         });
//                     } else {
//                         Swal.fire({
//                             title: 'Gagal',
//                             text: 'Gagal menonaktifkan data',
//                             icon: 'error',
//                         });
//                     }
//                 }
//             })
//         }
//     });
// })

// $("body").on("click", ".reactive-area-btn", function (e) {
//     e.preventDefault();

//     Swal.fire({
//         title: 'Apakah Anda yakin akan mengaktifkan kembali data ini?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Ya',
//         cancelButtonText: 'Tidak'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             var id = $(this).data('id');

//             $.ajax({
//                 type: 'post',
//                 headers: {
//                     "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
//                 },
//                 url: "/area/reactive",
//                 data: {
//                     id: id
//                 },
//                 beforeSend: function () {
//                     var loader = '<div class="text-center">' +
//                         '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
//                         '<span class="visually-hidden"></span>' +
//                         '</div>' +
//                         '</div>';

//                     $('#reactive-area-btn' + id).html(loader);
//                 },
//                 success: function (response) {
//                     var dump = '<i class="bx bx-trash" aria-hidden="true" id="reactiveAreaTrash"></i>';
//                     $('#reactive-area-btn' + id).html(dump);
//                     if (response == 'success') {

//                         var table = $('#table-area').DataTable();
//                         table.destroy();

//                         showAllData();

//                         Swal.fire({
//                             title: 'Sukses',
//                             text: 'Data berhasil di aktifkan',
//                             icon: 'success',
//                         });
//                     } else {
//                         Swal.fire({
//                             title: 'Gagal',
//                             text: 'Gagal mengaktifkan data',
//                             icon: 'error',
//                         });
//                     }
//                 }
//             })
//         }
//     });
// })

// e######################################################### event ################################################################

$("body").on("click", ".edit-kelurahan-btn", function (e) {
    e.preventDefault();

    var id = $(this).data('id');

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        data: {
            id: id
        },
        url: '/kelurahan/edit',
        beforeSend: function () {
            loadingGetData();
        },
        success: function (response) {
            $.unblockUI();
            $('#modalEditKelurahan').html(response);
            $('#modalEditKelurahan').modal('show');
        }
    })
})

$('#modalAddArea').on('show.bs.modal', function (e) {
    document.getElementById('form-add-area').reset();
});

$('#modalImportArea').on('show.bs.modal', function (e) {
    document.getElementById('form-check-area').reset();
});

$(document).ready(function () {
    showAllData();
})

function validateKelurahan(event) {
    event.preventDefault();
    var code = $('.prev-code-kelurahan').map(function () {
        return $(this).val();
    }).toArray();

    var name = $('.prev-name-kelurahan').map(function () {
        return $(this).val();
    }).toArray();

    var kec = $('.prev-kec-kelurahan').map(function () {
        return $(this).val();
    }).toArray();

    var postal = $('.prev-postal-kelurahan').map(function () {
        return $(this).val();
    }).toArray();

    var status = $('.prev-status-kelurahan').map(function () {
        return $(this).val();
    }).toArray();

    var desc = $('.prev-desc-kelurahan').map(function () {
        return $(this).val();
    }).toArray();

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        data: {
            code: code,
            name: name,
            kec: kec,
            desc: desc,
            postal: postal,
            status: status
        },
        url: '/kelurahan/validate',
        dataType: 'json',
        beforeSend: function () {
            loadingGetData();
        },
        success: function (response) {
            console.log(response);
            $.unblockUI();
            $('.validate-btn-kelurahan').html('Validasi');
            var validate = '';
            for (var i = 0; i < response.length; i++) {
                if (response[i] == '0') {
                    $('#kKel' + i).html('TRUE');
                    $('#vcodeKel' + i).addClass('vcodeKel');
                    $('#vnameKel' + i).addClass('vnameKel');
                    $('#vkecKel' + i).addClass('vkecKel');
                    $('#vpostalKel' + i).addClass('vpostalKel');
                    $('#vdescKel' + i).addClass('vdescKel');
                    $('#vstatusKel' + i).addClass('vstatusKel');
                } else if (response[i] == '1') {
                    $('#kKel' + i).html('Data ditemukan');
                }
            }

            $('.import-btn-kelurahan').removeAttr('disabled');
            $('.validate-btn-kelurahan').prop('disabled', true);
        }
    })
}

function importKelurahan(event) {
    event.preventDefault();

    var code = $('.vcodeKel').map(function () {
        return $(this).val();
    }).toArray();

    var name = $('.vnameKel').map(function () {
        return $(this).val();
    }).toArray();

    var kec = $('.vkecKel').map(function () {
        return $(this).val();
    }).toArray();

    var postal = $('.vpostalKel').map(function () {
        return $(this).val();
    }).toArray();

    var desc = $('.vdescKel').map(function () {
        return $(this).val();
    }).toArray();

    var status = $('.vstatusKel').map(function () {
        return $(this).val();
    }).toArray();

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: '/kelurahan/import',
        data: {
            code: code,
            name: name,
            kec: kec,
            desc: desc,
            postal: postal,
            status: status
        },
        beforeSend: function () {
            loadingGetData();
        },
        success: function (response) {
            $.unblockUI();
            $('.import-btn-kelurahan').html('Import');
            if (response == 'success') {
                Swal.fire({
                    title: 'Sukses',
                    text: 'Import data berhasil',
                    icon: 'success',
                });
                setTimeout(function () {
                    var page = '/kelurahan/';
                    window.location = page;
                }, 1000);
            } else {
                Swal.fire({
                    title: 'Gagal',
                    text: 'Import data tidak dapat dilakukan, secara otomatis anda akan di arahkan ke halaman awal',
                    icon: 'error',
                });

                setTimeout(function () {
                    var page = '/kelurahan/';
                    window.location = page;
                }, 1500);
            }

        }
    })

}

function showAllData() {
    $('#table-kelurahan').DataTable({
        ajax: "/kelurahan/get",
        bFilter: false,
        processing: true,
        serverSide: true,
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
        columns: [
            {
                data: "DT_RowIndex",
                name: "DT_RowIndex",
                orderable: false,
                searchable: false,
            },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false,
            },
            {
                data: 'status',
                name: 'status',
                orderable: true,
                searchable: true,
            },
            {
                data: 'kode_kelurahan',
                name: 'kode_kelurahan',
                orderable: true,
                searchable: true,
            },
            {
                data: 'nama_kelurahan',
                name: 'nama_kelurahan',
                orderable: true,
                searchable: true,
            },
            {
                data: 'kode_pos',
                name: 'kode_post',
                orderable: true,
                searchable: true,
            },
            {
                data: 'kecamatan',
                name: 'kecamatan',
                orderable: true,
                searchable: true,
            }
        ]
    });
}

function searchKelurahan(event) {
    event.preventDefault();

    var table = $('#table-kelurahan').DataTable();
    table.destroy();

    $('#table-kelurahan').DataTable({
        ajax: {
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: '/kelurahan/search',
            data: function (d) {
                d.name = $('#kelurahan_name_search').val();
                d.code = $('#kelurahan_code_search').val();
                d.kecamatan = $('#kelurahan_kec_search').val();
                d.status = $('#kelurahan_status_search').val();
            },
        },
        bFilter: false,
        processing: true,
        serverSide: true,
        columns: [
            {
                data: "DT_RowIndex",
                name: "DT_RowIndex",
                orderable: false,
                searchable: false,
            },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false,
            },
            {
                data: 'status',
                name: 'status',
                orderable: true,
                searchable: true,
            },
            {
                data: 'kode_kelurahan',
                name: 'kode_kelurahan',
                orderable: true,
                searchable: true,
            },
            {
                data: 'nama_kelurahan',
                name: 'nama_kelurahan',
                orderable: true,
                searchable: true,
            },
            {
                data: 'kode_pos',
                name: 'kode_post',
                orderable: true,
                searchable: true,
            },
            {
                data: 'kecamatan',
                name: 'kecamatan',
                orderable: true,
                searchable: true,
            }
        ]
    });

}

function resetTable(event) {
    event.preventDefault();

    var table = $('#table-kelurahan').DataTable();
    table.destroy();

    document.getElementById('search-kelurahan').reset();

    showAllData();
}

function loadingGetData() {
    var src = $("#logo_kai").attr('src');
    $.blockUI({
        message: '<img src="' + src + '" style="height: 80px; width: auto"> <hr> <h3>Mohon Tunggu ...</h3>',
        timeout: 2500, //unblock after 5 seconds
        overlayCSS: {
            backgroundColor: '#fff',
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

function loadingRedirecting() {
    var src = $("#logo_kai").attr('src');
    $.blockUI({
        message: '<img src="' + src + '" style="height: 80px; width: auto"> <hr> <h3>Redirecting ...</h3>',
        timeout: 2500, //unblock after 5 seconds
        overlayCSS: {
            backgroundColor: '#fff',
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