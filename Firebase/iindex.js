const apiKey = 'AIzaSyB_mwqWlWTdGDnFYx0EPPt1ebufhkeK0iU';
const projectId = 'bedu2-8583a';
const collection = 'students';

firebase.initializeApp({
  apiKey, //Primero pasamos el Apikey
  projectId // Luego el projectId
});

var db = firebase.firestore();
getUsers = () => {
  //FILTRADO CON WHERE
  //db.collection(collection).where("age",">",22).get().then((response) => {
  db.collection(collection).get().then((response) => {
      response.forEach((doc) => {
          console.log(doc.id);
          console.log(doc.data())
      });
  });
}

getUsers();


addUser = () => {
  let nameValue = document.getElementById('nameInput').value
  let lastnameValue = document.getElementById('lastnameInput').value
  let ageValue = document.getElementById('ageInput').value
  let groupValue = document.getElementById('groupInput').value

  db.collection(collection).add({
    name: nameValue,
    last_name: lastnameValue,
    age: parseInt(ageValue),
    group: groupValue
  })
  .then(function(response) {
      console.log("Document written with ID: ", response.id);
      showUsers();
      //getUsers()
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

updateUser = (userId, name, last_name, age, group, address) => {
  db.collection(collection).doc(userId).set({
      name: name,
      last_name: last_name,
      age: age,
      group: group,
      address: address,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
  }, { merge: true })
}
//updateUser('WrnuUGfmEaaQV9lI7lFs','Elizabeth','Torres',28,'FS-06-2018','Zapopan');
//updateUser('fiaGfWn1790trK6ZHoIq', 'Jonathan', 'Sosa', 29, 'Zapopan');

classes = (userId, remove, item) => {
  const user = db.collection(collection).doc(userId)

  if(remove){
      user.update({
          classes: firebase.firestore.FieldValue.arrayRemove(item)
      });
  } else {
      user.update({
          classes: firebase.firestore.FieldValue.arrayUnion(item)
      });
  }
}
classes('WrnuUGfmEaaQV9lI7lFs',false,'History');
//phones('OEdBHoEvnQ8q0oFgTmXH',true,'3345895678');

removeAddress = (userId) => {
  const user = db.collection(collection).doc(userId)
  user.update({
      address: firebase.firestore.FieldValue.delete()
  })
}
//removeAddress('fiaGfWn1790trK6ZHoIq');

removeUser = (userId) => {
  db.collection('users').doc(userId).delete() // Si no se pone .doc(userId), se eliminaria todos los documentos de la coleccion users
}
removeUser('fiaGfWn1790trK6ZHoIq');

//////////////////////////////////////////////////////////////
let clickRemove = (event) => {
  removeUser(event.toElement.id)
  showUsers()
}

let removeChilds = (container) => {
  let child = container.lastChild
  while (child) {
      container.removeChild(child)
      child = container.lastChild
  }
}


let showUsers = () => {
  const container = document.getElementById("container")
  removeChilds(container)

  let table = document.createElement("table")
  table.setAttribute("class", "table table-dark")

  let headers = ["Nombre", "Apellido", "Edad"]

  let tr = document.createElement("tr");
  for (let i = 0; i < headers.length; i++) {
      let th = document.createElement("th")
      th.innerText = headers[i]
      tr.appendChild(th)
  }
  table.appendChild(tr)

  db.collection(collection).get().then((response) => {
      response.forEach((doc) => {

          let user = doc.data();
      
          let tr = document.createElement("tr");
          let name = document.createElement("td")
          name.innerText = user.name
          let lastname = document.createElement("td")
          lastname.innerText = user.lastname
          let age = document.createElement("td")
          age.innerText = user.age

          let contenedorBoton = document.createElement("td")
          let boton = document.createElement("button")
          boton.setAttribute("class", "remover")
          boton.setAttribute("id", doc.id)
          boton.innerText = "Eliminar"
          boton.addEventListener('click', clickRemove)
          contenedorBoton.appendChild(boton)
          
          tr.appendChild(name)
          tr.appendChild(lastname)
          tr.appendChild(age)

          tr.appendChild(contenedorBoton)
          
          table.appendChild(tr)
      });
  });

  container.appendChild(table)
}
document.addEventListener("DOMContentLoaded", showUsers)