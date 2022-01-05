// ############################################################ form submit ################################################################
$('#form-add-prov').on('submit', function (e) {
    e.preventDefault();

    $(this).find('input[type!="hidden"]').each(function () {
        if (!$(this).val()) { emptyVal = true; return false; }
    });

    if (emptyVal) {
        $('#toastProv').toast({
            delay: 3000,
        });
        $('.message-fail-prov').text("Pastikan form terisi semua");
        $('#toastProv').toast('show');
    } else {
        var form = $('#form-add-prov').serialize();
        var action = $('#form-add-prov').prop('action');
        $.ajax({
            type: 'post',
            url: action,
            data: form,
            dataType: 'json',
            beforeSend: function () {
                var loader = '<div class="spinner-border" role="status" style="width: 1rem; height: 1rem;">' +
                    '<span class="sr-only">Loading...</span>' +
                    '</div>';
                $('.btn-add-prov').html(loader);
                $('.btn-cancel-add-prov').prop('disabled', true);
                $('.btn-add-prov').prop('disabled', true);
            },
            success: function (response) {
                $('.btn-cancel-add-prov').prop('disabled', false);
                $('.btn-add-prov').prop('disabled', false);
                $('.btn-add-prov').html('Simpan');
                if (response.message == 'success') {
                    //clear modal and form
                    $('.modal-add-prov').modal('hide');
                    document.getElementById('form-add-prov').reset();

                    var table = $('#table-prov').DataTable();
                    table.destroy();

                    showAllData();

                    Swal.fire({
                        title: 'Sukses',
                        text: 'Provinsi ' + response.data + ' berhasil di simpan',
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

$('#form-check-prov').submit(function (e) {
    e.preventDefault();

    var data = new FormData($(this)[0]);

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: "/provinsi/checkvalidate",
        contentType: false,
        processData: false,
        data: data,
        beforeSend: function () {
            var loader = '<div class="text-center">' +
                '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                '<span class="visually-hidden"></span>' +
                '</div>' +
                '</div>';

            $('.btn-add-prov').html(loader);
            $('.btn-add-prov').prop('disabled', true);
        },
        success: function (response) {
            $('.btn-add-prov').html('Simpan');
            $('.row-preview-import-prov').html(response);
            $('.row-main-provinsi').hide();
            $('.row-preview-import-prov').show();
            $('.modal-add-prov').modal('hide');
            $('.btn-add-prov').removeAttr('disabled');
        }
    })
});

$('body').on('click', '.btn-edit-prov', function (e) {
    e.preventDefault();

    $(this).find('input[type!="hidden"]').each(function () {
        if (!$(this).val()) { emptyVal = true; return false; }
    });

    if (emptyVal) {
        $('#toastProv').toast({
            delay: 3000,
        });
        $('.message-fail-prov').text("Pastikan form terisi semua");
        $('#toastProv').toast('show');
    } else {
        var form = $('#form-edit-prov').serialize();

        $.ajax({
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: "/provinsi/postEdit",
            data: form,
            beforeSend: function () {
                var loader = '<div class="text-center">' +
                    '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                    '<span class="visually-hidden"></span>' +
                    '</div>' +
                    '</div>';

                $('.btn-edit-prov').html(loader);
                $('.btn-cancel-edit-prov').prop('disabled', true);
                $('.btn-edit-prov').prop('disabled', true);
            },
            success: function (response) {
                $('.btn-cancel-edit-prov').prop('disabled', false);
                $('.btn-edit-prov').prop('disabled', false);
                $('.btn-edit-prov').html('Simpan');
                if (response == 'success') {
                    var table = $('#table-prov').DataTable();
                    table.destroy();

                    showAllData();

                    $('.modal-edit-prov').modal('hide');

                    Swal.fire({
                        title: 'Sukses',
                        text: 'Data berhasil di edit',
                        icon: 'success',
                    });
                    getDetailProv();
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

$("body").on("click", ".delete-prov-btn", function (e) {
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
                url: "/provinsi/delete",
                data: {
                    id: id
                },
                beforeSend: function () {
                    var loader = '<div class="text-center">' +
                        '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                        '<span class="visually-hidden"></span>' +
                        '</div>' +
                        '</div>';

                    $('#delete-prov-btn' + id).html(loader);
                },
                success: function (response) {
                    var dump = '<i class="bx bx-trash" aria-hidden="true" id="deleteProv"></i>';
                    $('#delete-prov-btn' + id).html(dump);
                    if (response == 'success') {
                        var table = $('#table-prov').DataTable();
                        table.destroy();

                        showAllData();

                        Swal.fire({
                            title: 'Sukses',
                            text: 'Data berhasil di hapus',
                            icon: 'success',
                        });
                    } else if (response == 'relation') {
                        Swal.fire({
                            title: 'Gagal',
                            text: 'Data tidak bisa di hapus, pastikan tidak mempunyai relasi dengan menu lain',
                            icon: 'error',
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

// $("body").on("click", ".nonactive-prov-btn", function (e) {
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
//                 url: "/provinsi/nonactive",
//                 data: {
//                     id: id
//                 },
//                 beforeSend: function () {
//                     var loader = '<div class="text-center">' +
//                         '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
//                         '<span class="visually-hidden"></span>' +
//                         '</div>' +
//                         '</div>';

//                     $('#nonactive-prov-btn' + id).html(loader);
//                 },
//                 success: function (response) {
//                     var dump = '<i class="bx bx-trash" aria-hidden="true" id="deleteProv"></i>';
//                     $('#nonactive-prov-btn' + id).html(dump);
//                     if (response == 'success') {
//                         var table = $('#table-prov').DataTable();
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

// $("body").on("click", ".reactive-prov-btn", function (e) {
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
//                 url: "/provinsi/reactive",
//                 data: {
//                     id: id
//                 },
//                 beforeSend: function () {
//                     var loader = '<div class="text-center">' +
//                         '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
//                         '<span class="visually-hidden"></span>' +
//                         '</div>' +
//                         '</div>';

//                     $('#reactive-prov-btn' + id).html(loader);
//                 },
//                 success: function (response) {
//                     var dump = '<i class="bx bx-trash" aria-hidden="true" id="deleteProv"></i>';
//                     $('#reactive-prov-btn' + id).html(dump);
//                     if (response == 'success') {
//                         var table = $('#table-prov').DataTable();
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
// $("body").on("click", ".detail-prov-btn", function (e) {
//     e.preventDefault();

//     var id = $(this).data('id');

//     $.ajax({
//         type: 'post',
//         headers: {
//             "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
//         },
//         data: {
//             id: id
//         },
//         url: '/provinsi/detail',
//         beforeSend: function () {
//             $('#modalLoader').modal('show');
//         },
//         success: function (response) {
//             $('#modalLoader').modal('hide');
//             $('.modal-detail-prov').html(response);
//             $('.modal-detail-prov').modal('show');
//         }
//     })
// })

$("body").on("click", ".edit-prov-btn", function (e) {
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
        url: '/provinsi/edit',
        beforeSend: function () {
            $('#modalLoader').modal('show');
        },
        success: function (response) {
            $('#modalLoader').modal('hide');
            $('#modalEditProv').html(response);
            $('#modalEditProv').modal('show');
        }
    })
})

$("body").on("click", ".switchStatusProv", function (e) {
    e.preventDefault();

    var active = $(this).data('toogle');
    var buttonText, successText;

    if (active == "active") {
        buttonText = "Non-Aktifkan";
        successText = "Data berhasil di nonaktifkan";
    } else {
        buttonText = "Aktifkan";
        successText = "Data berhasil di aktifkan";
    }

    Swal.fire({
        title: "Change Data Status",
        text: "Yakin ingin menonaktifkan data ini?",
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
                url: "/provinsi/changeStatus",
                data: {
                    id: id,
                    target: active
                },
                beforeSend: function () {
                    var loader = '<div class="text-center">' +
                        '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                        '<span class="visually-hidden"></span>' +
                        '</div>' +
                        '</div>';

                    $('#nonactive-prov-btn' + id).html(loader);
                },
                success: function (response) {
                    var dump = '<i class="bx bx-trash" aria-hidden="true" id="deleteProv"></i>';
                    $('#nonactive-prov-btn' + id).html(dump);
                    if (response == 'success') {
                        var table = $('#table-prov').DataTable();
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

$(document).ready(function () {
    $('#modalAddProv').on('show.bs.modal', function (e) {
        document.getElementById('form-add-prov').reset();
        document.getElementById('form-check-prov').reset();
    });

    $('#modalImportProv').on('show.bs.modal', function (e) {
        document.getElementById('form-check-prov').reset();
    });

    showAllData();
})


function showAllData() {
    $('#table-prov').DataTable({
        ajax: "/provinsi/get",
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
                orderable: false,
                searchable: false,
            },
            {
                data: 'kode_provinsi',
                name: 'kode_provinsi',
                orderable: true,
                searchable: true,
            },
            {
                data: 'nama_provinsi',
                name: 'nama_provinsi',
                orderable: true,
                searchable: true,
            }
        ]
    });
}

function validateProv(event) {
    event.preventDefault();
    var code = $('.prev-code-prov').map(function () {
        return $(this).val();
    }).toArray();

    var name = $('.prev-name-prov').map(function () {
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
        },
        url: '/provinsi/validate',
        dataType: 'json',
        beforeSend: function () {
            var loader = '<div class="text-center">' +
                '<div class="spinner-border text-secondary" role="status" style="width: 1rem; height: 1rem;">' +
                '<span class="visually-hidden"></span>' +
                '</div>' +
                '</div>';

            $('.validate-btn-prov').html(loader);
        },
        success: function (response) {
            console.log(response);
            $('.validate-btn-prov').html('Validasi');
            var validate = '';
            for (var i = 0; i < response.length; i++) {
                if (response[i] == '0') {
                    $('#k' + i).html('TRUE');
                    $('#vcode' + i).addClass('vcode');
                    $('#vname' + i).addClass('vname');
                    $('#vstatus' + i).addClass('vstatus');
                } else if (response[i] == '1') {
                    $('#k' + i).html('Data ditemukan');
                }
            }

            $('.import-btn-prov').removeAttr('disabled');
            $('.validate-btn-prov').prop('disabled', true);
        }
    })
}

function importProv(event) {
    event.preventDefault();

    var code = $('.vcode').map(function () {
        return $(this).val();
    }).toArray();

    var name = $('.vname').map(function () {
        return $(this).val();
    }).toArray();

    var status = $('.vstatus').map(function () {
        return $(this).val();
    }).toArray();

    $.ajax({
        type: 'post',
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
        url: '/provinsi/import',
        data: {
            code: code,
            name: name,
            status: status
        },
        success: function (response) {
            console.log(response);
            if (response == 'success') {
                Swal.fire({
                    title: 'Sukses',
                    text: 'Import data berhasil',
                    icon: 'success',
                });
                setTimeout(function () {
                    var page = '/provinsi/';
                    window.location = page;
                }, 1000);
            } else {
                Swal.fire({
                    title: 'Gagal',
                    text: 'Import data tidak dapat dilakukan, secara otomatis anda akan di arahkan ke halaman awal',
                    icon: 'error',
                });

                setTimeout(function () {
                    var page = '/provinsi/';
                    window.location = page;
                }, 1500);
            }

        }
    })

}

function searchProv(event) {
    event.preventDefault();
    var table = $('#table-prov').DataTable();
    table.destroy();

    $('#table-prov').DataTable({
        ajax: {
            type: 'post',
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            url: '/provinsi/search',
            data: function (d) {
                d.name = $('#prov_name_search').val();
                d.code = $('#prov_code_search').val();
                d.status = $('#prov_status_search').val();
            },
        },
        bFilter: false,
        processing: true,
        serverSide: true,
        columns: [
            {
                data: 'action',
                name: 'action'
            },
            {
                data: 'kode_provinsi',
                name: 'kode_provinsi'
            },
            {
                data: 'nama_provinsi',
                name: 'nama_provinsi'
            },
            {
                data: 'status',
                name: 'status'
            }
        ]
    });

}

function resetTable(event) {
    event.preventDefault();

    var table = $('#table-prov').DataTable();
    table.destroy();

    document.getElementById('search-prov').reset();

    showAllData();
}