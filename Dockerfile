# Set the base image to create the image for react app
FROM node:20-alpine

# Create a user with permissions to run the app

# -S => Create a system user
# -G => Add the user to a group

# This is done to avoid running the app as root.
# Because if running the app as root, 
# any vulnerability in the app can be exploited to gain access to the host system

# It's a good practice to run the app as a non-root user
RUN addgroup app && adduser -S -G app app

# Set the user to run the app
USER app

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# This is done before copying the rest of the files to take advantage of Docker's cache.
# If the package.json and package-lock.json files haven't changed, Docker will use the cache dependencies
COPY package*.json ./

# Sometimes, the ownership of the files in the working directory is changed to root 
# and thus the app can't access the file and throws an error EACCES: permission denied
# To avoid this, change the ownership of the files to the root user
USER root

# Change the ownership of the /app directory to the app user
# chown -R <user>:<group> <directory>
# chown command changes the user and/or group ownership of for given files
RUN chown -R app:app .

# Change the user back to the app user
USER app

# Install dependencies
RUN npm install

# Copy the rest of the file to the working directory
COPY . .

# Expose port 3000 to tell Docker that the container listens on the specified network ports at runtime
EXPOSE 3000