###  Prueba-insttantt
Este es un proyecto completo con frontend y backend, esta aplicación contiene una página de inicio que lo puede direccionar al login , luego en el login puedes iniciar sesión o registrarse,
si te registras te lleva al dashboard de la app y si te logues también. Este contiene un módulo de hobbies y de edición de perfil y cuando te registres te enviará a una página para que completes el registro dentro del dashboard. este también tiene directrices de seguridad y se caducidad de sección.

## Features

frontend 

- Angular
- Angular material
- ngx-socket-io
- ngx-cookie-service
- sweetalert2
- Angular

backned

- node
- express
- socket
- mongoose
- nodemon

nota (el backned está hecho en sus servicios en socket me pareció un reto hacerlo de esa manera y pues asumí que en su totalidad se debía hacer con esta tecnología );
## Sustentacion

Se realizó en node porque me parece un framework muy versátil y existe mucha documentación para este y es unos de los más escuchado en compañías y foros. 
También se implementó socket por que pues las emisiones y respuesta en tiempo real es muy necesario para usabilidad.

Para el front se utilizo muchos asíncronos servicios para los socket, angular material por la usabilidad y también algunas librerías de alertas , Pipes par filtros, también se implementó  un mocks simulado una api , NgModel , FormControl para formulario por su calidad al implementarlos pues está a la vanguardia, los mensajes de errores se manejaron en los componentes según las respuesta.

## instalación

- Clonar el repositorio git clone 

nota(En este se encuentra una carpeta con el front y otra para el back)

se trabajo con la version de node v14por si tiene  problemas al clonarla 


- front
acceder a las carpeta front-insttantt
npm install  == para instalar node_modules y dependencias
ng serve  o  npm start o  npx -p @angular/cli ng s , según prefiera
corriendo  http://localhost:4200/
login http://localhost:4200/login
nota(si por alguna razón no ve respuestas o se intenta conectar instalar el plugin de cors en el navegador y  encenderlo  para poder recibir peticiones)

- back 

acceder a las carpeta api-insttantt
npm install  == para instalar node_modules y dependencias
npm run dev o npm start ,  para correr el server segun prefiera o en dev o prod 
corriendo  http://localhost:4500/

nota( La base de datos se encuentra en mongo atlas un servicio cloud no sql, en las variables de entorno.env se encuentra las url y credenciales de la misma tener en cuenta esto de no eliminarlas.)

## agradecimientos 

muchas gracias por la oportunidad de participar en la convocatoria lastima no tener más tiempo para mejorarlo


