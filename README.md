# Convert Google Notes to SimpleNote

This project provides a simple script to manually convert exported Google Keep (Notes) data into a format which can be easily imported into Simplenote.
The export is a simple .txt format, which may be used for other purposes. (it works great with simplenote however)

## How to

1. Clone this repo
2. Install Deno (https://deno.land/)
3. Export Google Keep (Notes) data (https://takeout.google.com/)
4. Extract the received archive into `takeout_files` inside this cloned repo
5. deno run --allow-read --allow-write convert.ts

Enjoy!

## Further notes

This is a very simple converter, quickly hacked together. It supports notes containing list items and plain texts.
Not suppported are images, sounds, or similar assets.