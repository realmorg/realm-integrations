FROM maven:3.10-eclipse-temurin-25-alpine AS build
WORKDIR /app
COPY pom.xml ./
RUN mvn -q -B dependency:go-offline
COPY src src
RUN mvn -q -B package -DskipTests

FROM eclipse-temurin:25-jre-alpine
WORKDIR /app
COPY --from=build /app/target/realm-spring-boot-0.1.0.jar app.jar
EXPOSE 8000
CMD ["java", "-jar", "app.jar"]
