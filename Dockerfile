# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your application runs on
EXPOSE 3000

# Set environment variables (you can adjust these according to your .env file)
ENV PORT=3000
ENV DB_URI=mongodb+srv://dheerajkumawat0707:dheeraj07@cluster6.vce6v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster6
ENV QUEUE_URL=redis://default:TBL57KIHCdIBCthcfTgR6LuGYZB8se7r@redis-14260.c305.ap-south-1-1.ec2.redns.redis-cloud.com:14260 
#ENV JWT_SECRET=<Your JWT Secret>

# Command to run the application
CMD ["npm", "start"]
