DOCKERCOMMAND := docker exec app bash -c

help:
	@echo ""
	@echo "Welcome to paramly's build command center"
	@echo "----------------------------------------"
	@echo ""
	@echo "help                       Show this list."
	@echo "start                      Start docker."
	@echo "stop                       Stop docker."
	@echo ""
	@echo "docker-compose"
	@echo "    docker-compose/build   Docker compose build process."
	@echo ""
	@echo "docker"
	@echo "    docker/shell           Docker attach shell to app."
	@echo "    docker/logs            Docker log app."
	@echo ""
	@echo "server"
	@echo "    server/restart         Restart the dev server."
	@echo "    server/watch           Watchman restart the dev server."
	@echo "    server/status          Show pm2 status."
	@echo "    server/logs            Show server logs."
	@echo "    server/clear           Clear all server logs."
	@echo "    server/start           Start the dev server, webpack."
	@echo "    server/stop            Stop the dev server."
	@echo ""
	@echo "logs"
	@echo "    logs/clear             Clear logs."
	@echo ""
	@echo "test"
	@echo "    test/all               Test it all."
	@echo ""
	@echo "----------------------------------------"
	@echo "To get started run: make start"
	@echo ""

start: watch
	@echo 'Starting docker...'
	@docker-compose up -d

restart:
	@echo 'Starting docker...'
	@docker-compose restart app

stop:
	@echo 'Stopping docker...'
	-@docker-compose down
	-@watchman shutdown-server

watch:
	-@watchman --logfile ~/Projects/paramly/logs/watchman.log watch-project .
	-@watchman -j < watchman.json

# This is to only be used by docker
docker-compose/build:
	@cd ./server && npm ci
	@pm2 start dev.json
	@tail -f /dev/null

docker/shell:
	@${DOCKERCOMMAND} "/bin/bash"

logs/clear:
	@echo 'Clearing all logs...'
	@echo > ./logs/server.log
	@echo > ./logs/watchman.log

server/status:
	@${DOCKERCOMMAND} "pm2 status"

server/logs:
	@${DOCKERCOMMAND} "pm2 log"

server/restart:
	@echo 'Starting/Restarting express server...'
	@${DOCKERCOMMAND} "cd /var/www/app && pm2 start dev.json"

server/start: docker/start server/restart
	@echo 'Dev server started. Visit localhost:8081'

server/watch:
	@echo 'Wathman is restarting express server...'
	@docker exec app bash -c "cd /var/www/app && pm2 restart paramly"

server/stop: docker/stop server/clear
	@echo 'Stopped dev server and related services.'

test/all:
	@${DOCKERCOMMAND} "cd /var/www/app && mocha ./server/routes/**/*.test.js --config ./server/lib/test/config.js"
