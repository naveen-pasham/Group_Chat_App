

 
document.getElementById('chat').addEventListener('click',()=>{
    chat(event);
  })

//   let messages=[];
  
//   const token=localStorage.getItem('token');
//   const name=localStorage.getItem('nextuser');
//   let messagesdata=JSON.parse(localStorage.getItem('messages'));
//   document.getElementById('nextuser').innerHTML=`${name} Joined`;
//   if(messagesdata.length===0 || messagesdata==='undefined'){
//     messages=[];
//   }else{
//     messages=messagesdata;
//   }
//    // add messages 
//    async function chat(event) {
//       try{
//       event.preventDefault();
//       const message=  document.getElementById('message').value;
     
//       const obj={
//         message
//       }
    
//        const chatdata=await axios.post('http://localhost:2000/chat/message',obj,{ headers: { "Authorization": token } });
//       // let usermessage={id:chatdata.data.chat.id,message:chatdata.data.chat.message,username:chatdata.data.chat.username};
//        messages.push({id:chatdata.data.chat.id,message:chatdata.data.chat.message,username:chatdata.data.chat.username});
//        if(messages.length<11){
//           localStorage.setItem('messages',JSON.stringify(messages));
//           showmessageonscreen([messages[messages.length-1]])
//        }else{
//           messages.shift();
//           localStorage.setItem('messages',JSON.stringify(messages));
//        }
//         resetform();
//     }

//      catch(error){
//         console.log(error)
//       }
//     }

//     function showmessageonscreen(data){
//         let ulbody=document.getElementById('listmessages');
//         data.forEach(message => {
//             list='<li>'+message.username+':'+message.message+'</li>'
//             ulbody.insertAdjacentHTML('beforeend', list);
//         });
//     }

//     function resetform(){
//       document.getElementById('message').value=''
//     }

//     window.addEventListener('DOMContentLoaded',async()=>{
//       try{
//         // const messages=await axios.get('http://localhost:2000/chat/getmessages',{ headers: { "Authorization": token } })
//         // console.log(messages);
//         // localStorage.setItem('length',messages.data.length);
//         //console.log(messages[messages.length-1]);
//         if(messagesdata.length>0){
//           showmessageonscreen(messagesdata);
//         }
//       }
//       catch(error){
//         console.log(error)
//       }
//     })

//   setInterval(async() => {
//     try{
//       // const messages=await axios.get('http://localhost:2000/chat/getmessages',{ headers: { "Authorization": token } })
//       //   //console.log(messages);
//       //   const length=localStorage.getItem('length');
//       //   if(messages.data.length>length){
//       //    // console.log(messages.data[length])
//       //     showmessageonscreen([messages.data[length]]);
//       //     localStorage.setItem('length',messages.data.length);
//       //   }
//       const id=messagesdata[messagesdata.length-1].id+1;
//       const newmessages=await axios.get(`http://localhost:2000/chat/getmessages/${id}`,{ headers: { "Authorization": token } })
//      // console.log(newmessages)
//       if(newmessages.data.length===1){
//         showmessageonscreen(newmessages.data);
//       }
//       messagesdata= JSON.parse(localStorage.getItem('messages'));
       
//       }catch(error){
//         console.log(error);
//       }
//   }, 1000);


  


const token=localStorage.getItem('token');
const groupid=localStorage.getItem('groupid');
const username=localStorage.getItem('name');
let selectedOptions=[]

document.getElementById('logout').addEventListener('click',()=>{
    window.location.href = "../Login/login.html" 
});

document.getElementById('creategroup').addEventListener('click',()=>{
    creategroup(event);
});


    // add messages 

   async function chat(event) {
      try{
      event.preventDefault();
      const message=  document.getElementById('message').value;
     
      const obj={
        message,
        groupid
      }
    
       const chatdata=await axios.post('http://localhost:2000/chat/message',obj,{ headers: { "Authorization": token } });
       console.log(chatdata)
      // let usermessage={id:chatdata.data.chat.id,message:chatdata.data.chat.message,username:chatdata.data.chat.username};
     //  messages.push({id:chatdata.data.chat.id,message:chatdata.data.chat.message,username:chatdata.data.chat.username});
     //  if(messages.length<11){
         // localStorage.setItem('messages',JSON.stringify(messages));
       //   showmessageonscreen([messages[messages.length-1]])
      //  }else{
      //     messages.shift();
      //     localStorage.setItem('messages',JSON.stringify(messages));
      //  }
      showmessageonscreen([chatdata.data.chat]);
        resetform();
    }

     catch(error){
        console.log(error)
      }
    }

    function showmessageonscreen(data){
        let ulbody=document.getElementById('listmessages');
        data.forEach(message => {
          let date=new Date(message.createdAt)
        //  console.log(date.getHours()+':'+date.getMinutes())
          if(message.username===username){
            list=`<li> <div class="right-msg">  <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">${message.username}</div>
              <div class="msg-info-time">${date.getHours()}:${date.getMinutes()}</div>
            </div>
    
            <div class="msg-text">
              ${message.message}
            </div></div>
        
        </div></li>`
            ulbody.insertAdjacentHTML('beforeend', list);
          }else{
            list=`<li><div class="left-msg">  <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">${message.username}</div>
              <div class="msg-info-time">${date.getHours()}:${date.getMinutes()}</div>
            </div>
    
            <div class="msg-text">
              ${message.message}
            </div></div>
          </div></li>`
            ulbody.insertAdjacentHTML('beforeend', list);
          }
        });
    }

    function resetform(){
      document.getElementById('message').value=''
    }










