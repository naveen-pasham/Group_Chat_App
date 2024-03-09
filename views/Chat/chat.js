

 
document.getElementById('chat').addEventListener('click',()=>{
    chat(event);
  })
  
  const token=localStorage.getItem('token');
  const name=localStorage.getItem('nextuser');
  document.getElementById('nextuser').innerHTML=`${name} Joined`
   // add messages 
   async function chat(event) {
      try{
      event.preventDefault();
      const message=  document.getElementById('message').value;
     
      const obj={
        message
      }
    
       const chatdata=await axios.post('http://localhost:2000/chat/message',obj,{ headers: { "Authorization": token } });
       showmessageonscreen(chatdata.data.chat)
        resetform();
    }

     catch(error){
        console.log(error)
      }
    }

    function showmessageonscreen(data){
        let ulbody=document.getElementById('listmessages');
        data.forEach(message => {
            list='<li>'+message.username+':'+message.message+'</li>'
            ulbody.insertAdjacentHTML('beforeend', list);
        });
    }

    function resetform(){
      document.getElementById('message').value=''
    }

    window.addEventListener('DOMContentLoaded',async()=>{
      try{
        const messages=await axios.get('http://localhost:2000/chat/getmessages',{ headers: { "Authorization": token } })
        console.log(messages);
        localStorage.setItem('length',messages.data.length);
        showmessageonscreen(messages.data)
      }
      catch(error){
        console.log(error)
      }
    })

  setInterval(async() => {
    try{
      const messages=await axios.get('http://localhost:2000/chat/getmessages',{ headers: { "Authorization": token } })
        //console.log(messages);
        const length=localStorage.getItem('length');
        if(messages.data.length>length){
         // console.log(messages.data[length])
          showmessageonscreen([messages.data[length]]);
          localStorage.setItem('length',messages.data.length);
        }
      }catch(error){
        console.log(error);
      }
  }, 1000);