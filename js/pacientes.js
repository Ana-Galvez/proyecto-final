const { createApp } = Vue
createApp({
data() {
return {
pacientes:[],
//url:'http://localhost:5000/productos',
// si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
url:'http://127.0.0.1:5000/pacientes', // si ya lo subieron a pythonanywhere
error:false,
cargando:true,
/*atributos para el guardar los valores del formulario */
id:0,
dni:"",
nombre:"",
apellido:"",
fecha_nacimiento:19010101,
direccion:"",
telefono:"",
email:"",
cobertura:"",
}
},
methods: {
fetchData(url) {
      fetch(url)
      .then(response => response.json())
      .then(data => {
      this.pacientes = data;
      this.cargando=false
      })
      .catch(err => {
      console.error(err);
      this.error=true
      })
      },
      eliminar(paciente) {
      const url = this.url+'/' + paciente;
      var options = {
      method: 'DELETE',
      }
      fetch(url, options)
      .then(res => res.text()) // or res.json()
      .then(res => {
        alert("Paciente eliminado con éxito")
      location.reload();
      })
      },
      grabar(){
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
      body:JSON.stringify(paciente),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      redirect: 'follow'
      }
      fetch(this.url, options)
      .then(function () {
      alert("Paciente grabado con éxito")
      window.location.href = "./pacientes.html";
      })
      .catch(err => {
      console.error(err);
        alert("Error al Grabar")
        window.location.href = "./pacientes.html"
      })
    },
    // dateFormat(fecha_nacimiento){
    //   let fecha = dayjs(producto.fecha_nacimiento).format('DD/MM/YYYY');
    //   return fecha;
    // }
    // filters:{
    //   fechaFormateada(fechaArreglada){
    //     let fecha=dayjs(fechaArreglada).format('DD/MM/YYYY');
    //     return fecha;
    //   }
    // }
  },
    
    created() {
    this.fetchData(this.url)
    },
    }).mount('#app')





// // const { createApp } = Vue
// // createApp({
// // data() {
// // return {
// // productos:[],
// //url:'http://localhost:5000/productos',
// // si el backend esta corriendo local usar localhost 5000(si no lo subieron a pythonanywhere)
// url:'http://127.0.0.1:5000/productos', // si ya lo subieron a pythonanywhere
// error:false,
// cargando:true,
// /*atributos para el guardar los valores del formulario */
// id:0,
// nombre:"",
// imagen:"",
// stock:0,
// precio:0,
// }
// },
// methods: {
// fetchData(url) {
//       fetch(url)
//       .then(response => response.json())
//       .then(data => {
//       this.productos = data;
//       this.cargando=false
//       })
//       .catch(err => {
//       console.error(err);
//       this.error=true
//       })
//       },
//       eliminar(producto) {
//       const url = this.url+'/' + producto;
//       var options = {
//       method: 'DELETE',
//       }
//       fetch(url, options)
//       .then(res => res.text()) // or res.json()
//       .then(res => {
//       location.reload();
//       })
//       },
//       grabar(){
//       let producto = {
//       nombre:this.nombre,
//       precio: this.precio,
//       stock: this.stock,
//       imagen:this.imagen
//       }
//       var options = {
//       body:JSON.stringify(producto),
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       redirect: 'follow'
//       }
//       fetch(this.url, options)
//       .then(function () {
//       alert("Registro grabado")
//       window.location.href = "./productos.html";
//       })
//       .catch(err => {
//       console.error(err);
//         alert("Error al Grabarr")
//       })
//     }
//     },
//     created() {
//     this.fetchData(this.url)
//     },
//     }).mount('#app')