# 📷 GoGig AI Image Intelligence

An AI-powered image processing pipeline that uploads images, processes them asynchronously, and generates an analysis report.

## Features

- Upload images through a React frontend
- Background image processing using BullMQ
- Redis-based job queue
- Image resolution detection
- Brightness analysis
- Blur detection
- Low-light detection
- OCR text extraction using Tesseract
- Professional analysis dashboard

## Tech Stack

### Frontend
- React
- TypeScript
- Bootstrap
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM

### Image Processing
- Sharp
- Tesseract OCR

### Queue & Database
- BullMQ
- Redis
- PostgreSQL

## Project Structure

```
gogig-image-processing-pipeline
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── src
│   ├── controllers
│   ├── workers
│   ├── routes
│   └── app.ts
│
├── prisma
├── docker-compose.yml
└── README.md
```

## Workflow

1. User uploads an image.
2. The backend stores image information.
3. A BullMQ job is added to the Redis queue.
4. The worker processes the image using Sharp and Tesseract OCR.
5. Analysis results are stored in PostgreSQL.
6. The frontend displays the analysis report.

## API Endpoints

### Upload Image

**POST**

```
/api/upload
```

### Get Image Analysis

**GET**

```
/api/images/:id
```

## Running the Project

### Backend

```bash
npm install
docker compose up
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Sample Output

The application provides:

- Image Resolution
- Brightness Level
- Blur Detection
- Lighting Condition
- OCR Confidence
- Extracted Text

## Author

**Rakshitha K N**