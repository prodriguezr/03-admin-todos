# Development

Steps to build the database in development

1.- Copy the file env.sample as .env
2.- Open the .env file and set the following environments variables:

```
DATABASE_URL
```

3.- Build the database

```
docker-compose up -d
```

# Prisma commands

```
npx orisma init
npx prisma migrate dev
npx prisma generate
```

---

# Desarrollo

1.- Copia el archivo env.sample como .env
2.- Abra el archivo .env y configure las siguientes variables de entorno:

```
DATABASE_URL
```

3.- Construir la base de datos

```
docker-compose up -d
```

4.- Execute the following route [for fill todo's](http://localhost:3000/api/seed)

# Comandos de Prisma

```
npx orisma init
npx prisma migrate dev
npx prisma generate
```
