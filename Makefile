.PHONY: docs

print = @echo "=> $(1)"\
				"\n-----------------------"

docs:
	$(call print, "Build docs")
	jsdox --output ./docs/ ./lib/
