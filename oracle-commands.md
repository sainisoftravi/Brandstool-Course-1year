mkdir -p downloads/user1
mkdir -p downloads/user2
mkdir -p downloads/user3

sudo chown -R 1000:1000 downloads

docker compose config
docker compose up -d --force-recreate

docker compose ps

User	Browser URL	Host Downloads folder
User 1	https://129.146.103.74:3001	downloads/user1
User 2	https://129.146.103.74:3101	downloads/user2
User 3	https://129.146.103.74:3201	downloads/user3

5. Verify the Downloads mount

6. docker exec brandseotool-user1 ls -lah /config/Downloads
docker exec brandseotool-user2 ls -lah /config/Downloads
docker exec brandseotool-user3 ls -lah /config/Downloads

devopsravi02
devopsravi02123
