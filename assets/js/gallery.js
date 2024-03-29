

/*delay på data hentning i ms for at simulere data hentning online*/
const myLoadTime = 2000;

// reset variables
let myData = null;

let myApp = null;



/* kicks off app when the DOM is loaded */
window.addEventListener("load", initApp);


function initApp() {
    fetchData(); // starter hentning af data. 
    myApp = document.getElementById('app'); // vi finder det tag voress app skal leve i. kaldet app
    createLoadingScreen(); // bygger loading screen i DOM.
}


function createLoadingScreen() {
    // byg loading screen her med html dom elementer. og evt et animeret gif eller billede. i vores app tag.
    //SECTION TIL LOADING ICON
    let loadingScreenWrapper = document.createElement('section');
    loadingScreenWrapper.classList.add('loadingWrapper');
    myApp.appendChild(loadingScreenWrapper);
    //LOADING ICON
    let loadingIcon = document.createElement('img');
    loadingIcon.src = './assets/img/loading.png';
    loadingIcon.classList.add('loadingIcon');
    loadingScreenWrapper.appendChild(loadingIcon);
}


function initGallery(dataRecived) {

    // kaldes fra fetchData når data er klar. 
    // set myData variablen til det modtagne data, så det er tilgængelig for alle funktioner
    myData = dataRecived;
    //kald funktionen resetGallery for at slette indhold i app tagget, som er indeholdt i myApp.
    resetGallery(dataRecived);
    // kald en funktion der kan bygge dit galleri. den hedder buildGallery
    buildGallery(dataRecived);
    // console.log('Her er dataen', dataRecived);
}


function resetGallery(data) {
    // skriv kode her der kan slette alt html i app tagget husk det er indeholdt i  myApp
    myApp.innerHTML = "";
}

function buildGallery(leData) {
    // console.log('Here is the data', leData);
    /* brug map funktionen paa vores myData for at finde data for hvert enkelt dyr, og sende det til en funktion der
    kan bygge dit galleri kort for dyret. funktionen hedder buildCard, og har brugfor data for dyret*/
    leData.map((animals) =>{
        // console.log('wuts dis?', animals);
        buildCard(animals);
        console.log(animals);
    });
    
}


function buildCard(myAnimalData) {
    // console.log(myAnimalData);
    /* skriv kode der kan vise data fra myAnimalData i DOM
    husk at bruge createElement og appendChild funktionerne til at bygge semantisk korrekt HTML (se evt codelab om dom elementer opgave 4)
    */

    //CARD
    let galleryWrapper = document.createElement('section');
    galleryWrapper.classList.add('galleryCard');
    myApp.appendChild(galleryWrapper);

    //NAME
    let animalName = document.createElement('h2');
    animalName.innerText = myAnimalData.name;
    galleryWrapper.appendChild(animalName);

    //PICTURE
    let animalImg = document.createElement('img');
    animalImg.src = myAnimalData.picture;
    animalImg.classList.add('galleryCardImg');
    galleryWrapper.appendChild(animalImg);

    //SHORT DESCRIPTION
    let desShort = document.createElement('p');
    desShort.innerText = myAnimalData.shortDescription;
    galleryWrapper.appendChild(desShort);

    //MODAL
    let modal = document.createElement('dialog');
    modal.classList.add('modalDialog');
    myApp.appendChild(modal);

    //TITLE TIL MODAL
    let modalTitle = document.createElement('h2');
    modalTitle.innerText = myAnimalData.name;
    modalTitle.classList.add('modalTitle');
    modal.appendChild(modalTitle);

    //PICTURE TIL MODAL
    let modalImg = document.createElement('img');
    modalImg.src = myAnimalData.picture;
    modalImg.classList.add('detailViewImg');
    modal.appendChild(modalImg);
    
    // //ESC TEKST
    // let escText = document.createElement('p');
    // escText.innerText = 'Tryk på Esc for at lukke'
    // escText.classList.add('escText');
    // modal.appendChild(escText);

    //LONG DESCRIPTION TIL MODAL
    let desLong = document.createElement('p');
    desLong.innerText = myAnimalData.description;
    desLong.classList.add('longDesc');
    modal.appendChild(desLong);

    //VISER MODAL
    galleryWrapper.addEventListener("pointerup", (event)=> {
        // console.log('Der blev klikket.', event);
        modal.showModal();
    });

    //SKJULER MODAL (ikke pt...)
    modal.addEventListener("pointerup", (event)=> {
        // console.log('Vi er i close eventet' + event.currentTarget);
        modal.close();

    });
}


