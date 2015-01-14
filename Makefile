.PHONY: docs

print = @echo "=> $(1)"\
				"\n-----------------------"

docs:
	$(call print, "Build docs")
	jsdoc lib/ -c conf.json -d ./docs/
