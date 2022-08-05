define _alert_success
	$(call _alert_message,Script Completed)
endef

zip-only:
	cd build
	zip ../budget-planner-web.zip *

build-app:
	npm run build

build-and-zip: build-app zip-only

