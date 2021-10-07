const db = require('../../database/models');

module.exports = {
    listmovies : async (req,res) =>{
        try { 
            const movies = await db.Movie.findAll({
                include : [
                    {association : 'genre'},
                ]
            })
            let respuesta = {
                meta : {
                    status : 200,
                    cantidad : movies.length,
                    url : req.url
                },
                data : movies
            }
            res.json(respuesta)
        } catch (error) {
            res.json(error.toString())
           }
    },
    detail : async (req,res) =>{
        try {
            const movie = await db.Movie.findByPk(req.params.id,{
                include : [
                    {association : 'genre'},
                ]
            })
            if(movie){
                let respuesta = {
                    status : 200,
                    meta : {
                        url : req.url
                    },
                    data : movie
                }
                return res.status(200).json(respuesta)
            }else{
                const error = new Error('La pelicula no existe') //instacia de la clase Error
                error.status = 400 //valor 400 porque es un atributo
                throw error
            }
         
        } catch (error) {
            res.json({
                idmovie: req.params.id,
                error : error.toString(),
                status: res.status,
                message : "ID incorrecto"
            })
        }
    },
    create : async (req,res) => {
        console.log(req.body)
        try{
            const {title, rating, awards, release_date, length} = req.body
            if(title && rating && awards && release_date){
                const movie = await db.Movie.create({
                    title,
                    rating,
                    awards,
                    release_date,
                    length,
                })

                let respuesta = {
                    status : 200,
                    meta : {
                        url : req.url,
                        message : 'La pelicual ha sido creada'
                    },
                    data : movie
                }
                return res.json(respuesta)
            }else{
                const error = new Error('no se permiten campos vacios y requiere: title, rating, awards , release_date, length') //instacia de la clase Error
                throw error
            }
        }catch(error){
            res.json({
                error : error.toString(),
                status: res.status,
                message: "La pelicual no ha sido creada"
            })
        }

    },
    destroy : async (req,res) => {
        try {
            const movie = await db.Movie.findByPk(req.params.id)
            if(movie){
                await db.Movie.destroy({
                    where : {id: req.params.id}
                })
                res.json({
                    status: res.status,
                    message: "La pelicula ha sido eliminada",
                    movie
                })
                    
            }else{
                const error = new Error("La película no existe")
                throw error
            }
        }catch(error) {
            res.json({
                error: error.toString(),
                status: "La pelicula no ha sido eliminada",
            })
          }
    }
}