En este archivo voy a escribir los requisitos y pasos para poder usar correctamente la API y la aplicación

Planeaba hacer una documentación extensa, pero sinceramente, son la una de la mañana y dejé todo para el último jajaja
y falta otro proyecto, por lo que el que lo revise, tendrá que conformarse con el código y las instrucciones de aquí 😁👍

NOTA: Esto solo funciona en windows, para linux son otros procesos y requisitos qu no me dio tiempo de implementar

REQUERIMIENTOS WINDOW
__________________________________________________________________________________________________________________________
tener instalado xampp
tener instalado node.js
habilitar reglas en el firewell por si acaso
    1. win + R y escribe wf.msc
    2. una vez en la ventana, ve a reglas de entrada en el panel izquierdo
    3. una vez estando allí, en el panel derecho da click en nueva regla, selecciona TCP
    5. elige la opción de puerto, las dos reglas que vas a crear son para el puerto 3000 y el 3060
Abre xampp-control panel y abre la configuración de mysql my.ini
    1. Modifica la parte donde dice bind-addres, cambiala a 0.0.0.0 para que se ejecute desde cualquier ip, ya sea localhost
     o la ip local que jala con tu modem

copia la carpeta de la base de datos y pegala en C:\xampp\mysql\data
En consola escribe lo siguiente:
    1: mysql -u root -p y presiona enter, te pedirá la contraseña, no tiene, vuelve a presionar enter
    2: CREATE USER 'root'@'%' IDENTIFIED BY ''; Para modificar el usuario root y que pueda acceder en cualquier ip
    3: GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY ''; Para darle todos los permisos a root
    4: GRANT ALL PRIVILEGES ON parrotfilms.* TO 'root'@'%'; Da los privilegios para acceder a la base de datos
-------------------------------------------------------------------------------------------------------------------------------
⚠️ADVERTENCIA: ESTA API Y LA APP NO SON SEGURAS, ME HUBIERA GUSTADO PONERLE MEJOR SEGURIDAD, PERO NO PUDE, MANEJESE CON 
CUIDADO⚠️
_______________________________________________________________________________________________________________________________
PASOS
    1. vaya a la carpeta de api y ejecute el siguiente comando: npm start
    2. descargue la app y utilisela

Me cree si le digo que creí que iba a ser más difícil de usar?, afortunadamente, lo dificil son lso requerimientos

Esta api funciona por CLI y por un navegador para consultar datos, si quiere insertarlos use POSTMAN, INSOMNIA(mi favorito), 
o curl, que es un poco más complicado, pero simple si estás acostumbrado, sin embargo, si no es necesario, solo use la app
para haer las funciones que lleva predeterminadas.

Fue un gusto escribir esto, y hacer este proyecto, aunque casi no la libro, gracias por leer y por revisar este proyecto,
un saludo o abrazo, sea felíz

EDIT: el app para android no funciona, es recomendable verlo desde el IDE y cambiar el ip a el ip local de su preferencia
así que lo lamento jajaja, eso baja mi calificación, y no sé cuanto jajaja
