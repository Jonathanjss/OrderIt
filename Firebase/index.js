const apiKey = ' AIzaSyB_mwqWlWTdGDnFYx0EPPt1ebufhkeK0iU';
const projectId = 'bedu2-8583a';
const collection = 'Platillos';

firebase.initializeApp({
  apiKey, //Primero pasamos el Apikey
  projectId // Luego el projectId
});

var db = firebase.firestore();
getDishes = () => {
  //FILTRADO CON WHERE
  //db.collection(collection).where("age",">",22).get().then((response) => {
  db.collection(collection).get().then((response) => {
      response.forEach((doc) => {
          console.log(doc.id);
          console.log(doc.data())
      });
  });
}

getDishes();


addDish = () => {
  let nameValue = document.getElementById('nameInput').value
  let priceValue = document.getElementById('priceInput').value
  let descriptionValue = document.getElementById('descriptionInput').value
  let categoryValue = document.getElementById('categoryInput').value

  db.collection(collection).add({
    name: nameValue,
    price: parseFloat(priceValue),
    description: descriptionValue,
    category: categoryValue
  })
  .then(function(response) {
      console.log("Document written with ID: ", response.id);
      getDishes()
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

updateDish = (dishId, name, price, description, category) => {
  db.collection(collection).doc(dishId).set({
      name: name,
      price: price,
      description: description,
      category: category,
      date: firebase.firestore.Timestamp.fromDate(new Date()),
  }, { merge: true })
}

//updateDish('oqLKp4WPcdt29QqO6Bbb', 'Chilaquiles', 50, 'Tortilla', 'Tipicos');

phones = (userId, remove, item) => {
  const user = db.collection('users').doc(userId)

  if(remove){
      user.update({
          phones: firebase.firestore.FieldValue.arrayRemove(item)
      });
  } else {
      user.update({
          phones: firebase.firestore.FieldValue.arrayUnion(item)
      });
  }
}

//phones('OEdBHoEvnQ8q0oFgTmXH',true,'3345895678');

removeAddress = (userId) => {
  const user = db.collection(collection).doc(userId)
  user.update({
      address: firebase.firestore.FieldValue.delete()
  })
}
//removeAddress('fiaGfWn1790trK6ZHoIq');

removeDish = (dishId) => {
  db.collection(collection).doc(dishId).delete() // Si no se pone .doc(userId), se eliminaria todos los documentos de la coleccion users
}
removeDish('oqLKp4WPcdt29QqO6Bbb');