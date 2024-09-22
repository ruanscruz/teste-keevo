# FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
# WORKDIR /App
# COPY . .
# RUN dotnet restore
# RUN dotnet publish -c Release -o out

# FROM mcr.microsoft.com/dotnet/sdk:6.0
# WORKDIR /App
# COPY --from=build /App/out .
# RUN dotnet tool install --version 6.0.9 --global dotnet-ef
# RUN dotnet-ef database update
# ENTRYPOINT dotnet-ef database update


ARG DOTNET_RUNTIME=mcr.microsoft.com/dotnet/aspnet:6.0
ARG DOTNET_SDK=mcr.microsoft.com/dotnet/sdk:6.0

FROM ${DOTNET_RUNTIME} AS base
ENV ASPNETCORE_URLS=http://+:5139
WORKDIR /App
EXPOSE 5139

# Base for build
FROM ${DOTNET_SDK} AS buildbase
WORKDIR /App
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o out

## Run migrations
FROM buildbase as migrations
RUN dotnet tool install --version 6.0.33 --global dotnet-ef
RUN dotnet dev-certs https --trust
ENV PATH="$PATH:/root/.dotnet/tools"
ENTRYPOINT dotnet-ef database update && dotnet run