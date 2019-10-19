help:
	@echo ""
	@echo "Welcome to supercapacitor's build command center"
	@echo "----------------------------------------"
	@echo ""
	@echo "help                       Show this list."
	@echo "install                    Install locally."
	@echo ""
	@echo "vagrant"
	@echo "    vagrant/start          Start vagrant."
	@echo "    vagrant/stop           Stop vagrant."
	@echo ""
	@echo "server"
	@echo "    server/restart         Restart the dev server."
	@echo "    server/status          Show pm2 status."
	@echo "    server/logs            Show server logs."
	@echo "    server/clear           Clear all server logs."
	@echo "    server/start           Start the dev server, webpack."
	@echo "    server/stop            Stop the dev server."
	@echo ""
	@echo "test"
	@echo "    test/all               Test it all."
	@echo ""
	@echo "----------------------------------------"
	@echo "To get started run: make server/start"
	@echo ""


install:
	@npm install webpack -g
	@make vagrant/start
	@cd ./server && npm ci
	@cd ./client && npm ci
	@make server/start


vagrant/start:
	@echo 'Starting vagrant...'
	@vagrant up

vagrant/stop:
	@echo 'Stopping vagrant...'
	-@vagrant suspend

server/status:
	@vagrant ssh -c 'cd /var/www/paramly && pm2 status'

server/logs:
	@vagrant ssh -c 'cd /var/www/paramly && pm2 log'

server/clear:
	@echo 'Clearing all logs...'
	@echo > ./logs/server.log

server/start: vagrant/start server/restart
	@echo 'Dev server started. Visit localhost:8081'

server/restart:
	@echo 'Starting/Restarting express server...'
	@vagrant ssh -c 'cd /var/www/paramly && pm2 start dev.json'

server/stop: vagrant/stop server/clear
	@echo 'Stopped dev server and related services.'

test/all:
	@vagrant ssh -c 'cd /var/www/paramly && mocha ./server/routes/**/*.test.js --config ./server/lib/test/config.js'
