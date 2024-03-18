//------function for buying tickets
function buyTicket() {
    const film = document.getElementById("film");
    const antall = document.getElementById("antall");
    const fornavn = document.getElementById("fornavn");
    const etternavn = document.getElementById("etternavn");
    const telefonnr = document.getElementById("telefonnr");
    const epost = document.getElementById("epost");
    const wrongFilm = document.getElementById("wrongFilm")
    const wrongAmount = document.getElementById("wrongAmount");
    const wrongFirstName = document.getElementById("wrongFirstName");
    const wrongLastName = document.getElementById("wrongLastName");
    const wrongNumber = document.getElementById("wrongNumber");
    const wrongEmail = document.getElementById("wrongEmail");

    let wrongInput = false;

//------ Function to validate the user input and gives different messages depending on if the input is missing
//------ or not matching the given regex parameter
    function validateInput(value, regex, errorElement, errorEmpty, errorRegex) {
        // If the value is validated, gives no error message
        if (regex.test(value)) {
            errorElement.innerText = "";
            return;
        }
        // ELse the wrongInput variable changes to true
        wrongInput = true;
        // Checks to see if the input field is empty or not and shows the correlated error message
        if (!value) {
            errorElement.innerText = errorEmpty;
            return;
        }
        // Else the regex error message is shown
        errorElement.innerText = errorRegex;
    }

//------ Validating input value from each of the input fields, using the validateInput function
    validateInput(film.value, /^[^]+$/, wrongFilm, "Velg film", "Velg film")
    validateInput(antall.value, /^[1-99]+$/, wrongAmount, "Skriv inn antall", "Skriv inn gyldig antall")
    validateInput(fornavn.value, /^[a-zæøåA-ÅÆØÅ]+$/, wrongFirstName, "Skriv inn fornavn", "Skriv inn gyldig fornavn")
    validateInput(etternavn.value, /^[a-zæøåA-ZÆØÅ]+$/, wrongLastName, "Skriv inn etternavn", "Skriv inn gyldig etternavn")
    validateInput(telefonnr.value, /^\d{8}$/, wrongNumber, "Skriv inn telefonnr", "Skriv inn gyldig telefonnr (8 tall)")
    validateInput(epost.value, /^[a-zæøåA-ZÆØÅ0-9._%+-]+@[a-zæøåA-ZÆØÅ0-9.-]+\.[a-zæøåA-ZÆØÅ]+$/, wrongEmail, "Skriv inn epost", "Skriv inn gyldig epost")

//------ If the input validation function doesn't change the value of the wrongInput variable, a ticket object within the ticket class is
    //created
    if (wrongInput === false) {
        ticket = {
            "film": document.getElementById("film").value,
            "antall": document.getElementById("antall").value,
            "fornavn": document.getElementById("fornavn").value,
            "etternavn": document.getElementById("etternavn").value,
            "telefonnr": document.getElementById("telefonnr").value,
            "epost": document.getElementById("epost").value
        };
        console.log(ticket); //good for debugging in case the elements from student are no
        $.post("/tickets/add", ticket, function (data) {})


//------ Resetting the variable values once the order is pushed
        film.value = "";
        antall.value = "";
        fornavn.value = "";
        etternavn.value = "";
        telefonnr.value = "";
        epost.value = "";
    }

//------ Function for printing out the tickets array
    function showOrder() {

        let ut = "<table id='table'><tr>" +
            "<th>Film</th><th>Antall</th><th>Navn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th>" +
            "</tr>";
        for (let i of ticketsArray) {
            ut += "<tr>";
            ut += "<td>" + i.film + "</td><td>" + i.antall + "</td><td>"
                + i.fornavn + "</td><td>" + i.etternavn + "</td><td>"
                + i.telefonnr + "</td><td>" + i.epost + "</td>";
            ut += "</tr>";
        }
        document.getElementById("list").innerHTML = ut;
    }

    showOrder();
}

//------ Function that empties the array when the button is pressed
    function deleteAll() {
        ticketsArray.length = 0;
        document.getElementById("list").innerHTML = "";
    }

    function sendTicketFromInput() {
        ticket = {
            "film": document.getElementById("film").value,
            "antall": document.getElementById("antall").value,
            "fornavn": document.getElementById("fornavn").value,
            "etternavn": document.getElementById("etternavn").value,
            "telefonnr": document.getElementById("telefonnr").value,
            "epost": document.getElementById("epost").value


        }
        console.log(ticket); //good for debugging in case the elements from student are no
        $.post("/receiveTicket", ticket, function (data) {
        })
    }
