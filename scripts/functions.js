const getAdvice = async() => {
    let DATA;
    await fetch('https://api.adviceslip.com/advice')
        .then((res) => res.json())
        .then((data) => {
            DATA = data;
        });
    if (languaje == "EN") {
        title = "ADVICE"
        consejo.innerHTML = `"${DATA.slip.advice}"`;
    } else if (languaje == "ES"){
        title = "CONSEJO"
        consejo.innerHTML = await traduction(DATA.slip.advice);
    }
    idConsejo.innerHTML = `${title} # ${DATA.slip.id}`; 
}

//Función para asegurar el uso del API cada 2 segundos, por politicas de adviceslip, así debe ser.
const returnAdvice = () => {
    setTimeout(getAdvice, 2000)
}

const traduction = async(fromText) => {
    let result;
    let DATA;
    let apiURL = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=en|es`
    await fetch(apiURL)
        .then((res) => res.json())
        .then((data) => {
            DATA = data;
        });
    result = await DATA.responseData.translatedText;
    return result;
}

const changeLanguaje = () => {
    traslate.classList.toggle("ES")
    if (traslate.classList.contains("ES")) {
        languaje = "ES"
        oldText = consejo.textContent;
        traduction(consejo.textContent)
        .then((result) => {
            consejo.innerHTML = result;
            toggleContext();
        })
    } else {
        languaje = "EN"
        consejo.innerHTML = oldText;
        toggleContext();
    }
}

const toggleContext = () => {
    let org,dst;
    if (languaje = "ES") {
        org = "CONSEJO";
        dst = "ADVICE";
    } else {
        org = "ADVICE";
        dst = "CONSEJO";
    }
    idConsejo.textContent = idConsejo.textContent.replace(org, dst);
    traslate.classList.toggle("button__traslate--spanish");
    traslate.classList.toggle("button__traslate--english");
}