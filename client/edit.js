const getEditDetails = JSON.parse(localStorage.getItem("edit"));
const form = document.querySelector("form");
const userName = document.querySelector("#user-name");
const userEmail = document.querySelector("#user-email");
const userPhoneNo = document.querySelector("#user-phone");

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const userDetails = {
        username : userName.value,
        useremail : userEmail.value,
        userphoneNo : userPhoneNo.value,
    };

    edit(userDetails)
    window.location.href = "index.html";
})

const getData = async()=>{
    try {
       let res = await fetch(`http://localhost:8080/posts/${getEditDetails}`,{
            method:"GET",
       })
       let data = await res.json();
       userName.value = data.username;
       userEmail.value = data.useremail;
       userPhoneNo.value = data.userphoneNo;
     
    } catch (error) {
       console.log(error)
    }
}

getData();

const edit = async(id)=>{
    console.log(id)
    let res = await fetch(`http://localhost:8080/posts/${getEditDetails}`,{
        method:"PATCH",
        body : JSON.stringify(id),
        headers:{
           "Content-Type":"Application/jsons",
        }
       
    });
    let data = await res.json();
  
   
    
    
}