Select a post by clicking it. Then, have in-contet 'edit'/'delete' buttons.
Have a 'new' button as well, seperately


# Ember scratch

A simple blogging tool for knottyCMS.

The idea is that a *blog* will be treated as a black box inside the CMS. When a user goes to edit the blog itself, they'll see this mini app (eventually a variant of the functionality shown by the app).

## Needs to have
- Create blog posts
- Read blog posts from the server
- Update blog posts from the serve
- Delete blog posts from the server
- Markdown-powered

## Nice to have
- No saving, it's all done automatically
    - Need a UI to show that
    - Have to be smart about how this data will be saved to the server. Perhaps a 3-5 second timeout after a keyup event.


So we'll need...
- A list of current blog posts
- A viewer for a currently selected blog post
- Buttons to add/edit/delete

Actually...
- List of blog posts separated from actual blog itself
- Once a user clicks to edit a blog post or create one, the whole screen becomes an editor, with a done button at the top.

So we'll need a master template, and two templates to go within it:
- Blog list
- Blog post
