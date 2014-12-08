.PHONY: check

all: check

check:
	@for file in data/*.json ; do \
		echo -n "$$file: " ; \
		json_verify < $$file ; \
	done
