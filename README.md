# Zay eCommerce

This is a demo project for Containerization & Linux elective at [UCL University College](https://ucl.dk)

The frontend is based on the following template:

* https://github.com/mosaadaldeen/zay-shop

## Frontend

There is a specific README.md file in the frontend project

## Backend

There is a specific README.md file in the backend project

------------

### Docker Setup

Denne README.md fil forklarer opsætningen og anvendelsen af Docker til både frontend og backend applikationer ved hjælp af multi-staging builds, som gør det muligt at bruge de samme Dockerfiles til både development og production.

### Multi-staging Builds

Ved hjælp af multi-staging builds i Docker kan vi definere flere stadier i vores Dockerfiles. Dette betyder, at vi kan bygge og teste applikationen i både et udviklings og produktions miljø.

### Docker Compose

Der er to `docker-compose` filer inkluderet i opsætningen:
- `docker-compose-dev.yaml` til udviklingsmiljøet.
- `docker-compose-prod.yaml` til produktionsmiljøet.

Disse filer hjælper med at konfigurere og starte containere med de nødvendige indstillinger for de forskellige miljøer.

### Docker Hub Push

For at distribuere produktionens Docker images til Docker Hub, så de kan bruges i en Docker Swarm, følger vi nedenstående trin:

1. Byg produktionens Docker images ved hjælp af `--target prod` flaget:
    ```sh
    docker build --target prod -t b5160r/zay-frontend:prod .
    docker build --target prod -t b5160r/zay-backend:prod .
    ```

2. Skub disse images til Docker Hub:
    ```sh
    docker push b5160r/zay-frontend:prod
    docker push b5160r/zay-backend:prod
    ```

### Docker Secrets

For at sikre følsomme oplysninger, som f.eks. databasenavne og adgangskoder, bruger vi Docker Secrets. Disse secrets kan oprettes og gemmes sikkert med følgende kommandoer:

```sh
echo "kitty" | docker secret create db_username -
echo "hellokitty" | docker secret create db_password -
echo "hellorootkitty" | docker secret create db_root_password -
```

### Docker Swarm Deployment

For at implementere applikationen i en Docker Swarm cluser, følg nedenstående trin:

1. Initialiser Docker Swarm:
    ```sh
    docker swarm init
    ```
    Commandoen returner en commando som kan køres på en anden maskine, så denne tilføjes som worker node.

    `docker swarm join --token [token] [ip]]:2377`

2. Deploy stacken ved hjælp af produktions `docker-compose` filen:
    ```sh
    docker stack deploy -c docker-compose-prod.yaml zay_swarm
    ```

Dette vil starte alle de nødvendige services defineret i `docker-compose-prod.yaml` filen i en Docker Swarm cluster.

### Scripts

Ovenstående setup og oprydning er gjort nemmere med med følgende to scripts:

- `DockerSwarmInit.cmd`
	```sh
	docker swarm init
	echo "kitty" | docker secret create db_username -
	echo "hellokitty" | docker secret create db_password -
	echo "hellorootkitty" | docker secret create db_root_password -
	docker stack deploy -c docker-compose-prod.yaml zay-swarm
	```

- `DockerSwarmCleanUp.cmd`
	```sh
	docker swarm leave --force
	docker image prune --force
	```

### Docker Installation på Linux Distro

For installation af Docker på en Linux Distro (i dette eksempel Manjaro), følg nedenstående trin med forbehold for packagemanager:

1. Update: 
    ```sh
    sudo pacman -Syu
    ```
2. Installere Docker:
    ```sh
    sudo pacman -S docker
    ``
3. Start Docker:
    ```sh
    sudo systemctl start docker.service
    ```

4. Check at den kører:
    ```sh
    sudo docker info
    ```

5. Sæt Docker til at køre uden root (for det bliver hurtigt trælst):
    ```sh
    sudo usermod -aG docker $USER
    ```

6. Efter reboot kan docker køres uden root

7. Her kan man eventuelt vælge at benytte commandoen fra før `docker swarm join --token [token] [ip]]:2377` og joine maskinen som worker node.
