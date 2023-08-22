# Obsidian-Plugin-Template

## Todos
[] edit package.json (name, description,...) \
[] edit manifest.json \
[] enable GH action bot write permission \
[] rename elements in src/ to your plugin name \
[] remove all info.md files \
[] edit license if necessary \
[] edit readme

## Build a release
Create a tag that matches the version in the ``manifest.json`` file.

````bash
$ git tag -a 1.0.1 -m "1.0.1"
$ git push origin 1.0.1
````
-a creates an annotated tag.
-m specifies the name of your release. \
For Obsidian plugins, this must be the same as the version.
Browse to your repository on GitHub and select the Actions tab. Your workflow might still be running, or it might have finished already.

When the workflow finishes, go back to the main page for your repository and select Releases in the sidebar on the right side. The workflow has created a draft GitHub release and uploaded the required assets as binary attachments.

Select Edit (pencil icon) on the right side of the release name.

Add release notes to let users know what happened in this release, and then select Publish release.