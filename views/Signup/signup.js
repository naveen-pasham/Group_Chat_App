 
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
   const userdata=await axios.get(`http://localhost:2000/user/getusers/${email}`);
   if(userdata.data===null){
      const registerdata=await axios.post('http://localhost:2000/user/signup',obj)
      usesrstatus.innerText=registerdata.data.message;
   }else{
    usesrstatus.innerText='User already exists'
   }

    }
    catch(error){
      console.log(error);
    }
  }