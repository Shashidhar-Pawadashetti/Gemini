# frontend/Dockerfile

# 1. Use Node.js image
FROM node:24-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the code
COPY . .

# 6. Expose the standard Vite port
EXPOSE 5173

# 7. Start the Vite development server with --host so it's accessible outside the container
CMD ["npm", "run", "dev", "--", "--host"]