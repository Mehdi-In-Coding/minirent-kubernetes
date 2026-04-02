# MiniRent - Projet Docker Kubernetes

### Objectif du projet

L’objectif du projet est de développer une mini application de réservation en architecture microservices, conteneurisée avec Docker et déployée sur Kubernetes avec Minikube.

### Architecture

Le projet repose sur trois composants principaux :
- un service `catalog-service` qui expose la liste des produits
- un service `reservation-service` qui gère les réservations
- une base PostgreSQL qui stocke les réservations

Un frontend web simple permet de consulter les produits et de créer des réservations.  
L’exposition des services se fait via un Ingress Kubernetes.

### Technologies utilisées

- Node.js
- Express
- PostgreSQL
- Docker
- Kubernetes
- Minikube
- Ingress NGINX
- GitHub
- RBAC Kubernetes

### Fonctionnement

Le service `catalog-service` expose l’endpoint `GET /products`.  
Le service `reservation-service` expose les endpoints `GET /reservations` et `POST /reservations`.  
Les réservations sont stockées dans PostgreSQL.  
Le frontend appelle les API via l’hôte local `minirent.info`.

### Sécurisation

Le cluster a été sécurisé avec :
- un `ServiceAccount`
- un `Role`
- un `RoleBinding`

Cela permet d’appliquer un contrôle d’accès minimal sur les ressources Kubernetes.

###  Déploiement

Les applications ont été :
- dockerisées avec un `Dockerfile`
- publiées sur Docker Hub
- déployées dans Minikube avec `Deployment` et `Service`
- exposées via `Ingress`

### Tests réalisés

Tests réalisés :
- récupération de la liste des produits
- récupération de la liste des réservations
- création d’une réservation
- vérification de l’insertion dans PostgreSQL
- test du frontend dans le navigateur

### Procédures
- Docker Hub des images
- `kubectl get pods`
- `kubectl get services`
- `kubectl get ingress`
- navigateur avec le frontend :
  http://minirent.info/
  http://minirent.info/products
  http://minirent.info/reservations
- test API réussi
- base PostgreSQL avec la table `reservations`

### Bilan

Ce projet m’a permis de mettre en place une architecture microservices complète avec Docker et Kubernetes, d’utiliser une base PostgreSQL, d’exposer les services via Ingress et d’ajouter une première couche de sécurité avec RBAC.