async function creategroup(event){
    try{
        event.preventDefault();
    const groupname=  document.getElementById('groupname').value;

    const obj={
        groupname,
        selectedOptions

    }
        const createdgroup=await axios.post('http://localhost:2000/group/addgroup',obj,{ headers: { "Authorization": token } })
       
        showgrouponscreen([createdgroup.data.groupdata]);
      
    }
    catch(error){
        console.log(error);
    }
}



window.addEventListener('DOMContentLoaded', async()=>{
    try{
        // const userdata=await axios.get('http://localhost:2000/user/getusers',{ headers: { "Authorization": token } });
        // console.log(userdata);
        // showuseronscreen(userdata.data);
        const groupdata=await axios.get('http://localhost:2000/usergroups/getgroups',{ headers: { "Authorization": token } });
        console.log(groupdata);
        showgrouponscreen(groupdata.data);
    }
    catch(error){
        console.log(error);
    }
})


function showuseronscreen(data){
  document.getElementById('listgroupusers').getElementsByTagName('tbody')[0].innerHTML=''
    let tableBody =  document.getElementById('listgroupusers').getElementsByTagName('tbody')[0];
    data.forEach(user => {
        let row = '<tr><td hidden>'+user.id+'</td><td>' + user.username + '</td><td hidden></td></tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}


function showgrouponscreen(data){
    let tableBody =  document.getElementById('listgroups').getElementsByTagName('tbody')[0];
    data.forEach(group => {
        let row = '<tr><td hidden>'+group.id+'</td><td onclick="showdata(this.parentNode)">' + group.name +'</td></tr>';
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}



async function showdata(row){
  document.getElementById('listmessages').innerHTML=''
  document.getElementById('groupcarddata').style.display = "block";
  const id= row.cells[0].innerHTML;
  const messages=await axios.get(`http://localhost:2000/chat/getmessages/${id}`,{ headers: { "Authorization": token } })
 showmessageonscreen(messages.data);
  localStorage.setItem('groupid',id);
  const name=row.cells[1].innerHTML;
  document.getElementById('groupdata').innerHTML='';
    const groupname=document.getElementById('groupdata');
    console.log(groupname)
    const data=`<div class="row"> <div class="col-md-8 mx-auto" onclick="showgroupusers(${id})"><h3  data-toggle="modal" data-target="#groupinfo">${name}</h3></div><div class="col-md-4 mx-auto"><button type="button" class="btn btn-sm btn-danger" onclick="removegroup(${id})">Exit Group</button></div></div>`;
 groupname.insertAdjacentHTML('beforeend',data);
}

function removegroup(id){

  axios.get(`http://localhost:2000/usergroups/deletegroup/${id}`,{ headers: { "Authorization": token } }) 
}

async function showgroupusers(id){
  document.getElementById('namegroup').innerHTML=`${id}`;
 const groupinfodata=await axios.get(`http://localhost:2000/group/data/${id}`,{ headers: { "Authorization": token } }) 
 document.getElementById('namegroup').innerHTML=groupinfodata.data.group.name;
 console.log(groupinfodata)
 showuseronscreen(groupinfodata.data.userdata)
}











document.getElementById('group').addEventListener('click',()=>{
    showmembers();
})
async function showmembers(){
    selectedOptions=[]
    document.getElementById('members').innerHTML='';
    let selectedbox=document.getElementById('members');
    console.log(selectedbox)
    const userdata=await axios.get('http://localhost:2000/user/getusers',{ headers: { "Authorization": token } });
    userdata.data.forEach(user => {
      console.log(user);
        let option=`<option value="${user.id}">${user.username}</option>`
        selectedbox.insertAdjacentHTML('beforeend', option);
    });
}

document.getElementById('members').addEventListener('change',(event)=>{ 
   let selectedOption = Array.from(event.target.selectedOptions).map(option => option.value);
    selectedOptions.indexOf(parseInt(selectedOption[0]))===-1?selectedOptions.push(parseInt(selectedOption[0])):console.log("This item already exists");
    console.log('Selected options:', selectedOptions);
  
});