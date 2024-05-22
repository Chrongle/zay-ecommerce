docker swarm init
echo "kitty" | docker secret create db_username -
echo "hellokitty" | docker secret create db_password -
echo "hellorootkitty" | docker secret create db_root_password -
docker stack deploy -c docker-compose-prod.yaml zay-swarm