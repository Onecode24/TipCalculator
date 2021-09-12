
const percentage=document.querySelectorAll('.percentage');
const  resetCalculatorButton = document.querySelector('.set');

let customPercentage=document.querySelector('.custom-percentage');
let Bill=document.querySelector('.bill');
let Person=document.querySelector('.person');


percentage.forEach(item=>{
    item.addEventListener("click",()=>{
        if(customPercentage.value){
            customPercentage.value='';
        }
        let percentageValue=item.value;
        getInputvalues(percentageValue);
    })
})
function getInputvalues(percentageValue){
    let values ={
        bill: parseFloat(Bill.value),
        custom : parseFloat(customPercentage.value),
        person : parseFloat(Person.value)
    };
    if((values.bill>0) && (values.person>0)){
        return calculate(values, percentageValue);
    }

    inputsValidation();
    PersonKeyUp(percentageValue);
}

function calculate(values, percentageValue){
    if(values.custom){
        let tipValue = values.bill * values.custom / 100;
        let totalToPay = values.bill + tipValue;
        let tipPerPerson = tipValue / values.person;
        let totalPerPerson = totalToPay / values.person;

        return showResult(tipPerPerson,totalPerPerson);
    }
}

function showResult(tipPerPerson,totalPerPerson){
    let tipResult=document.querySelector('.tipPerson');
    let totalPerPersonResult=document.querySelector('.tipTotal');

    tipResult.innerHTML= `$${tipPerPerson.toFixed(2)}`;
    totalPerPersonResult.innerHTML=`$${totalPerPerson.toFixed(2)}`;
    return resetCalculator(tipResult,totalPerPersonResult);
};
function resetCalculator(tipResult,totalPerPersonResult){
    if(resetCalculatorButton.hasAttribute('disabled')){
        resetCalculatorButton.removeAttribute('disabled');
    }
    resetCalculatorButton.addEventListener('click', ()=>{
        Bill.value='';
        customPercentage.value='';
        Person.value='';

        tipResult.innerHTML='$0.00';
        totalPerPersonResult.innerHTML = '$0.00';
        resetCalculatorButton.setAttribute('disabled', true);
    })
}

customPercentage.addEventListener("keyup", () => {
    if (customPercentage.value) {
      getInputvalues(customPercentage.value);
    }
  })

  function PersonKeyUp(percentageValue) {
    Person.addEventListener("keyup", () => {
      if (Person.value) {
        getInputvalues(percentageValue );
      }
    });
  }
  function inputsValidation(){
      let vals=[Bill,Person];

    for(const data of vals){
        if(data.value==''){
            data.classList.add('invalid');

            data.addEventListener('click',()=>{
                data.classList.remove('invalide');
            })
        } 
    }
  }
