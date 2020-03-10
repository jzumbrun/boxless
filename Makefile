DOCKERCOMMANDAPP := docker exec app bash -c
DOCKERCOMMANDMYSQL := docker exec mysql bash -c


help:
	@echo ""
	@echo "Welcome to supercontainer's build command center"
	@echo "----------------------------------------"
	@echo ""
	@echo "help                       Show this list."
	@echo "start                      Start docker."
	@echo "stop                       Stop docker."
	@echo ""
	@echo "server"
	@echo "    server/restart         Restart the dev server."
	@echo "    server/watch           Watchman restart the dev server."
	@echo "    server/status          Show pm2 status."
	@echo "    server/logs            Show server logs."
	@echo "    server/seed            Seed the db."
	@echo "    server/start           Start the dev server, webpack."
	@echo "    server/stop            Stop the dev server."
	@echo ""
	@echo "logs"
	@echo "    logs/clear             Clear logs."
	@echo ""
	@echo "code"
	@echo "    code/lint              Lint code."
	@echo "    code/supersequel       Supersequel playground."
	@echo ""
	@echo "test"
	@echo "    test/all               Test all."
	@echo ""
	@echo "----------------------------------------"
	@echo "To get started run: make start"
	@echo ""

start: logs/clear watch
	@echo 'Starting docker...'
	@docker-compose up -d
	@${DOCKERCOMMANDAPP} "cd ./server && npm ci"
	@${DOCKERCOMMANDAPP} "pm2 start dev.json"
	@${DOCKERCOMMANDMYSQL} "mysql -uroot -p'b33pb00p' -e 'CREATE DATABASE test;'"
	@${DOCKERCOMMANDMYSQL} "mysql -uroot -p'b33pb00p' -e 'GRANT ALL PRIVILEGES ON test.* TO \"supercontainer\"@\"%\";'"

restart:
	@echo 'Starting docker...'
	@docker-compose restart app

stop:
	@echo 'Stopping docker...'
	-@docker-compose down
	-@watchman shutdown-server

watch:
	-@watchman --logfile ~/Projects/supercontainer/logs/watchman.log watch-project .
	-@watchman -j < watchman.json

logs/clear:
	@echo 'Clearing all logs...'
	@echo > ./logs/server.log
	@echo > ./logs/watchman.log

server/status:
	@${DOCKERCOMMANDAPP} "pm2 status"

server/logs:
	@${DOCKERCOMMANDAPP} "pm2 log"

server/restart:
	@echo 'Starting/Restarting express server...'
	@${DOCKERCOMMANDAPP} "pm2 start dev.json"

server/start: server/restart
	@echo 'Dev server started. Visit localhost:8081'

server/watch:
	@echo 'Wathman is restarting express server...'
	@${DOCKERCOMMANDAPP} "pm2 restart supercontainer"

server/stop: logs/clear
	@echo 'Stopped dev server and related services.'

server/seed:
	@echo 'Seeding db with test data...'
	@${DOCKERCOMMANDAPP} "node ./server/lib/test/seed.js"

code/lint:
	@${DOCKERCOMMANDAPP} "prettier --single-quote --write 'server/**/*.js'"

code/supersequel:
	@${DOCKERCOMMANDAPP} "node ./server/lib/test/supersequel.js"

test/all:
	@echo 'Restarting express server in testing env...'
	#@${DOCKERCOMMANDAPP} "NODE_ENV=testing pm2 start dev.json"
	-@${DOCKERCOMMANDAPP} "NODE_ENV=testing mocha ./server/routes/**/*.test.js --exit --config ./server/lib/test/config.js"
	@echo 'Restarting express server in development env...'
	#@${DOCKERCOMMANDAPP} "NODE_ENV=development pm2 start dev.json"
