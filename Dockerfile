# Dockerfile
FROM mcr.microsoft.com/playwright:v1.55.0-jammy

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy rest
COPY . .

# Ensure playwright is installed with browsers (image already contains)
# Run tests by default
CMD ["npx", "playwright", "test"]
