const traduction = async(fromText) => {
    let apiURL = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=en|es`
    let response = await fetch(apiURL)
    let data = await response.json();
    let result = data.responseData.translatedText;
    
    return result;
}

const getAdvice = async() => {
    let response = await fetch('https://api.adviceslip.com/advice');
    let data = await response.json();

    let title, advice;
    if (languaje == "EN") {
        title = "ADVICE"
        advice = `"${data.slip.advice}"`;
        
    } else if (languaje == "ES"){
        title = "CONSEJO"
        advice = await traduction(data.slip.advice);
    }
    oldText = `"${data.slip.advice}"`;
    consejo.innerHTML = advice;
    idConsejo.innerHTML = `${title} #${data.slip.id}`;
}

//Función para asegurar el uso del API cada 2 segundos, por politicas de adviceslip, así debe ser.
const returnAdvice = () => {
    setTimeout(getAdvice, 2000)
}



const changeLanguaje = () => {
    traslate.classList.toggle("ES")
    if (traslate.classList.contains("ES")) {
        languaje = "ES";
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
    if (languaje != "ES") {
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