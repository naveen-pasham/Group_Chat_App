 
 document.getElementById('signup').addEventListener('click',()=>{
  adduser(event);
})
 
 // add user 
 async function adduser(event) {
    try{
    event.preventDefault();
    const name= await document.getElementById('username').value;
    const number= await document.getElementById('number').value;
    const email= await document.getElementById('email').value;
    const password=await document.getElementById('password').value;
    const usesrstatus= document.getElementById('userstatus');
    const obj={
      name,
      email,
      password,
      number
    }
   const userdata=await axios.get(`http://localhost:2000/user/getusers/${email}`,{method:'get',credentials:"include"});
   if(userdata.data===null){
      const registerdata=await axios.post('http://localhost:2000/user/signup',obj,{credentials:"include"})
     // usesrstatus.innerText=registerdata.data.message;
     resetform();
     alert("Successfuly signed up")
     if(registerdata.data.message==="Succesfully Created New User"){
      window.location.href = "../Login/login.html" 
  }
   }else{
   // usesrstatus.innerText='User already exists'
   alert("User already exists, Please Login")
   }

    }
    catch(error){
      console.log(error);
    }
  }

  function resetform(){
    document.getElementById('username').value=''
    document.getElementById('number').value=''
    document.getElementById('email').value=''
    document.getElementById('password').value=''
  }