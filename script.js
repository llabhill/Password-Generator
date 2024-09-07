const inputslider=document.querySelector("[data-lengthslider]");
const lengthdisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const cpybtn=document.querySelector("[data-copy]");
const cpymsg=document.querySelector("[data-cpymsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolscheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generate-button");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");//store in form of list
const symbols = '~`!@#%^&*()_-+={[}]|:;">,<.?/';

let password="";
let passlength=10;
let checkcount=0;
handleslider();

//setting the  password length

function handleslider(){
    inputslider.value=passlength;
    lengthdisplay.innerText=passlength;
    const min=inputslider.min;
    const max=inputslider.max;
    //width and height:-
    inputslider.style.backgroundSize=((passlength-min)*100/(max-min)) + "%100%";
    console.log((passlength-min)*100/(max-min));
}

//setting the indicator

function setindicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;

}
setindicator('#ccc');

function random(min,max){
   return Math.floor(Math.random()*(max-min)) + min ;
}

function randomnum(){
    return random(0,9);
}

//  String.fromCharCode() convert number into character
function randomlowercase(){
    return String.fromCharCode(random(97,123));
}


function randomuppercase(){
    return String.fromCharCode(random(65,91));
    
}


function randomsymbol(){
    return symbols.charAt(random(0,symbols.length));   
}

function setstrength(){
    let islower=false;
    let isupper=false;
    let isnum=false;
    let issymbol=false;
//.checked keyword used to check whether field is filled or not

    if(uppercaseCheck.checked) isupper=true;
    if(lowercaseCheck.checked) islower=true;
    if(numberCheck.checked) isnum=true;
    if(symbolscheck.checked) issymbol=true;

    if (isupper && islower && (isnum|| issymbol) && passlength >= 8) setindicator ("#0f0");

    else if((islower || isupper)&& (isnum || issymbol) && passlength >= 6) setindicator("#ff0");

    else setindicator("#f00");
}

//counting the ticked checkbox 

function checkboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked) checkcount++;
    });

}

allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',checkboxchange);
})


//cpy message function


async function copymsg(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        cpymsg.innerText="Copied";
    } 
    
    catch (e) {
        cpymsg.innerText="Failed";
    }

    // to make copy text visible

    cpymsg.classList.add("active");

    setTimeout(()=>{
        cpymsg.classList.remove("active")
    },2000);
}

inputslider.addEventListener('input',function(e){
    passlength=e.target.value;
    handleslider();
})


cpybtn.addEventListener('click',function(){
    if(passwordDisplay.value) copymsg();
})

function shuffle(array){
    //fisher yates method for shuffling words inn aaray

    for(let i=array.length-1;i>=0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;

}

generateBtn.addEventListener('click',function(){
//none of the checkbox is clicked 
    if(checkcount<=0) return;

    if(passlength<checkcount){
        passlength=checkcount;
        handleslider();
    }

    //lets start journey to find new password
    //remove old password

    password="";
    
    let funcarr=[];
    if(uppercaseCheck.checked) funcarr.push(randomuppercase);
    if(lowercaseCheck.checked) funcarr.push(randomlowercase);
    if(numberCheck.checked) funcarr.push(randomnum);
    if(symbolscheck.checked) funcarr.push(randomsymbol);

    //compulsary addition

    for(let i=0;i<funcarr.length;i++){
        password+=funcarr[i]();
    }

    for(let i=0;i<passlength-funcarr.length;i++){
        let randomindex=random(0,funcarr.length);
        password+=funcarr[randomindex](); 

    }

    //shuffle password
    password=shuffle(Array.from(password));

    passwordDisplay.value=password;

    //calculate strength
    setstrength();

});




 


