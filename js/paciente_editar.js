console.log(location.search) // lee los argumentos pasados a este formulario
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
fecha_nacimiento:19000101,
direccion:"",
telefono:"",
email:"",
cobertura:"",
url:'http://127.0.0.1:5000/pacientes/'+id,
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
          var options = {
          body: JSON.stringify(paciente),
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow'
          }
          fetch(this.url, options)
          .then(function () {
          alert("Paciente modificado")
          window.location.href = "./pacientes.html";
          })
          .catch(err => {
          console.error(err);
          alert("Error al Modificar")
          window.location.href = "./pacientes.html"
          })
          }
          },
          created() {
          this.fetchData(this.url)
          },
          }).mount('#app')





// console.log(location.search) // lee los argumentos pasados a este formulario
// var dni=location.search.substr(4)
// console.log(dni)
// const { createApp } = Vue
// createApp({
// data() {
// return {
// dni:"",
// nombre:"",
// apellido:"",
// fecha_nacimiento:19000101,
// direccion:"",
// telefono:"",
// email:"",
// cobertura:"",
// url:'http://127.0.0.1:5000/pacientes/'+dni,
// }
// },
// methods: {
// fetchData(url) {
// fetch(url)
// .then(response => response.json())
//         .then(data => {
//           console.log(data)
          // this.dni=data.dni
          // this.nombre=data.nombre
          // this.apellido=data.apellido
          // this.fecha_nacimiento=data.fecha_nacimiento
          // this.direccion=data.direccion
          // this.telefono=data.telefono
          // this.email=data.email
          // this.cobertura=data.cobertura
//           })
//           .catch(err => {
//           console.error(err);
//           this.error=true
//           })
//           },
//           modificar() {
//           let producto = {
            // dni:this.dni,
            // nombre:this.nombre,
            // apellido:this.apellido,
            // fecha_nacimiento:this.fecha_nacimiento,
            // direccion:this.direccion,
            // telefono:this.telefono,
            // email:this.email,
            // cobertura:this.cobertura
//           }
//           var options = {
//           body: JSON.stringify(producto),
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           redirect: 'follow'
//           }
//           fetch(this.url, options)
//           .then(function () {
//           alert("Registro modificado")
//           window.location.href = "./pacientes.html";
//           })
//           .catch(err => {
//           console.error(err);
//           alert("Error al Modificar")
//           window.location.href = "./pacientes.html";
//           })
//           }
//           },
//           created() {
//           this.fetchData(this.url)
//           },
//           }).mount('#app')









