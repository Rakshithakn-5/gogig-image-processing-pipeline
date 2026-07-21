# Image Processing Pipeline

## Overview

A backend system for uploading images, processing them asynchronously,
and generating analysis results.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Redis
- BullMQ
- Docker


## Architecture

Client
 |
Express API
 |
PostgreSQL
 |
Redis Queue
 |
Worker
 |
Image Analysis


## API Endpoints

### Upload Image

POST

/api/upload


Response:

{
 processingId,
 status:"pending"
}


### Check Status

GET

/api/status/:id


Response:

{
 status:"completed",
 analysis:{
  blurry:false,
  lowLight:false,
  duplicate:false,
  ocrText:"Hello World",
  confidence:0.96
 }
}


## Running Project

Install dependencies

npm install


Start Redis and Database

docker compose up


Start server

npm run dev