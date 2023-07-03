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
fecha_nacimiento:"",
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
      if(!this.dni || !this.nombre || !this.apellido || !this.fecha_nacimiento || !this.direccion
        || !this.telefono || !this.email || !this.cobertura){
        alert("Falta agregar datos. Verifique por favor");
        e.preventDefault();
      }
      if(this.fecha_nacimiento<"1900-01-01"){
        alert("Fecha de nacimiento desde 01-01-1900")
        e.preventDefault();
      }
      let expresionMail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!expresionMail.test(this.email)){
        alert("El email está mal ingresado.Verifique que esté bien escrito");
        e.preventDefault();
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
      
      // const fecha=new Date();
      //   this.fecha_nacimiento=fecha.toLocaleDateString('en-US',{
      //   month:'2-digit',
      //   day:'2-digit',
      //   year:'numeric',
      // })
      })
      .catch(err => {
      console.error(err);
        alert("Error al Grabar")
        window.location.href = "./pacientes.html"
      })
    },
    // fechaFormateada(fecha){
    //   let fecha = dayjs(fecha).format('DD/MM/YYYY');
    //   return fecha;
    // }
    // filters:{
    //   fechaFormateada(fecha1){
    //     let fecha=dayjs(fecha1).format('DD/MM/YYYY');
    //     return fecha;
    //   }
    // }
  },
    
    created() {
    this.fetchData(this.url)
    },
    }).mount('#app')