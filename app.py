from flask import Flask ,jsonify ,request
# del modulo flask importar la clase Flask y los métodos jsonify,request
from flask_cors import CORS       # del modulo flask_cors importar CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)  # crear el objeto app de la clase Flask
CORS(app) #modulo cors es para que me permita acceder desde el frontend al backend

# configuro la base de datos, con el nombre el usuario y la clave
app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:yanina@localhost/proyectofinal'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False #none
db= SQLAlchemy(app)   #crea el objeto db de la clase SQLAlquemy
ma=Marshmallow(app)   #crea el objeto ma de de la clase Marshmallow

# defino la tabla
class Paciente(db.Model):   # la clase Producto hereda de db.Model    
    id=db.Column(db.Integer, primary_key=True)   #define los campos de la tabla
    dni=db.Column(db.String(15))
    nombre=db.Column(db.String(100))
    apellido=db.Column(db.String(100))
    fecha_nacimiento=db.Column(db.Date())
    direccion=db.Column(db.String(300))
    telefono=db.Column(db.String(100))
    email=db.Column(db.String(64))
    cobertura=db.Column(db.String(100))
    def __init__(self,dni,nombre,apellido,fecha_nacimiento,direccion,telefono,email,cobertura):
        self.dni=dni
        self.nombre=nombre
        self.apellido=apellido
        self.fecha_nacimiento=fecha_nacimiento
        self.direccion=direccion
        self.telefono=telefono
        self.email=email
        self.cobertura=cobertura
    #  si hay que crear mas tablas , se hace aqui
with app.app_context():
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************
class PacienteSchema(ma.Schema):
    class Meta:
        fields=('id','dni','nombre','apellido','fecha_nacimiento','direccion','telefono','email','cobertura')
paciente_schema=PacienteSchema()            # El objeto producto_schema es para traer un producto
pacientes_schema=PacienteSchema(many=True)  # El objeto productos_schema es para traer multiples registros de producto

# crea los endpoint o rutas (json)
@app.route('/pacientes',methods=['GET'])
def get_Pacientes():
    all_pacientes=Paciente.query.all()         # el metodo query.all() lo hereda de db.Model
    result=pacientes_schema.dump(all_pacientes)  # el metodo dump() lo hereda de ma.schema y
                                                 # trae todos los registros de la tabla
    return jsonify(result)                       # retorna un JSON de todos los registros de la tabla

@app.route('/pacientes/<id>',methods=['GET'])
def get_paciente(id):
    paciente=Paciente.query.get(id)
    return paciente_schema.jsonify(paciente)   # retorna el JSON de un producto recibido como parametro

@app.route('/pacientes/<id>',methods=['DELETE'])
def delete_paciente(id):
    paciente=Paciente.query.get(id)
    db.session.delete(paciente)
    db.session.commit()
    return paciente_schema.jsonify(paciente)   # me devuelve un json con el registro eliminado

@app.route('/pacientes', methods=['POST']) # crea ruta o endpoint
def create_paciente():
    #print(request.json)  # request.json contiene el json que envio el cliente
    dni=request.json['dni']
    nombre=request.json['nombre']
    apellido=request.json['apellido']
    fecha_nacimiento=request.json['fecha_nacimiento']
    direccion=request.json['direccion']
    telefono=request.json['telefono']
    email=request.json['email']
    cobertura=request.json['cobertura']
    new_paciente=Paciente(dni,nombre,apellido,fecha_nacimiento,direccion,telefono,email,cobertura)
    db.session.add(new_paciente)
    db.session.commit()
    return paciente_schema.jsonify(new_paciente)

@app.route('/pacientes/<id>' ,methods=['PUT'])
def update_paciente(id):
    paciente=Paciente.query.get(id)
 
    dni=request.json['dni']
    nombre=request.json['nombre']
    apellido=request.json['apellido']
    fecha_nacimiento=request.json['fecha_nacimiento']
    direccion=request.json['direccion']
    telefono=request.json['telefono']
    email=request.json['email']
    cobertura=request.json['cobertura']

    paciente.dni=dni
    paciente.nombre=nombre
    paciente.apellido=apellido
    paciente.fecha_nacimiento=fecha_nacimiento
    paciente.direccion=direccion
    paciente.telefono=telefono
    paciente.email=email
    paciente.cobertura=cobertura

    db.session.commit()
    return paciente_schema.jsonify(paciente)
# programa principal *******************************
if __name__=='__main__':  
    app.run(debug=True, port=5000)    # ejecuta el servidor Flask en el puerto 5000