## ps-image

[GH PAGES DEMO](https://gh.corp.bitshelter.com/pages/Components/ps-image)

An element displaying a PhotoShelter image.  Based on the input settings there
are a variety of ways to request the image.  IID will give you direct access to
an image, GID and CID will give you access to the associated Key Image, SRC
will directly point to the file in question, and when an Image Object is provided
the associated URL will be derived from there.

Example:

    <ps-image iid="I0000xxxxxxxxxxx"></ps-image>

Example:

    <ps-image gid="G0000xxxxxxxxxxx"></ps-image>

Example:

    <ps-image cid="C0000xxxxxxxxxxx"></ps-image>

Example:

    <ps-image src="img/location.png"></ps-image>

---
