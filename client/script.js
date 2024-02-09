const form = document.querySelector("form");
const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const userPhoneNo = document.querySelector("#user-phone");
const p = document.querySelector("p")
form.addEventListener("submit",(e)=>{
     e.preventDefault();

     const userDetails = {
         username : userName.value,
         useremail : userEmail.value,
         userphoneNo : userPhoneNo.value,
     };

     createData(userDetails);
     edit(userDetails)
})


const createData = async(details)=>{
    if(details.username == "" || details.useremail == "" || details.userphoneNo == ""){
        p.style.display = "block";
        setTimeout(() => {
            p.style.display = "none";
        }, 1000);
   }
   else{
    try {
        let res = await fetch(`http://localhost:8080/posts`,{
            method:"POST",
            body:JSON.stringify(details),
            headers:{
                "Content-Type":"Application/json"
            }

    });
    } catch (error) {
        console.log(error)
    }
   }
}

const getData = async()=>{
     try {
        let res = await fetch(`http://localhost:8080/posts`,{
             method:"GET",
        })
        let data = await res.json();
        appendDetails(data)
     } catch (error) {
        console.log(error)
     }
}

getData()

const appendDetails =(data)=>{
      
    data.map(items=>{
       if(items.username == "" || items.useremail == "" || items.userphoneNo == ""){
            p.style.display = "block";
            setTimeout(() => {
                p.style.display = "none";
            }, 1000);
       }
       else{

           const tbody = document.querySelector("tbody");
             const tr = document.createElement("tr");
             const td1 = document.createElement("td");
             td1.innerHTML = items.username;
             const td2 = document.createElement("td");
             td2.innerHTML = items.useremail;
             const td3 = document.createElement("td");
             td3.innerHTML = items.userphoneNo;
             const td4 = document.createElement("td");
             const button1 = document.createElement("button");
             button1.innerHTML = "Edit";

             button1.classList.add("edit");
             button1.addEventListener("click",function(){
                 window.localStorage.setItem("edit",JSON.stringify(items.id));
                 window.location.href = "edit.html";
             })
             const button2 = document.createElement("button");
             button2.innerHTML = "Delete";
             button2.classList.add("delete");
             button2.addEventListener("click",()=>{
                 deletebtn(items.id);
             })
             td4.append(button1,button2);
             tr.append(td1,td2,td3,td4);
             tbody.append(tr);
       }
    })
    
}

const deletebtn = async(del)=>{
    try {
        let res = await fetch(`http://localhost:8080/posts/${del}`,{
            method:"DELETE",
             headers:{
                "Content-Type":"Application/json"
             }
        })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}





