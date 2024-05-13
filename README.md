Tesla Shop es una tienda en linea


## Correr en dev

1. Clonar el repositorio
2. Crear una copia del ``` env.template ``` y renombrarlo a ``` .env ```y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
    Tener Docker corriendo
4. Levantar la base de datos ```docker compose up -d``` 
5. Correr las migraciones de prisma ```npx prisma migrate dev```
6. Ejecutar seed ```npm run seed```
    Si la terminal arroja  <-- Seed ejecutado correctamente -->  significa que se cargo la base de 
7. Limpiar el localStorage del navegador
    En Chrome esa en la pestaña de Aplications
8. Correr la base de datos ```npm run dev```



## Correr en producción


## Recursos 
https://tailwindcomponents.com/component/pagination-3
### Atajos de VSC
https://filisantillan.com/blog/vscode-atajos/