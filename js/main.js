$(document).ready(function () {
    $('#searchUser').keyup(function (e) { 
        let username = e.target.value;

        $.ajax({
            url: "",
            data: "data",
            dataType: "dataType",
            success: function (response) {
                
            }
        });
    });
});