# Use the official Node.js image
FROM node:14

# Install necessary system dependencies
RUN apt-get update && \
    apt-get install -y \
    bash \
    git \
    openssh-client \
    curl \
    xvfb \
    libgtk-3-0 \
    libnotify-dev \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb

# Create app directory
RUN mkdir /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json /app/

# Install npm dependencies
RUN npm install

# Copy the rest of the application files
COPY . /app

# Expose ports
EXPOSE 3000

# Set environment variables
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Start the app
ENTRYPOINT ["sh", "./run.sh"]
