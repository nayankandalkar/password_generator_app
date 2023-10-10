console.log("hi");

const inputSlider=document.querySelector("[data-lengthSlider]");


const  lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[dataPasswordDisplay]");
const copyMsg=document.querySelector("[data-copyMsg]");
const  copyBtn=document.querySelector("[data-copy]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generatebutton ");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");

console.log(passwordDisplay);


const symbols=  `~'!@#$%^&*()_-+={[]}|:;"<,>.?/`;

setIndicator('#ccc')
 

let password="";
let passwordLength=10;
let checkCount=0;
 
function handleslider(){
    inputSlider.value =passwordLength;
    lengthDisplay.innerText=passwordLength;


   const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

handleslider();

function setIndicator(color){

    indicator.style.backgroundColor=color;

}


function getRandomInteger(min, max){
 return      Math.floor( Math.random() * (max-min)) + min;
 

}


function generateRandomNumber(){
    return getRandomInteger(0,9);
}

 
  
function generateLowercase(){
    return    String.fromCharCode( getRandomInteger(97,123));
}


function generateUppercase(){
    return    String.fromCharCode( getRandomInteger(65,91));
}

 function generateSymbol(){

    

    const random=getRandomInteger(0,symbols.length);
    return symbols.charAt(random);
 }



 function calcstrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;

    if(uppercaseCheck.checked){
        hasUpper= true;
    }

    if(lowercaseCheck.checked){
        hasLower=true;
    }

    if(numberCheck.checked){
        hasNum=true;
    }

    if(symbolCheck.checked){
        hasSym=true;
    }


    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength  >=8 ){
        setIndicator("#0f0");
    }else if(
        (hasLower || hasUpper)  &&
        (hasNum || hasSym)   &&
        passwordLength >= 6
    ){
        setIndicator("#ff0");
    }else{
        setIndicator("#f00");
    }

 }

 
 async function copycontent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText =  e;
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    
    setTimeout( () => {
        copyMsg.classList.remove("active");
        console.log("abcd")
    },2000);

   
 }


 allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange);
 })

 function handlecheckboxchange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
           
        }
    })

     if(passwordLength <checkCount){
        passwordLength=checkCount;
        handleslider();
     }

    console.log(checkCount);
 }

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleslider();
})

copyBtn.addEventListener('click',()=>{
    if( passwordDisplay.value){
           copycontent();
    }
})



generateBtn.addEventListener('click',()=>{

    if(checkCount <=0){
        return;
    }

    if(passwordLength < checkCount){
        passwordLength=checkCount;
        handleslider();
    }

    password=""


    // if(uppercaseCheck.checked){
    //     password+=generateUppercase();
    // }

    // if(lowercaseCheck.checked){
    //     password+=generateLowercase();
    // }

    // if(numberCheck.checked){
    //     password+=generateRandomNumber();
    // }

    // if(symbolCheck.checked){
    //     password+=generateSymbol();
    // }

    let funcArr=[];
    if(uppercaseCheck.checked)
       {
        funcArr.push(generateUppercase);
       }

       if(lowercaseCheck.checked)
       {
        funcArr.push(generateLowercase);
       }

       if(numberCheck.checked)
       {
        funcArr.push(generateRandomNumber);
       }

       if(symbolCheck.checked)
       {
        funcArr.push(generateSymbol);
       }

       for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
       }
       

       for(let i=0;i<passwordLength-funcArr.length;i++){
        let ranIndex=getRandomInteger(0,funcArr.length)
        password+=ranIndex;
       }

       password=shufflepassword(Array.from(password));

       passwordDisplay.value=password;

       calcstrength();
    console.log(password);
})


function shufflepassword(password){

    for(let i=password.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=password[i];
        password[i]=password[j];
        password[j]=temp;
    }

    let str="";
    password.forEach((el)=>{str+=el})

    return str;
}





 

 

