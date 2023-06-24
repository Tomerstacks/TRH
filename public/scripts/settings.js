//=============================For INFO==================================

function displayInput(event){
    if(event.target.dataset.info){
        const id=event.target.dataset.info;
        console.log(id)
        const workingInfoEl=document.getElementById(`${id}-div`);
        workingInfoEl.classList.toggle('hidden')
    }
}




//======================================FOR SEC=========================

