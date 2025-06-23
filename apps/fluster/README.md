# Fluster

Fluster is your brain's free & open source presentation layer.

Powered by Rust, Fluster offers unmatched performance, integrated AI and a vector database, a bibliography manager, a snippets database, a user defined dictionary and more.

Fluster aims to be more than just another markdown note taking app, and instead acts as an ecosystem and environment to be extended upon with Fluster's Rust, Go, Python or Typescript sdk's (available _by_ fall 2025). This is accomplished by embedding a webview through Tauri in an otherwise Rust powered application. This allows other developers to build their own components which can then be embedded in a user's mdx note. Support for parsing extensions will be available in an upcoming release.

## Important Side Note

After leaving software to pursue a promising theory related to my formal education in physics & astrophysics I became homeless and have been for more than 3 years. The model is rock solid with incredible potential to replace general relativity, but that's neither here nor there. Because of my living situation, I'm forced to work without WIFI, and usually with limited battery power. Because of this, I'm focusing my efforts on what will be part of an initial beta. Under normal circumstances this app would remain private for an additional month or two while the final 20% is wrapped up, but due to my living situation I've made the decision to release this app early and to build out the rest in public.

After migrating this app from a pure typescript application that I originally built for [my own academic pursuits](https://ulld.vercel.app/myWork), some of the functionality is missing and will likely be absent in the first release. Please have patience; the core of the additional features are in place, it's just a matter of connecting the dots... and please consider supporting this application if you can. Every little bit helps when you're sleeping in a car with 180,000 miles on it in 95° heat. If you're really feeling generous, consider sharing this application or the [modified model of relativity](https://ulld.vercel.app/myWork) that inspired it.

## Getting Started

> Downloads are not yet available.. but I'm wrapping up the final bits of the beta and will be available within the week.

To get started, simply download the latest zip for your operating system from the downloads directory.

Upon launching, Fluster will prompt you for the directory that you plan to keep your notes.

Once you provide this directory to Fluster, simply add your notes to this folder or any folder contained within that folder, and then use the command palette (cmd+p by default) to 'sync database'.

That's it! Your notes are now available within Fluster! Try using the command palette again and select the 'notes' option to view a note.

### Additional Content

This folder can also house additional files, including a `.flusterIgnore` file which follows an identical syntax to `.gitignore` files, an optional `.bib` file, and an optional `.csl` file for citation formatting. Future updates will include support for all tabular formats (csv, json, excel, etc.) as well as numerical data output by libraries popular in the STEM world like **numpy** and **pandas**.
