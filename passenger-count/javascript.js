let counter= document.getElementById("counter")
let pre=document.getElementById("pre")
let count=0
function increment(){
    count+=1
    counter.textContent=count
}

function save(){
    let countStr = count + "," 
    pre.innerText += countStr
    counter.textContent = 0
    count = 0
    
}
