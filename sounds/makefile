ROOT_DIR = $(shell pwd)
SONG_FOLDER = $(ROOT_DIR)/assets/songs

include $(ROOT_DIR)/assets/songs/Makefile.inc

TOOL_DIR = $(ROOT_DIR)/lib/zzfxfm/tools
CONVERTER = $(TOOL_DIR)/convert/bin/zzfxm-convert.js
CONVERTER_FLAGS = -p -n
INSTRU_LOADER = $(ROOT_DIR)/load_instru.py
INSTRU_FILE = $(ROOT_DIR)/assets/instru.js
TINYFIER = $(TOOL_DIR)/songpack/bin/zzfxm-songpack.js
SONGS_MINIFIED = $(SONGS:$(SONG_FOLDER)/%.mod=$(SONG_FOLDER)/%.mini.js)
SONG_OUTPUT = $(SONG_FOLDER)/songs.js

.DEFAULT_GOAL := songs

PHONY += songs

songs:$(SONG_OUTPUT)

$(SONG_OUTPUT):$(SONGS_MINIFIED)
	@$(shell rm -f $(SONG_OUTPUT))
	@$(foreach FILE, $<, echo $(shell cat $(FILE)) >> $@;)
	@echo "$@ generated with success !"

$(SONG_FOLDER)/%.mini.js: $(SONG_FOLDER)/%.mod | $(TOOL_DIR)/songpack/.done $(TOOL_DIR)/convert/.done
	@$(CONVERTER) $(CONVERTER_FLAGS) $< $(<:$(SONG_FOLDER)/%.mod=$(SONG_FOLDER)/%.js)
	@echo "[CONVERT] $< $(<:$(SONG_FOLDER)/%.mod=$(SONG_FOLDER)/%.js)"
	@$(INSTRU_LOADER) -ins $(INSTRU_FILE) -s $(<:$(SONG_FOLDER)/%.mod=$(SONG_FOLDER)/%.js) \
	-o $(<:$(SONG_FOLDER)/%.mod=$(SONG_FOLDER)/%.ins.js)
	@echo "[LOAD_INSTRU] $(<:$(SONG_FOLDER)/%.mod=$(SONG_FOLDER)/%.js)"
	$(TINYFIER) $(<:$(SONG_FOLDER)/%.mod=$(SONG_FOLDER)/%.ins.js) $@
	@echo "[TINYFIED] $@"

$(TOOL_DIR)/convert/.done:
	@cd $(TOOL_DIR)/convert
	npm i
	@touch $(TOOL_DIR)/convert/.done

$(TOOL_DIR)/songpack/.done:
	@cd $(TOOL_DIR)/songpack
	npm i
	@touch $(TOOL_DIR)/songpack/.done

PHONY += clean

clean:
	@rm -f $(SONGS_MINIFIED) $(SONG_OUTPUT)

PHONY += install

install: $(TOOL_DIR)/convert/.done $(TOOL_DIR)/songpack/.done

