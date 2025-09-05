const creatElement = (array) => {
const btnElements = array.map((err) => `<p class = "btn"> ${err}</P>`)
return(btnElements.join(" "));
}



const lodeData = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLesson(data.data));
};
const removeActive = () => {
    const lessonbtns = document.querySelectorAll(".lesson-btn");
    lessonbtns.forEach((btn) => btn.classList.remove("active"))
}

const loadWordDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(dateil => showWordDateils(dateil.data));


}

const showWordDateils = (word) => {
    const dateilContenar = document.getElementById("details-contenar")
    dateilContenar.innerHTML = `<div class="space-y-5 border-e-red-600 p-5">
    <h1 class="text-3xl font-bold">${word.word} (<i class="fa-solid fa-microphone"></i> ${word.pronunciation} )</h1>
    <div>
        <p class="text-2xl">meaning</p>
        <p>${word.meaning}</p>
    </div>
    <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
    </div>
    <div>
        <h1>সমার্থক শব্দ গুলো</h1>
        <div class="flex gap-3 justify-start mt-3">
            ${creatElement(word.synonyms)}
        </div>
    </div>
    
</div>`;
    document.getElementById("my_modal_5").showModal()
    // my_modal_5.showModal()



}

const lodeLevelWord = (id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(words => {
            const clickBtn = document.getElementById(`lessonBtn-${id}`)
            removeActive()
            clickBtn.classList.add("active")
            displayWord(words.data)
        })
}
const displayWord = (words) => {
    const wordContaner = document.getElementById("word-contane")
    wordContaner.innerHTML = "";
    if (words.length == 0) {
        wordContaner.innerHTML = `
    <div class="col-span-full text-center space-y-5">
                <p class="text-2xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-4xl font-bold">নেক্সট Lesson এ যান</h1>
            </div>
    `
    }
    words.forEach(word => {
        word
        const wordCard = document.createElement("div")
        wordCard.innerHTML = `
    <div class="flex flex-col justify-between gap-5 items-center p-5 py-10 bg-white rounded-3xl h-full">
                <h1 class="text-4xl">${word.word ? word.word : "আর্থ পাই নাই"}</h1>
                <p>Meaning /Pronounciation</p>
                <p class="text-5xl">${word.meaning ? word.meaning : "আর্থ পাই নাই"} / ${word.pronunciation ? word.pronunciation : "আর্থ পাই নাই"}</p>
                <div class="flex justify-between gap-5 w-10/12 mt-5">
                    <button onclick="loadWordDetail(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn"><i class="fa-solid fa-volume-low"></i></button>
                </div>
            </div>
    `
        wordContaner.append(wordCard)
    })

}

const displayLesson = (lessons) => {

    const lessonContaner = document.getElementById("Lesson-contaner")
    lessonContaner.innerHTML = "";
    for (lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
    <button id="lessonBtn-${lesson.level_no}" onclick="lodeLevelWord(${lesson.level_no})" class="btn  border-purple-800 lesson-btn"> <img class="p-3 bg-white" src="./assets/fa-book-open.png" alt="">Lesson -${lesson.level_no}</button>
    `
        lessonContaner.append(btnDiv)
    }

};


lodeData()
