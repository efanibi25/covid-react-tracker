# Start from a lightweight Python image (which is often Debian-based)
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy all necessary files into the container
COPY . .

# Install wget using the apt package manager and then clean up
RUN apt-get update && \
    apt-get install -y wget && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# The command that will run when the container starts
CMD ["python", "covid_stats.py"]