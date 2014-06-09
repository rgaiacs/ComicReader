# Software Definitions

LINT = jshint
SVG2PNG = convert

# Package Variables

PACKAGENAME = ComicReader

PACKAGELIST = building-blocks \
              css \
              icons \
              index.html \
              js \
              manifest.webapp \
	      zip.js

ICONS = $(foreach size, 32 60 90 120 128 256, icons/$(PACKAGENAME)-$(size).png)

# main rules

help:
	@grep -e '^##' Makefile | sed 's/## //'

## beautify : beautify the files
beautify:
	html-beautify -r -f index.html
	find css -name '*.css' -type f -exec css-beautify -r -f {} \;
	find js -name '*.js' -type f -exec js-beautify -r -f {} \;

## build    : build some files need for this webapp
build: ${ICONS}

## lint     : lint Javascript files
lint :
	$(LINT) js

## package  : package the webapp
package: build
	zip -r $(PACKAGENAME).zip ${PACKAGELIST}

## cleanall : remove the files built previously
cleanall:
	rm -f ${ICONS}
	rm -f $(PACKAGENAME)

# Auxiliar rules

icons/%.png: icons/$(PACKAGENAME).svg
	$(SVG2PNG) -density 512 -background none $< -resize $(subst icons/$(PACKAGENAME)-,,$(basename $@)) $@
