
const Bootcamp = require('APPModels/Bootcamp.Model'); 
const User = require('APP/Models/User.Model'); 

// Crear y guardar un nuevo Bootcamp
const createBootcamp = (datosBootcamp) => {
  return new Promise(async (resolve, reject) => {
        try {
            const bootcamp = await Bootcamp.create(datosBootcamp);
            resolve(bootcamp);
        } catch (error) {
            reject(error);
        }
    });
};

// Agregar un Usuario al Bootcamp
const addUser = (idBootcamp, idUser) => {
    return new Promise(async(resolve, reject) => {
        try {
            const bootcamp = await Bootcamp.findByPk(idBootcamp);
            if(!bootcamp) {
                return reject("El id del Bootcamp no existe en nuestros registros");
            }

            const user = await User.findByPk(idUser);
            if(!user) {
                return reject("El id de Usuario no existe en nuestros registros");
            }

            await bootcamp.addUser(user);
            
            resolve("Estudiante asignado con éxito al Bootcamp");
        } catch (error) {
            reject(error);
        }
        
    });
}

// Obtener el Bootcamp por ID
const findById = (idBootcamp) => {
    
    return new Promise(async (resolve, reject) => {
        try {
            const bootcamp = await Bootcamp.findByPk(idBootcamp, {
                include: {
                    model: User,
                    as: "users",
                    attributes: ["id", "firstName", "lastName", "email"],
                }, 
            });
            resolve(bootcamp);
        } catch (error) {
            reject(error);
        }
    })
}

// Obtener todos los Bootcamps
const findAllBootcamp = () => {
    return new Promise(async(resolve,reject)=>{
        try {
            const bootcamp = await Bootcamp.findAll({
                include:{
                    model:User,
                    as:"users",
                    attributes: ["id", "firstName", "lastName", "email"],
                    through: {
                      attributes: [],
                    }
                }
            });

            resolve(bootcamp);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { createBootcamp, addUser, findById, findAllBootcamp };