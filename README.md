<!-- This is what you need to set up and run the project -->

# Setup

To run this project, install it locally using npm:

```bash
cd ../birthday-discount-campaign
pnpm install
```

<!-- Redis -->

## Redis

To run this project, you need to have Redis installed on your machine. You can download it from [here](https://redis.io/download).

After installing Redis, you can run it using the following command:

```bash
redis-server
```

<!-- .env -->

## .env

Create a .env file in the root directory of the project. Add the following environment-specific variables:
DATABASE_URL="postgresql://USER:PASS@localhost:5432/birthdaydb"
EMAIL_USER="<YOUR_EMAIL@example.com>"
EMAIL_PASS="YOUR_EMAIL_PASSWORD"
JWT_SECRET="YOUR_JWT_SECRET"
REDIS_URL="redis://localhost:6379"

```-->

```

<!-- PostgreSQL -->

## PostgreSQL

To run this project, you need to have PostgreSQL installed on your machine. You can download it from [here](https://www.postgresql.org/download/).

After installing PostgreSQL, you can run it using the following command:

```bash
sudo service postgresql start
```

<!-- Run -->

<!-- Based on the DB scheme you cam add some data like this with PostgreSQL commands -->

<!-- model User {
  id                    Int                     @id @default(autoincrement())
  email                 String                  @unique
  birthdate             DateTime
  createdAt             DateTime                @default(now())
  userProductPreference UserProductPreference[]
}

model Product {
  id                    Int                     @id @default(autoincrement())
  name                  String
  description           String?
  price                 Float
  image_url             String?
  userProductPreference UserProductPreference[]
}

model UserProductPreference {
  id        Int     @id @default(autoincrement())
  user_id    Int
  product_id Int
  product   Product @relation(fields: [product_id], references: [id], onDelete: Cascade)
  user      User    @relation(fields: [user_id], references: [id], onDelete: Cascade)
}
 -->

<!-- INSERT INTO "User" (email, birthdate) VALUES ('  ', '  ');
INSERT INTO "Product" (name, description, price, image_url) VALUES ('  ', '  ', '  ', '  ');
INSERT INTO "UserProductPreference" (user_id, product_id) VALUES ('  ', '  '); -->

## Run

To run this project, run the following command:

```bash
pnpm start:dev
```
