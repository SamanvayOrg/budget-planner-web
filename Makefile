define _alert_success
	$(call _alert_message,Script Completed)
endef

zip-only:
	rm -rf budget-planner-web.zip && cd build && zip -r ../budget-planner-web.zip .

build-app:
	npm run build

build-and-zip: build-app zip-only

clean:
	rm -rf node_modules

deps:
	npm install --legacy-peer-deps

start:
	npm start


