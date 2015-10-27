# Project Structure Documentation

This document's aim is to help new members understand what goes where and what the significance of each member is. Currently
the project structure is built around a custom variant of the FLUX architecture used to increase determinism with React.JS
and there is admittedly some areas that wont be clear immediately to a new developer.

# /actions/ - FLUX actions

Actions are logical groupings of operations that need to be taken. They can include any ui-state changes or calls to the
backend. It's worth noting that actions can fetch data and fire other actions in response. These actions are grouped in
the functional categories that will be described below.

# /components/ - Components

The place for all the components that make up the ui of the application.

# /routes/ - Route endpoints

The root components for any given route in the routing system for the canvas.

# /stores/ - FLUX stores

Stores are the maintained state of the application, they're only ever augmented by actions and when they're augmented they
trigger various views to update their local state / re-render. These stores are grouped in the functional categories that
will be described below.

# Functional categories

* **Player** - Actions / Data(stores) with respect to the UI-state of the player. (Play/Pause/Volume/Visibility Changes/Etc...)
* **Queue** - Actions / Data(stores) with respect to the queue and currently playing song (Prev/Next/Seek/ChangeSong/Etc...)
* **Session** - Actions / Data(stores) with respect to the user session (login/register/current user/etc...)
* **System** - Actions / Data(stores) with respect to the app as a whole (init/connection states/error handling/etc...)
* **UI** - Actions / Data(stores) with respect to the UI-State of the application (menu / panes / route / etc...)
