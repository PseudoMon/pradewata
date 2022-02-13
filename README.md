# Proyek Pradewata
This repository contains the source code for Pradewata, a project that aims to retranslate a portion of Genshin Impact into Indonesian, and then put them up on display in a website powered by [Remix](https://remix.run) and [Eno](https://eno-lang.org).

This a personal passion project by me, [@PseudoMonious](https://twitter.com/PseudoMonious), who for some silly reasons decide to use up hours of her time to mash his translation skills and web developing skills together. And also her love for the video game Genshin Impact and all the characters in that world.

The live version of this site can be seen [here](https://pradewata.netlify.app).

I've put the source code for public display here in hope that it can be helpful for other web developers, whether they want to make their own Genshin fansites or otherwise, but it is still a solo project. Please do not take anything here without my permission.

## Development

```sh
pnpm run dev
```

This starts your app in development mode, rebuilding assets on file changes. 

Stylesheet utilize postcss and will require another process to generate. Run this concurrently with the above:

```sh
pnpm run dev:css
```

## Deployment
I'm deploying this on [Netlify](https://pradewata.netlify.app) at the moment, but if this takes off (and I have the motivation) I'm thinking of getting a shared hosting space for it with a proper domain and everything. 

The Netlify deployment codes are not in this repository. 

Note to self: for deployment, copy the app folder and the contents of the public folder *minus* the build folder in it to the Netlify folder. Then copy text-data to netlify/functions/server in the Netlify folder. Then run `pnpm run build` and `netlify deploy`.

## TODO
- OpenGraph/Social Media cards
- Better header links
- Per-page error handling, especially for ENOENT when looking for characters, and a better generic 404 page
- Comment section/guestbook page?