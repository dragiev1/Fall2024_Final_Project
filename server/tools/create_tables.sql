-- Create the 'products' table
CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" NUMERIC(10, 2) NOT NULL,
    "tags" TEXT[] NOT NULL, -- array of tags
    "brand" TEXT, -- optional
    "weight" NUMERIC(10, 2) NOT NULL,
    "dimensions" JSONB NOT NULL, -- JSON for width, height, depth
    "returnPolicy" TEXT NOT NULL,
    "minimumOrderQuantity" INTEGER NOT NULL,
    "images" TEXT[] NOT NULL, -- array of image URLs
    "thumbnail" TEXT NOT NULL, -- single image URL for thumbnail
);