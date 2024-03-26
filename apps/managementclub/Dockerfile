FROM node:alpine as development 
# Set the working directory
WORKDIR /usr/src/app
# Copy package files and install dependencies
COPY package.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
RUN npm install 

# Copy only necessary source files
COPY apps/managementclub apps/managementclub
COPY libs libs

# Build the application
RUN npm run build managementclub

# Command to run the application
CMD ["node","dist/apps/managementclub/main"]