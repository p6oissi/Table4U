# Build React frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Build Spring Boot jar
FROM eclipse-temurin:21-jdk-alpine AS backend-builder
WORKDIR /app
COPY gradlew gradlew.bat ./
COPY gradle/ gradle/
COPY build.gradle.kts settings.gradle.kts ./
COPY src/ src/
# Inject built frontend into Spring Boot static resources
COPY --from=frontend-builder /app/dist/ src/main/resources/static/
RUN chmod +x gradlew && ./gradlew bootJar --no-daemon

# Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