/*  get data function  DO NOT TOUCH!!!!! ......................................................
denne funktion vil typisk være en funktion der henter data fra et API
*/



async function fetchData() {
    // data object
    // console.log('fetching data');
    await new Promise(resolve => setTimeout(resolve, myLoadTime));

    const myData = [

        {
            name: 'Elefant',
            picture: 'assets/img/elephant.jpg',
            description: 'Loxodonta africana, også kendt som afrikansk elefant, er verdens største landdyr. Den har en grå hud og store ører, som den bruger til at regulere kropstemperaturen og kommunikere med andre elefanter. Afrikanske elefanter lever i store flokke og spiser op til 150 kg planter om dagen. De er også kendt for deres stærke intelligens og følelsesmæssige bånd til deres familie og flok. På grund af ulovlig jagt og tab af levesteder er afrikanske elefanter klassificeret som truede og er beskyttet af lovgivning'
            , shortDescription: 'Loxodonta africana, også kendt som afrikansk elefant.'
        },

        {
            name: 'Tiger',
            picture: 'assets/img/standard_tiger.jpg',
            description: 'Panthera tigris, også kendt som tigeren, er en stor kat, der er hjemmehørende i Asien. Tigeren har en gul eller orange pels med mørke striber og har normalt en lang kraftig hale. Der findes forskellige underarter af tigeren, og størrelsen og farven kan variere afhængigt af underarten og habitatet. Tigeren er kendt for sin styrke, hurtighed og smidighed, og den er en top-rovdyr i sit økosystem. Desværre er mange af underarterne af tigeren truede på grund af tab af levesteder og ulovlig jagt, og bevaring af tigeren og dens levesteder er en vigtig bevaringsindsats.',
            shortDescription: 'Panthera tigris, også kendt som tigeren.'
        },

        {
            name: 'Tarantel',
            picture: 'assets/img/Brachypelma_smithi.jpg',
            description: 'Brachypelma smithi, også kendt som den mexicansk rødknæs tarantel, er en stor og farverig edderkop, der er hjemmehørende i Mexico. Den har en mørk krop med røde og orange striber på benene og en karakteristisk rød knæled. Brachypelma smithi er en populær art blandt edderkoppeentusiaster på grund af dens smukke farver og rolige natur.',
            shortDescription: 'Brachypelma smithi, også kendt som den mexicansk rødknæs tarantel.'
        },

        {
            name: 'Koala',
            picture: 'assets/img/_WW236934.jpg',
            description: 'Phascolarctos cinereus, også kendt som koala, er en pungdyrart, der er hjemmehørende i Australien. Den har en blød, tyk pels, store ører og en stor næse, og dens krop er tilpasset til at leve hovedsageligt af eukalyptusblade. Koalaer lever hovedsageligt i trætoppene og er kendt for deres afslappede og søvnige opførsel, da de sover op til 20 timer om dagen.',
            shortDescription: 'Phascolarctos cinereus, også kendt som koala.'
        },

        {
            name: 'Haj',
            picture: 'assets/img/great-white.jpg',
            description: 'Carcharodon carcharias, også kendt som en hvidhaj eller great white haj, er en stor rovdyr, der lever i kystfarvande over hele verden. Den har en grå-blå krop med en trekantet finne på ryggen og en stor kraftig kæbe med skarpe tænder. Carcharodon carcharias er kendt for at være en top-rovdyr og jager primært sæler og fisk. Den er også kendt for dens sjældne, men berygtede, angreb på mennesker, selvom sådanne angreb ofte er utilsigtede og sjældne.',
            shortDescription: 'Carcharodon carcharias, også kendt som en hvidhaj.'
        }
    ];
    initGallery(myData);


}