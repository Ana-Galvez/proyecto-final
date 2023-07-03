from flask import Flask ,jsonify ,request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://amg1688:yanina1688@amg1688.mysql.pythonanywhere-services.com/amg1688$default'
# URI de la BBDD                          driver de la BD  user:clave@URLBBDD/nombreBBDD
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db= SQLAlchemy(app)
ma=Marshmallow(app)

class Paciente(db.Model):    
    id=db.Column(db.Integer, primary_key=True)
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
with app.app_context():
    db.create_all()  # aqui crea todas las tablas
#  ************************************************************
class PacienteSchema(ma.Schema):
    class Meta:
        fields=('id','dni','nombre','apellido','fecha_nacimiento','direccion','telefono','email','cobertura')
paciente_schema=PacienteSchema()
pacientes_schema=PacienteSchema(many=True)

@app.route('/index',methods=['GET'])
def get_Pacientes():
    all_pacientes=Paciente.query.all()
    result=pacientes_schema.dump(all_pacientes)
                                                
    return jsonify(result)

@app.route('/index/<id>',methods=['GET'])
def get_paciente(id):
    paciente=Paciente.query.get(id)
    return paciente_schema.jsonify(paciente)

@app.route('/index/<id>',methods=['DELETE'])
def delete_paciente(id):
    paciente=Paciente.query.get(id)
    db.session.delete(paciente)
    db.session.commit()
    return paciente_schema.jsonify(paciente)

@app.route('/index', methods=['POST'])
def create_paciente():
 
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

@app.route('/index/<id>' ,methods=['PUT'])
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