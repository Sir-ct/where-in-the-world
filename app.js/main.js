function main(){
let body = document.querySelector("body")
let detcont = document.getElementById("detailbdw")
let api ="https://restcountries.com/v3.1/all";
let details;
let borders = []
let themebtn = document.getElementById("themeswitch")
let searchcountry = document.searchform;
let searchinput = searchcountry.csearch
let container = document.getElementById("countrycontainer")
let majorcont = document.getElementById("maincontainer")
let searchregion = document.getElementById("regiondd")
let back = document.getElementById("backbtn")



back.addEventListener("click", ()=>{
    majorcont.style.display = ""
    detcont.style.display = "none"
    detailcontainer.innerHTML = ""
    
})

searchregion.addEventListener("input", ()=>{
    container.innerHTML = ""
    showreg(searchregion.value)
})

searchcountry.addEventListener("submit", (e)=>{
    e.preventDefault()
    searchcntry()
})

themebtn.addEventListener("click",()=>{
    body.classList.toggle("light")
})
function showreg(reg){
    fetch(api).then((res)=> res.json()).then((data)=>{
    
        for(i=0; i<data.length; i++){

                country = `<div class="countries">
                <div class="imgtag"><img src = ${data[i].flags.png}></div>
                <div class="infotag">
                    <h3 class="country">${data[i].name.common}</h3>
                    <div class="population"><span>population</span>: ${data[i].population}</div>
                    <div class="region"><span>region</span>: ${data[i].region}</div>
                    <div class="capital"><span>capital</span>: ${data[i].capital}</div>
                </div>
                </div>`
               
               container.innerHTML += country
            
        }
        countclass = document.querySelectorAll(".countries")
        countclass.forEach((element, index) =>{
            if(reg != data[index].region){
                element.style.display = "none"
            }else{
                element.addEventListener("click", ()=>{
                    setdet(index)
                })
            }
        })
        
    })
    
    
}
    
fetch(api).then((res)=> res.json()).then((data)=>{
    
    for(i=0; i<8; i++){
            
            country = `<div class="countries">
            <div class="imgtag"><img src = ${data[i].flags.png}></div>
            <div class="infotag">
                <h3 class="country">${data[i].name.common}</h3>
                <div class="population"><span>population</span>: ${data[i].population}</div>
                <div class="region"><span>region</span>: ${data[i].region}</div>
                <div class="capital"><span>capital</span>: ${data[i].capital}</div>
            </div>
            </div>`
           
           container.innerHTML += country
    
        
    }

     countclass = document.querySelectorAll(".countries")
    
countclass.forEach((element, index) =>{
    element.addEventListener("click", ()=>{
       setdet(index)
    })
})
    
})
    

    
        
   function setdet(dets){
       majorcont.style.display = "none"
       detcont.style.display = "block"
    
    api = "https://restcountries.com/v3.1/all"
    
    
    fetch(api).then((res)=>res.json()).then((data)=>{

    let lang = Object.values(data[dets].languages)
    let curr = Object.values(data[dets].currencies)
    let currency = Object.values(curr[0])
    let bordercountries = data[dets].borders
    
    if(data[dets].borders){
    for(let j=0; j<4; j++){
         bdcounts = `<div class = "bordercnts">${bordercountries[j]}</div>`
         borders.push(bdcounts)
         if(borders.length > 4){
             borders.splice(0,4)
         }
    }
    }
    
    details = `
    <div id="flagcont"><img src=${data[dets].flags.png} alt="flag"></div>
        <div id="detailcont"><h3 id="title">${data[dets].name.common}</h3>
            <div id="details">
                <div>
                    <div><span>Native Name: </span>${data[dets].name.common}</div>
                    <div><span>Population: </span>${data[dets].population}</div>
                    <div><span>Region: </span>${data[dets].region}</div>
                    <div><span>Sub Region: </span>${data[dets].subregion}</div>
                    <div><span>Capital: </span>${data[dets].capital}</div>
                </div>
                <div>
                    <div><span>Top Level Domain: </span>${data[dets].flag}</div>
                    <div><span>Currencies: </span>${currency}</div>
                   <div><span>Languages: </span>${lang}</div>
                </div>
            </div>
            <div id="borders"><span> Border countries: </span> <div>${borders}</div></div>
        </div>
        `

            detailcontainer.innerHTML = details
            let borderclass = document.querySelectorAll(".bordercnts")

            borderclass.forEach(element =>{
                element.addEventListener("click", ()=>{
                    for(p=0; p<data.length; p++){
                        if(element.innerHTML === data[p].fifa){
                            details = ""
                            setdet(p)
                        }
                    }
                })
            })
    })
  
}




function searchcntry(){

    fetch(api).then((res)=>res.json()).then((data)=>{
        let transinput = searchinput.value.charAt(0).toUpperCase() + searchinput.value.slice(1)
        for(i = 0; i<data.length; i++){
            if(transinput.toLowerCase() == data[i].name.common.toLowerCase() || transinput.toLowerCase() == data[i].name.official.toLowerCase()){
                
                console.log(transinput)
                setdet(i)
            }
        }
    })
}

}


window.addEventListener("load", main)