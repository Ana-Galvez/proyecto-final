console.log(location.search)
var id=location.search.substr(4)
console.log(id)
const { createApp } = Vue
createApp({
data() {
return {
id:0,
dni:"",
nombre:"",
apellido:"",
fecha_nacimiento:"",
direccion:"",
telefono:"",
email:"",
cobertura:"",
url:'https://amg1688.pythonanywhere.com/index/'+id,
}
},
methods: {
fetchData(url) {
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    this.id=data.id
    this.dni=data.dni
    this.nombre=data.nombre
    this.apellido=data.apellido
    this.fecha_nacimiento=data.fecha_nacimiento
    this.direccion=data.direccion
    this.telefono=data.telefono
    this.email=data.email
    this.cobertura=data.cobertura
    })
  .catch(err => {
  console.error(err);
  this.error=true
  })
},
modificar() {
  let paciente = {
    dni:this.dni,
    nombre:this.nombre,
    apellido:this.apellido,
    fecha_nacimiento:this.fecha_nacimiento,
    direccion:this.direccion,
    telefono:this.telefono,
    email:this.email,
    cobertura:this.cobertura
    } 
  if(!this.dni || !this.nombre || !this.apellido || !this.fecha_nacimiento || !this.direccion
    || !this.telefono || !this.email || !this.cobertura){
    alert("Falta agregar datos. Verifique por favor");
    e.preventDefault();
  }
  if(this.fecha_nacimiento<"1900-01-01" || this.fecha_nacimiento>"2099-12-31"){
    alert("Fecha de nacimiento desde 01-01-1900 hasta 31-12-2099")
    e.preventDefault();
  }
  let expresionMail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!expresionMail.test(this.email)){
    alert("El email está mal ingresado.Verifique que esté bien escrito");
    e.preventDefault();
  }

  var options = {
  body: JSON.stringify(paciente),
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  redirect: 'follow'
  }
  fetch(this.url, options)
  .then(function () {
  alert("Paciente modificado")
  window.location.href = "./index.html";
  })
  .catch(err => {
  console.error(err);
  alert("Error al Modificar")
  window.location.href = "./index.html"
  })
  }
},
created() {
  this.fetchData(this.url)
},
}).mount('#app')