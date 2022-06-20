const getAdvice = async(languaje) => {
    await fetch('https://api.adviceslip.com/advice')
        .then((res) => res.json())
        .then((data) => {
            if (languaje == "EN") {
                idConsejo.innerHTML = `ADVICE # ${data.slip.id}`;
                consejo.innerHTML = `"${data.slip.advice}"`;
            } else if (languaje == "ES"){
                idConsejo.innerHTML = `CONSEJO # ${data.slip.id}`;   
                traduction(data.slip.advice);
                setTimeout(() => {consejo.innerHTML = `"${resultText}"`},1000);
            }
        });
}

const traduction = async(fromText) => {
    let apiURL = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=en|es`
    await fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
        resultText = data.responseData.translatedText
    });
}

const changeLanguaje = () => {
    traslate.classList.toggle("ES")
    if (traslate.classList.contains("ES")) {
        languaje = "ES"
        oldText = consejo.textContent;
        traduction(consejo.textContent);
        idConsejo.textContent = idConsejo.textContent.replace("ADVICE", "CONSEJO");
        setTimeout(() => {consejo.innerHTML = resultText},2000);
        traslate.classList.remove("button__traslate--spanish");
        traslate.classList.add("button__traslate--english");
    } else {
        languaje = "EN"
        idConsejo.textContent = idConsejo.textContent.replace("CONSEJO", "ADVICE");
        consejo.innerHTML = oldText;
        traslate.classList.remove("button__traslate--english");
        traslate.classList.add("button__traslate--spanish");
    }
}