#
# Requires:
#  * mocha
#  * chai
#  * mocha-phantomjs
#
all:
	@echo "Usage: [mocha|phantom|debug]"

mocha:
	mocha -u tdd js/tests/

debug:
	mocha debug -u tdd js/tests/

phantom:
	mocha-phantomjs test_browser.html
