$(document).ready(function () {
    $("#btn-highlight-paragraphs").click(function () {
        $(".main p").css({
            "background-color": "#fff9c4",
            "padding": "8px",
            "border-radius": "4px"
        });
    });

    $("#btn-table-animation").click(function () {
        $("#league-table").fadeToggle(600);
    });

    $("#registration-form").submit(function (event) {
        event.preventDefault();
        let hasError = false;

        $(".error-message").text("");
        $("input, textarea").removeClass("invalid-field");

        const teamName = $("#team-name").val().trim();
        if (teamName.length < 3) {
            $("#team-name").addClass("invalid-field");
            $("#error-team-name").text("Hiba: A csapatnévnek legalább 3 karakter hosszúnak kell lennie!");
            hasError = true;
        }

        const captain = $("#captain").val().trim();
        if (captain === "") {
            $("#captain").addClass("invalid-field");
            $("#error-captain").text("Hiba: A csapatkapitány nevének megadása kötelező!");
            hasError = true;
        }

        const founded = $("#founded").val();
        if (founded === "") {
            $("#founded").addClass("invalid-field");
            $("#error-founded").text("Hiba: Kérjük, válaszd ki az alapítás dátumát!");
            hasError = true;
        }

        const selectedDay = $("input[name='day']:checked").val();
        if (!selectedDay) {
            $("#error-day").text("Hiba: Válassz ki egy preferált játéknapot!");
            hasError = true;
        }

        const players = $("#players").val().trim();
        if (players.length < 15) {
            $("#players").addClass("invalid-field");
            $("#error-players").text("Hiba: Kérjük, sorolj fel legalább 6 játékost (minimum 15 karakter)!");
            hasError = true;
        }

        if (!$("#accept-rules").is(":checked")) {
            $("#error-rules").text("Hiba: A nevezéshez el kell fogadnod a versenyszabályzatot!");
            hasError = true;
        }

        if (!hasError) {
            const selectedColor = $("#jersey-color").val();
            const feedback = $("<div></div>")
                .css({
                    "background-color": "#e8f5e9",
                    "border": "2px solid " + selectedColor,
                    "padding": "15px",
                    "margin-top": "20px",
                    "border-radius": "6px"
                })
                .html(`<h3>Sikeres nevezés!</h3>
                       <p>A(z) <strong>${teamName}</strong> csapat regisztrációját rögzítettük (Kapitány: ${captain}).</p>`);
            $("#registration-success").empty().append(feedback).hide().slideDown(500);
        }
    });

    $("#btn-reset").click(function () {
        $(".error-message").text("");
        $("input, textarea").removeClass("invalid-field");
        $("#registration-success").empty();
    });
});
