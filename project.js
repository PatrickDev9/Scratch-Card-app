$('#backendlink').click(function (e) {
    e.preventDefault();
    $('#frontend').hide();
    $('#backend').show();
})

$('.signup').click(function (e) {
    e.preventDefault();
    $('#signin').hide();
    $('#signup').show();
})

$("#validate").click(function (e) {
    e.preventDefault()
    if ($("#password").val() == "password") {
        $('#operator').html('Welcome <strong>' + $('#decagon').val() + '</strong>');
        $('#hide').hide();
        $('#show').show();
    } else {
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    }
})

const succeed = () => {
    alert('posted');
    $('#signup').hide();
    $('#signin').show();
}

/*
 num of pins == 
 */

$(document).ready(() => {
    $(".signUpPage").click(function (e) {
        e.preventDefault();
        const user = $("#userIn").val();
        const pass = $('#passed').val();
        const names = {
            username: user,
            password: pass
        }
        $.post("http://localhost:3000/users", names, succeed());
    })

    $(".signInPage").click(function (e) {
        e.preventDefault();

        $.get('http://localhost:3000/users', function (names) {
            console.log(names);
            for (let a = 0; a < names.length; a++) {
                if ($("#username").val() == names[a]["username"] && $('#pass').val() == names[a]['password']) {
                    alert('yes');
                    $('#client').html('<p>Welcome <strong> ' + names[a]["username"] + '</strong></p>');
                    $('#frontend').hide();
                    $('#inside').show();
                }
            }
        })
    })

    $.get('http://localhost:3000/PinData', function (data) {
        for (let i = 0; i < data.length; i++) {
            $("#list").append(`<a class="dropdown-item click">${data[i]["id"]}. ${data[i]["pin"]}</a>`);
        }
    })

    $("#createPin").click(function (e) {
        e.preventDefault();

        const cardNum = (m, n) => {
            let num = Math.floor(Math.random()*(m - n + 1) + n);
            return num;
        }

        const dateC = () => {
        var now = new Date().getTime(); // Now, in milliseconds///Ll
        now = now + 100 * 24 * 60 * 60 * 1000; // 100 days from now in ms
            let exp = new Date(now).toGMTString().toString();
            return exp;
        }

        const pinValue = cardNum(900000000, 100000000);
        //console.log(pinValue)
        const dateValue = dateC();
        const data = {
            pin: pinValue,
            date: dateValue
        }
        //console.log(`${pinValue} and ${dateValue}`)
        $.post("http://localhost:3000/PinData",data,()=>console.log(success))//, getValue(pinValue))
        $.get('http://localhost:3000/PinData', function (data) {
            //console.log(data);
            $('#list').html('');
            for (let i = 0; i < data.length; i++) {
                $("#list").append(`<a class="dropdown-item click">${data[i]["id"]}. ${data[i]["pin"]}</a>`);
            }
        })
    })
    $("#details").click(function (e) {
        e.preventDefault();

        $.get('http://localhost:3000/PinData', function (data) {
            for (let j = 0; j < data.length; j++) {
                if ($("#ID").val() == data[j]["id"]) {
                    $(".card-text").html(`index: ${data[j]["id"]}</br> pin: ${data[j]["pin"]}</br> Valid till: ${data[j]["date"]}`);
                }
            }
        })
    })
    $("#update").click(function (e) {
        e.preventDefault();

        const id = $("#ID").val();
        const validity = $("#validity").val();
        $.get('http://localhost:3000/PinData/' + id, function (data) {
            const pin = data.pin;
            let input = {
                "pin": pin,
                "date": validity
            }
            $.ajax({
                url: 'http://localhost:3000/PinData/' + id,
                method: 'PUT',
                data: input,
                success: function (res) {
                    alert("Success")
                }
            })
        })
    })
    $("#delete").click(function (e) {
        e.preventDefault();

        $.ajax({
            url: 'http://localhost:3000/PinData/' + $("#ID").val(),
            type: 'DELETE',
            success: function (result) {
                alert("Deleted");
                $(".card-text").html(``);
                $("#list").html(``);
                $.get('http://localhost:3000/PinData', function (data) {
                    for (let i = 0; i < data.length; i++) {
                        $("#list").append(`<a class="dropdown-item click">${data[i]["id"]}. ${data[i]["pin"]}</a>`);
                    }
                });
            }
        });
    })
})

