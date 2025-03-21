serve:
	OCTOKIT_SILENT=true bundle exec jekyll serve
serve-drafts:
	OCTOKIT_SILENT=true bundle exec jekyll serve --drafts

serve-prod:
	JEKYLL_ENV=production make serve

build:
	OCTOKIT_SILENT=true bundle exec jekyll build

clear:
	rm -rf _site .sass-cache
react:
	rm -rf private-convert build.zip
	mkdir private-convert
	curl -OL https://github.com/matan-h/private-convert/releases/latest/download/build.zip
	unzip build.zip 'build/*' -d private-convert
	mv private-convert/build/* private-convert
	rmdir private-convert/build
	rm build.zip
install:
	bundle install