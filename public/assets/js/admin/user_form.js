/**
 * Created by DELL on 29/06/2021.
 */
 $(document).ready(function(){
    $("#username").change(function(){
        $("#err_username").addClass("hilang");
    });

    $("#email").change(function(){
        $("#err_email").addClass("hilang");
    });

    $("#start_date").change(function(){
        $("#err_start_date").addClass("hilang");
    });

    $("#end_date").change(function(){
        $("#err_end_date").addClass("hilang");
    });

    $("#nama").change(function(){
        $("#err_nama").addClass("hilang");
    });

    $("#nipp").change(function(){
        $("#err_nipp").addClass("hilang");
    });
    
    $("#role").change(function(){
        $("#err_role").addClass("hilang");
    });
});