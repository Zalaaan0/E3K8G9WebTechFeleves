$(document).ready(function () {
    $("#btn-bekezdes-kiemel").click(function () {
        $(".tartalom p").css({
            "background-color": "#fff9c4",
            "padding": "8px",
            "border-radius": "4px"
        });
    });
    $("#btn-tabella-animacio").click(function () {
        $("#bajnoki-tabella").fadeToggle(600);
    });
    let ujCsapatSorszam = 5;
    $("#btn-uj-csapat").click(function () {
        const ujSor = $("<tr></tr>").html(`
            <td>${ujCsapatSorszam}.</td>
            <td>Újonc FC #${ujCsapatSorszam}</td>
            <td>4</td>
            <td>0</td>
            <td>0</td>
            <td>4</td>
            <td>2 - 15</td>
            <td>0</td>
        `);
        $("#bajnoki-tabella tbody").append(ujSor);
        ujCsapatSorszam++;
        $("#extra-info-doboz").html("<p class='kiemelt-szoveg'>Új csapat sikeresen hozzáadva a tabellához!</p>");
    });

    $("#btn-cim-modosit").click(function () {
        const cimElem = document.getElementById("tabella-cim"); // Natív JS ID kiválasztás
        cimElem.textContent = "Frissített Bajnoki Tabella (Élő állás)";
        cimElem.style.color = "#d32f2f";
    });
    $("#nevezesi-urlap").submit(function (event) {
        event.preventDefault(); // Ne küldje el azonnal az űrlapot
        let vanHiba = false;
        $(".hiba-uzenet").text("");
        $("input, textarea").removeClass("hibas-mezo");
        const csapatnev = $("#csapatnev").val().trim();
        if (csapatnev.length < 3) {
            $("#csapatnev").addClass("hibas-mezo");
            $("#hiba-csapatnev").text("Hiba: A csapatnévnek legalább 3 karakter hosszúnak kell lennie!");
            vanHiba = true;
        }
        const kapitany = $("#kapitany").val().trim();
        if (kapitany === "") {
            $("#kapitany").addClass("hibas-mezo");
            $("#hiba-kapitany").text("Hiba: A csapatkapitány nevének megadása kötelező!");
            vanHiba = true;
        }
        const alapitva = $("#alapitva").val();
        if (alapitva === "") {
            $("#alapitva").addClass("hibas-mezo");
            $("#hiba-alapitva").text("Hiba: Kérjük, válaszd ki az alapítás dátumát!");
            vanHiba = true;
        }
        const valasztottNap = $("input[name='nap']:checked").val();
        if (!valasztottNap) {
            $("#hiba-nap").text("Hiba: Válassz ki egy preferált játéknapot!");
            vanHiba = true;
        }
        const jatekosok = $("#jatekosok").val().trim();
        if (jatekosok.length < 15) {
            $("#jatekosok").addClass("hibas-mezo");
            $("#hiba-jatekosok").text("Hiba: Kérjük, sorolj fel legalább 6 játékost (minimum 15 karakter)!");
            vanHiba = true;
        }
        if (!$("#szabalyzat-elfogad").is(":checked")) {
            $("#hiba-szabalyzat").text("Hiba: A nevezéshez el kell fogadnod a versenyszabályzatot!");
            vanHiba = true;
        }
        if (!vanHiba) {
            const kivalasztottSzin = $("#mezszin").val();
            const visszajelzes = $("<div></div>")
                .css({
                    "background-color": "#e8f5e9",
                    "border": "2px solid " + kivalasztottSzin,
                    "padding": "15px",
                    "margin-top": "20px",
                    "border-radius": "6px"
                })
                .html(`<h3>Sikeres nevezés!</h3>
                       <p>A(z) <strong>${csapatnev}</strong> csapat regisztrációját rögzítettük (Kapitány: ${kapitany}).</p>`);
            $("#sikeres-nevezes").empty().append(visszajelzes).hide().slideDown(500);
        }
    });
    $("#btn-torles").click(function () {
        $(".hiba-uzenet").text("");
        $("input, textarea").removeClass("hibas-mezo");
        $("#sikeres-nevezes").empty();
    });
});