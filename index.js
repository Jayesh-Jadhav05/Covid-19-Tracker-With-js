const Country = document.querySelector('#Country');
const Newcomfirm = document.querySelector('#newcomfirm');
const Newdeath = document.querySelector('#newdeath');
const TotalCases = document.querySelector('#totalcaces');
const TotalDeaths = document.querySelector('#totaldeaths');
const inputvalue = document.querySelector('#searchbar');
const submit = document.querySelector('.submit');
const flag = document.querySelector('.flag');
const goback = document.querySelector('.btn3');
const error = document.querySelector('#error');

// Add A Dynamic classes on this fields..
const hidebar = document.querySelector('.hide1');
const unhidedata = document.querySelector('.innerdiv');

// Create A Function To Fetch Api's And put the Information on the Fields..
const addinfo = () =>{
    // This Text To get Input Value In a serchbar And Convert The input first letter in uppercase..
    const mydata2 = inputvalue.value.charAt(0).toUpperCase() + inputvalue.value.slice(1);

    // Check The user searchInput Value is Empty or Not...
    if(mydata2 == ""){
   
        error.innerHTML = 'please country name';
        location.reload();
    }else{

        // This Is A Country Information Api For Getting Flag of all Countries..
    let finalurl = `https://restcountries.com/v3.1/name/${mydata2}?fullText=true`;
   
    fetch(finalurl).then( (jsdata) =>{
        return jsdata.json();
     }).then( (acdata) =>{
      
     flag.innerHTML = `
        <img src = "${acdata[0].flags.svg}">
     `
    })
   }

    hidebar.classList.add('hide2');
    unhidedata.classList.add('hide3');

    // This Ia A Covid19 Api To Use This For Currently Covid Information..
    fetch('https://api.covid19api.com/summary')
    .then( (jdata) =>{
        return jdata.json();
    }).then( (actuldata) =>{
        // Find The ApiData Length....
        const len = actuldata.Countries.length;
        for(let i=0;i<=len;i++){
            
            if(mydata2 == actuldata.Countries[i].Country){

                let b = actuldata.Countries[i];
                Country.innerHTML = b.Country;
                Newcomfirm.innerHTML = b.NewConfirmed;
                Newdeath.innerHTML = b.NewDeaths;
                TotalCases.innerHTML = b.TotalConfirmed;
                TotalDeaths.innerHTML = b.TotalDeaths;
                goback.innerHTML = `
        <button onclick = "location.reload()">Go Back</button>
    `;
            }
        }
       
       
    })
}


//Add Event Listerner In A Submit Button....
submit.addEventListener('click',() =>{
    addinfo(); 
})