const express=require('express');
const app=express();
const PORT=3000
app.use(express.json());

app.use((req,res,next) => {
    console.log(`Petición: ${req.method} -> ${req.url}`);
    next();
});

app.get('/inicio', (req, res) => {
    res.json({ mensaje: "¡Bienvenido al registro de servicios!" });
});

app.get('/informacion', (req, res) => {
    res.json({
        mensaje:"¡bienvenido al registro!"
    });
});

app.post("/solicitudes",(req,res)=>{
    const {nombre,apellido,correo}=req.body;
    
    if (nombre||apellido||correo){
        return res.status(400).json({
            mensaje:"los campos son obligatorio"
        });
    } 
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
    if (!correoRegex.test(correo)) {
        return res.status(400).json({
            error: "Bad Request",
            mensaje: "El formato del correo electrónico no es válido."
        });
    }
    res.status(201).json({
        mensaje:"solicitud recibida con exito.",
        "dato_enviado":nombre,
        "dato_apellido":apellido,
        "datos_correo":correo
    });
});

app.use ((req,res)=>{
    res.status(404).json({error:"la ruta no exixte"})
});

app.listen(PORT,()=>{
    console.log("servidor corriendo en el puerto" +PORT)
})
