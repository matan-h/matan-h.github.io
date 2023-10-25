serve:
	OCTOKIT_SILENT=true bundle exec jekyll serve
serve-prod:
	JEKYLL_ENV=production make serve

clear:
	rm -rf _site